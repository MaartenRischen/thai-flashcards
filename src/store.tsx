import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_SETTINGS,
  type Backup,
  type CardState,
  type DailyLog,
  type Grade,
  type Settings,
} from './types';
import { PHRASES, PHRASES_BY_RANK, PHRASE_BY_ID } from './data/phrases';
import { cardKey, newCard, schedule } from './srs/scheduler';
import {
  buildQueue,
  countsAsNew,
  countsAsReview,
  enabledDirections,
  materialise,
  todayLog,
} from './srs/queue';
import * as db from './db/db';
import { watchVoices, type VoiceState } from './audio/tts';

interface Store {
  ready: boolean;
  settings: Settings;
  cards: CardState[];
  cardsByKey: Map<string, CardState>;
  daily: DailyLog[];
  voice: VoiceState;
  /** True when audio is usable: a Thai voice exists on this device. */
  canSpeak: boolean;
  queue: ReturnType<typeof buildQueue>;
  leechAlert: string | null;

  grade: (card: CardState, grade: Grade) => Promise<void>;
  setSettings: (patch: Partial<Settings>) => Promise<void>;
  suspend: (key: string, suspended: boolean) => Promise<void>;
  resetCard: (key: string) => Promise<void>;
  exportJson: () => Promise<Backup>;
  importJson: (text: string) => Promise<number>;
  resetEverything: () => Promise<void>;
  dismissLeech: () => void;
}

const Ctx = createContext<Store | null>(null);

const rankMap = new Map(PHRASES.map((p) => [p.id, p.rank]));

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [settings, setSettingsState] = useState<Settings>(DEFAULT_SETTINGS);
  const [stored, setStored] = useState<Map<string, CardState>>(new Map());
  const [daily, setDaily] = useState<DailyLog[]>([]);
  const [voice, setVoice] = useState<VoiceState>({ status: 'loading', voices: [] });
  const [leechAlert, setLeechAlert] = useState<string | null>(null);
  // Bumped once a minute so learning steps (1 min, 10 min) come due without a
  // manual refresh. Cheap: it only re-derives the queue.
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let live = true;
    (async () => {
      const [s, cards, log] = await Promise.all([db.loadSettings(), db.loadCards(), db.loadDaily()]);
      if (!live) return;
      setSettingsState(s);
      setStored(new Map(cards.map((c) => [c.key, c])));
      setDaily(log);
      setReady(true);
    })();
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => watchVoices(setVoice), []);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  // Theme. The class is what Tailwind's dark variant keys on; localStorage is
  // only a pre-paint hint, IndexedDB is the source of truth.
  useEffect(() => {
    const apply = () => {
      const dark =
        settings.theme === 'dark' ||
        (settings.theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList.toggle('dark', dark);
    };
    apply();
    try {
      localStorage.setItem('tfc.theme', settings.theme);
    } catch {
      /* private mode — the class above still did the work for this session */
    }
    if (settings.theme !== 'system') return;
    const mq = matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [settings.theme]);

  const canSpeak = voice.status === 'available';

  // If the platform has no Thai voice, the listening direction is not just
  // hidden — it is off, so its cards never enter the queue.
  const effectiveSettings = useMemo<Settings>(
    () =>
      canSpeak
        ? settings
        : { ...settings, directions: { ...settings.directions, listening: false } },
    [settings, canSpeak],
  );

  const cards = useMemo(
    () => materialise(PHRASES_BY_RANK, stored, enabledDirections(effectiveSettings)),
    [stored, effectiveSettings],
  );

  const cardsByKey = useMemo(() => new Map(cards.map((c) => [c.key, c])), [cards]);

  const queue = useMemo(() => {
    void tick;
    const now = Date.now();
    return buildQueue(cards, rankMap, effectiveSettings, todayLog(daily, db.todayKey(now)), now);
  }, [cards, effectiveSettings, daily, tick]);

  const grade = useCallback(
    async (card: CardState, g: Grade) => {
      const now = Date.now();
      const wasNew = countsAsNew(card);
      const wasReview = countsAsReview(card);
      const { card: next, becameLeech } = schedule(card, g, now);

      setStored((prev) => new Map(prev).set(next.key, next));
      await db.putCard(next);

      if (wasNew || wasReview) {
        const day = db.todayKey(now);
        const current = todayLog(daily, day);
        const updated: DailyLog = {
          day,
          newDone: current.newDone + (wasNew ? 1 : 0),
          reviewsDone: current.reviewsDone + (wasReview ? 1 : 0),
        };
        setDaily((prev) => [...prev.filter((l) => l.day !== day), updated]);
        await db.putDaily(updated);
      }

      if (becameLeech) {
        const phrase = PHRASE_BY_ID.get(next.phraseId);
        setLeechAlert(phrase ? `${phrase.thai} — ${phrase.meaning}` : next.phraseId);
      }
    },
    [daily],
  );

  const setSettings = useCallback(async (patch: Partial<Settings>) => {
    setSettingsState((prev) => {
      const next = { ...prev, ...patch };
      void db.saveSettings(next);
      return next;
    });
  }, []);

  const suspend = useCallback(
    async (key: string, suspended: boolean) => {
      const existing = cardsByKey.get(key);
      if (!existing) return;
      const next = { ...existing, suspended };
      setStored((prev) => new Map(prev).set(key, next));
      await db.putCard(next);
    },
    [cardsByKey],
  );

  const resetCard = useCallback(async (key: string) => {
    const [phraseId, direction] = key.split(':');
    const fresh = newCard(phraseId, direction as CardState['direction']);
    setStored((prev) => new Map(prev).set(fresh.key, fresh));
    await db.putCard(fresh);
  }, []);

  const exportJson = useCallback(() => db.buildBackup(), []);

  const importJson = useCallback(async (text: string) => {
    const backup = db.parseBackup(text);
    await db.restoreBackup(backup);
    const [s, cards, log] = await Promise.all([db.loadSettings(), db.loadCards(), db.loadDaily()]);
    setSettingsState(s);
    setStored(new Map(cards.map((c) => [c.key, c])));
    setDaily(log);
    return backup.cards.length;
  }, []);

  const resetEverything = useCallback(async () => {
    await db.resetAll();
    setStored(new Map());
    setDaily([]);
  }, []);

  const value: Store = {
    ready,
    settings,
    cards,
    cardsByKey,
    daily,
    voice,
    canSpeak,
    queue,
    leechAlert,
    grade,
    setSettings,
    suspend,
    resetCard,
    exportJson,
    importJson,
    resetEverything,
    dismissLeech: () => setLeechAlert(null),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore outside StoreProvider');
  return s;
}

export { cardKey, PHRASE_BY_ID, PHRASES, PHRASES_BY_RANK };
