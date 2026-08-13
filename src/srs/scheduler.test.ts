import { describe, it, expect } from 'vitest';
import {
  DAY,
  EASY_INTERVAL,
  LEECH_THRESHOLD,
  MAX_EASE,
  MAX_INTERVAL,
  MIN_EASE,
  MINUTE,
  applyFuzz,
  cardKey,
  formatDelay,
  newCard,
  previewInterval,
  schedule,
} from './scheduler';
import type { CardState, Grade } from '../types';

const T0 = 1_700_000_000_000; // fixed clock; nothing here reads Date.now()

function fresh(): CardState {
  return newCard('khawp-khun', 'recognition');
}

/** Grade a card through a sequence, advancing the clock to each due date. */
function run(card: CardState, grades: Grade[], start = T0): { card: CardState; now: number } {
  let now = start;
  let c = card;
  for (const g of grades) {
    const res = schedule(c, g, now, { noFuzz: true });
    c = res.card;
    now = Math.max(now, c.due);
  }
  return { card: c, now };
}

describe('cardKey / newCard', () => {
  it('keys on phrase + direction', () => {
    expect(cardKey('khawp-khun', 'production')).toBe('khawp-khun:production');
  });

  it('starts new cards at ease 2.5, stage new, due immediately', () => {
    const c = fresh();
    expect(c.ease).toBe(2.5);
    expect(c.stage).toBe('new');
    expect(c.interval).toBe(0);
    expect(c.due).toBe(0);
    expect(c.lastReviewed).toBeNull();
  });
});

describe('learning steps', () => {
  it('good from new goes to the 10 minute step', () => {
    const { card } = schedule(fresh(), 'good', T0, { noFuzz: true });
    expect(card.stage).toBe('learning');
    expect(card.learningStep).toBe(1);
    expect(card.due - T0).toBe(10 * MINUTE);
  });

  // Acceptance: "a card graded good from new is due in 1 day after two learning steps"
  it('good twice from new graduates to a 1 day interval', () => {
    const { card } = run(fresh(), ['good', 'good']);
    expect(card.stage).toBe('review');
    expect(card.interval).toBe(1);
    expect(card.due - card.lastReviewed!).toBe(DAY);
  });

  it('again in learning resets to the 1 minute step', () => {
    const { card } = run(fresh(), ['good', 'again']);
    expect(card.stage).toBe('learning');
    expect(card.learningStep).toBe(0);
    expect(card.due - card.lastReviewed!).toBe(1 * MINUTE);
  });

  it('again in learning is not a lapse and does not touch ease', () => {
    const { card } = run(fresh(), ['good', 'again', 'again']);
    expect(card.lapses).toBe(0);
    expect(card.ease).toBe(2.5);
  });

  it('hard repeats the current step rather than advancing', () => {
    const { card } = run(fresh(), ['good', 'hard']);
    expect(card.learningStep).toBe(1);
    expect(card.due - card.lastReviewed!).toBe(10 * MINUTE);
  });

  it('easy from new jumps straight to the 4 day easy interval', () => {
    const { card } = schedule(fresh(), 'easy', T0, { noFuzz: true });
    expect(card.stage).toBe('review');
    expect(card.interval).toBe(EASY_INTERVAL);
    expect(card.ease).toBe(2.65);
  });
});

describe('review grading', () => {
  function graduated(): CardState {
    return run(fresh(), ['good', 'good']).card;
  }

  it('good multiplies the interval by ease', () => {
    const g = graduated(); // interval 1, ease 2.5
    const { card } = schedule(g, 'good', g.due, { noFuzz: true });
    expect(card.interval).toBe(2.5);
    expect(card.ease).toBe(2.5);
  });

  it('hard multiplies by 1.2 and drops ease by 0.15', () => {
    const g = { ...graduated(), interval: 10 };
    const { card } = schedule(g, 'hard', g.due, { noFuzz: true });
    expect(card.interval).toBeCloseTo(12, 6);
    expect(card.ease).toBe(2.35);
  });

  it('easy multiplies by ease and 1.3 and raises ease by 0.15', () => {
    const g = { ...graduated(), interval: 10 };
    const { card } = schedule(g, 'easy', g.due, { noFuzz: true });
    expect(card.ease).toBe(2.65);
    expect(card.interval).toBeCloseTo(10 * 2.65 * 1.3, 6);
  });

  it('again lapses to relearning at 10 minutes with ease minus 0.20', () => {
    const g = { ...graduated(), interval: 30 };
    const { card } = schedule(g, 'again', g.due, { noFuzz: true });
    expect(card.stage).toBe('relearning');
    expect(card.lapses).toBe(1);
    expect(card.ease).toBe(2.3);
    expect(card.interval).toBe(0);
    expect(card.due - g.due).toBe(10 * MINUTE);
  });

  it('good out of relearning graduates back to 1 day', () => {
    const g = { ...graduated(), interval: 30 };
    const lapsed = schedule(g, 'again', g.due, { noFuzz: true }).card;
    const { card } = schedule(lapsed, 'good', lapsed.due, { noFuzz: true });
    expect(card.stage).toBe('review');
    expect(card.interval).toBe(1);
  });

  it('clamps the interval at 365 days', () => {
    const g = { ...graduated(), interval: 300, ease: 3.0 };
    const { card } = schedule(g, 'easy', g.due, { noFuzz: true });
    expect(card.interval).toBe(MAX_INTERVAL);
  });
});

describe('ease clamping', () => {
  /**
   * Acceptance criterion: "a card graded `again` four times has ease at the
   * 1.3 floor". With the §3 rule (again → ease −0.20) starting from 2.5 that
   * is arithmetically 1.7 after four lapses, so the literal number cannot
   * hold. What is asserted instead is the property the criterion is protecting:
   * repeated `again` walks the ease down and stops dead at 1.30, never below.
   */
  it('walks ease down to the 1.3 floor and stops there', () => {
    let card = run(fresh(), ['good', 'good']).card;
    const seen: number[] = [];
    for (let i = 0; i < 12; i++) {
      card = schedule(card, 'again', card.due, { noFuzz: true }).card;
      seen.push(card.ease);
      card = schedule(card, 'good', card.due, { noFuzz: true }).card; // back to review
    }
    expect(seen.slice(0, 4)).toEqual([2.3, 2.1, 1.9, 1.7]);
    expect(seen[5]).toBe(MIN_EASE);
    expect(Math.min(...seen)).toBe(MIN_EASE);
    expect(seen.every((e) => e >= MIN_EASE)).toBe(true);
  });

  it('never lets ease exceed 3.0', () => {
    let card = run(fresh(), ['good', 'good']).card;
    for (let i = 0; i < 20; i++) {
      card = schedule(card, 'easy', card.due, { noFuzz: true }).card;
    }
    expect(card.ease).toBe(MAX_EASE);
  });
});

describe('fuzz', () => {
  it('leaves short intervals alone', () => {
    expect(applyFuzz(1, () => 0)).toBe(1);
    expect(applyFuzz(2, () => 1)).toBe(2);
  });

  // Acceptance: fuzz never produces an interval below the unfuzzed one minus 5%
  it('never drops below the unfuzzed interval minus 5%', () => {
    let seed = 12345;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };
    for (let base = 3; base <= 365; base++) {
      for (let i = 0; i < 40; i++) {
        const out = applyFuzz(base, rand);
        expect(out).toBeGreaterThanOrEqual(base * 0.95);
        expect(out).toBeLessThanOrEqual(Math.min(MAX_INTERVAL, base * 1.05 + 1));
      }
    }
  });

  it('actually spreads cards apart', () => {
    const lo = applyFuzz(100, () => 0);
    const hi = applyFuzz(100, () => 1);
    expect(lo).toBeLessThan(hi);
    expect(hi - lo).toBeGreaterThanOrEqual(9);
  });
});

describe('leeches', () => {
  it('auto-suspends at 8 lapses and reports the transition once', () => {
    let card = run(fresh(), ['good', 'good']).card;
    let leechEvents = 0;
    for (let i = 0; i < 10; i++) {
      const again = schedule(card, 'again', card.due, { noFuzz: true });
      if (again.becameLeech) leechEvents++;
      card = again.card;
      if (card.suspended) break;
      card = schedule(card, 'good', card.due, { noFuzz: true }).card;
    }
    expect(card.lapses).toBe(LEECH_THRESHOLD);
    expect(card.suspended).toBe(true);
    expect(leechEvents).toBe(1);
  });
});

describe('purity', () => {
  it('does not mutate the input card', () => {
    const before = run(fresh(), ['good', 'good']).card;
    const snapshot = JSON.stringify(before);
    schedule(before, 'again', before.due);
    expect(JSON.stringify(before)).toBe(snapshot);
  });
});

describe('button labels', () => {
  it('previews the four grades for a new card', () => {
    const c = fresh();
    expect(previewInterval(c, 'again', T0)).toBe('1m');
    expect(previewInterval(c, 'hard', T0)).toBe('1m');
    expect(previewInterval(c, 'good', T0)).toBe('10m');
    expect(previewInterval(c, 'easy', T0)).toBe('4d');
  });

  it('formats delays in sensible units', () => {
    expect(formatDelay(30_000)).toBe('<1m');
    expect(formatDelay(10 * MINUTE)).toBe('10m');
    expect(formatDelay(4 * 60 * MINUTE)).toBe('4h');
    expect(formatDelay(5 * DAY)).toBe('5d');
    expect(formatDelay(60 * DAY)).toBe('2mo');
    expect(formatDelay(365 * DAY)).toBe('1.0y');
  });
});
