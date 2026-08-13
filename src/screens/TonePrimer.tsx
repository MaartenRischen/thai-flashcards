import { ToneContour, TONE_ORDER, toneTextColor } from '../components/ToneContour';
import { AudioButton } from '../components/AudioButton';
import type { Tone } from '../types';

const EXAMPLES: Record<Tone, { thai: string; roman: string; meaning: string }> = {
  mid: { thai: 'ดี', roman: 'dii', meaning: 'good' },
  low: { thai: 'ขอบ', roman: 'khàwp', meaning: 'edge (as in ขอบคุณ)' },
  falling: { thai: 'ไม่', roman: 'mâi', meaning: 'not' },
  high: { thai: 'ครับ', roman: 'khráp', meaning: 'polite particle' },
  rising: { thai: 'ไหม', roman: 'mǎi', meaning: 'question particle' },
};

const DESCRIPTION: Record<Tone, string> = {
  mid: 'Flat, at your ordinary speaking pitch. Do nothing and you have said it.',
  low: 'Starts below neutral and sags further. Think of the last word of a bored sentence.',
  falling: 'Starts high and drops hard. The English "NO!" said to a dog.',
  high: 'Starts near neutral and climbs, tight and pressed. It is not a shout.',
  rising: 'Dips first, then climbs. The English "really?" said with one eyebrow up.',
};

export function TonePrimer({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto">
      <button type="button" onClick={onBack} className="self-start text-sm underline opacity-70">
        ← Back to settings
      </button>

      <div>
        <h2 className="text-2xl font-bold tracking-tight">The five tones</h2>
        <p className="mt-1 text-sm leading-relaxed opacity-75">
          Thai has five. Change the tone and you change the word, not the emphasis. The dashed line
          is your neutral speaking pitch; the stroke is what your voice does across the syllable.
        </p>
      </div>

      <ul className="flex flex-col gap-3">
        {TONE_ORDER.map((tone) => {
          const ex = EXAMPLES[tone];
          return (
            <li
              key={tone}
              className="flex items-center gap-4 rounded-2xl border border-ink/10 px-3 py-3 dark:border-paper/10"
            >
              <ToneContour tone={tone} width={64} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="thai text-2xl font-medium">{ex.thai}</span>
                  <span className="text-lg font-semibold" style={{ color: toneTextColor(tone) }}>
                    {ex.roman}
                  </span>
                  <span className="text-sm opacity-65">{ex.meaning}</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed opacity-70">{DESCRIPTION[tone]}</p>
              </div>
              <AudioButton thai={ex.thai} size="sm" />
            </li>
          );
        })}
      </ul>

      <div className="rounded-2xl border border-amber/40 bg-amber/[0.08] px-4 py-3 text-sm leading-relaxed">
        <strong>These are citation forms.</strong> They are what a syllable does when said alone or
        for emphasis. In fast connected speech the shapes flatten — the rising tone especially, which
        often ends up barely more than a level pitch. Do not expect a real conversation to match
        these curves, and do not conclude your ear is broken when it does not.
      </div>
    </div>
  );
}
