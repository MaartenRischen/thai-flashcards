import type { CardState, Direction, Grade } from '../types';

/**
 * SM-2 with Anki's defaults. Pure functions, no IO, no clock reads that are not
 * passed in — every entry point takes `now` so the tests are deterministic.
 */

export const MINUTE = 60_000;
export const DAY = 86_400_000;

/** Learning steps in minutes. */
export const LEARNING_STEPS = [1, 10];
/** Relearning steps in minutes. */
export const RELEARNING_STEPS = [10];

export const GRADUATING_INTERVAL = 1; // days
export const EASY_INTERVAL = 4; // days
export const STARTING_EASE = 2.5;
export const MIN_EASE = 1.3;
export const MAX_EASE = 3.0;
export const MAX_INTERVAL = 365; // days
export const LEECH_THRESHOLD = 8;

export const HARD_MULTIPLIER = 1.2;
export const EASY_BONUS = 1.3;

export function cardKey(phraseId: string, direction: Direction): string {
  return `${phraseId}:${direction}`;
}

export function newCard(phraseId: string, direction: Direction): CardState {
  return {
    key: cardKey(phraseId, direction),
    phraseId,
    direction,
    due: 0, // new cards are always "due"; queue order comes from phrase rank
    interval: 0,
    ease: STARTING_EASE,
    reps: 0,
    lapses: 0,
    stage: 'new',
    learningStep: 0,
    suspended: false,
    lastReviewed: null,
  };
}

export function clampEase(ease: number): number {
  return Math.min(MAX_EASE, Math.max(MIN_EASE, round2(ease)));
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function clampInterval(days: number): number {
  return Math.min(MAX_INTERVAL, Math.max(GRADUATING_INTERVAL, days));
}

/**
 * ±5% fuzz on intervals over 2 days, so cards introduced on the same day drift
 * apart instead of clumping forever. `rand` is injectable for tests.
 *
 * Guarantee relied on by the acceptance criteria: the result is never below
 * `interval * 0.95`, and never below the graduating interval.
 */
export function applyFuzz(interval: number, rand: () => number = Math.random): number {
  if (interval <= 2) return interval;
  const spread = interval * 0.05;
  const fuzzed = interval + (rand() * 2 - 1) * spread;
  // Round to whole days, then re-floor at the -5% bound so rounding down cannot
  // push the value under the guarantee.
  const rounded = Math.round(fuzzed);
  const floor = Math.ceil(interval * 0.95);
  return clampInterval(Math.max(floor, rounded));
}

export interface ScheduleOptions {
  /** Injectable randomness for fuzz. Defaults to Math.random. */
  rand?: () => number;
  /** Skip fuzz entirely — used to compute the labels on the grade buttons. */
  noFuzz?: boolean;
}

export interface ScheduleResult {
  card: CardState;
  /** True when this review pushed the card over the leech threshold. */
  becameLeech: boolean;
}

/**
 * Apply a grade to a card. Returns a new CardState; never mutates the input.
 */
export function schedule(
  card: CardState,
  grade: Grade,
  now: number,
  opts: ScheduleOptions = {},
): ScheduleResult {
  const rand = opts.rand ?? Math.random;
  const fuzz = (days: number) => (opts.noFuzz ? clampInterval(days) : applyFuzz(days, rand));

  const next: CardState = {
    ...card,
    reps: card.reps + 1,
    lastReviewed: now,
  };

  const inLearning = card.stage === 'new' || card.stage === 'learning';
  const inRelearning = card.stage === 'relearning';

  if (inLearning) {
    applyLearning(next, grade, now, fuzz, LEARNING_STEPS);
  } else if (inRelearning) {
    applyLearning(next, grade, now, fuzz, RELEARNING_STEPS);
  } else {
    applyReview(next, grade, now, fuzz);
  }

  const becameLeech =
    next.lapses >= LEECH_THRESHOLD && card.lapses < LEECH_THRESHOLD && next.stage !== 'new';
  if (becameLeech) next.suspended = true;

  return { card: next, becameLeech };
}

function applyLearning(
  card: CardState,
  grade: Grade,
  now: number,
  fuzz: (d: number) => number,
  steps: number[],
): void {
  const wasRelearning = card.stage === 'relearning';

  if (grade === 'again') {
    card.stage = wasRelearning ? 'relearning' : 'learning';
    card.learningStep = 0;
    card.interval = 0;
    card.due = now + steps[0] * MINUTE;
    return;
  }

  if (grade === 'easy') {
    // Easy leaves the learning queue immediately.
    card.ease = clampEase(card.ease + 0.15);
    const days = wasRelearning ? GRADUATING_INTERVAL : EASY_INTERVAL;
    graduate(card, fuzz(days), now);
    return;
  }

  if (grade === 'hard') {
    // Anki repeats the current step on hard rather than advancing.
    card.stage = wasRelearning ? 'relearning' : 'learning';
    card.interval = 0;
    card.due = now + steps[Math.min(card.learningStep, steps.length - 1)] * MINUTE;
    return;
  }

  // good — advance one step, graduate off the end.
  const nextStep = card.learningStep + 1;
  if (nextStep < steps.length) {
    card.stage = wasRelearning ? 'relearning' : 'learning';
    card.learningStep = nextStep;
    card.interval = 0;
    card.due = now + steps[nextStep] * MINUTE;
    return;
  }
  graduate(card, fuzz(GRADUATING_INTERVAL), now);
}

function graduate(card: CardState, intervalDays: number, now: number): void {
  card.stage = 'review';
  card.learningStep = 0;
  card.interval = clampInterval(intervalDays);
  card.due = now + card.interval * DAY;
}

function applyReview(
  card: CardState,
  grade: Grade,
  now: number,
  fuzz: (d: number) => number,
): void {
  switch (grade) {
    case 'again': {
      card.lapses += 1;
      card.ease = clampEase(card.ease - 0.2);
      card.stage = 'relearning';
      card.learningStep = 0;
      card.interval = 0;
      card.due = now + RELEARNING_STEPS[0] * MINUTE;
      return;
    }
    case 'hard': {
      card.ease = clampEase(card.ease - 0.15);
      card.interval = fuzz(card.interval * HARD_MULTIPLIER);
      card.due = now + card.interval * DAY;
      return;
    }
    case 'good': {
      card.interval = fuzz(card.interval * card.ease);
      card.due = now + card.interval * DAY;
      return;
    }
    case 'easy': {
      card.ease = clampEase(card.ease + 0.15);
      card.interval = fuzz(card.interval * card.ease * EASY_BONUS);
      card.due = now + card.interval * DAY;
      return;
    }
  }
}

/**
 * What the grade buttons show. Unfuzzed on purpose — a button that promises
 * "3d" and delivers 3d is worth more than one that is exactly honest about a
 * random number the learner cannot see.
 */
export function previewInterval(card: CardState, grade: Grade, now: number): string {
  const { card: after } = schedule(card, grade, now, { noFuzz: true });
  const ms = after.due - now;
  return formatDelay(ms);
}

export function formatDelay(ms: number): string {
  if (ms < MINUTE) return '<1m';
  if (ms < 45 * MINUTE) return `${Math.round(ms / MINUTE)}m`;
  if (ms < DAY) return `${Math.round(ms / (60 * MINUTE))}h`;
  const days = Math.round(ms / DAY);
  if (days < 30) return `${days}d`;
  if (days < 365) return `${Math.round(days / 30)}mo`;
  return `${(days / 365).toFixed(1)}y`;
}

export function isLeech(card: CardState): boolean {
  return card.lapses >= LEECH_THRESHOLD;
}

export function isDue(card: CardState, now: number): boolean {
  return !card.suspended && card.due <= now;
}
