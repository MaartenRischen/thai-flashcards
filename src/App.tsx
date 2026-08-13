import { useEffect, useState } from 'react';
import { StoreProvider, useStore } from './store';
import { Review } from './screens/Review';
import { Browse } from './screens/Browse';
import { Settings } from './screens/Settings';
import { TonePrimer } from './screens/TonePrimer';

/**
 * Three screens and one modal-ish primer. That is a state enum, not a router —
 * but the hash is kept in step so a deep link and the browser Back button both
 * work on GitHub Pages without a 404.
 */
type Screen = 'review' | 'browse' | 'settings' | 'primer';

const SCREENS: { id: Screen; label: string }[] = [
  { id: 'review', label: 'Review' },
  { id: 'browse', label: 'Browse' },
  { id: 'settings', label: 'Settings' },
];

function screenFromHash(): Screen {
  const h = location.hash.replace('#/', '').replace('#', '');
  return h === 'browse' || h === 'settings' || h === 'primer' ? h : 'review';
}

function Shell() {
  const { ready, canSpeak, voice, settings, setSettings } = useStore();
  const [screen, setScreen] = useState<Screen>(screenFromHash);

  useEffect(() => {
    const onHash = () => setScreen(screenFromHash());
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, []);

  const go = (s: Screen) => {
    setScreen(s);
    location.hash = `#/${s}`;
  };

  const showTtsBanner =
    voice.status === 'unavailable' && !settings.ttsBannerDismissed && screen !== 'settings';

  // The shell — container, main box, nav — is identical before and after the
  // IndexedDB read lands. Only the contents of <main> swap, so opening the app
  // does not shove the navigation up the screen.
  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      {ready && showTtsBanner && (
        <div className="mb-3 flex items-start gap-3 rounded-xl border border-tone-high/45 bg-tone-high/10 px-3 py-2 text-xs leading-relaxed">
          <span className="flex-1">
            This device has no Thai voice installed, so audio is off everywhere and the listening
            direction is disabled. Everything else works.{' '}
            <button
              type="button"
              onClick={() => go('settings')}
              className="font-semibold underline"
            >
              How to install one
            </button>
          </span>
          <button
            type="button"
            onClick={() => void setSettings({ ttsBannerDismissed: true })}
            aria-label="Dismiss"
            className="font-semibold opacity-70"
          >
            ✕
          </button>
        </div>
      )}

      <main className="min-h-0 flex-1">
        {!ready && (
          <div className="flex h-full items-center justify-center text-sm opacity-70">Loading…</div>
        )}
        {ready && screen === 'review' && <Review />}
        {ready && screen === 'browse' && <Browse />}
        {ready && screen === 'settings' && <Settings onOpenPrimer={() => go('primer')} />}
        {ready && screen === 'primer' && <TonePrimer onBack={() => go('settings')} />}
      </main>

      <nav className="mt-3 flex shrink-0 gap-1 rounded-2xl border border-ink/10 p-1 dark:border-paper/10">
        {SCREENS.map((s) => {
          const active = screen === s.id || (screen === 'primer' && s.id === 'settings');
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => go(s.id)}
              aria-current={active ? 'page' : undefined}
              className={`flex-1 rounded-xl py-2 text-sm font-medium transition ${
                active ? 'bg-amber/25' : 'opacity-70'
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </nav>

      {!canSpeak && <span className="sr-only">Audio unavailable on this device.</span>}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
