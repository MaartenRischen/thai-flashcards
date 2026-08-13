import type { Tone } from '../types';

/**
 * Per-syllable pitch contour. This is the PRIMARY tone encoding; colour is
 * redundant backup, because at thumbnail size in Browse the five hues start to
 * blur and the shapes do not.
 */

export const TONE_PATHS: Record<Tone, string> = {
  mid: 'M0 12 L54 14',
  low: 'M0 17 L27 21 L54 24',
  falling: 'M0 3 L14 2 L54 24',
  high: 'M0 16 L28 8 L54 2',
  rising: 'M0 11 C12 25 24 23 54 2',
};

export const TONE_ORDER: Tone[] = ['mid', 'low', 'falling', 'high', 'rising'];

/** Stroke colour — the brief's exact values. Graphics, so the 3:1 bar applies. */
export function toneColor(tone: Tone): string {
  return `var(--tone-${tone})`;
}

/** Text colour — same hue, dark enough for body copy on paper. See index.css. */
export function toneTextColor(tone: Tone): string {
  return `var(--tone-${tone}-text)`;
}

export function ToneContour({
  tone,
  width = 54,
  label = true,
  className = '',
}: {
  tone: Tone;
  width?: number;
  label?: boolean;
  className?: string;
}) {
  const height = (26 / 54) * width;
  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <svg
        viewBox="0 0 54 26"
        width={width}
        height={height}
        role="img"
        aria-label={`${tone} tone`}
        className="overflow-visible"
      >
        <line
          x1="0"
          y1="13"
          x2="54"
          y2="13"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.35"
        />
        <path
          d={TONE_PATHS[tone]}
          fill="none"
          stroke={toneColor(tone)}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* The tone name inherits body colour rather than the tone hue: at 12px
          three of the five hues cannot reach 4.5:1 on paper, and the shape
          above it is already carrying the identity. */}
      {label && <span className="mt-0.5 text-[12px] font-medium leading-none opacity-70">{tone}</span>}
    </span>
  );
}

/** A row of contours, one per syllable, each sitting under its romanisation. */
export function SyllableRow({
  syllables,
  showContours,
  size = 'md',
}: {
  syllables: { roman: string; tone: Tone }[];
  showContours: boolean;
  size?: 'sm' | 'md';
}) {
  const width = size === 'sm' ? 38 : 54;
  return (
    <div className={`flex flex-wrap items-start justify-center ${size === 'sm' ? 'gap-2' : 'gap-4'}`}>
      {syllables.map((s, i) => (
        <span key={i} className="inline-flex flex-col items-center">
          <span
            className={`${size === 'sm' ? 'text-base' : 'text-2xl'} font-semibold tracking-tight`}
            style={{ color: toneTextColor(s.tone) }}
          >
            {s.roman}
          </span>
          {showContours && <ToneContour tone={s.tone} width={width} label={size !== 'sm'} />}
        </span>
      ))}
    </div>
  );
}
