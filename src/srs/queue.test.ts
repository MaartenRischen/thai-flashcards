import { describe, it, expect } from 'vitest';
import { buildQueue, enabledDirections, materialise, randomPractice, todayLog } from './queue';
import { DAY, MINUTE, newCard } from './scheduler';
import { DEFAULT_SETTINGS, type CardState, type Phrase, type Settings } from '../types';
import { PHRASES, PHRASES_BY_RANK } from '../data/phrases';

const T0 = 1_700_000_000_000;

const rank = new Map(PHRASES.map((p) => [p.id, p.rank]));

function settings(over: Partial<Settings> = {}): Settings {
  return { ...DEFAULT_SETTINGS, ...over };
}

function empty() {
  return { day: '2026-01-01', newDone: 0, reviewsDone: 0 };
}

describe('materialise', () => {
  it('creates a card per phrase per enabled direction', () => {
    const cards = materialise(PHRASES, new Map(), ['recognition', 'production']);
    expect(cards).toHaveLength(200);
  });

  it('keeps stored state and invents the rest', () => {
    const stored = new Map<string, CardState>();
    const saved = { ...newCard('khawp-khun', 'recognition'), reps: 7 };
    stored.set(saved.key, saved);
    const cards = materialise(PHRASES, stored, ['recognition']);
    expect(cards.find((c) => c.key === saved.key)!.reps).toBe(7);
    expect(cards.filter((c) => c.reps === 0)).toHaveLength(99);
  });

  it('adding the listening direction does not disturb existing cards', () => {
    const two = materialise(PHRASES, new Map(), ['recognition', 'production']);
    const stored = new Map(two.map((c) => [c.key, { ...c, reps: 3 }]));
    const three = materialise(PHRASES, stored, ['recognition', 'production', 'listening']);
    expect(three).toHaveLength(300);
    expect(three.filter((c) => c.reps === 3)).toHaveLength(200);
  });
});

describe('enabledDirections', () => {
  it('reflects the settings toggles, listening off by default', () => {
    expect(enabledDirections(DEFAULT_SETTINGS).sort()).toEqual(['production', 'recognition']);
    expect(enabledDirections(settings({ directions: { recognition: true, production: false, listening: true } })).sort()).toEqual(
      ['listening', 'recognition'],
    );
  });
});

describe('buildQueue', () => {
  it('serves new cards in ascending phrase rank', () => {
    const cards = materialise(PHRASES_BY_RANK, new Map(), ['recognition']);
    const q = buildQueue(cards, rank, settings(), empty(), T0);
    expect(q.next!.phraseId).toBe(PHRASES_BY_RANK[0].id);
    expect(PHRASES_BY_RANK[0].rank).toBe(1);
  });

  it('caps new cards at the daily setting', () => {
    const cards = materialise(PHRASES, new Map(), ['recognition']);
    const q = buildQueue(cards, rank, settings({ newPerDay: 10 }), empty(), T0);
    expect(q.counts.newLeft).toBe(10);

    const spent = buildQueue(cards, rank, settings({ newPerDay: 10 }), { day: 'x', newDone: 10, reviewsDone: 0 }, T0);
    expect(spent.counts.newLeft).toBe(0);
    expect(spent.next).toBeNull();
  });

  it('caps reviews at the daily setting', () => {
    const cards = PHRASES.slice(0, 5).map((p) => ({
      ...newCard(p.id, 'recognition' as const),
      stage: 'review' as const,
      interval: 3,
      due: T0 - DAY,
    }));
    const q = buildQueue(cards, rank, settings({ reviewsPerDay: 2 }), empty(), T0);
    expect(q.counts.dueLeft).toBe(2);

    const spent = buildQueue(cards, rank, settings({ reviewsPerDay: 2 }), { day: 'x', newDone: 0, reviewsDone: 2 }, T0);
    expect(spent.counts.dueLeft).toBe(0);
  });

  it('lets learning cards through even when both caps are spent', () => {
    const learner: CardState = {
      ...newCard('khawp-khun', 'recognition'),
      stage: 'learning',
      learningStep: 1,
      due: T0 - MINUTE,
    };
    const q = buildQueue(
      [learner],
      rank,
      settings({ newPerDay: 0, reviewsPerDay: 0 }),
      { day: 'x', newDone: 99, reviewsDone: 99 },
      T0,
    );
    expect(q.next!.key).toBe(learner.key);
    expect(q.counts.learningLeft).toBe(1);
  });

  it('prefers learning, then due reviews, then new', () => {
    const learner: CardState = { ...newCard('a', 'recognition'), stage: 'learning', due: T0 - 1 };
    const review: CardState = { ...newCard('b', 'recognition'), stage: 'review', interval: 5, due: T0 - DAY };
    const fresh = newCard('khawp-khun', 'recognition');

    expect(buildQueue([fresh, review, learner], rank, settings(), empty(), T0).next!.key).toBe(learner.key);
    expect(buildQueue([fresh, review], rank, settings(), empty(), T0).next!.key).toBe(review.key);
    expect(buildQueue([fresh], rank, settings(), empty(), T0).next!.key).toBe(fresh.key);
  });

  it('serves the oldest due review first', () => {
    const older: CardState = { ...newCard('a', 'recognition'), stage: 'review', due: T0 - 5 * DAY };
    const newer: CardState = { ...newCard('b', 'recognition'), stage: 'review', due: T0 - DAY };
    expect(buildQueue([newer, older], rank, settings(), empty(), T0).next!.key).toBe(older.key);
  });

  it('never serves a suspended card and counts it separately', () => {
    const s: CardState = { ...newCard('khawp-khun', 'recognition'), suspended: true };
    const q = buildQueue([s], rank, settings(), empty(), T0);
    expect(q.next).toBeNull();
    expect(q.counts.suspended).toBe(1);
  });

  it('returns null when nothing is due yet', () => {
    const future: CardState = { ...newCard('a', 'recognition'), stage: 'review', due: T0 + DAY };
    expect(buildQueue([future], rank, settings(), empty(), T0).next).toBeNull();
  });
});

describe('randomPractice', () => {
  it('never returns the card just shown', () => {
    const cards = materialise(PHRASES.slice(0, 3) as Phrase[], new Map(), ['recognition']);
    for (let i = 0; i < 20; i++) {
      const picked = randomPractice(cards, cards[0].key, () => i / 20);
      expect(picked!.key).not.toBe(cards[0].key);
    }
  });

  it('returns null when the pool is empty', () => {
    expect(randomPractice([], null)).toBeNull();
  });
});

describe('todayLog', () => {
  it('defaults to a zeroed log for an unseen day', () => {
    expect(todayLog([], '2026-08-13')).toEqual({ day: '2026-08-13', newDone: 0, reviewsDone: 0 });
  });
});
