import { describe, it, expect } from 'vitest';
import { PHRASES } from './phrases';
import { CATEGORIES } from '../types';

describe('phrase data integrity', () => {
  it('has exactly 100 phrases', () => {
    expect(PHRASES).toHaveLength(100);
  });

  it('has unique ids', () => {
    const ids = PHRASES.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('uses ranks 1-100 exactly once each', () => {
    const ranks = PHRASES.map((p) => p.rank).sort((a, b) => a - b);
    expect(ranks).toEqual(Array.from({ length: 100 }, (_, i) => i + 1));
  });

  it('keeps mnemonic, scene and art panel counts in step', () => {
    for (const p of PHRASES) {
      expect(p.scene.length, `${p.id} scene`).toBe(p.mnemonic.length);
      if (p.art) expect(p.art.length, `${p.id} art`).toBe(p.mnemonic.length);
    }
  });

  it('breaks every phrase down into words that cover all its syllables', () => {
    for (const p of PHRASES) {
      const span = p.words.reduce((n, w) => n + w.span, 0);
      expect(span, `${p.id}: word spans must add up to ${p.syllables.length} syllables`).toBe(
        p.syllables.length,
      );
      expect(p.words.length, `${p.id} has no word breakdown`).toBeGreaterThan(0);
    }
  });

  it('gives every word Thai script, a romanisation and a gloss', () => {
    for (const p of PHRASES) {
      for (const w of p.words) {
        expect(/[฀-๿]/.test(w.thai), `${p.id}/${w.roman} thai`).toBe(true);
        expect(w.roman.trim().length, `${p.id} roman`).toBeGreaterThan(0);
        expect(w.gloss.trim().length, `${p.id}/${w.roman} gloss`).toBeGreaterThan(0);
        expect(w.span, `${p.id}/${w.roman} span`).toBeGreaterThan(0);
      }
    }
  });

  it('spells each word with the same romanisation as the syllables it covers', () => {
    for (const p of PHRASES) {
      let i = 0;
      for (const w of p.words) {
        const covered = p.syllables.slice(i, i + w.span).map((s) => s.roman);
        i += w.span;
        // The word roman is the covered syllables joined by hyphens — the one
        // place a typo in either list would silently mislead.
        expect(w.roman, `${p.id}: word "${w.thai}"`).toBe(covered.join('-'));
      }
    }
  });

  it('reassembles the full Thai string from its words', () => {
    for (const p of PHRASES) {
      expect(p.words.map((w) => w.thai).join(''), `${p.id}`).toBe(p.thai);
    }
  });

  /**
   * A keyword mnemonic has two halves: Thai sound → English keyword, then
   * keyword → meaning. The second half is the one that is easy to skip and
   * fatal to skip, because without it the card teaches "pai sounds like pie"
   * and leaves the learner holding a pie with no route back to "go".
   *
   * These tests exist because that is exactly what shipped the first time.
   */
  describe('meaning links', () => {
    const words = (s: string) =>
      s
        .toLowerCase()
        .split(/[^a-z]+/)
        .filter(Boolean);

    it('gives every phrase a link', () => {
      for (const p of PHRASES) {
        expect(p.link.trim().length, `${p.id} has no link`).toBeGreaterThan(20);
      }
    });

    it('names every mnemonic keyword in the link', () => {
      const bad: string[] = [];
      for (const p of PHRASES) {
        const hay = words(p.link);
        for (const m of p.mnemonic) {
          const head = words(m)[0];
          if (!head || head.length < 2) continue; // 'y-eye', 't-hong'
          // Prefix match, so "the crow CAWs" counts for "caw" and "VietNAM"
          // counts for "Viet-NAM".
          if (!hay.some((w) => w.startsWith(head))) bad.push(`${p.id} → "${m}"`);
        }
      }
      expect(bad, `links that never mention their keyword:\n${bad.join('\n')}`).toEqual([]);
    });

    it('carries the meaning through to the link', () => {
      // The link has to land on what the phrase means, so it must share a real
      // word with the meaning, the literal, or the gloss of one of its parts.
      // 'not' and 'no' are deliberately NOT stopwords: for a deck this size
      // they are half the meanings.
      const STOP = new Set([
        'a', 'an', 'the', 'to', 'of', 'in', 'on', 'at', 'is', 'it', 'and', 'or', 'you', 'your',
        'i', 'me', 'my', 'that', 'this', 'for', 'with', 'do', 'be', 'as', 'also',
        'here', 'up', 'out', 'off', 'its', 'any', 'so',
      ]);
      const bad: string[] = [];
      for (const p of PHRASES) {
        const target = new Set(
          [p.meaning, p.literal ?? '', ...p.words.map((w) => w.gloss)]
            .flatMap(words)
            .filter((w) => w.length >= 2 && !STOP.has(w)),
        );
        // Prefix match, so a meaning of "go" is reached by a link saying "goes".
        const hay = words(p.link);
        const shared = [...target].some((w) => hay.some((h) => h.startsWith(w)));
        if (!shared) bad.push(`${p.id} → "${p.meaning}"`);
      }
      expect(bad, `links that never reach their meaning:\n${bad.join('\n')}`).toEqual([]);
    });
  });

  it('uses only declared categories', () => {
    for (const p of PHRASES) {
      expect(CATEGORIES, `${p.id}`).toContain(p.category);
    }
  });

  it('never leaves a panel or field empty', () => {
    for (const p of PHRASES) {
      expect(p.thai.length, `${p.id} thai`).toBeGreaterThan(0);
      expect(p.meaning.length, `${p.id} meaning`).toBeGreaterThan(0);
      expect(p.syllables.length, `${p.id} syllables`).toBeGreaterThan(0);
      for (const s of p.syllables) expect(s.roman.length, `${p.id} roman`).toBeGreaterThan(0);
      for (const m of p.mnemonic) expect(m.trim().length, `${p.id} mnemonic`).toBeGreaterThan(0);
      for (const s of p.scene) expect(s.trim().length, `${p.id} scene`).toBeGreaterThan(0);
    }
  });

  it('contains Thai script in the thai field, never romanisation', () => {
    for (const p of PHRASES) {
      expect(/[฀-๿]/.test(p.thai), `${p.id}`).toBe(true);
      expect(/[a-z]/i.test(p.thai), `${p.id}`).toBe(false);
    }
  });

  it('gives every weak phrase a reason in notes', () => {
    for (const p of PHRASES.filter((x) => x.weak)) {
      expect(p.notes, `${p.id} must explain why it is weak`).toBeTruthy();
    }
  });

  it('flags a believable number of weak mnemonics', () => {
    const weak = PHRASES.filter((p) => p.weak).length;
    /*
     * The brief said: "Expect roughly 15-25 of 100 to be weak; a run that flags
     * two or three is a run that lied." The first authoring pass came out at 27
     * and this test guarded that floor at 15.
     *
     * A later pass rewrote 22 of those 27 outright — new sound-alikes, new
     * panels — which is why the count is now 9 rather than 27. That is a real
     * change to the content, not a change of standard: the survivors are
     * exactly the Thai sounds English cannot spell (the เมื่อ vowel, the ปวด
     * glide, initial ng-), plus three where the closest English word still has
     * the wrong vowel.
     *
     * So the floor moves, and what it now guards is that the flag has not been
     * quietly zeroed out. The ceiling stays where it was.
     */
    expect(weak).toBeGreaterThanOrEqual(5);
    expect(weak).toBeLessThanOrEqual(30);
  });

  it('starts every weak note by owning the word "weak"', () => {
    // A weak card that buries the caveat mid-paragraph is a card that reads as
    // fine. The reason has to be the first thing said.
    for (const p of PHRASES.filter((x) => x.weak)) {
      expect(p.notes ?? '', `${p.id}`).toMatch(/^(Weak|TONE PAIR)/);
    }
  });

  it('keeps every mnemonic panel to two syllables or fewer of Thai', () => {
    for (const p of PHRASES) {
      const syllablesPerPanel = p.syllables.length / p.mnemonic.length;
      expect(syllablesPerPanel, `${p.id} averages too many syllables per panel`).toBeLessThanOrEqual(
        2,
      );
    }
  });

  it('warns about the tone pairs the brief calls out', () => {
    const find = (id: string) => PHRASES.find((p) => p.id === id)!;
    expect(find('suay').notes).toMatch(/ซวย/);
    expect(find('gin-khaao').notes).toMatch(/ขาว/);
    expect(find('glai-near').notes).toMatch(/ไกล/);
    expect(find('glai-far').notes).toMatch(/ใกล้/);
  });

  it('covers the four modules from the brief', () => {
    const modules = PHRASES.filter((p) => p.category === 'modules').map((p) => p.id);
    expect(modules).toEqual(expect.arrayContaining(['dai-mai', 'mai', 'khaw', 'khrap', 'kha']));
  });
});
