import type { Direction, Phrase } from '../types';
import { SyllableRow } from './ToneContour';
import { PanelStrip } from './Panel';
import { AudioButton } from './AudioButton';
import { useStore } from '../store';

/**
 * The Thai/romanisation block is a separate, hideable region — never baked into
 * the panel art. That is what lets the production front show a big English
 * meaning with no Thai leaking, and the listening front show nothing at all.
 */
export function ScriptBlock({
  phrase,
  size = 'md',
  showAudio = true,
}: {
  phrase: Phrase;
  size?: 'sm' | 'md' | 'lg';
  showAudio?: boolean;
}) {
  const { settings } = useStore();
  const thaiSize = { sm: 'text-2xl', md: 'text-4xl', lg: 'text-5xl sm:text-6xl' }[size];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        <span className={`thai ${thaiSize} font-medium`}>{phrase.thai}</span>
        {showAudio && <AudioButton thai={phrase.thai} size={size === 'lg' ? 'md' : 'sm'} />}
      </div>
      <SyllableRow
        syllables={phrase.syllables}
        showContours={settings.showContours}
        size={size === 'sm' ? 'sm' : 'md'}
      />
    </div>
  );
}

/**
 * What each piece means on its own.
 *
 * Word-level, not syllable-level: glossing สวัสดี as sà + wàt + dii would
 * invent three meanings that do not exist. Where a part carries no independent
 * meaning the gloss says so, which is itself worth knowing — it stops you
 * hunting for a meaning that was never there.
 */
export function WordBreakdown({ phrase, compact = false }: { phrase: Phrase; compact?: boolean }) {
  const single = phrase.words.length === 1;
  return (
    <div className="flex w-full max-w-prose flex-col gap-1 text-left">
      <span className="text-[11px] font-semibold uppercase tracking-widest opacity-65">
        {single ? 'Word' : 'Part by part'}
      </span>
      <ul className="flex flex-col divide-y divide-ink/10 dark:divide-paper/10">
        {phrase.words.map((w, i) => (
          <li key={i} className="flex items-baseline gap-2 py-1.5">
            <span className={`thai shrink-0 font-medium ${compact ? 'text-base' : 'text-lg'}`}>
              {w.thai}
            </span>
            <span
              className={`shrink-0 font-semibold opacity-80 ${compact ? 'text-xs' : 'text-sm'}`}
            >
              {w.roman}
            </span>
            <span className={`flex-1 leading-snug opacity-75 ${compact ? 'text-xs' : 'text-sm'}`}>
              {w.gloss}
            </span>
          </li>
        ))}
      </ul>
      {phrase.literal && (
        <p className={`pt-1 italic opacity-65 ${compact ? 'text-xs' : 'text-sm'}`}>
          Put together, literally: “{phrase.literal}”
        </p>
      )}
    </div>
  );
}

/**
 * The sentence that ties the keywords back to the meaning.
 *
 * Sits directly under the panels and is styled as the loudest thing on the
 * lower half of the card, because it is the half of a keyword mnemonic that
 * actually does the recall work. Panels alone teach "pai sounds like pie" and
 * leave you holding a pie.
 */
export function MeaningLink({ phrase, compact = false }: { phrase: Phrase; compact?: boolean }) {
  return (
    <p
      className={`w-full max-w-prose rounded-2xl border border-amber/45 bg-amber/[0.12] px-4 py-3 text-center font-medium leading-relaxed ${
        compact ? 'text-xs' : 'text-[15px]'
      }`}
    >
      {phrase.link}
    </p>
  );
}

export function WeakBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-tone-high/50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${className}`}
      style={{ color: 'var(--tone-high-text)' }}
      title="This mnemonic is a rough approximation. Read the note before trusting it."
    >
      weak
    </span>
  );
}

export function CardFront({
  phrase,
  direction,
  onReveal,
}: {
  phrase: Phrase;
  direction: Direction;
  onReveal: () => void;
}) {
  // Deliberately a div, not a button. The card contains the audio button, and a
  // button inside a button is invalid HTML that browsers silently unnest. The
  // real, focusable control is the "Show answer" button underneath; this is a
  // convenience tap target, so it stays out of the tab order.
  return (
    <div
      onClick={onReveal}
      className="flex w-full flex-1 cursor-pointer flex-col items-center justify-center gap-6 rounded-3xl border border-ink/10 bg-black/[0.02] p-6 text-center dark:border-paper/10 dark:bg-white/[0.03]"
    >
      {direction === 'recognition' && <ScriptBlock phrase={phrase} size="lg" />}

      {direction === 'production' && (
        <span className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {phrase.meaning}
        </span>
      )}

      {direction === 'listening' && (
        <div className="flex flex-col items-center gap-4">
          <AudioButton thai={phrase.thai} size="lg" label="Replay" />
          <span className="text-sm opacity-65">Listen. No text until you answer.</span>
        </div>
      )}

      <span className="text-xs uppercase tracking-widest opacity-65">Tap or press space</span>
    </div>
  );
}

export function CardBack({ phrase }: { phrase: Phrase }) {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-5 overflow-y-auto rounded-3xl border border-ink/10 bg-black/[0.02] p-5 text-center dark:border-paper/10 dark:bg-white/[0.03]">
      <span className="text-3xl font-bold leading-tight tracking-tight">{phrase.meaning}</span>

      <ScriptBlock phrase={phrase} size="md" />

      {/* Sits directly under the script, before the mnemonic art. The mnemonic
          teaches the sound; this teaches what the sound is made of. */}
      <WordBreakdown phrase={phrase} />

      <PanelStrip art={phrase.art} mnemonic={phrase.mnemonic} scene={phrase.scene} />

      <MeaningLink phrase={phrase} />

      {(phrase.notes || phrase.gendered || phrase.weak) && (
        <div className="flex w-full max-w-prose flex-col items-center gap-2">
          {phrase.gendered && (
            <p className="text-sm opacity-70">
              Add <span className="thai font-medium">ครับ</span> khráp (men) or{' '}
              <span className="thai font-medium">ค่ะ</span> khâ (women) on the end.
            </p>
          )}
          {phrase.weak && <WeakBadge />}
          {phrase.notes && <p className="text-sm leading-relaxed opacity-75">{phrase.notes}</p>}
        </div>
      )}
    </div>
  );
}
