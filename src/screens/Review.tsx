import { useCallback, useEffect, useMemo, useState } from 'react';
import { PHRASE_BY_ID, useStore } from '../store';
import { GRADES, type CardState, type Grade } from '../types';
import { previewInterval } from '../srs/scheduler';
import { randomPractice } from '../srs/queue';
import { CardBack, CardFront } from '../components/CardFace';
import { speakThai } from '../audio/tts';

const GRADE_LABEL: Record<Grade, string> = {
  again: 'Again',
  hard: 'Hard',
  good: 'Good',
  easy: 'Easy',
};

const GRADE_TONE: Record<Grade, string> = {
  again: 'var(--tone-high-text)',
  hard: 'var(--tone-mid-text)',
  good: 'var(--tone-rising-text)',
  easy: 'var(--tone-low-text)',
};

const DIRECTION_LABEL = {
  recognition: 'Thai → English',
  production: 'English → Thai',
  listening: 'Listening',
} as const;

export function Review() {
  const { queue, cards, grade, settings, canSpeak, leechAlert, dismissLeech } = useStore();
  const [revealed, setRevealed] = useState(false);
  const [practice, setPractice] = useState<CardState | null>(null);

  const card = practice ?? queue.next;
  const phrase = card ? PHRASE_BY_ID.get(card.phraseId) : undefined;
  const now = Date.now();

  // A new card must not carry the reveal state of the one before it.
  useEffect(() => setRevealed(false), [card?.key]);

  // Autoplay on reveal — and on the front of a listening card, which is the
  // whole point of that direction.
  useEffect(() => {
    if (!phrase || !canSpeak || !settings.autoplay) return;
    if (card?.direction === 'listening' || revealed) {
      speakThai(phrase.thai, { voiceURI: settings.voiceURI, rate: settings.rate });
    }
  }, [phrase, revealed, card?.key, card?.direction, canSpeak, settings.autoplay, settings.voiceURI, settings.rate]);

  const answer = useCallback(
    async (g: Grade) => {
      if (!card || !revealed) return;
      if (practice) {
        // Free practice never touches scheduling state.
        setPractice(randomPractice(cards, card.key));
        setRevealed(false);
        return;
      }
      await grade(card, g);
      setRevealed(false);
    },
    [card, revealed, practice, cards, grade],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA')) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!revealed) setRevealed(true);
        return;
      }
      if (e.key === 'p' || e.key === 'P') {
        if (phrase && canSpeak) {
          speakThai(phrase.thai, { voiceURI: settings.voiceURI, rate: settings.rate });
        }
        return;
      }
      const idx = ['1', '2', '3', '4'].indexOf(e.key);
      if (idx >= 0 && revealed) {
        e.preventDefault();
        void answer(GRADES[idx]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [revealed, answer, phrase, canSpeak, settings.voiceURI, settings.rate]);

  const counts = queue.counts;

  const previews = useMemo(() => {
    if (!card) return null;
    return Object.fromEntries(GRADES.map((g) => [g, previewInterval(card, g, now)])) as Record<
      Grade,
      string
    >;
    // `now` intentionally excluded: the labels only need to be right to the minute.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card?.key, card?.stage, card?.interval, card?.ease, card?.learningStep]);

  if (!card || !phrase) {
    return (
      <EmptyQueue
        onPractice={() => {
          const first = randomPractice(cards, null);
          setPractice(first);
          setRevealed(false);
        }}
        hasCards={cards.some((c) => !c.suspended)}
      />
    );
  }

  return (
    <div className="flex h-full flex-col gap-3">
      {leechAlert && (
        <div className="flex items-start gap-3 rounded-xl border border-tone-high/45 bg-tone-high/10 px-3 py-2 text-sm">
          <span className="flex-1">
            <strong>Leech suspended.</strong> {leechAlert} has lapsed 8 times. It is out of the queue
            — fix or replace the mnemonic, then unsuspend it in Browse.
          </span>
          <button type="button" onClick={dismissLeech} className="font-semibold opacity-70">
            OK
          </button>
        </div>
      )}

      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-3 tabular-nums">
          <Count label="new" value={counts.newLeft} color="var(--tone-low-text)" />
          <Count label="learning" value={counts.learningLeft} color="var(--tone-high-text)" />
          <Count label="due" value={counts.dueLeft} color="var(--tone-rising-text)" />
        </div>
        <span className="rounded-full border border-ink/15 px-2.5 py-1 text-[11px] uppercase tracking-wide opacity-70 dark:border-paper/15">
          {practice ? 'Free practice' : DIRECTION_LABEL[card.direction]}
        </span>
      </div>

      {revealed ? (
        <CardBack phrase={phrase} />
      ) : (
        <CardFront phrase={phrase} direction={card.direction} onReveal={() => setRevealed(true)} />
      )}

      {revealed ? (
        <div className="grid grid-cols-4 gap-2">
          {GRADES.map((g, i) => (
            <button
              key={g}
              type="button"
              onClick={() => void answer(g)}
              className="flex flex-col items-center gap-0.5 rounded-xl border-2 py-2.5 font-semibold transition active:scale-95"
              style={{ borderColor: GRADE_TONE[g], color: GRADE_TONE[g] }}
            >
              <span className="text-sm">{GRADE_LABEL[g]}</span>
              <span className="text-[11px] tabular-nums opacity-80">
                {practice ? '—' : previews?.[g]}
              </span>
              <span className="text-[10px] opacity-65">{i + 1}</span>
            </button>
          ))}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="rounded-xl border-2 border-amber/60 py-3 font-semibold text-amber transition active:scale-95"
        >
          Show answer <span className="opacity-65">(space)</span>
        </button>
      )}

      {practice && (
        <button
          type="button"
          onClick={() => setPractice(null)}
          className="text-center text-xs underline opacity-65"
        >
          Leave free practice
        </button>
      )}
    </div>
  );
}

function Count({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <span className="flex items-baseline gap-1">
      <strong style={{ color }}>{value}</strong>
      <span className="text-xs opacity-65">{label}</span>
    </span>
  );
}

function EmptyQueue({ onPractice, hasCards }: { onPractice: () => void; hasCards: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
      <p className="text-2xl font-semibold">Nothing due.</p>
      <p className="max-w-sm text-sm opacity-70">
        {hasCards
          ? 'You have cleared today’s queue. Come back tomorrow, or run free practice — it draws random cards and does not touch your schedule.'
          : 'Every card is suspended. Unsuspend some in Browse to start reviewing again.'}
      </p>
      {hasCards && (
        <button
          type="button"
          onClick={onPractice}
          className="rounded-xl border-2 border-amber/60 px-5 py-2.5 font-semibold text-amber"
        >
          Free practice
        </button>
      )}
    </div>
  );
}
