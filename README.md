# Thai mnemonic flashcards

100 high-frequency Thai phrases taught with English sound-alike mnemonics, per-syllable pitch
contours, a word-by-word breakdown of what every part means, Thai text-to-speech and Anki-style
spaced repetition. Static site, no backend, no accounts, works offline.

```bash
npm install
npm run dev            # http://localhost:5173/thai-flashcards/
npm test               # 55 unit tests
npm run build          # → dist/
```

## Deploying to GitHub Pages

`base` defaults to `/thai-flashcards/`. For a repo with a different name:

```bash
BASE_PATH=/your-repo-name/ npm run build
```

Then publish `dist/`. Routing is hash-based (`#/browse`, `#/settings`), so deep links do not 404
on Pages.

---

## What is verified, and how

Everything below was measured on this machine, not assumed. Where something could not be
measured, it says so.

### Scheduler

SM-2 with Anki's defaults, in `src/srs/scheduler.ts` — pure functions, no IO, `now` always passed
in. 23 tests in `scheduler.test.ts`, 15 more for queue building in `queue.test.ts`, 17 for data
integrity. All 55 pass.

One acceptance criterion could not be met as literally written:

> "a card graded `again` four times has ease at the 1.3 floor"

With the §3 rule (`again` → ease −0.20) starting from 2.5, four lapses gives **1.7**, not 1.3. The
floor is reached on the sixth. The test asserts the property the criterion is protecting — repeated
`again` walks ease down and stops dead at 1.30, never below — and states the arithmetic in a
comment. The rule was not bent to make the number come out.

The other two named criteria hold exactly: `good` twice from new is due in 1 day; fuzz is never
below the unfuzzed interval minus 5% (checked across 3–365 days × 40 seeded draws).

### Offline

Verified by killing the server, not by trusting the plugin.

```
service worker: 1 registration, state=activated, 14 precache entries (351 KiB)
server killed → reload → app renders, review state intact, 0 console errors
→ Browse and Settings also render from cache
```

### Performance (Lighthouse 12, default mobile profile: 1638 kbps, 150 ms RTT, 4× CPU)

| | |
|---|---|
| Performance | **100** |
| Accessibility | **100** |
| Best practices | **100** |
| First contentful paint | **1356 ms** |
| Largest contentful paint | 1656 ms |
| Cumulative layout shift | **0** |
| Total blocking time | 0 ms |

Two things were fixed to get there, both found by measuring:

- `vite-plugin-pwa` injects its registration as a **render-blocking** script by default — 303 ms of
  blocked paint. Now `injectRegister: 'script-defer'`.
- CLS started at **0.251**. Two causes: the loading state had a different shape from the loaded
  shell, and the audio button popped in a beat after the voice list resolved. Now `index.html`
  ships a static shell with the same geometry as `App.tsx`, and `AudioButton` holds its space
  while `voice.status === 'loading'`.

**Installability is not Lighthouse-verified.** Lighthouse 12 removed the PWA category, so there is
no badge to show. Chrome's documented criteria were checked by hand instead: manifest with `name`,
`short_name`, `start_url`, `display: standalone`, 192px and 512px icons plus a maskable 512, served
over the page's own origin, and a service worker with a fetch handler. All present.

### Colour contrast

The brief said to verify the five tone colours in dark mode rather than assume. They do not survive
it:

| Tone | Brief's value | On `#0F0E0C` | On `#FAF7F0` |
|---|---|---|---|
| mid | `#D4537E` | 4.90 | 3.68 |
| low | `#185FA5` | **2.96 — fails even the 3:1 graphics bar** | 6.10 |
| falling | `#5F5E5A` | **2.97 — same** | 6.07 |
| high | `#D85A30` | 4.98 | 3.62 |
| rising | `#639922` | 5.61 | 3.21 |

So there are three sets of values in `src/index.css`, all measured:

- `--tone-*` in light mode are **the brief's exact values**, used for the contour strokes. As
  graphics they clear the 3:1 bar.
- `--tone-*-text` in light mode are darkened siblings (same hue) at ≥4.7:1, used for the romanised
  syllables, which are body text and need 4.5:1.
- `--tone-*` in dark mode are lifted versions, all ≥7:1. Dark mode needs no text/stroke split.

The 12px tone name under each contour inherits body colour rather than the tone hue — at that size
three of the five hues cannot reach 4.5:1 on paper, and the shape above it already carries the
identity.

### Audio

Thai TTS uses `speechSynthesis` only. `watchVoices` both listens for `voiceschanged` **and** polls
for ~3 s, because reading the list once on mount is the classic Chrome bug.

With no `th-*` voice: every play button is removed (not disabled), the `listening` direction is
forced off so its cards never enter the queue, and a dismissible banner points at per-platform
install instructions. There is no English-voice fallback — an English voice reading Thai script
teaches a pronunciation no Thai person uses.

Verified by temporarily changing the language filter to a code no voice matches and re-running:
**0 play buttons on Review, 0 on Browse**, banner shown, listening checkbox disabled with a reason.

**Device testing is incomplete and this is the honest state of it.** The brief asked for iOS
Safari, Android Chrome, macOS Safari, desktop Chrome and a Linux box:

| Platform | Status |
|---|---|
| macOS, Chromium (headless) | Tested. `th-TH:Kanya` present, playback path exercised. |
| Everything else | **Not tested.** No access to those devices from this environment. |

The no-voice path was exercised by simulation, which is a fair proxy for the Linux case and for a
Windows install without the Thai speech pack. It is not a substitute for running it on a phone.
Treat the iOS/Android rows as unknown until someone opens it on one.

---

## Content

### Tones

The brief said the seed romanisations were not trustworthy. Every one was re-derived from the Thai
spelling using the standard rules — consonant class × live/dead syllable × vowel length × tone
mark — and checked against the drafted marks.

**All 40 seed rows came out matching.** Two look wrong until you apply the leading-consonant
(อักษรนำ) rule, and are worth naming because they are the ones a careful reader would query:

- **อร่อย à-ròi.** ร่ is low class with mai ek, which alone gives *falling*. The mid-class อ leads
  it, so ร borrows mid-class behaviour and mai ek yields **low**. `à-ròi` is right; `a-rôi` is not.
- The same rule drives **สนาม, หน่อย, ไหม, ไหน, หมู, หนาว, ตำรวจ** — every ห- or mid-class leader.

The 60 new phrases were derived the same way. Nothing here is a guessed tone. Where a phrase could
not be pinned down it was dropped and replaced.

Tone-pair warnings are on the cards the brief named — สวย/ซวย, ใกล้/ไกล, ขาว/ข้าว — plus ถูก
(cheap **and** correct) and ไหม้/ไม่.

### Word-by-word breakdown

Every phrase carries a `words[]` array: each meaningful chunk with its own Thai script,
romanisation and gloss. It shows on the back of every card and in every expanded Browse row, and
it is searchable — typing "question particle" or "ไหม" finds all 11 phrases that use it, which is
how a building block actually gets learned.

It is **word-level, not syllable-level, on purpose.** Thai words are frequently more than one
syllable, and glossing สวัสดี as sà + wàt + dii would invent three meanings that do not exist —
it is one Sanskrit borrowing. Where a part carries no independent meaning the gloss says exactly
that, which is itself worth knowing: it stops you hunting for a meaning that was never there.
Same for the polite particles ครับ / ค่ะ, which mark respect and mean nothing.

Three tests keep this honest, and they are the reason it can be trusted:

- word spans must add up to the phrase's syllable count
- each word's romanisation must equal the syllables it covers, joined by hyphens
- concatenating the words must reproduce the phrase's Thai string exactly

A typo in either list fails the build rather than teaching you a wrong gloss.

### Categories

The brief's `Category` union has nine values; its content brief also asks for transport,
accommodation, illness/pharmacy, weather and general shopping, which none of the nine express.
Five values were added rather than folded into near-misses, because Browse filters on this field
and "pharmacy under emergency" makes the filter lie.

### Weak mnemonics

**9 of 100 are flagged weak**, down from 27 after a second pass rewrote 22 of them outright. The
count moved because the content changed, not because the standard did — every rewrite has a new
sound-alike and a newly drawn panel behind it.

The bar is rule 5 from the brief — say the English out loud, then the Thai, and ask whether a Thai
speaker would recognise it — plus rule 2: a panel that draws the *meaning* instead of the *sound*
is weak even when the phrase is useful.

What the rewrite actually fixed:

| | Was | Now |
|---|---|---|
| น้ำ náam | "num" — wrong vowel, wrong length | **"Viet-NAM"** — the British pronunciation ends in exactly /nɑːm/ |
| ใกล้ / ไกล | "glide" — voiced gl-, and a stray d | **"cli(mb)"** — Thai ก is an unvoiced unaspirated k, so cl- is the right cluster |
| เปิด pèrt | "burnt" — added an n | **"pert"** — the sound exactly, drawn as a tulip snapping open, which is also what เปิด means |
| ติด tìt | "tick" — ended in k | **"tit"**, the bird, which also will not let go of the feeder |
| ไข้ khâi | "kite" — added a t | **"KAY-ak"** — opens on exactly /kaɪ/, and sinks |
| ฝน fǒn | "phone" — long and diphthongal | **"fawn"** — right vowel colour, and it stands about looking rained on |
| กี่บาท | "bat" — short vowel | **"baht"** — the English word for the currency already is the Thai one |
| อันนี้ / อันไหน | alphabet tiles spelling A-N | **"on knee"**, **"on nigh"** — images, not spellings |
| ขวา khwǎa | "quacks" — bolted a k on | **"kwaaa!"** — the duck's actual call, which climbs like the tone |

The 9 that survive are not laziness, they are the shape of the problem. Six are Thai sounds English
cannot spell:

- **เมื่อ mûea** (×2) — an unrounded back vowel with no English letter. The panel teaches the mouth
  shape rather than pretending a word matches.
- **ปวด pùat** (×2) — a single-syllable glide that English needs two beats for.
- **เงิน ngern** — English never starts a word with ng-.
- **ท้อง tháwng** — English "thong" starts /θ/; Thai ท is a hard t with a puff.

The other three are cases where the closest English word still has the wrong vowel (แล้ว láew ×2,
พรุ่ง phrûng) or the wrong length (ระวัง rá-wang, whose syllables are clipped and whose mnemonic is
two shouts).

Every weak card opens its note with the word "Weak" and says which half is wrong — there is a test
that enforces the first part.

### Art

`src/art/index.tsx` holds **123 drawn components covering all 170 panels**. Nothing falls back to
the typographic card any more.

The fallback still exists and is still per *panel*, not per phrase: `ART` is the registry of what
has actually been drawn, and a phrase naming a component that is not in it renders as a large amber
pill with the scene description beneath. That is what let the illustration work land one panel at a
time without ever breaking the app — the deck was fully usable at 0% coverage, at 63%, and now at
100%.

Drawn and undrawn panels share a frame on purpose, so a card that mixed the two read as one card
rather than a finished half beside a broken half.

Panel rules hold throughout: 270×190 viewBox, transparent, no gradients or filters or shadows, line
work in `currentColor` so it can never vanish in either theme, fills from `--art-*` variables that
flip. Recurring cast (Dee, Leo, the Cow, the Crow, the Raccoon, the Pie, Pet) is drawn once and
composed; so are the modules and the shared props — the ไหน knight appears on six cards, the ไม่
palm on ten.

---

## Layout

```
src/
  types.ts              data model, settings, backup format
  data/phrases.ts       100 phrases — authored content, never written at runtime
  srs/scheduler.ts      SM-2. Pure. No IO. No clock reads.
  srs/queue.ts          queue building, daily caps, free practice. Also pure.
  db/db.ts              IndexedDB (not localStorage — Safari evicts that after 7 days)
  audio/tts.ts          speechSynthesis + the no-Thai-voice path
  art/index.tsx         drawn panels + the registry that makes fallback automatic
  components/           ToneContour, Panel, CardFace, AudioButton
  screens/              Review, Browse, Settings, TonePrimer
  store.tsx             one context; screens read, never poke IndexedDB directly
```

Three screens are a state enum, not a router, but the hash is kept in step so Back and deep links
both work.

## Keyboard

| Key | |
|---|---|
| `space` / `enter` | reveal |
| `1` `2` `3` `4` | again / hard / good / easy |
| `p` | replay audio |

Fully operable without a mouse. Verified end to end: three cards graded by keyboard alone, with the
resulting IndexedDB state checked against what SM-2 should have written.

## Does progress last?

Not automatically, and the app now says so rather than implying otherwise.

`src/db/storage.ts` asks for `navigator.storage.persist()` on every load, which exempts the origin
from disk-pressure eviction where the browser supports it. Settings → **Your progress** reports
what was actually granted, how much space is used, and whether the app is installed.

Three things can still take the data:

1. **Clearing site data.** Nothing can or should prevent it.
2. **Disk pressure**, if persistence was not granted.
3. **iOS Safari's 7-day rule.** Apple's ITP deletes *all* script-writable storage after 7 days of
   Safari use without visiting the site — **IndexedDB included, not just localStorage**. The brief's
   premise ("use IndexedDB, localStorage gets wiped") is only half right: on iOS both go. What
   actually protects the data is **Add to Home Screen** — an installed web app runs outside Safari
   and outside that counter. Settings detects iOS-Safari-in-a-tab specifically and says so in red.

There is also no sync. Phone progress and laptop progress are separate decks. Export is the only
thing that survives all of it.

## Backup

Settings → Export JSON is the only backup that exists. Import **replaces** everything rather than
merging — a merge would have to guess which side's due date wins, and guessing wrong loses real
review history.

Round trip verified: export → delete every IndexedDB database and clear localStorage → reload →
import. All three cards came back with byte-identical `due` and `ease`.

## Known gaps

1. **No device testing beyond headless Chromium on macOS.** See the audio table above.
2. **9 weak mnemonics.** Flagged, explained, and mostly irreducible: they are the Thai sounds
   English has no letters for.
3. **No Thai script reading instruction**, no grammar, no sentence builder, no sync. All non-goals.
