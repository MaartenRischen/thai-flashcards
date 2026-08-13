// From vitest, not vite: it is the same defineConfig widened to accept `test`.
// Vite's own type rejects that key, which went unnoticed until this file was
// actually typechecked.
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub Pages serves this from a subpath. Override at build time:
//   BASE_PATH=/my-repo/ npm run build
const base = process.env.BASE_PATH ?? '/thai-flashcards/';

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      // The default injection is a render-blocking <script>, which Lighthouse
      // measured at 303ms of blocked paint on a throttled profile. Nothing on
      // the first paint depends on the worker being registered.
      injectRegister: 'script-defer',
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'],
      manifest: {
        name: 'Thai Mnemonic Flashcards',
        short_name: 'Thai Cards',
        description: '100 high-frequency Thai phrases with sound-alike mnemonics and tone contours.',
        theme_color: '#0f0e0c',
        background_color: '#0f0e0c',
        display: 'standalone',
        orientation: 'portrait',
        start_url: base,
        scope: base,
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        navigateFallback: `${base}index.html`,
        cleanupOutdatedCaches: true,
        // These two are NOT optional here, and `registerType: 'autoUpdate'`
        // does not supply them once a custom `workbox` block is present.
        // Without them the generated worker only calls skipWaiting() in
        // response to a SKIP_WAITING message that nothing ever sends: a new
        // version installs, precaches, and then sits in `waiting` for good.
        // Observed in production — the deployed bundle was correct and every
        // client kept serving the previous one, indefinitely.
        skipWaiting: true,
        clientsClaim: true,
      },
    }),
  ],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
