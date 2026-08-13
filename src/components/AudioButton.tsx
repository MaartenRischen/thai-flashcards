import { speakThai } from '../audio/tts';
import { useStore } from '../store';

/**
 * Renders nothing at all when the device has no Thai voice. A dead play button
 * is worse than no play button, and falling back to an English voice reading
 * Thai script would teach a pronunciation no Thai person uses.
 */
export function AudioButton({
  thai,
  size = 'md',
  label = 'Play',
}: {
  thai: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}) {
  const { canSpeak, voice, settings } = useStore();

  const dims = { sm: 'h-9 w-9', md: 'h-12 w-12', lg: 'h-16 w-16' }[size];
  const icon = { sm: 16, md: 22, lg: 30 }[size];

  // While the voice list is still resolving, hold the space rather than pop a
  // button in a beat later — that shift is most of the app's layout shift, and
  // Chrome takes a second or two to populate voices.
  if (voice.status === 'loading') return <span className={`${dims} inline-block shrink-0`} aria-hidden="true" />;
  if (!canSpeak) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speakThai(thai, { voiceURI: settings.voiceURI, rate: settings.rate });
      }}
      className={`${dims} inline-flex shrink-0 items-center justify-center rounded-full border border-amber/50 bg-amber/15 transition active:scale-95 hover:bg-amber/30`}
      aria-label={`${label}: ${thai}`}
      title={`${label} (P)`}
    >
      <svg viewBox="0 0 24 24" width={icon} height={icon} aria-hidden="true" fill="none">
        <path
          d="M4 9v6h4l5 4V5L8 9H4z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
