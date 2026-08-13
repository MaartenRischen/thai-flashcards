import { useRef, useState } from 'react';
import { useStore } from '../store';
import { PLATFORM_HELP, speakThai } from '../audio/tts';
import { DIRECTIONS, type Direction } from '../types';

const DIRECTION_COPY: Record<Direction, { title: string; body: string }> = {
  recognition: { title: 'Thai → English', body: 'Front: Thai script and audio.' },
  production: {
    title: 'English → Thai',
    body: 'Front: the English meaning. The harder direction, and the one that works at a food stall.',
  },
  listening: {
    title: 'Listening',
    body: 'Front: audio only, no text. The direction that transfers to hearing real Thai — and useless if you can see the script.',
  },
};

export function Settings({ onOpenPrimer }: { onOpenPrimer: () => void }) {
  const { settings, setSettings, voice, canSpeak, exportJson, importJson, resetEverything } =
    useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  const download = async () => {
    const backup = await exportJson();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const d = new Date(backup.exportedAt);
    a.download = `thai-flashcards-${d.toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMsg({ kind: 'ok', text: `Exported ${backup.cards.length} cards.` });
  };

  const upload = async (file: File) => {
    try {
      const count = await importJson(await file.text());
      setMsg({ kind: 'ok', text: `Restored ${count} cards. Due dates and ease are exactly as exported.` });
    } catch (e) {
      setMsg({ kind: 'err', text: e instanceof Error ? e.message : 'Import failed.' });
    }
  };

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto pb-6">
      <Section title="Daily limits">
        <NumberRow
          label="New cards per day"
          value={settings.newPerDay}
          min={0}
          max={100}
          onChange={(newPerDay) => void setSettings({ newPerDay })}
        />
        <NumberRow
          label="Reviews per day"
          value={settings.reviewsPerDay}
          min={0}
          max={500}
          onChange={(reviewsPerDay) => void setSettings({ reviewsPerDay })}
        />
        <p className="text-xs opacity-65">
          New cards come in ascending usefulness rank. Learning steps are never capped — a card part
          way through its steps always comes back.
        </p>
      </Section>

      <Section title="Card directions">
        {DIRECTIONS.map((d) => {
          const blocked = d === 'listening' && !canSpeak;
          return (
            <label
              key={d}
              className={`flex items-start gap-3 py-1.5 ${blocked ? 'opacity-45' : ''}`}
            >
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[var(--color-amber)]"
                checked={settings.directions[d] && !blocked}
                disabled={blocked}
                onChange={(e) =>
                  void setSettings({ directions: { ...settings.directions, [d]: e.target.checked } })
                }
              />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{DIRECTION_COPY[d].title}</span>
                <span className="block text-xs opacity-65">{DIRECTION_COPY[d].body}</span>
                {blocked && (
                  <span className="mt-1 block text-xs" style={{ color: 'var(--tone-high-text)' }}>
                    Off: this device has no Thai voice installed.
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </Section>

      <Section title="Audio">
        {voice.status === 'loading' && <p className="text-sm opacity-65">Looking for a Thai voice…</p>}

        {voice.status === 'unavailable' && (
          <div className="flex flex-col gap-2 rounded-xl border border-tone-high/45 bg-tone-high/10 px-3 py-3">
            <p className="text-sm">
              <strong>No Thai voice on this device.</strong> Every play button is hidden and the
              listening direction is off. Nothing falls back to an English voice — an English voice
              reading Thai script teaches a pronunciation no Thai person uses.
            </p>
            <details className="text-xs">
              <summary className="cursor-pointer font-medium">How to install one</summary>
              <ul className="mt-2 flex flex-col gap-2">
                {PLATFORM_HELP.map((h) => (
                  <li key={h.platform}>
                    <strong>{h.platform}:</strong> {h.text}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        )}

        {canSpeak && (
          <>
            {voice.voices.length > 1 && (
              <label className="flex flex-col gap-1 py-1.5">
                <span className="text-sm font-medium">Voice</span>
                <select
                  value={settings.voiceURI ?? voice.voices[0].voiceURI}
                  onChange={(e) => void setSettings({ voiceURI: e.target.value })}
                  className="rounded-lg border border-ink/15 bg-transparent px-2 py-1.5 text-sm dark:border-paper/15"
                >
                  {voice.voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label className="flex flex-col gap-1 py-1.5">
              <span className="flex justify-between text-sm font-medium">
                <span>Speed</span>
                <span className="tabular-nums opacity-65">{settings.rate.toFixed(2)}×</span>
              </span>
              <input
                type="range"
                min={0.5}
                max={1}
                step={0.05}
                value={settings.rate}
                onChange={(e) => void setSettings({ rate: Number(e.target.value) })}
                className="accent-[var(--color-amber)]"
              />
            </label>

            <Toggle
              label="Autoplay audio on reveal"
              checked={settings.autoplay}
              onChange={(autoplay) => void setSettings({ autoplay })}
            />

            <button
              type="button"
              onClick={() =>
                speakThai('สวัสดีครับ ขอบคุณครับ', {
                  voiceURI: settings.voiceURI,
                  rate: settings.rate,
                })
              }
              className="self-start rounded-lg border border-amber/50 px-3 py-1.5 text-sm font-medium"
            >
              Test the voice
            </button>
          </>
        )}
      </Section>

      <Section title="Display">
        <Toggle
          label="Show tone contours"
          hint="The contour is the primary tone encoding; colour is only backup."
          checked={settings.showContours}
          onChange={(showContours) => void setSettings({ showContours })}
        />
        <Toggle
          label="Hide weak mnemonics"
          hint="Removes flagged cards from Browse. They stay in the review queue."
          checked={settings.hideWeak}
          onChange={(hideWeak) => void setSettings({ hideWeak })}
        />
        <label className="flex items-center justify-between gap-3 py-1.5">
          <span className="text-sm font-medium">Theme</span>
          <select
            value={settings.theme}
            onChange={(e) => void setSettings({ theme: e.target.value as typeof settings.theme })}
            className="rounded-lg border border-ink/15 bg-transparent px-2 py-1.5 text-sm dark:border-paper/15"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <button
          type="button"
          onClick={onOpenPrimer}
          className="self-start rounded-lg border border-amber/50 px-3 py-1.5 text-sm font-medium"
        >
          Open the tone primer
        </button>
      </Section>

      <Section title="Backup">
        <p className="text-xs opacity-65">
          There is no server and no account. This file is the only backup that exists.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void download()}
            className="rounded-lg border border-amber/50 px-3 py-1.5 text-sm font-medium"
          >
            Export JSON
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded-lg border border-ink/20 px-3 py-1.5 text-sm font-medium dark:border-paper/20"
          >
            Import JSON
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void upload(f);
              e.target.value = '';
            }}
          />
        </div>
        <p className="text-xs opacity-65">
          Import replaces everything, it does not merge — a merge would have to guess which side’s
          due date wins, and guessing wrong loses real review history.
        </p>
        {msg && (
          <p
            className="text-sm"
            style={{ color: msg.kind === 'ok' ? 'var(--tone-rising-text)' : 'var(--tone-high-text)' }}
            role="status"
          >
            {msg.text}
          </p>
        )}
      </Section>

      <Section title="Danger">
        <ResetButton
          onConfirm={async () => {
            await resetEverything();
            setMsg({ kind: 'ok', text: 'All review progress erased.' });
          }}
        />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-xs font-semibold uppercase tracking-widest opacity-65">{title}</h2>
      <div className="flex flex-col gap-2 rounded-2xl border border-ink/10 px-3 py-3 dark:border-paper/10">
        {children}
      </div>
    </section>
  );
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 py-1.5">
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 accent-[var(--color-amber)]"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{label}</span>
        {hint && <span className="block text-xs opacity-65">{hint}</span>}
      </span>
    </label>
  );
}

function NumberRow({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-sm font-medium">{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (Number.isFinite(n)) onChange(Math.min(max, Math.max(min, Math.round(n))));
        }}
        className="w-20 rounded-lg border border-ink/15 bg-transparent px-2 py-1.5 text-right text-sm tabular-nums dark:border-paper/15"
      />
    </label>
  );
}

function ResetButton({ onConfirm }: { onConfirm: () => Promise<void> }) {
  const [armed, setArmed] = useState(false);
  if (!armed) {
    return (
      <button
        type="button"
        onClick={() => setArmed(true)}
        className="self-start rounded-lg border border-ink/20 px-3 py-1.5 text-sm font-medium dark:border-paper/20"
      >
        Erase all review progress
      </button>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm">
        This deletes every due date, interval and ease. Export first if you want it back.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setArmed(false);
            void onConfirm();
          }}
          className="rounded-lg border-2 px-3 py-1.5 text-sm font-semibold"
          style={{ borderColor: 'var(--tone-high-text)', color: 'var(--tone-high-text)' }}
        >
          Yes, erase it
        </button>
        <button
          type="button"
          onClick={() => setArmed(false)}
          className="rounded-lg border border-ink/20 px-3 py-1.5 text-sm dark:border-paper/20"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
