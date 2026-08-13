import { ART, PANEL_H, PANEL_W, type ArtProps } from '../art';
import type { ArtSpec } from '../types';

/**
 * One mnemonic panel.
 *
 * Fallback first: a phrase with no drawn art gets a typographic card — the
 * mnemonic in a large amber pill, the scene description in small italics
 * underneath. It has to look deliberate, because for most of the deck it is
 * what the learner sees.
 *
 * The fallback is per panel, not per phrase, so a two-panel card can have one
 * drawn side and one typographic side while the art lands incrementally.
 */
export function Panel({
  spec,
  mnemonic,
  scene,
  compact = false,
}: {
  spec?: ArtSpec;
  mnemonic: string;
  scene: string;
  compact?: boolean;
}) {
  const Art = spec && ART[spec.component];

  // Drawn and undrawn panels share a frame on purpose. A card with one of each
  // has to read as one card, not as a finished half next to a broken half.
  const frame =
    'flex min-w-[8rem] flex-1 basis-40 flex-col items-center justify-between gap-2 rounded-2xl border bg-amber/[0.07] px-3 py-3';
  const pill = `rounded-full bg-amber/25 px-4 py-1.5 text-center font-bold tracking-tight text-ink dark:text-paper ${
    compact ? 'text-base' : 'text-xl sm:text-2xl'
  }`;

  if (Art) {
    return (
      <figure className={`${frame} border-amber/35`}>
        <svg
          viewBox={`0 0 ${PANEL_W} ${PANEL_H}`}
          className="w-full max-w-[270px] text-ink dark:text-paper"
          role="img"
          aria-label={scene}
        >
          <title>{scene}</title>
          <Art {...((spec.props ?? {}) as ArtProps)} />
        </svg>
        <figcaption className={pill}>{mnemonic}</figcaption>
      </figure>
    );
  }

  return (
    <figure className={`${frame} justify-center border-dashed border-amber/45 py-5`} aria-label={scene}>
      <span className={pill}>{mnemonic}</span>
      <figcaption
        className={`text-center italic opacity-70 ${compact ? 'text-[11px]' : 'text-sm'} leading-snug`}
      >
        {scene}
      </figcaption>
    </figure>
  );
}

export function PanelStrip({
  art,
  mnemonic,
  scene,
  compact = false,
}: {
  art?: ArtSpec[];
  mnemonic: string[];
  scene: string[];
  compact?: boolean;
}) {
  return (
    <div className={`flex w-full flex-wrap items-stretch justify-center ${compact ? 'gap-2' : 'gap-3'}`}>
      {mnemonic.map((m, i) => (
        <Panel key={i} spec={art?.[i]} mnemonic={m} scene={scene[i] ?? ''} compact={compact} />
      ))}
    </div>
  );
}
