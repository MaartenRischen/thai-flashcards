import { useMemo, useState } from 'react';
import { PHRASES_BY_RANK, useStore } from '../store';
import { CATEGORIES, CATEGORY_LABELS, type Category, type Phrase } from '../types';
import { DAY, cardKey, formatDelay, isLeech } from '../srs/scheduler';
import { enabledDirections } from '../srs/queue';
import { SyllableRow } from '../components/ToneContour';
import { AudioButton } from '../components/AudioButton';
import { PanelStrip } from '../components/Panel';
import { MeaningLink, WeakBadge, WordBreakdown } from '../components/CardFace';

/**
 * Doubles as a phrasebook you scroll while queuing for food, so nothing here
 * waits on a card being due and nothing here is behind a click.
 */
export function Browse() {
  const { cardsByKey, settings, suspend, resetCard } = useStore();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [onlyWeak, setOnlyWeak] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const dirs = enabledDirections(settings);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PHRASES_BY_RANK.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (onlyWeak && !p.weak) return false;
      if (settings.hideWeak && p.weak) return false;
      if (!q) return true;
      const hay = [
        p.thai,
        p.meaning,
        p.literal ?? '',
        // Both forms: a mnemonic written "Viet-NAM" or "poor 'at" should still
        // be found by someone typing "vietnam" or "poor at".
        p.mnemonic.join(' '),
        p.mnemonic.join(' ').replace(/[^a-z0-9฀-๿ ]+/gi, ''),
        p.syllables.map((s) => s.roman).join(' '),
        p.syllables.map((s) => stripDiacritics(s.roman)).join(' '),
        // Searching an individual word ("nòi", "ไหม", "question particle")
        // should find every phrase that uses it. That is how you learn a
        // building block: by seeing it turn up in six different sentences.
        p.words.map((w) => `${w.thai} ${w.roman} ${stripDiacritics(w.roman)} ${w.gloss}`).join(' '),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, category, onlyWeak, settings.hideWeak]);

  const weakCount = PHRASES_BY_RANK.filter((p) => p.weak).length;

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex flex-col gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Thai, roman, English or mnemonic"
          className="w-full rounded-xl border border-ink/15 bg-transparent px-3 py-2 text-sm outline-none dark:border-paper/15"
        />
        <div className="flex gap-2 overflow-x-auto pb-1">
          <Chip active={category === 'all'} onClick={() => setCategory('all')}>
            All {PHRASES_BY_RANK.length}
          </Chip>
          <Chip active={onlyWeak} onClick={() => setOnlyWeak((v) => !v)} accent>
            Weak {weakCount}
          </Chip>
          {CATEGORIES.map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
              {CATEGORY_LABELS[c]}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {rows.length === 0 && <p className="py-8 text-center text-sm opacity-65">No matches.</p>}
        <ul className="flex flex-col gap-2">
          {rows.map((p) => {
            const states = dirs.map((d) => cardsByKey.get(cardKey(p.id, d))).filter(Boolean);
            const leech = states.some((s) => s && isLeech(s));
            const suspended = states.length > 0 && states.every((s) => s!.suspended);
            const expanded = open === p.id;
            return (
              <li
                key={p.id}
                className="rounded-2xl border border-ink/10 px-3 py-2.5 dark:border-paper/10"
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : p.id)}
                    className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left"
                    aria-expanded={expanded}
                  >
                    <span className="flex flex-wrap items-baseline gap-2">
                      <span className="thai text-xl font-medium">{p.thai}</span>
                      <span className="text-sm opacity-80">{p.meaning}</span>
                      {p.weak && <WeakBadge />}
                      {leech && (
                        <span
                          className="rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase"
                          style={{ color: 'var(--tone-mid-text)', borderColor: 'var(--tone-mid-text)' }}
                        >
                          leech
                        </span>
                      )}
                    </span>
                    <SyllableRow
                      syllables={p.syllables}
                      showContours={settings.showContours}
                      size="sm"
                    />
                    <span className="text-[11px] uppercase tracking-wide opacity-65">
                      {CATEGORY_LABELS[p.category]} · #{p.rank} · {statusLine(p, cardsByKey, dirs)}
                    </span>
                  </button>
                  <AudioButton thai={p.thai} size="sm" />
                </div>

                {expanded && (
                  <div className="mt-3 flex flex-col gap-3 border-t border-ink/10 pt-3 dark:border-paper/10">
                    <WordBreakdown phrase={p} compact />
                    <PanelStrip art={p.art} mnemonic={p.mnemonic} scene={p.scene} compact />
                    <MeaningLink phrase={p} compact />
                    {p.notes && <p className="text-xs leading-relaxed opacity-75">{p.notes}</p>}
                    <div className="flex flex-wrap gap-2">
                      <RowAction
                        onClick={() => dirs.forEach((d) => void suspend(cardKey(p.id, d), !suspended))}
                      >
                        {suspended ? 'Unsuspend' : 'Suspend'}
                      </RowAction>
                      <RowAction onClick={() => dirs.forEach((d) => void resetCard(cardKey(p.id, d)))}>
                        Reset progress
                      </RowAction>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function statusLine(
  p: Phrase,
  cardsByKey: Map<string, { due: number; stage: string; suspended: boolean }>,
  dirs: string[],
): string {
  const now = Date.now();
  const parts = dirs.map((d) => {
    const c = cardsByKey.get(`${p.id}:${d}`);
    if (!c) return 'new';
    if (c.suspended) return 'suspended';
    if (c.stage === 'new') return 'new';
    if (c.due <= now) return 'due';
    return `in ${formatDelay(Math.max(DAY / 24, c.due - now))}`;
  });
  return [...new Set(parts)].join(' · ');
}

function stripDiacritics(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function Chip({
  active,
  accent,
  onClick,
  children,
}: {
  active: boolean;
  accent?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition ${
        active
          ? 'border-transparent bg-amber/25'
          : 'border-ink/15 opacity-70 dark:border-paper/15'
      }`}
      style={accent && active ? { color: 'var(--tone-high-text)' } : undefined}
    >
      {children}
    </button>
  );
}

function RowAction({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-ink/20 px-3 py-1.5 text-xs font-medium dark:border-paper/20"
    >
      {children}
    </button>
  );
}
