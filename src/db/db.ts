import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import {
  DEFAULT_SETTINGS,
  type Backup,
  type CardState,
  type DailyLog,
  type Settings,
} from '../types';

/**
 * IndexedDB, not localStorage. Safari evicts localStorage after 7 days of no
 * visits, and this app is meant to survive months.
 */

interface Schema extends DBSchema {
  cards: { key: string; value: CardState };
  settings: { key: string; value: Settings };
  daily: { key: string; value: DailyLog };
}

const DB_NAME = 'thai-flashcards';
const DB_VERSION = 1;
const SETTINGS_KEY = 'settings';

let dbPromise: Promise<IDBPDatabase<Schema>> | null = null;

function db(): Promise<IDBPDatabase<Schema>> {
  if (!dbPromise) {
    dbPromise = openDB<Schema>(DB_NAME, DB_VERSION, {
      upgrade(d) {
        if (!d.objectStoreNames.contains('cards')) d.createObjectStore('cards', { keyPath: 'key' });
        if (!d.objectStoreNames.contains('settings')) d.createObjectStore('settings');
        if (!d.objectStoreNames.contains('daily')) d.createObjectStore('daily', { keyPath: 'day' });
      },
    });
  }
  return dbPromise;
}

export async function loadCards(): Promise<CardState[]> {
  return (await db()).getAll('cards');
}

export async function putCard(card: CardState): Promise<void> {
  await (await db()).put('cards', card);
}

export async function putCards(cards: CardState[]): Promise<void> {
  const d = await db();
  const tx = d.transaction('cards', 'readwrite');
  await Promise.all([...cards.map((c) => tx.store.put(c)), tx.done]);
}

export async function deleteCard(key: string): Promise<void> {
  await (await db()).delete('cards', key);
}

export async function loadSettings(): Promise<Settings> {
  const stored = await (await db()).get('settings', SETTINGS_KEY);
  // Merge so a settings field added in a later release gets its default rather
  // than arriving as undefined.
  return { ...DEFAULT_SETTINGS, ...(stored ?? {}) };
}

export async function saveSettings(settings: Settings): Promise<void> {
  await (await db()).put('settings', settings, SETTINGS_KEY);
}

export async function loadDaily(): Promise<DailyLog[]> {
  return (await db()).getAll('daily');
}

export async function putDaily(log: DailyLog): Promise<void> {
  await (await db()).put('daily', log);
}

/** Local calendar day, not UTC — the daily cap should roll over at the learner's midnight. */
export function todayKey(now: number = Date.now()): string {
  const d = new Date(now);
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export async function buildBackup(): Promise<Backup> {
  const [cards, settings, dailyLog] = await Promise.all([loadCards(), loadSettings(), loadDaily()]);
  return {
    format: 'thai-flashcards-backup',
    version: 1,
    exportedAt: Date.now(),
    cards,
    settings,
    dailyLog,
  };
}

export class ImportError extends Error {}

/** Validate hard. A silently half-restored backup is worse than a refused one. */
export function parseBackup(text: string): Backup {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new ImportError('That file is not valid JSON.');
  }
  if (typeof raw !== 'object' || raw === null) throw new ImportError('That file is not a backup.');
  const b = raw as Partial<Backup>;
  if (b.format !== 'thai-flashcards-backup') {
    throw new ImportError('That file is not a Thai Flashcards backup.');
  }
  if (b.version !== 1) throw new ImportError(`Unsupported backup version: ${String(b.version)}`);
  if (!Array.isArray(b.cards)) throw new ImportError('Backup has no card list.');

  for (const c of b.cards) {
    if (
      typeof c?.key !== 'string' ||
      typeof c?.phraseId !== 'string' ||
      typeof c?.due !== 'number' ||
      typeof c?.interval !== 'number' ||
      typeof c?.ease !== 'number'
    ) {
      throw new ImportError('Backup contains a malformed card.');
    }
  }

  return {
    format: 'thai-flashcards-backup',
    version: 1,
    exportedAt: typeof b.exportedAt === 'number' ? b.exportedAt : Date.now(),
    cards: b.cards as CardState[],
    settings: { ...DEFAULT_SETTINGS, ...(b.settings ?? {}) },
    dailyLog: Array.isArray(b.dailyLog) ? b.dailyLog : [],
  };
}

/** Replace everything. Import is a restore, not a merge — a merge would have to
 *  guess which side's due date wins, and guessing wrong loses real review history. */
export async function restoreBackup(backup: Backup): Promise<void> {
  const d = await db();
  const tx = d.transaction(['cards', 'settings', 'daily'], 'readwrite');
  await tx.objectStore('cards').clear();
  await tx.objectStore('daily').clear();
  for (const c of backup.cards) await tx.objectStore('cards').put(c);
  for (const l of backup.dailyLog) await tx.objectStore('daily').put(l);
  await tx.objectStore('settings').put(backup.settings, SETTINGS_KEY);
  await tx.done;
}

export async function resetAll(): Promise<void> {
  const d = await db();
  const tx = d.transaction(['cards', 'daily'], 'readwrite');
  await tx.objectStore('cards').clear();
  await tx.objectStore('daily').clear();
  await tx.done;
}
