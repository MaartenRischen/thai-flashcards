import type { CardState, DailyLog, Direction, Phrase, Settings } from '../types';
import { cardKey, newCard } from './scheduler';

/**
 * Queue building. Pure: everything it needs is an argument, including `now`.
 */

export interface QueueCounts {
  /** New cards still allowed today. */
  newLeft: number;
  /** Review cards due and still allowed today. */
  dueLeft: number;
  /** Learning/relearning cards ready now. These ignore the daily cap. */
  learningLeft: number;
  /** Total cards in the collection for the enabled directions. */
  total: number;
  suspended: number;
}

export interface Queue {
  counts: QueueCounts;
  next: CardState | null;
}

/**
 * Materialise the full card set for the enabled directions. Cards are created
 * lazily on first use, so switching `listening` on does not rewrite the DB —
 * it just makes new cards appear.
 */
export function materialise(
  phrases: Phrase[],
  stored: Map<string, CardState>,
  directions: Direction[],
): CardState[] {
  const out: CardState[] = [];
  for (const p of phrases) {
    for (const dir of directions) {
      const key = cardKey(p.id, dir);
      out.push(stored.get(key) ?? newCard(p.id, dir));
    }
  }
  return out;
}

export function enabledDirections(settings: Settings): Direction[] {
  return (Object.keys(settings.directions) as Direction[]).filter((d) => settings.directions[d]);
}

export function todayLog(log: DailyLog[], day: string): DailyLog {
  return log.find((l) => l.day === day) ?? { day, newDone: 0, reviewsDone: 0 };
}

/**
 * Pick the next card and report the counts the Review screen shows.
 *
 * Order of preference:
 *   1. learning / relearning cards whose step has come up (never capped —
 *      dropping a card mid-learning-step is how you forget it)
 *   2. review cards that are due, oldest due date first, up to the daily cap
 *   3. a new card, in ascending phrase rank, up to the daily cap
 *
 * Reviews go before new cards on purpose: finishing what you started beats
 * piling on more.
 */
export function buildQueue(
  cards: CardState[],
  phraseRank: Map<string, number>,
  settings: Settings,
  today: DailyLog,
  now: number,
): Queue {
  const live = cards.filter((c) => !c.suspended);
  const suspended = cards.length - live.length;

  const learning = live
    .filter((c) => (c.stage === 'learning' || c.stage === 'relearning') && c.due <= now)
    .sort((a, b) => a.due - b.due);

  const due = live
    .filter((c) => c.stage === 'review' && c.due <= now)
    .sort((a, b) => a.due - b.due);

  const fresh = live
    .filter((c) => c.stage === 'new')
    .sort(
      (a, b) =>
        (phraseRank.get(a.phraseId) ?? 999) - (phraseRank.get(b.phraseId) ?? 999) ||
        a.direction.localeCompare(b.direction),
    );

  const newLeft = Math.max(0, Math.min(settings.newPerDay - today.newDone, fresh.length));
  const dueLeft = Math.max(0, Math.min(settings.reviewsPerDay - today.reviewsDone, due.length));

  const next = learning[0] ?? (dueLeft > 0 ? due[0] : undefined) ?? (newLeft > 0 ? fresh[0] : null);

  return {
    counts: {
      newLeft,
      dueLeft,
      learningLeft: learning.length,
      total: cards.length,
      suspended,
    },
    next: next ?? null,
  };
}

/** Free practice: any non-suspended card, chosen at random, scheduling untouched. */
export function randomPractice(
  cards: CardState[],
  exclude: string | null,
  rand: () => number = Math.random,
): CardState | null {
  const pool = cards.filter((c) => !c.suspended && c.key !== exclude);
  if (pool.length === 0) return null;
  return pool[Math.floor(rand() * pool.length)];
}

/** True when grading this card should count against the daily review cap. */
export function countsAsReview(card: CardState): boolean {
  return card.stage === 'review';
}

/** True when grading this card should count against the daily new cap. */
export function countsAsNew(card: CardState): boolean {
  return card.stage === 'new';
}
