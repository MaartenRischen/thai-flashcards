/**
 * Web Speech API only. No audio files, no network.
 *
 * The interesting case is the machine with NO Thai voice — most Linux setups,
 * some Windows installs. There the correct behaviour is to disappear, not to
 * hand the Thai script to an English voice, which would teach a learner a
 * pronunciation no Thai person uses.
 */

export type VoiceStatus = 'loading' | 'available' | 'unavailable';

export interface VoiceState {
  status: VoiceStatus;
  voices: SpeechSynthesisVoice[];
}

const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

function thaiVoices(): SpeechSynthesisVoice[] {
  if (!supported) return [];
  return speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('th'));
}

/**
 * Chrome populates the voice list asynchronously and fires `voiceschanged`.
 * Safari populates it synchronously but sometimes only after the first call.
 * Reading once on mount and giving up is the classic bug — so this polls a few
 * times as well as listening, then settles on "unavailable".
 */
export function watchVoices(onChange: (state: VoiceState) => void): () => void {
  if (!supported) {
    onChange({ status: 'unavailable', voices: [] });
    return () => {};
  }

  let settled = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let attempts = 0;

  const publish = () => {
    const voices = thaiVoices();
    if (voices.length > 0) {
      settled = true;
      onChange({ status: 'available', voices });
      return true;
    }
    return false;
  };

  const poll = () => {
    if (settled) return;
    if (publish()) return;
    attempts += 1;
    // ~3s of grace before declaring the platform Thai-less.
    if (attempts >= 10) {
      settled = true;
      onChange({ status: 'unavailable', voices: [] });
      return;
    }
    timer = setTimeout(poll, 300);
  };

  const onVoicesChanged = () => {
    if (!settled) publish();
  };

  speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
  onChange({ status: 'loading', voices: [] });
  poll();

  return () => {
    if (timer) clearTimeout(timer);
    speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
  };
}

export interface SpeakOptions {
  voiceURI: string | null;
  rate: number;
}

/** Speak Thai script. Never romanisation — a Thai voice reads that as garbage. */
export function speakThai(thai: string, opts: SpeakOptions): void {
  if (!supported) return;
  const voices = thaiVoices();
  if (voices.length === 0) return;

  const voice = voices.find((v) => v.voiceURI === opts.voiceURI) ?? voices[0];

  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(thai);
  u.voice = voice;
  u.lang = voice.lang;
  u.rate = Math.min(1, Math.max(0.5, opts.rate));
  u.pitch = 1;
  speechSynthesis.speak(u);
}

export function stopSpeaking(): void {
  if (supported) speechSynthesis.cancel();
}

export const PLATFORM_HELP: { platform: string; text: string }[] = [
  {
    platform: 'Windows 10 / 11',
    text: 'Settings → Time & language → Language & region → Add a language → ไทย (Thai). Tick "Speech" in the optional features, then restart the browser.',
  },
  {
    platform: 'macOS',
    text: 'System Settings → Accessibility → Spoken Content → System Voice → Manage Voices… → download Thai (Kanya). Restart Safari or Chrome afterwards.',
  },
  {
    platform: 'iOS / iPadOS',
    text: 'Settings → Accessibility → Spoken Content → Voices → Thai → Kanya. Safari picks it up straight away.',
  },
  {
    platform: 'Android',
    text: 'Settings → System → Languages & input → Text-to-speech output → Google Text-to-speech → Install voice data → ไทย.',
  },
  {
    platform: 'Linux',
    text: 'Chromium and Firefox use speech-dispatcher. No mainstream engine ships a Thai voice, so this is the one platform where audio usually stays off. Everything else in the app still works.',
  },
];
