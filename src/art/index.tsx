import type { JSX } from 'react';

/**
 * Art component library.
 *
 * Every component renders an SVG *group* into a 270×190 panel viewBox. The
 * panel wrapper supplies the <svg>, the <title> and the transparent background,
 * so components here draw shapes and nothing else.
 *
 * Panel rules (non-negotiable, from the brief):
 *   - viewBox 270×190, transparent background, ground line at GROUND
 *     (y=160 here, which is y=205 in the card frame the panel sits in)
 *   - no gradients, no filters, no drop shadows
 *   - every colour legible on both light and dark: line work is currentColor,
 *     fills come from the --art-* variables, which flip with the theme
 *
 * A phrase may name a component that does not exist yet. That is not an error —
 * `ART` is the registry of what has actually been drawn, and Panel falls back to
 * the typographic card for anything missing. This is what lets the illustration
 * work land one panel at a time without ever breaking the app.
 */

export const PANEL_W = 270;
export const PANEL_H = 190;
export const GROUND = 160;

const L = 'currentColor';
const FILL = 'var(--art-fill)';
const DEEP = 'var(--art-fill-deep)';
const AMBER = 'var(--art-amber)';
const RED = 'var(--art-red)';
const BLUE = 'var(--art-blue)';
const GREEN = 'var(--art-green)';
const PINK = 'var(--art-pink)';

export type ArtProps = Record<string, unknown>;

const stroke = { stroke: L, strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
const thin = { stroke: L, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

function Ground() {
  return <line x1="24" y1={GROUND} x2={PANEL_W - 24} y2={GROUND} {...stroke} opacity={0.4} />;
}

/* ------------------------------------------------------------------ modules */

/** ไม่ mâi — a flat palm pushing something away. Reused on ten cards. */
function PalmNo() {
  return (
    <g>
      <Ground />
      <path
        d="M104 148 L104 92 q0-14 13-14 t13 14 v-16 q0-14 13-14 t13 14 v10 q0-13 12-13 t12 13 v34 q0 34-31 34 h-24 q-21 0-21-22z"
        fill={FILL}
        {...stroke}
      />
      <path d="M104 100 q-16 4-16 18 t14 22" fill={FILL} {...stroke} />
      <path d="M74 60 L60 46 M96 48 L92 30 M126 46 L136 30" {...stroke} opacity={0.55} />
      <path d="M186 78 L214 106 M214 78 L186 106" stroke={RED} strokeWidth="7" strokeLinecap="round" />
    </g>
  );
}

/** ได้ไหม dâi-mǎi — a head having its hair dyed bright pink. */
function HairDye() {
  return (
    <g>
      <Ground />
      <circle cx="118" cy="104" r="42" fill={FILL} {...stroke} />
      <path d="M78 92 q10-40 42-40 t40 40 q-18-14-40-14 t-42 14z" fill={PINK} {...stroke} />
      <circle cx="104" cy="108" r="4" fill={L} />
      <circle cx="134" cy="108" r="4" fill={L} />
      <path d="M108 128 q10 8 20 0" {...thin} />
      <path d="M186 44 L214 96" stroke={L} strokeWidth="9" strokeLinecap="round" />
      <path d="M180 38 q-16 8-10 22 q6 14 22 6z" fill={PINK} {...stroke} />
      <circle cx="166" cy="76" r="5" fill={PINK} />
      <circle cx="176" cy="60" r="3.5" fill={PINK} />
    </g>
  );
}

/** ครับ khráp — a crab saluting. */
function Crab() {
  return (
    <g>
      <Ground />
      <ellipse cx="135" cy="118" rx="52" ry="34" fill={RED} {...stroke} />
      <circle cx="118" cy="108" r="5" fill={L} />
      <circle cx="152" cy="108" r="5" fill={L} />
      <path d="M112 128 q23 12 46 0" {...thin} />
      <path d="M84 106 L58 76" {...stroke} />
      <path d="M58 76 q-16-12-22 2 q-4 12 10 14 q14 2 12-16z" fill={RED} {...stroke} />
      <path d="M186 108 L212 96" {...stroke} />
      <path d="M212 96 q18-4 16 10 q-2 12-14 8 q-12-4-2-18z" fill={RED} {...stroke} />
      <path d="M100 148 L88 162 M135 152 L135 166 M170 148 L182 162" {...stroke} />
    </g>
  );
}

/** ค่ะ khâ — a car with its door held open. */
function Car() {
  return (
    <g>
      <Ground />
      <path d="M46 132 v-22 l22-30 h108 l24 30 h24 v22z" fill={FILL} {...stroke} />
      <path d="M84 82 v28 h34 v-28z" fill={BLUE} {...thin} />
      <path d="M132 82 v28 h38 l-20-28z" fill={BLUE} {...thin} />
      <path d="M132 118 l52 -30 v34z" fill={FILL} {...stroke} />
      <circle cx="82" cy="134" r="18" fill={DEEP} {...stroke} />
      <circle cx="192" cy="134" r="18" fill={DEEP} {...stroke} />
    </g>
  );
}

/** ขอ khǎw / ขอโทษ — the Crow, cawing with one wing out. */
function Crow({ action }: ArtProps) {
  return (
    <g>
      <Ground />
      <ellipse cx="130" cy="112" rx="44" ry="30" fill={DEEP} {...stroke} />
      <circle cx="170" cy="82" r="22" fill={DEEP} {...stroke} />
      <circle cx="176" cy="76" r="4" fill={L} />
      <path d="M192 84 L224 78 L192 94z" fill={AMBER} {...stroke} />
      <path d="M104 96 q-34-18-52 4 q24 6 40 22z" fill={DEEP} {...stroke} />
      <path d="M96 138 L88 158 M148 140 L152 158" {...stroke} />
      {action === 'caw' && (
        <>
          <path d="M226 56 q10-8 20-4" {...thin} opacity={0.7} />
          <path d="M232 70 q14-4 24 4" {...thin} opacity={0.7} />
          <path d="M228 42 q6-12 18-14" {...thin} opacity={0.7} />
        </>
      )}
    </g>
  );
}

/* --------------------------------------------------------------------- cast */

type DeeAction = 'wave' | 'thumbsup' | 'choke' | 'ask' | 'me' | 'ow' | 'sigh';

/** Dee — the generic person. One body, seven arms-and-face variations. */
function Dee({ action, holding }: ArtProps) {
  const a = (action as DeeAction) ?? 'wave';
  return (
    <g>
      <Ground />
      {/* body */}
      <path d="M104 158 v-40 q-14-6-14-24 q0-16 22-18 h32 q22 2 22 18 q0 18-14 24 v40" fill={FILL} {...stroke} />
      <circle cx="134" cy="56" r="26" fill={FILL} {...stroke} />
      <circle cx="124" cy="54" r="3.5" fill={L} />
      <circle cx="146" cy="54" r="3.5" fill={L} />

      {a === 'wave' && (
        <>
          <path d="M170 92 L206 52" {...stroke} />
          <path d="M206 52 q14-10 20 2 q6 12-8 16 q-14 4-12-18z" fill={FILL} {...stroke} />
          <path d="M124 66 q10 8 20 0" {...thin} />
          <path d="M216 30 q10-2 14 6 M232 44 q10 2 12 10" {...thin} opacity={0.6} />
        </>
      )}
      {a === 'thumbsup' && (
        <>
          <path d="M170 96 L196 82" {...stroke} />
          <path d="M196 96 q-4-16 8-18 q4-16 12-6 q4 6-2 14 q10-2 10 8 q0 14-14 14 q-14 0-14-12z" fill={FILL} {...stroke} />
          <path d="M124 66 q10 8 20 0" {...thin} />
        </>
      )}
      {a === 'choke' && (
        <>
          <path d="M164 92 q-14 12-30 0" {...stroke} />
          <path d="M126 62 q8 6 16 0" {...thin} />
          <path d="M116 48 L132 58 M152 48 L136 58" {...thin} />
          <path d="M198 62 l10-12 l12 12 l-12 12z" fill={GREEN} {...thin} />
          <path d="M186 74 l10-12 l12 12 l-12 12z" fill={GREEN} {...thin} />
          <path d="M198 86 l10-12 l12 12 l-12 12z" fill={GREEN} {...thin} />
          <path d="M208 98 v22" {...thin} />
        </>
      )}
      {a === 'ask' && (
        <>
          <path d="M112 34 q10-8 22-4 M156 30 q10 4 12 12" {...thin} />
          <path d="M124 66 q10 6 20 0" {...thin} />
          <path d="M200 44 q0-16 14-16 q14 0 14 12 q0 10-12 14 v8" stroke={AMBER} strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="216" cy="86" r="4.5" fill={AMBER} />
        </>
      )}
      {a === 'me' && (
        <>
          <path d="M170 96 L146 106" {...stroke} />
          <path d="M146 96 q-14 2-14 12 q0 10 14 10 q14 0 14-10 q0-10-14-12z" fill={FILL} {...stroke} />
          <path d="M124 66 q10 8 20 0" {...thin} />
        </>
      )}
      {a === 'ow' && (
        <>
          <path d="M104 158 q-16-4-14-24" {...stroke} />
          <circle cx="88" cy="128" r="10" fill={RED} {...thin} />
          <path d="M74 116 L64 106 M92 110 L92 96 M104 118 L114 108" {...thin} />
          <path d="M124 66 q10-8 20 0" {...thin} />
        </>
      )}
      {a === 'sigh' && (
        <>
          <path d="M124 66 q10-6 20 0" {...thin} />
          <path d="M116 52 h14 M140 52 h14" {...thin} />
          <path d="M164 62 q22 4 34 14 q12 10 30 6" stroke={BLUE} strokeWidth="3" fill="none" strokeLinecap="round" opacity={0.8} />
          <path d="M170 76 q20 8 30 20" stroke={BLUE} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity={0.5} />
        </>
      )}
      {holding === 'yinyang' && (
        <>
          <path d="M170 96 L196 92" {...stroke} />
          <circle cx="214" cy="92" r="24" fill={FILL} {...stroke} />
          <path d="M214 68 a24 24 0 0 1 0 48 a12 12 0 0 1 0-24 a12 12 0 0 0 0-24z" fill={L} />
          <circle cx="214" cy="80" r="3.5" fill={FILL} />
          <circle cx="214" cy="104" r="3.5" fill={L} />
        </>
      )}
    </g>
  );
}

/** ขอบคุณ khàwp-khun — a raccoon in a police cap handing back a wallet. */
function Raccoon({ holding, hat }: ArtProps) {
  return (
    <g>
      <Ground />
      <ellipse cx="122" cy="120" rx="46" ry="34" fill={FILL} {...stroke} />
      <circle cx="122" cy="72" r="30" fill={FILL} {...stroke} />
      <path d="M96 60 q26-14 52 0 q-6 16-26 16 q-20 0-26-16z" fill={DEEP} {...stroke} />
      <circle cx="110" cy="66" r="4" fill={L} />
      <circle cx="134" cy="66" r="4" fill={L} />
      <path d="M118 82 q4 5 8 0" {...thin} />
      <path d="M96 46 l-8-14 l20 6z M148 46 l8-14 l-20 6z" fill={FILL} {...stroke} />
      {hat === 'police' && (
        <>
          <path d="M90 40 q32-22 64 0z" fill={BLUE} {...stroke} />
          <path d="M84 40 h76" {...stroke} />
          <circle cx="122" cy="28" r="5" fill={AMBER} {...thin} />
        </>
      )}
      <path d="M76 138 q-34 6-40-22 q-2-14 12-14" fill="none" {...stroke} />
      {holding === 'wallet' && (
        <>
          <path d="M164 116 L186 108" {...stroke} />
          <rect x="186" y="92" width="52" height="36" rx="5" fill={AMBER} {...stroke} />
          <path d="M186 106 h52" {...thin} />
          <circle cx="228" cy="116" r="4" fill={L} />
        </>
      )}
    </g>
  );
}

/** เข้าใจ khâo-jai — the Cow, jiving or drinking gin. */
function Cow({ action }: ArtProps) {
  return (
    <g>
      <Ground />
      <ellipse cx="126" cy="106" rx="52" ry="34" fill={FILL} {...stroke} />
      <ellipse cx="104" cy="98" rx="16" ry="11" fill={DEEP} />
      <ellipse cx="150" cy="116" rx="13" ry="9" fill={DEEP} />
      <circle cx="190" cy="82" r="24" fill={FILL} {...stroke} />
      <ellipse cx="204" cy="94" rx="15" ry="11" fill={PINK} {...thin} />
      <circle cx="200" cy="70" r="3.5" fill={L} />
      <path d="M172 62 q-10-14 4-16 M208 60 q10-14 20-8" {...stroke} />
      {action === 'jive' ? (
        <>
          <path d="M96 138 L74 158 M116 140 L112 158" {...stroke} />
          <path d="M156 138 L176 120 L192 132" {...stroke} />
          <path d="M52 60 q6-10 14-6 M42 82 q8-8 16-2" {...thin} opacity={0.7} />
          <path d="M60 44 l6-16 l10 6z" fill={AMBER} {...thin} />
        </>
      ) : (
        <>
          <path d="M96 138 L92 158 M116 140 L120 158 M156 138 L160 158" {...stroke} />
          <path d="M62 92 h34 l-6 34 h-22z" fill={BLUE} {...stroke} opacity={0.85} />
          <path d="M62 92 h34" {...stroke} />
        </>
      )}
    </g>
  );
}

/** ไป pai — the Pie, on legs. */
function Pie({ action }: ArtProps) {
  const run = action === 'run';
  return (
    <g>
      <Ground />
      <path d="M64 116 q62-46 142 0z" fill={AMBER} {...stroke} />
      <rect x="56" y="114" width="158" height="16" rx="7" fill={DEEP} {...stroke} />
      <path d="M104 96 q10-10 20 0 M148 92 q10-10 20 0" {...thin} opacity={0.7} />
      {run ? (
        <>
          <path d="M104 130 L86 152 L68 148" {...stroke} />
          <path d="M164 130 L182 146 L200 138" {...stroke} />
          <path d="M40 92 h22 M32 108 h26 M44 124 h18" {...thin} opacity={0.6} />
        </>
      ) : (
        <>
          <path d="M104 130 v22 M164 130 v22" {...stroke} />
        </>
      )}
    </g>
  );
}

/** เผ็ด phèt — Pet, panting with a flame overhead. */
function Pet({ action }: ArtProps) {
  return (
    <g>
      <Ground />
      <ellipse cx="120" cy="118" rx="46" ry="30" fill={FILL} {...stroke} />
      <circle cx="176" cy="94" r="26" fill={FILL} {...stroke} />
      <path d="M160 72 l-8-18 l20 8z M196 72 l10-18 l-20 8z" fill={FILL} {...stroke} />
      <circle cx="170" cy="90" r="3.5" fill={L} />
      <circle cx="188" cy="90" r="3.5" fill={L} />
      <ellipse cx="180" cy="104" rx="6" ry="4" fill={L} />
      <path d="M180 108 q-2 20 -14 26 q-8 4-8-8 q0-14 22-18z" fill={RED} {...stroke} />
      <path d="M78 108 q-30-8-32 12 q-2 16 20 12" fill="none" {...stroke} />
      <path d="M92 146 L86 160 M132 148 L134 160" {...stroke} />
      {action === 'burn' && (
        <path d="M176 44 q-14-14-4-30 q2 12 12 10 q-6 14 8 20 q-6 8-16 0z" fill={RED} {...stroke} />
      )}
    </g>
  );
}

/** เลี้ยว líao — Leo the lion, leaning into a turn. */
function Leo({ turn }: ArtProps) {
  const right = turn === 'right';
  return (
    <g transform={right ? '' : `translate(${PANEL_W} 0) scale(-1 1)`}>
      <Ground />
      <ellipse cx="106" cy="118" rx="46" ry="30" fill={AMBER} {...stroke} />
      <circle cx="168" cy="88" r="34" fill={FILL} {...stroke} />
      <circle cx="168" cy="88" r="23" fill={AMBER} {...stroke} />
      <circle cx="160" cy="84" r="3.5" fill={L} />
      <circle cx="178" cy="84" r="3.5" fill={L} />
      <path d="M162 98 q6 6 12 0" {...thin} />
      <path d="M146 88 h-14 M146 96 h-16 M190 88 h14 M190 96 h16" {...thin} opacity={0.6} />
      <path d="M80 140 L70 158 M124 142 L128 158" {...stroke} />
      <path d="M62 108 q-28-14-32 12" fill="none" {...stroke} />
      <path d="M212 108 l26 14 l-26 14z" fill={RED} {...stroke} />
    </g>
  );
}

/* -------------------------------------------------------------------- props */

/** ไหน nǎi — the knight at the fork. Reused on six cards. */
function Knight() {
  return (
    <g>
      <Ground />
      <path d="M60 160 L110 108 M180 160 L130 108 M120 108 v-8" {...stroke} opacity={0.45} />
      <path d="M96 148 v-42 q-8-6-8-16 q0-14 16-14 h20 q16 0 16 14 q0 10-8 16 v42" fill={FILL} {...stroke} />
      <path d="M104 76 q0-22 18-22 q18 0 18 22 v10 h-36z" fill={DEEP} {...stroke} />
      <path d="M108 66 h26" stroke={L} strokeWidth="5" strokeLinecap="round" />
      <path d="M122 54 v-14 l8 6" {...thin} />
      <path d="M140 104 L196 92" {...stroke} />
      <path d="M196 92 q14-4 16 6" {...stroke} />
      <path d="M204 52 q0-16 14-16 q14 0 14 12 q0 10-12 14 v8" stroke={AMBER} strokeWidth="7" fill="none" strokeLinecap="round" />
      <circle cx="220" cy="94" r="4.5" fill={AMBER} />
    </g>
  );
}

/** นี้ níi / นี่ nîi — a knee with a plaster. */
function Knee() {
  return (
    <g>
      <Ground />
      <path d="M92 30 q30 0 34 40 q4 34 22 50 q16 14 12 40" fill="none" stroke={L} strokeWidth="26" strokeLinecap="round" />
      <path d="M92 30 q30 0 34 40 q4 34 22 50 q16 14 12 40" fill="none" stroke={FILL} strokeWidth="20" strokeLinecap="round" />
      <rect x="112" y="82" width="46" height="26" rx="4" transform="rotate(-16 135 95)" fill={AMBER} {...thin} />
      <circle cx="128" cy="90" r="2" fill={L} />
      <circle cx="140" cy="96" r="2" fill={L} />
    </g>
  );
}

/** ไร rai / ไหร่ rài — a sheaf of rye. */
function Rye({ asking }: ArtProps) {
  return (
    <g>
      <Ground />
      <g stroke={L} strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M104 158 L96 54" />
        <path d="M130 158 L130 44" />
        <path d="M156 158 L164 58" />
      </g>
      {[
        [96, 54],
        [130, 44],
        [164, 58],
      ].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="9" ry="20" fill={AMBER} {...thin} />
          <path d={`M${x} ${y - 20} v-12`} {...thin} />
        </g>
      ))}
      <path d="M88 132 q42 12 84 0" stroke={DEEP} strokeWidth="6" fill="none" strokeLinecap="round" />
      {asking === true && (
        <>
          <path d="M204 60 q0-16 14-16 q14 0 14 12 q0 10-12 14 v8" stroke={AMBER} strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="220" cy="102" r="4.5" fill={AMBER} />
        </>
      )}
    </g>
  );
}

/** ใช่ châi — a glass of chai. */
function ChaiGlass() {
  return (
    <g>
      <Ground />
      <path d="M100 60 h70 l-10 96 h-50z" fill={FILL} {...stroke} />
      <path d="M104 90 h62 l-7 66 h-48z" fill={AMBER} opacity={0.9} />
      <path d="M170 76 q26 2 26 20 q0 18-24 20" fill="none" {...stroke} />
      <path d="M112 44 q6-14 16-6 M136 40 q6-16 16-6" {...thin} opacity={0.7} />
      <ellipse cx="135" cy="60" rx="35" ry="7" fill={FILL} {...stroke} />
    </g>
  );
}

/** ได้ dâai — a brush loaded with pink dye. */
function DyeBrush() {
  return (
    <g>
      <Ground />
      <path d="M92 44 L172 124" stroke={L} strokeWidth="10" strokeLinecap="round" />
      <path d="M78 30 q-20 10-12 28 q8 18 28 8z" fill={PINK} {...stroke} />
      <path d="M172 124 q10 16 -6 22 q-16 6-18-12z" fill={FILL} {...stroke} />
      <circle cx="70" cy="76" r="6" fill={PINK} />
      <circle cx="58" cy="98" r="4" fill={PINK} />
      <circle cx="78" cy="112" r="3" fill={PINK} />
    </g>
  );
}

/** สบาย sà-baai — a subway train at a platform. */
function Subway() {
  return (
    <g>
      <Ground />
      <rect x="44" y="52" width="150" height="86" rx="16" fill={FILL} {...stroke} />
      <rect x="60" y="68" width="44" height="30" rx="4" fill={BLUE} {...thin} />
      <rect x="118" y="68" width="28" height="30" rx="4" fill={BLUE} {...thin} />
      <rect x="158" y="68" width="24" height="30" rx="4" fill={BLUE} {...thin} />
      <circle cx="66" cy="120" r="7" fill={AMBER} {...thin} />
      <circle cx="174" cy="120" r="7" fill={AMBER} {...thin} />
      <path d="M44 138 h150" {...stroke} />
      <path d="M24 152 h224 M40 166 h192" {...stroke} opacity={0.45} />
      <path d="M206 52 v100" {...stroke} opacity={0.5} />
      <path d="M214 60 h30 M214 76 h30" {...thin} opacity={0.5} />
    </g>
  );
}

/** เอา ao — a hand snatching, thumb stubbed. */
function OwGrab() {
  return (
    <g>
      <Ground />
      <path
        d="M96 154 v-42 q-14-8-8-22 q6-12 18-4 l6 8 v-24 q0-12 12-12 t12 12 v20 q2-14 14-12 t10 14 v14 q4-10 14-6 t8 16 q0 44-32 50z"
        fill={FILL}
        {...stroke}
      />
      <circle cx="122" cy="60" r="9" fill={RED} {...thin} />
      <path d="M122 40 v-12 M100 46 l-10-10 M146 46 l10-10" {...thin} />
      <path d="M188 62 q10-6 16 2 M192 82 q12-2 16 8" {...thin} opacity={0.6} />
    </g>
  );
}

/** ตรง trong — a throng marching in one line. */
function Throng() {
  return (
    <g>
      <Ground />
      {[
        [64, 1],
        [104, 0.9],
        [144, 0.8],
        [184, 0.7],
        [220, 0.6],
      ].map(([x, o], i) => (
        <g key={i} opacity={o as number}>
          <circle cx={x as number} cy="70" r="14" fill={FILL} {...thin} />
          <path d={`M${(x as number) - 16} 158 v-42 q0-18 16-18 t16 18 v42`} fill={FILL} {...thin} />
        </g>
      ))}
      <path d="M40 172 h200" stroke={AMBER} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

/** อยู่ yùu — a finger jabbing at YOU. */
function PointYou() {
  return (
    <g>
      <Ground />
      <circle cx="140" cy="96" r="52" fill={FILL} {...stroke} />
      <circle cx="140" cy="96" r="34" fill={DEEP} {...stroke} />
      <path d="M140 62 v-30 q0-12 12-12 t12 12 v30" fill={FILL} {...stroke} />
      <path d="M108 96 q-40-6-58 10 q22 10 58 6z" fill={FILL} {...stroke} />
      <circle cx="140" cy="96" r="14" fill={FILL} {...stroke} />
    </g>
  );
}

/** ลด lót + หน่อย nòi — a boombox blaring in a parking lot. */
function BoomboxLot({ lot }: ArtProps) {
  return (
    <g>
      <Ground />
      <rect x="72" y="70" width="126" height="68" rx="8" fill={DEEP} {...stroke} />
      <circle cx="102" cy="104" r="18" fill={FILL} {...stroke} />
      <circle cx="168" cy="104" r="18" fill={FILL} {...stroke} />
      <rect x="126" y="80" width="18" height="12" rx="3" fill={AMBER} {...thin} />
      <path d="M84 70 q51-26 102 0" fill="none" {...stroke} />
      <g stroke={AMBER} strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M212 88 q12 16 0 32" />
        <path d="M228 78 q20 26 0 52" />
        <path d="M56 88 q-12 16 0 32" />
        <path d="M40 78 q-20 26 0 52" />
      </g>
      {lot !== false && (
        <>
          <path d="M28 158 h214" {...stroke} opacity={0.5} />
          <path d="M60 158 v-14 M120 158 v-14 M180 158 v-14" {...thin} opacity={0.5} />
        </>
      )}
    </g>
  );
}

/** ปาก pen — a fountain pen held up. */
function Pen() {
  return (
    <g>
      <Ground />
      <path d="M74 148 L184 38" stroke={L} strokeWidth="14" strokeLinecap="round" />
      <path d="M74 148 L184 38" stroke={BLUE} strokeWidth="9" strokeLinecap="round" />
      <path d="M182 40 l16-16 l12 12 l-16 16z" fill={AMBER} {...stroke} />
      <path d="M74 148 l-14 16 l6-22z" fill={L} {...thin} />
      <path d="M132 90 l16 16" stroke={FILL} strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

/** น้ำ náam — a numb blue tongue under a tipping glass. */
function NumbTongue() {
  return (
    <g>
      <Ground />
      <path d="M84 96 q56-16 108 0 q-6 62-54 62 q-48 0-54-62z" fill={PINK} {...stroke} />
      <path d="M138 100 v54" {...thin} opacity={0.5} />
      <path d="M92 118 q46-12 92 0 q-4 34-46 34 q-42 0-46-34z" fill={BLUE} opacity={0.55} />
      <path d="M176 44 l40-18 l14 30 l-40 18z" fill={FILL} {...stroke} />
      <path d="M190 68 q-14 18-18 30" stroke={BLUE} strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="168" cy="106" r="4" fill={BLUE} />
    </g>
  );
}

/** หยุด yùt — a palm on a stop sign. */
function StopSign() {
  return (
    <g>
      <Ground />
      <path d="M108 34 h54 l38 38 v54 l-38 38 h-54 l-38-38 v-54z" fill={RED} {...stroke} />
      <path
        d="M112 138 v-38 q0-10 9-10 t9 10 v-12 q0-10 9-10 t9 10 v6 q0-9 8-9 t8 9 v24 q0 24-22 24z"
        fill={FILL}
        {...thin}
      />
      <path d="M112 106 q-11 3-11 12 t9 15" fill={FILL} {...thin} />
    </g>
  );
}

/** ไฟ fai — a struck match. */
function Match() {
  return (
    <g>
      <Ground />
      <path d="M66 154 L166 74" stroke={FILL} strokeWidth="11" strokeLinecap="round" />
      <path d="M66 154 L166 74" stroke={L} strokeWidth="3" opacity={0.4} strokeLinecap="round" />
      <circle cx="172" cy="70" r="10" fill={L} />
      <path d="M172 60 q-16-18-4-38 q4 16 16 12 q-8 18 10 26 q-8 12-22 0z" fill={RED} {...stroke} />
      <path d="M174 42 q-6-8-2-16 q2 8 8 6 q-4 8 4 12z" fill={AMBER} />
      <path d="M198 68 q10-6 16 2 M196 90 q12-2 14 8" {...thin} opacity={0.6} />
    </g>
  );
}

/** รู้ rúu — a roo peering out of the pouch. */
function Roo() {
  return (
    <g>
      <Ground />
      <path d="M92 158 q-16-52 18-78 q26-20 50-2 q18 16 4 44 q-8 16 8 36z" fill={FILL} {...stroke} />
      <circle cx="164" cy="62" r="20" fill={FILL} {...stroke} />
      <path d="M152 44 l-4-20 l14 10z M178 44 l8-18 l-16 8z" fill={FILL} {...stroke} />
      <circle cx="170" cy="60" r="3.5" fill={L} />
      <path d="M182 68 q6 4 0 8" {...thin} />
      <path d="M96 130 q28-18 46 4 q-20 16-46-4z" fill={DEEP} {...stroke} />
      <circle cx="118" cy="132" r="10" fill={FILL} {...thin} />
      <circle cx="116" cy="130" r="2.5" fill={L} />
      <path d="M92 158 q-42 6-56-14" fill="none" {...stroke} />
    </g>
  );
}

/** โทษ thôot — burnt toast. */
function Toast() {
  return (
    <g>
      <Ground />
      <path d="M76 76 q0-26 22-26 q6-16 22-8 q14-12 26 2 q22-8 24 18 q18 4 12 22 v72 h-106z" fill={AMBER} {...stroke} />
      <path d="M172 84 q22 20 10 72 h-18z" fill={L} opacity={0.75} />
      <path d="M100 100 h48 M100 120 h30" {...thin} opacity={0.5} />
      <path d="M186 60 q10-8 14 2 M196 44 q6-10 14-2" {...thin} opacity={0.55} />
    </g>
  );
}

/** กี่ gìi — a heavy brass key. */
function Key() {
  return (
    <g>
      <Ground />
      <circle cx="82" cy="96" r="32" fill={AMBER} {...stroke} />
      <circle cx="82" cy="96" r="13" fill="none" {...stroke} />
      <path d="M114 96 h96" stroke={AMBER} strokeWidth="16" strokeLinecap="round" />
      <path d="M114 96 h96" {...stroke} fill="none" opacity={0.35} />
      <path d="M182 96 v26 M204 96 v20" stroke={AMBER} strokeWidth="12" strokeLinecap="round" />
      <path d="M182 96 v26 M204 96 v20" {...thin} opacity={0.35} />
    </g>
  );
}

/** สวัสดี sà-wàt — a figure caught mid-shrug. */
function Shrug() {
  return (
    <g>
      <Ground />
      <circle cx="134" cy="52" r="24" fill={FILL} {...stroke} />
      <circle cx="125" cy="50" r="3.5" fill={L} />
      <circle cx="145" cy="50" r="3.5" fill={L} />
      <path d="M124 62 q10 6 20 0" {...thin} />
      <path d="M112 30 q8-8 18-6 M142 24 q10 2 14 10" {...thin} opacity={0.6} />
      <path d="M108 158 v-42 q0-18 26-18 t26 18 v42" fill={FILL} {...stroke} />
      <path d="M108 100 L78 84 q-12-6-10 8" fill="none" {...stroke} />
      <path d="M62 90 q-14 4-12 16 q2 10 12 8 q10-2 8-14z" fill={FILL} {...stroke} />
      <path d="M160 100 L192 84 q12-6 10 8" fill="none" {...stroke} />
      <path d="M206 90 q14 4 12 16 q-2 10-12 8 q-10-2-8-14z" fill={FILL} {...stroke} />
    </g>
  );
}

/** ลาก่อน laa-gàwn — a cob of corn singing. */
function Corn() {
  return (
    <g>
      <Ground />
      <ellipse cx="126" cy="100" rx="30" ry="54" fill={AMBER} {...stroke} />
      <path d="M104 58 q22 12 44 0 M100 82 q26 12 52 0 M100 106 q26 12 52 0 M104 130 q22 12 44 0" {...thin} opacity={0.55} />
      <path d="M126 46 v108" {...thin} opacity={0.4} />
      <path d="M96 118 q-34 10-30 40 q26-6 34-26z" fill={GREEN} {...stroke} />
      <path d="M156 118 q34 10 30 40 q-26-6-34-26z" fill={GREEN} {...stroke} />
      <ellipse cx="126" cy="112" rx="10" ry="15" fill={L} />
      <path d="M172 52 q12-6 18 4 M186 34 q12 0 16 10 M180 76 q14 2 16 12" {...thin} opacity={0.7} />
      <path d="M212 40 v14 l10-5z" fill={L} opacity={0.6} />
    </g>
  );
}

/** อร่อย à-ròi — a royal kissing his fingertips over noodles. */
function Royal() {
  return (
    <g>
      <Ground />
      <circle cx="120" cy="66" r="28" fill={FILL} {...stroke} />
      <path d="M90 46 l6-24 l12 12 l12-18 l12 18 l12-12 l6 24z" fill={AMBER} {...stroke} />
      <circle cx="110" cy="66" r="3.5" fill={L} />
      <circle cx="132" cy="66" r="3.5" fill={L} />
      <path d="M108 80 q12 10 24 0" {...thin} />
      <path d="M148 84 q22-4 24-22" fill="none" {...stroke} />
      <path d="M172 56 q12-8 16 4 q4 12-10 12 q-12 0-6-16z" fill={FILL} {...stroke} />
      <path d="M196 42 q8-6 12 0 M204 58 q10-2 12 6" {...thin} opacity={0.6} />
      <path d="M72 128 h84 q-6 28-42 28 t-42-28z" fill={FILL} {...stroke} />
      <path d="M84 122 q6-14 14-6 M106 118 q6-16 14-6" {...thin} opacity={0.6} />
    </g>
  );
}

/** เช็คบิล chék-bin — a bill with a big red tick. */
function CheckBill() {
  return (
    <g>
      <Ground />
      <path d="M84 30 h100 v118 l-16-10 l-17 10 l-17-10 l-17 10 l-16-10z" fill={FILL} {...stroke} />
      <path d="M100 54 h68 M100 74 h68 M100 94 h44" {...thin} opacity={0.55} />
      <path d="M96 108 L128 140 L206 44" stroke={RED} strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/** เท่าไหร่ thâo-rài — a tow truck dragging a sheaf of rye. */
function TowRye() {
  return (
    <g>
      <Ground />
      <path d="M28 132 v-26 h40 l16-24 h34 v50z" fill={FILL} {...stroke} />
      <path d="M74 88 h26 v18 h-38z" fill={BLUE} {...thin} />
      <circle cx="52" cy="136" r="16" fill={DEEP} {...stroke} />
      <circle cx="102" cy="136" r="16" fill={DEEP} {...stroke} />
      <path d="M118 104 L162 122" {...stroke} />
      <g stroke={L} strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M170 148 L164 88" />
        <path d="M196 150 L198 84" />
        <path d="M222 148 L228 92" />
      </g>
      {[
        [164, 88],
        [198, 84],
        [228, 92],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="8" ry="17" fill={AMBER} {...thin} />
      ))}
      <path d="M158 136 q36 10 72 0" stroke={DEEP} strokeWidth="5" fill="none" strokeLinecap="round" />
    </g>
  );
}

/** แพงไป phaeng-pai — a pie hitting a wallet. */
function PiePang() {
  return (
    <g>
      <Ground />
      <path d="M52 104 q44-34 100 0z" fill={AMBER} {...stroke} transform="rotate(-18 102 92)" />
      <rect x="40" y="98" width="118" height="14" rx="6" fill={DEEP} {...stroke} transform="rotate(-18 102 92)" />
      <rect x="168" y="82" width="60" height="42" rx="6" fill={DEEP} {...stroke} />
      <path d="M168 98 h60" {...thin} />
      <path d="M186 74 l6 12 M206 70 l0 14 M224 76 l-6 12" {...thin} opacity={0.7} />
      <path d="M150 62 l14-16 M158 92 l22-4 M150 122 l16 14" stroke={RED} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

/** พูด phûut — a puff of air. */
function Puff({ flag }: ArtProps) {
  return (
    <g>
      <Ground />
      <path d="M56 110 q-16-32 14-44 q34-14 52 10 q22-6 30 14 q22 4 14 24 q-8 18-38 14 q-30 12-48-4 q-22 4-24-14z" fill={FILL} {...stroke} />
      <path d="M120 78 q10-8 20 0 M108 100 q14 10 28 0" {...thin} opacity={0.5} />
      <path d="M176 62 q14-8 20 4 M192 96 q16 0 18 12 M184 128 q14 4 14 16" {...thin} opacity={0.6} />
      {flag === true && (
        <>
          <rect x="176" y="30" width="66" height="42" rx="3" fill={RED} {...thin} />
          <rect x="176" y="42" width="66" height="8" fill={FILL} />
          <rect x="176" y="50" width="66" height="10" fill={BLUE} />
          <rect x="176" y="60" width="66" height="6" fill={FILL} />
          <path d="M176 30 v50" {...stroke} />
        </>
      )}
    </g>
  );
}

/** ช้าๆ cháa-cháa — two feet on numbered footprints. */
function ChaCha() {
  return (
    <g>
      <Ground />
      {[
        [70, 60, 1],
        [128, 92, 2],
        [186, 60, 3],
      ].map(([x, y, n], i) => (
        <g key={i}>
          <ellipse cx={x as number} cy={y as number} rx="18" ry="26" fill={FILL} {...stroke} />
          <text
            x={x as number}
            y={(y as number) + 6}
            textAnchor="middle"
            fontSize="20"
            fontWeight="700"
            fill={L}
          >
            {n as number}
          </text>
        </g>
      ))}
      <path d="M88 74 q18 12 24 6 M146 84 q18-12 24-8" {...thin} strokeDasharray="5 5" opacity={0.6} />
      <path d="M56 140 q34-16 72 0 t72 0" fill="none" stroke={AMBER} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

/** หิว hǐu — an axe hewing a sandwich. */
function HewSandwich() {
  return (
    <g>
      <Ground />
      <path d="M56 148 h150 l-10-24 h-130z" fill={AMBER} {...stroke} />
      <path d="M66 124 h130 l-8-18 h-114z" fill={GREEN} {...stroke} />
      <path d="M74 106 h114 l-10-22 h-94z" fill={FILL} {...stroke} />
      <path d="M80 84 q52-30 100 0z" fill={AMBER} {...stroke} />
      <path d="M148 34 L120 96" stroke={L} strokeWidth="9" strokeLinecap="round" />
      <path d="M150 32 q26-12 32 6 q-24 12-38 4z" fill={DEEP} {...stroke} />
      <path d="M100 56 l-14-10 M118 44 l-4-16" {...thin} opacity={0.6} />
    </g>
  );
}

/** ซ้าย sáai — a long sigh. */
function Sigh() {
  return (
    <g>
      <Ground />
      <path d="M64 96 q-6-22 14-22 q18 0 18 20 q0 16-16 16" fill={FILL} {...stroke} />
      <circle cx="76" cy="86" r="3" fill={L} />
      <path d="M62 104 q10 8 20 0" {...thin} />
      <g stroke={BLUE} fill="none" strokeLinecap="round" opacity={0.85}>
        <path d="M100 104 q28 6 46 20 q18 14 42 6" strokeWidth="4" />
        <path d="M104 118 q28 12 40 28" strokeWidth="3" opacity={0.6} />
        <path d="M108 92 q32-2 50-14" strokeWidth="3" opacity={0.5} />
      </g>
      <path d="M84 132 v26" {...stroke} opacity={0.5} />
    </g>
  );
}

/** ขวา khwǎa — a duck quacking to the right. */
function Duck() {
  return (
    <g>
      <Ground />
      <ellipse cx="112" cy="120" rx="48" ry="30" fill={FILL} {...stroke} />
      <path d="M74 108 q-28-16-44 6 q22 8 40 18z" fill={FILL} {...stroke} />
      <path d="M150 106 q4-38 26-40 q22-2 22 22 q0 18-16 24" fill={FILL} {...stroke} />
      <circle cx="186" cy="72" r="3.5" fill={L} />
      <path d="M200 78 L242 70 L242 92 L198 90z" fill={AMBER} {...stroke} />
      <path d="M200 84 h40" {...thin} />
      <path d="M100 150 L92 162 M132 150 L136 162" {...stroke} />
    </g>
  );
}

/** ใกล้ glâi / ไกล glai — a paper plane, landing or vanishing. */
function Glide({ far }: ArtProps) {
  const away = far === true;
  return (
    <g>
      <Ground />
      {away ? (
        <>
          <path d="M40 60 q80 20 190 44" fill="none" {...thin} strokeDasharray="7 7" opacity={0.6} />
          <path d="M28 46 L74 62 L44 72 L36 92 L26 66z" fill={FILL} {...stroke} />
          <path d="M232 106 l10 4 l-10 4 l-3-4z" fill={FILL} {...thin} />
          <circle cx="244" cy="110" r="2" fill={L} />
        </>
      ) : (
        <>
          <path d="M40 40 q70 44 106 84" fill="none" {...thin} strokeDasharray="7 7" opacity={0.6} />
          <path d="M108 84 L184 110 L134 128 L120 158 L100 116z" fill={FILL} {...stroke} />
          <path d="M120 158 L184 110" {...thin} opacity={0.5} />
          <path d="M74 154 q28-10 56 0" stroke={AMBER} strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      )}
    </g>
  );
}

/** ใหญ่ yài — one huge eye. */
function BigEye() {
  return (
    <g>
      <path d="M12 96 q123-84 246 0 q-123 84-246 0z" fill={FILL} {...stroke} />
      <circle cx="135" cy="96" r="42" fill={DEEP} {...stroke} />
      <circle cx="135" cy="96" r="20" fill={L} />
      <circle cx="122" cy="82" r="8" fill={FILL} />
      <path d="M36 52 l14 16 M92 26 l8 22 M178 26 l-8 22 M234 52 l-14 16" {...thin} opacity={0.6} />
    </g>
  );
}

/** เล็ก lék — one tiny leg on a giant palm. */
function TinyLeg() {
  return (
    <g>
      <Ground />
      <path
        d="M40 150 q-8-38 12-52 q18-12 34 4 q24-22 50-8 q28-14 46 8 q22 20 12 48z"
        fill={FILL}
        {...stroke}
      />
      <path d="M132 92 v14 q0 10 6 14 h10" fill="none" stroke={L} strokeWidth="7" strokeLinecap="round" />
      <path d="M132 92 v14 q0 10 6 14 h10" fill="none" stroke={PINK} strokeWidth="4" strokeLinecap="round" />
      <circle cx="132" cy="88" r="6" fill={PINK} {...thin} />
      <path d="M170 78 l14-14 M182 92 h20" {...thin} opacity={0.55} />
    </g>
  );
}

/** ยา yaa — a pirate shouting YAAR over a bottle of pills. */
function Pirate({ barn }: ArtProps) {
  return (
    <g>
      <Ground />
      {barn === true && (
        <>
          <path d="M148 158 v-54 l44-26 l44 26 v54z" fill={RED} {...stroke} opacity={0.85} />
          <path d="M176 158 v-38 h32 v38" fill={DEEP} {...stroke} />
          <path d="M192 78 v-16" {...thin} />
        </>
      )}
      <circle cx="88" cy="72" r="30" fill={FILL} {...stroke} />
      <path d="M56 60 q32-30 64 0 q-4-26-32-26 t-32 26z" fill={DEEP} {...stroke} />
      <path d="M58 62 h60" {...stroke} />
      <path d="M62 72 h22 l4 8 h-22z" fill={L} />
      <path d="M84 72 L118 62" {...thin} />
      <circle cx="100" cy="74" r="3.5" fill={L} />
      <path d="M84 90 q16 4 24 -2 q-4 16-16 16 q-10 0-8-14z" fill={L} {...thin} />
      <path d="M124 44 q12-8 18 2 M132 26 q12-4 18 6" {...thin} opacity={0.6} />
      <rect x="150" y="106" width="44" height="50" rx="6" fill={AMBER} {...stroke} />
      <rect x="158" y="96" width="28" height="12" rx="3" fill={DEEP} {...stroke} />
      <path d="M158 122 h28 M158 136 h28" {...thin} opacity={0.5} />
    </g>
  );
}

/** ร้อน ráwn — a prawn on a grill, or dropped in a pot. */
function Prawn({ pot }: ArtProps) {
  return (
    <g>
      <Ground />
      <path
        d="M96 66 q54-16 76 22 q18 34-14 54 q-34 22-62-4 q-24-22-6-46"
        fill="none"
        stroke={RED}
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M96 66 q54-16 76 22 q18 34-14 54 q-34 22-62-4 q-24-22-6-46"
        fill="none"
        {...thin}
        opacity={0.4}
      />
      <path d="M92 62 l-24-16 M96 54 l-6-24" {...stroke} />
      <circle cx="102" cy="72" r="4" fill={L} />
      {pot === true ? (
        <>
          <path d="M40 118 h190 l-14 46 h-162z" fill={DEEP} {...stroke} />
          <path d="M40 118 h190" stroke={L} strokeWidth="6" strokeLinecap="round" />
          <path d="M56 100 q10-16 20-4 M198 100 q12-16 20-2" {...thin} opacity={0.6} />
        </>
      ) : (
        <>
          <path d="M34 140 h202" {...stroke} />
          <path d="M46 152 h178" {...stroke} opacity={0.6} />
          <path d="M62 168 q8-14 16-4 M132 170 q8-16 16-4 M196 168 q8-14 16-4" stroke={AMBER} strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      )}
    </g>
  );
}

/* ------------------------------------------------------- remaining panel props */

function AnTile({ onKnee }: ArtProps) {
  return (
    <g>
      <Ground />
      {onKnee === true && (
        <path d="M74 26 q28 0 32 38 q4 32 20 48 q16 14 12 44" fill="none" stroke={FILL} strokeWidth="30" strokeLinecap="round" />
      )}
      <rect x="86" y="70" width="46" height="46" rx="6" fill={AMBER} {...stroke} />
      <rect x="138" y="70" width="46" height="46" rx="6" fill={AMBER} {...stroke} />
      <text x="109" y="103" textAnchor="middle" fontSize="30" fontWeight="700" fill={L}>A</text>
      <text x="161" y="103" textAnchor="middle" fontSize="30" fontWeight="700" fill={L}>N</text>
      {onKnee !== true && <path d="M60 128 h150" {...stroke} opacity={0.5} />}
    </g>
  );
}

function BagTongue() {
  return (
    <g>
      <Ground />
      <path d="M76 44 q60-18 118 0 q6 26-16 30 q-46 8-86 0 q-22-4-16-30z" fill={FILL} {...stroke} />
      <path d="M104 74 q34 40 22 76 q-8 22-26 6 q-18-18 4-82z" fill={PINK} {...stroke} />
      <path d="M112 90 q10 30 6 52" {...thin} opacity={0.45} />
      <path d="M128 128 q30-8 44 10 l6 34 h-46z" fill={BLUE} {...stroke} opacity={0.75} />
      <path d="M136 132 q14-14 26 0" fill="none" {...thin} />
    </g>
  );
}

function Barn() {
  return (
    <g>
      <Ground />
      <path d="M50 158 v-64 l84-40 l84 40 v64z" fill={RED} {...stroke} />
      <path d="M108 158 v-52 h52 v52" fill={DEEP} {...stroke} />
      <path d="M108 106 l52 52 M160 106 l-52 52" {...thin} opacity={0.5} />
      <path d="M134 54 v-16" {...thin} />
      <rect x="122" y="66" width="24" height="20" rx="3" fill={FILL} {...thin} />
    </g>
  );
}

function BootMud() {
  return (
    <g>
      <Ground />
      <path d="M96 34 h40 v70 q30 8 34 30 h-96 q-4-26 22-30z" fill={DEEP} {...stroke} />
      <path d="M96 92 h40" {...thin} opacity={0.5} />
      <path d="M40 138 q34-14 74-6 q42 8 106 0 q-6 22-34 24 h-112 q-30-2-34-18z" fill={FILL} {...stroke} />
      <path d="M60 130 q8-14 16-4 M190 128 q10-12 16-2" {...thin} opacity={0.6} />
    </g>
  );
}

function BurntMatch() {
  return (
    <g>
      <Ground />
      <path d="M50 140 L184 62" stroke={FILL} strokeWidth="12" strokeLinecap="round" />
      <path d="M50 140 L184 62" {...thin} opacity={0.35} />
      <path d="M186 60 q22-6 22 12 q0 16-18 12 q-16-4-4-24z" fill={L} />
      <path d="M196 40 q8-10 4-18 M212 46 q10-6 12-16" {...thin} opacity={0.45} />
    </g>
  );
}

function Cheer() {
  return (
    <g>
      <Ground />
      <circle cx="104" cy="80" r="34" fill={FILL} {...stroke} />
      <circle cx="92" cy="70" r="4" fill={L} />
      <circle cx="118" cy="70" r="4" fill={L} />
      <ellipse cx="106" cy="98" rx="18" ry="16" fill={L} />
      <path d="M90 92 q16-8 32 0" stroke={FILL} strokeWidth="3" fill="none" />
      <g stroke={AMBER} strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M144 78 q14 14 0 28" />
        <path d="M162 66 q24 22 0 52" />
      </g>
      <circle cx="200" cy="52" r="24" fill={RED} {...stroke} />
      <g stroke={RED} strokeWidth="4" strokeLinecap="round">
        <path d="M200 28 v-14 M180 36 l-10-10 M220 36 l10-10 M178 68 l-12 8 M222 68 l12 8" />
      </g>
      <path d="M196 76 L186 118" {...stroke} />
    </g>
  );
}

function Chew() {
  return (
    <g>
      <Ground />
      <path d="M62 62 q72-24 146 0 q10 30-18 40 q-56 12-110 0 q-28-10-18-40z" fill={FILL} {...stroke} />
      <path d="M62 102 q72 34 146 0 q-8 40-73 40 q-65 0-73-40z" fill={FILL} {...stroke} />
      <path d="M74 74 h122" {...thin} opacity={0.5} />
      <path d="M92 66 v14 M118 64 v16 M146 64 v16 M172 66 v14" {...thin} opacity={0.5} />
      <path d="M40 74 q-10 26 10 46 M226 74 q10 26-10 46" {...thin} opacity={0.6} />
    </g>
  );
}

function ChewyStuck() {
  return (
    <g>
      <Ground />
      <path d="M56 148 v-40 q-2-16 12-16 t14 16 v-12 q0-14 13-14 t13 14 v6 q0-12 12-12 t12 12 v28 q0 32-30 34z" fill={FILL} {...stroke} />
      <path d="M136 118 q46-6 60 20 q10 18 34 14" fill="none" stroke={AMBER} strokeWidth="14" strokeLinecap="round" />
      <path d="M136 118 q46-6 60 20 q10 18 34 14" fill="none" {...thin} opacity={0.4} />
      <path d="M100 40 q10-8 16 2 M124 34 q12-4 16 6" {...thin} opacity={0.6} />
    </g>
  );
}

function ChowKeys() {
  return (
    <g>
      <Ground />
      <path d="M50 96 h140 q-8 54-70 54 t-70-54z" fill={FILL} {...stroke} />
      <ellipse cx="120" cy="96" rx="70" ry="14" fill={DEEP} {...stroke} />
      <path d="M84 76 q8-16 16-4 M116 70 q8-18 16-4 M148 76 q8-16 16-4" {...thin} opacity={0.6} />
      <circle cx="196" cy="86" r="14" fill={AMBER} {...stroke} />
      <circle cx="196" cy="86" r="5" fill="none" {...thin} />
      <path d="M210 86 h34" stroke={AMBER} strokeWidth="8" strokeLinecap="round" />
      <path d="M232 86 v12 M244 86 v10" stroke={AMBER} strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

function ClockMoan() {
  return (
    <g>
      <Ground />
      <circle cx="180" cy="66" r="42" fill={FILL} {...stroke} />
      <circle cx="180" cy="66" r="4" fill={L} />
      <path d="M180 66 V38 M180 66 l22 14" {...stroke} />
      <path d="M180 24 v-8 M222 66 h8 M180 108 v8 M138 66 h-8" {...thin} opacity={0.6} />
      <circle cx="80" cy="76" r="26" fill={FILL} {...stroke} />
      <circle cx="72" cy="70" r="3.5" fill={L} />
      <circle cx="90" cy="70" r="3.5" fill={L} />
      <ellipse cx="80" cy="90" rx="10" ry="8" fill={L} />
      <path d="M62 96 L52 158 M98 96 L106 158" {...stroke} />
      <path d="M56 44 h16 M88 44 h16" {...thin} />
      <path d="M112 40 q10-6 14 2 M120 24 q10-2 14 6" {...thin} opacity={0.6} />
    </g>
  );
}

function CoinBat() {
  return (
    <g>
      <Ground />
      <path d="M42 148 L74 116" stroke={L} strokeWidth="10" strokeLinecap="round" />
      <path d="M74 116 q34-40 76-56 q18-6 20 12 q2 18-40 44 q-34 22-56 0z" fill={FILL} {...stroke} />
      <ellipse cx="176" cy="46" rx="26" ry="9" fill={AMBER} {...stroke} />
      <ellipse cx="176" cy="34" rx="26" ry="9" fill={AMBER} {...stroke} />
      <ellipse cx="176" cy="22" rx="26" ry="9" fill={AMBER} {...stroke} />
    </g>
  );
}

function Dawn() {
  return (
    <g>
      <path d="M28 136 h214" {...stroke} />
      <path d="M134 136 a44 44 0 0 1 88 0z" fill={AMBER} {...stroke} transform="translate(-44 0)" />
      <g stroke={AMBER} strokeWidth="4" strokeLinecap="round">
        <path d="M134 62 v-24 M76 84 l-18-18 M192 84 l18-18 M52 130 h-24 M216 130 h24" />
      </g>
      <path d="M40 158 q46-14 94 0 q46 14 94 0" fill="none" {...stroke} opacity={0.45} />
    </g>
  );
}

function DoughSink() {
  return (
    <g>
      <Ground />
      <path d="M36 152 q-6-52 38-64 q40-12 62 8 q42-16 72 14 q26 26 12 42z" fill={FILL} {...stroke} />
      <path d="M132 106 v-46 M152 108 v-42 M172 112 v-36" stroke={L} strokeWidth="9" strokeLinecap="round" />
      <path d="M120 112 q20-10 62-4" fill="none" {...thin} opacity={0.5} />
      <path d="M70 118 q10-8 16 2 M96 108 q10-6 14 4" {...thin} opacity={0.45} />
    </g>
  );
}

function EngineBlock() {
  return (
    <g>
      <Ground />
      <rect x="60" y="76" width="130" height="76" rx="6" fill={DEEP} {...stroke} />
      <rect x="76" y="44" width="26" height="34" rx="4" fill={FILL} {...stroke} />
      <rect x="112" y="34" width="26" height="44" rx="4" fill={FILL} {...stroke} />
      <rect x="148" y="44" width="26" height="34" rx="4" fill={FILL} {...stroke} />
      <path d="M60 104 h130 M60 126 h130" {...thin} opacity={0.45} />
      <circle cx="196" cy="120" r="20" fill={FILL} {...stroke} />
      <circle cx="196" cy="120" r="7" fill={L} />
      <path d="M42 96 h18 M42 132 h18" {...stroke} />
    </g>
  );
}

function FeltMark() {
  return (
    <g>
      <rect x="60" y="24" width="150" height="140" rx="5" fill={FILL} {...stroke} />
      <path d="M76 60 h118 M76 82 h118 M76 104 h80" {...thin} opacity={0.4} />
      <path d="M22 96 q112-34 226 12" fill="none" stroke={AMBER} strokeWidth="22" strokeLinecap="round" />
    </g>
  );
}

function FullImp() {
  return (
    <g>
      <Ground />
      <ellipse cx="130" cy="112" rx="52" ry="44" fill={FILL} {...stroke} />
      <circle cx="130" cy="52" r="26" fill={FILL} {...stroke} />
      <path d="M108 34 l-6-18 l18 10z M152 34 l6-18 l-18 10z" fill={RED} {...stroke} />
      <circle cx="121" cy="50" r="3.5" fill={L} />
      <circle cx="139" cy="50" r="3.5" fill={L} />
      <path d="M120 64 q10 8 20 0" {...thin} />
      <path d="M118 108 q12 10 24 0" {...thin} opacity={0.5} />
      <path d="M78 108 q-14 8-10 22 M182 108 q14 8 10 22" fill="none" {...stroke} />
      <path d="M186 140 q22 4 26-14" fill="none" {...thin} />
    </g>
  );
}

function GinGlass() {
  return (
    <g>
      <Ground />
      <path d="M74 44 h112 l-50 56 v46 h26 v14 h-64 v-14 h26 v-46z" fill={FILL} {...stroke} />
      <path d="M92 60 h76 l-32 36 z" fill={BLUE} opacity={0.55} />
      <circle cx="150" cy="72" r="7" fill={GREEN} {...thin} />
    </g>
  );
}

function Glub() {
  return (
    <g>
      <path d="M20 40 q42 16 84 0 q42-16 84 0 q30 12 46 0" fill="none" stroke={BLUE} strokeWidth="4" strokeLinecap="round" opacity={0.7} />
      <circle cx="128" cy="106" r="40" fill="none" stroke={BLUE} strokeWidth="5" />
      <circle cx="112" cy="90" r="10" fill={BLUE} opacity={0.45} />
      <circle cx="76" cy="150" r="14" fill="none" stroke={BLUE} strokeWidth="4" />
      <circle cx="186" cy="146" r="9" fill="none" stroke={BLUE} strokeWidth="4" />
      <circle cx="150" cy="170" r="6" fill="none" stroke={BLUE} strokeWidth="3" />
    </g>
  );
}

function Gong() {
  return (
    <g>
      <Ground />
      <path d="M62 22 h116 M70 22 v14 M170 22 v14" {...stroke} />
      <circle cx="120" cy="94" r="56" fill={AMBER} {...stroke} />
      <circle cx="120" cy="94" r="24" fill="none" {...stroke} opacity={0.6} />
      <path d="M120 36 v-14 M100 36 l-30-8 M140 36 l30-8" {...thin} opacity={0.6} />
      <path d="M198 118 L232 96" stroke={L} strokeWidth="8" strokeLinecap="round" />
      <circle cx="192" cy="122" r="14" fill={DEEP} {...stroke} />
      <g stroke={RED} strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M186 44 q14-10 24 2" />
        <path d="M198 26 q22-10 34 6" />
      </g>
    </g>
  );
}

function GuyHen() {
  return (
    <g>
      <Ground />
      <circle cx="104" cy="70" r="26" fill={FILL} {...stroke} />
      <path d="M74 54 h60 q4-18-30-18 t-30 18z" fill={DEEP} {...stroke} />
      <path d="M74 54 h-16" {...stroke} />
      <circle cx="96" cy="70" r="3.5" fill={L} />
      <circle cx="114" cy="70" r="3.5" fill={L} />
      <path d="M96 84 q10 6 18 0" {...thin} />
      <path d="M76 158 v-42 q0-20 28-20 t28 20 v42" fill={FILL} {...stroke} />
      <path d="M80 122 q26 16 48 0" fill="none" {...thin} opacity={0.5} />
      <ellipse cx="190" cy="106" rx="34" ry="26" fill={FILL} {...stroke} />
      <circle cx="212" cy="78" r="18" fill={FILL} {...stroke} />
      <path d="M206 60 q6-14 12 0 q-6 4-12 0z" fill={RED} {...thin} />
      <circle cx="218" cy="74" r="3" fill={L} />
      <path d="M228 84 l16 4 l-16 6z" fill={AMBER} {...thin} />
      <path d="M162 116 q-14 6-14 20" fill="none" {...thin} />
    </g>
  );
}

function HelmetSigh() {
  return (
    <g>
      <Ground />
      <path d="M62 130 q-4-72 62-72 q66 0 62 72z" fill={RED} {...stroke} />
      <path d="M84 96 q40-16 84 0 l-6 26 h-72z" fill={DEEP} {...stroke} />
      <path d="M62 130 h124 v14 h-124z" fill={FILL} {...stroke} />
      <g stroke={BLUE} fill="none" strokeLinecap="round" opacity={0.85}>
        <path d="M190 112 q28 4 40 18" strokeWidth="4" />
        <path d="M192 128 q24 10 30 24" strokeWidth="3" opacity={0.6} />
      </g>
    </g>
  );
}

function HenLayO() {
  return (
    <g>
      <Ground />
      <ellipse cx="112" cy="86" rx="46" ry="34" fill={FILL} {...stroke} />
      <circle cx="152" cy="52" r="20" fill={FILL} {...stroke} />
      <path d="M146 32 q6-16 14 0 q-6 6-14 0z" fill={RED} {...thin} />
      <circle cx="158" cy="48" r="3.5" fill={L} />
      <path d="M170 58 l16 4 l-16 7z" fill={AMBER} {...thin} />
      <path d="M70 76 q-24 10-18 32 q16 4 30-10z" fill={DEEP} {...stroke} />
      <path d="M100 120 v20 M126 120 v20" {...stroke} />
      <ellipse cx="176" cy="132" rx="24" ry="30" fill={FILL} {...stroke} />
      <text x="176" y="144" textAnchor="middle" fontSize="30" fontWeight="700" fill={L}>O</text>
    </g>
  );
}

function Hong({ wang }: ArtProps) {
  return (
    <g>
      <path d="M34 158 v-70 h26 v70z" fill={DEEP} {...stroke} />
      <path d="M70 158 v-106 h30 v106z" fill={FILL} {...stroke} />
      <path d="M110 158 v-84 h24 v84z" fill={DEEP} {...stroke} />
      <path d="M144 158 v-124 h32 v124z" fill={FILL} {...stroke} />
      <path d="M186 158 v-62 h26 v62z" fill={DEEP} {...stroke} />
      <g fill={AMBER} opacity={0.85}>
        <rect x="78" y="66" width="7" height="9" />
        <rect x="88" y="84" width="7" height="9" />
        <rect x="152" y="48" width="7" height="9" />
        <rect x="164" y="70" width="7" height="9" />
        <rect x="118" y="90" width="7" height="9" />
      </g>
      {wang === true ? (
        <>
          <rect x="96" y="14" width="80" height="34" rx="3" fill={FILL} {...stroke} transform="rotate(-8 136 31)" />
          <path d="M136 48 v14" {...thin} />
          <g stroke={RED} strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M186 20 q12-8 20 4" />
            <path d="M198 6 q18-4 26 10" />
          </g>
        </>
      ) : (
        <>
          <path d="M20 158 q40-18 80 0 q40 18 80 0 q34-14 70 2 v10 h-230z" fill={BLUE} opacity={0.5} />
          <path d="M20 146 q40-16 80 0 q40 16 80 0 q34-14 70 2" fill="none" stroke={BLUE} strokeWidth="4" strokeLinecap="round" />
        </>
      )}
    </g>
  );
}

function Jay() {
  return (
    <g>
      <Ground />
      <circle cx="130" cy="124" r="34" fill={GREEN} {...stroke} />
      <path d="M104 100 q26-24 52 0" fill="none" {...thin} opacity={0.6} />
      <path d="M130 90 v-10" {...thin} />
      <ellipse cx="150" cy="66" rx="34" ry="24" fill={BLUE} {...stroke} />
      <circle cx="182" cy="46" r="18" fill={BLUE} {...stroke} />
      <path d="M176 28 l4-16 l10 12z" fill={BLUE} {...stroke} />
      <circle cx="188" cy="42" r="3.5" fill={L} />
      <path d="M198 50 l20 4 l-20 7z" fill={L} {...thin} />
      <path d="M120 70 q-32 6-38 24 q26 4 40-8z" fill={BLUE} {...stroke} />
    </g>
  );
}

function JerryCan() {
  return (
    <g>
      <Ground />
      <path d="M74 46 h94 q10 0 10 10 v92 q0 10-10 10h-94 q-10 0-10-10v-92 q0-10 10-10z" fill={RED} {...stroke} />
      <path d="M92 66 v72 M124 60 v78 M156 66 v72" {...thin} opacity={0.45} />
      <path d="M84 46 q0-14 12-14 h50 q12 0 12 14" fill="none" {...stroke} />
      <rect x="176" y="52" width="24" height="18" rx="4" fill={DEEP} {...stroke} />
      <path d="M188 52 v-14 l16-6" {...stroke} />
    </g>
  );
}

function Jot() {
  return (
    <g>
      <Ground />
      <rect x="46" y="48" width="118" height="106" rx="5" fill={FILL} {...stroke} />
      <path d="M46 68 h118" {...thin} opacity={0.4} />
      <circle cx="72" cy="58" r="4" fill={L} />
      <circle cx="104" cy="58" r="4" fill={L} />
      <circle cx="136" cy="58" r="4" fill={L} />
      <path d="M64 106 q34-14 74 6" fill="none" stroke={BLUE} strokeWidth="5" strokeLinecap="round" />
      <path d="M132 128 L214 40" stroke={L} strokeWidth="10" strokeLinecap="round" />
      <path d="M212 38 l14-14 l10 10 l-14 14z" fill={AMBER} {...stroke} />
      <path d="M132 128 l-12 14 l4-20z" fill={L} {...thin} />
    </g>
  );
}

function Kite() {
  return (
    <g>
      <path d="M144 20 L206 62 L162 100 L112 66z" fill={RED} {...stroke} transform="rotate(150 156 60)" />
      <path d="M150 96 q-26 22-58 20 q-24-2-40 24" fill="none" {...thin} strokeDasharray="6 6" opacity={0.7} />
      <path d="M152 88 q-8 22-24 30 q10-22 4-34z" fill={AMBER} {...thin} />
      <path d="M60 152 q-14 6-22-2" {...thin} opacity={0.6} />
      <path d="M186 30 q10-8 16 2 M204 46 q10-4 14 6" {...thin} opacity={0.5} />
    </g>
  );
}

function MaJack() {
  return (
    <g>
      <Ground />
      <rect x="98" y="24" width="94" height="52" rx="6" fill={DEEP} {...stroke} />
      <path d="M110 24 q0-12 12-12 h48 q12 0 12 12" fill="none" {...stroke} />
      <path d="M118 82 L146 106 L118 130 M172 82 L146 106 L172 130" fill="none" {...stroke} />
      <path d="M146 106 v-30 M146 106 v42" {...thin} />
      <path d="M118 148 h56" {...stroke} />
      <circle cx="60" cy="70" r="22" fill={FILL} {...stroke} />
      <path d="M38 62 q22-24 44 0 q-4-18-22-18 t-22 18z" fill={DEEP} {...stroke} />
      <circle cx="53" cy="70" r="3" fill={L} />
      <circle cx="68" cy="70" r="3" fill={L} />
      <path d="M42 158 v-40 q0-18 18-18 t18 18 v40" fill={FILL} {...stroke} />
      <path d="M78 116 L112 118" {...stroke} />
    </g>
  );
}

function Meter() {
  return (
    <g>
      <Ground />
      <rect x="58" y="46" width="140" height="82" rx="8" fill={DEEP} {...stroke} />
      <rect x="76" y="62" width="104" height="42" rx="4" fill={L} opacity={0.85} />
      <text x="128" y="94" textAnchor="middle" fontSize="30" fontWeight="700" fill={AMBER}>35</text>
      <circle cx="90" cy="116" r="5" fill={RED} />
      <circle cx="112" cy="116" r="5" fill={GREEN} />
      <path d="M100 128 v22 M156 128 v22" {...stroke} />
      <path d="M76 150 h104" {...stroke} opacity={0.5} />
    </g>
  );
}

function Mower({ van }: ArtProps) {
  if (van === true) {
    return (
      <g>
        <Ground />
        <path d="M34 132 v-70 h108 l34 34 h30 v36z" fill={FILL} {...stroke} />
        <path d="M146 74 h22 l18 18 h-40z" fill={BLUE} {...thin} />
        <path d="M34 62 v70" {...stroke} />
        <path d="M38 66 h44 v62 h-44z" fill={DEEP} {...thin} />
        <path d="M92 66 h44 v62 h-44z" fill={DEEP} {...thin} />
        <path d="M34 132 L4 158 h60z" fill={DEEP} {...stroke} />
        <circle cx="88" cy="136" r="17" fill={DEEP} {...stroke} />
        <circle cx="184" cy="136" r="17" fill={DEEP} {...stroke} />
      </g>
    );
  }
  return (
    <g>
      <Ground />
      <path d="M60 138 v-40 h96 v40z" fill={DEEP} {...stroke} />
      <path d="M156 118 q34-6 40-34" fill="none" stroke={L} strokeWidth="7" strokeLinecap="round" />
      <path d="M186 82 h30" {...stroke} />
      <path d="M56 98 q52-26 104 0z" fill={FILL} {...stroke} />
      <circle cx="82" cy="146" r="14" fill={FILL} {...stroke} />
      <circle cx="140" cy="146" r="14" fill={FILL} {...stroke} />
      <path d="M64 88 q12-12 24-2 M110 84 q12-12 24-2" {...thin} opacity={0.5} />
      <path d="M28 158 q10-16 18-2 M198 158 q10-16 18-2" stroke={GREEN} strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  );
}

function NowWatch() {
  return (
    <g>
      <Ground />
      <circle cx="118" cy="88" r="48" fill={FILL} {...stroke} />
      <circle cx="118" cy="88" r="38" fill={DEEP} {...stroke} />
      <path d="M118 88 V60 M118 88 l24 12" stroke={L} strokeWidth="4" strokeLinecap="round" />
      <path d="M96 44 v-26 h44 v26 M96 132 v26 h44 v-26" fill={DEEP} {...stroke} />
      <g stroke={BLUE} strokeWidth="3" strokeLinecap="round" opacity={0.9}>
        <path d="M84 58 l-12-10 M152 58 l12-10 M84 118 l-12 10 M152 118 l12 10 M118 40 v-12 M118 136 v12" />
      </g>
      <path d="M232 96 q-46-8-72 0" stroke={L} strokeWidth="16" strokeLinecap="round" fill="none" />
      <path d="M166 96 l-14 0" stroke={FILL} strokeWidth="16" strokeLinecap="round" />
    </g>
  );
}

function NumbKanga() {
  return (
    <g>
      <Ground />
      <path d="M84 158 q-14-50 18-74 q26-20 48-4 q16 14 4 40 q-8 16 6 38z" fill={FILL} {...stroke} />
      <circle cx="158" cy="60" r="20" fill={FILL} {...stroke} />
      <path d="M146 42 l-4-20 l14 10z M172 42 l8-18 l-16 8z" fill={FILL} {...stroke} />
      <circle cx="164" cy="58" r="3.5" fill={L} />
      <path d="M172 70 q10 14 -2 20 q-10 4-10-10z" fill={BLUE} {...thin} />
      <path d="M84 158 q-40 6-52-14" fill="none" {...stroke} />
      <rect x="182" y="102" width="40" height="40" rx="5" fill={BLUE} opacity={0.6} {...stroke} />
      <path d="M190 112 l10 10 M212 110 l-12 14" stroke={FILL} strokeWidth="3" strokeLinecap="round" />
      <path d="M156 124 L182 122" {...stroke} />
    </g>
  );
}

function One() {
  return (
    <g>
      <Ground />
      <path d="M96 54 L134 30 v118" stroke={L} strokeWidth="18" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M96 148 h78" stroke={AMBER} strokeWidth="12" strokeLinecap="round" />
    </g>
  );
}

function Owl() {
  return (
    <g>
      <Ground />
      <ellipse cx="130" cy="106" rx="52" ry="56" fill={FILL} {...stroke} />
      <path d="M84 62 l6-26 l24 16z M176 62 l-6-26 l-24 16z" fill={FILL} {...stroke} />
      <circle cx="108" cy="88" r="20" fill={DEEP} {...stroke} />
      <circle cx="152" cy="88" r="20" fill={DEEP} {...stroke} />
      <path d="M94 88 h28 M138 88 h28" stroke={L} strokeWidth="4" strokeLinecap="round" />
      <path d="M130 100 l-9 14 h18z" fill={AMBER} {...thin} />
      <path d="M104 132 q26 14 52 0" {...thin} opacity={0.5} />
      <path d="M112 162 h-14 M148 162 h14" {...stroke} />
      <path d="M188 56 q12-10 20 2" {...thin} opacity={0.6} />
    </g>
  );
}

function Pa() {
  return (
    <g>
      <Ground />
      <circle cx="132" cy="66" r="28" fill={FILL} {...stroke} />
      <path d="M100 50 h64 q4-20-32-20 t-32 20z" fill={DEEP} {...stroke} />
      <path d="M100 50 h-18" {...stroke} />
      <circle cx="123" cy="66" r="3.5" fill={L} />
      <circle cx="143" cy="66" r="3.5" fill={L} />
      <path d="M122 82 h20" {...thin} />
      <path d="M100 158 v-42 q0-22 32-22 t32 22 v42" fill={FILL} {...stroke} />
      <path d="M100 118 q32 20 64 0" fill="none" {...stroke} />
      <path d="M108 130 h48" {...thin} opacity={0.4} />
    </g>
  );
}

function PalmTree() {
  return (
    <g>
      <path d="M28 158 h214" {...stroke} opacity={0.4} />
      <circle cx="60" cy="52" r="26" fill={AMBER} opacity={0.6} />
      <path d="M158 158 q-14-58 6-96" fill="none" stroke={DEEP} strokeWidth="12" strokeLinecap="round" />
      <path d="M162 74 q-4-8-2-14" {...thin} opacity={0.5} />
      <g fill={GREEN} stroke={L} strokeWidth="2" strokeLinejoin="round">
        <path d="M164 60 q-40-16-58 6 q34-2 58-6z" />
        <path d="M164 60 q-22-38-52-34 q28 12 52 34z" />
        <path d="M166 60 q34-28 62-12 q-34 0-62 12z" />
        <path d="M166 60 q28 8 36 32 q-18-20-36-32z" />
        <path d="M164 58 q4-30 26-40 q-14 22-26 40z" />
      </g>
      <circle cx="164" cy="60" r="6" fill={DEEP} {...thin} />
    </g>
  );
}

function Pendulum() {
  return (
    <g>
      <path d="M78 14 h84 v144 h-84z" fill={FILL} {...stroke} />
      <circle cx="120" cy="46" r="20" fill={DEEP} {...stroke} />
      <path d="M120 46 v-12 M120 46 l10 6" stroke={L} strokeWidth="3" strokeLinecap="round" />
      <path d="M120 66 L166 126" {...stroke} />
      <circle cx="170" cy="132" r="16" fill={AMBER} {...stroke} />
      <path d="M120 66 L74 126" fill="none" {...thin} strokeDasharray="5 5" opacity={0.4} />
      <g stroke={L} strokeWidth="3" fill="none" strokeLinecap="round" opacity={0.6}>
        <path d="M192 108 q10-6 16 2" />
        <path d="M200 92 q14-6 20 4" />
      </g>
    </g>
  );
}

function PigMoo() {
  return (
    <g>
      <Ground />
      <ellipse cx="112" cy="116" rx="50" ry="34" fill={PINK} {...stroke} />
      <circle cx="164" cy="88" r="26" fill={PINK} {...stroke} />
      <path d="M148 66 l-6-16 l18 6z M182 66 l6-16 l-18 6z" fill={PINK} {...stroke} />
      <circle cx="158" cy="84" r="3.5" fill={L} />
      <ellipse cx="184" cy="96" rx="12" ry="9" fill={RED} {...stroke} />
      <circle cx="180" cy="96" r="2" fill={L} />
      <circle cx="188" cy="96" r="2" fill={L} />
      <path d="M64 108 q-16 6-8 20" fill="none" {...stroke} />
      <path d="M92 148 v12 M132 150 v10" {...stroke} />
      <path d="M218 78 v-30" {...stroke} />
      <ellipse cx="218" cy="40" rx="14" ry="20" fill={DEEP} {...stroke} />
      <path d="M204 108 q12-10 18 0" {...thin} opacity={0.6} />
      <path d="M198 62 q10-8 16 0" {...thin} opacity={0.5} />
    </g>
  );
}

function Plough() {
  return (
    <g>
      <path d="M20 116 q56-14 112 0 q56 14 108 0" fill="none" {...stroke} opacity={0.4} />
      <path d="M20 138 q56-14 112 0 q56 14 108 0" fill="none" {...stroke} opacity={0.4} />
      <path d="M20 160 q56-14 112 0 q56 14 108 0" fill="none" {...stroke} opacity={0.4} />
      <path d="M108 34 L152 96" stroke={L} strokeWidth="8" strokeLinecap="round" />
      <path d="M108 34 q-26-8-34 6" fill="none" {...stroke} />
      <path d="M152 96 q30 8 30 34 l-46 6 q-16-24 16-40z" fill={DEEP} {...stroke} />
      <circle cx="98" cy="112" r="20" fill={FILL} {...stroke} />
      <path d="M118 106 L142 92" {...stroke} />
    </g>
  );
}

function RapBat() {
  return (
    <g>
      <Ground />
      <circle cx="98" cy="70" r="28" fill={FILL} {...stroke} />
      <path d="M66 58 h64 v-8 q0-16-32-16 t-32 16z" fill={DEEP} {...stroke} />
      <path d="M130 50 h22" {...stroke} />
      <circle cx="90" cy="70" r="3.5" fill={L} />
      <circle cx="108" cy="70" r="3.5" fill={L} />
      <ellipse cx="100" cy="86" rx="11" ry="9" fill={L} />
      <path d="M70 158 v-42 q0-22 28-22 t28 22 v42" fill={FILL} {...stroke} />
      <path d="M126 116 L162 96" {...stroke} />
      <path d="M162 96 q32-38 58-56 q14-8 16 8 q2 16-34 40 q-28 18-40 8z" fill={AMBER} {...stroke} />
      <g stroke={L} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity={0.55}>
        <path d="M56 60 q-12-8-12-20" />
        <path d="M44 78 q-16-4-20-16" />
      </g>
    </g>
  );
}

function RashPear() {
  return (
    <g>
      <Ground />
      <path d="M132 40 q10 22 24 38 q22 26 6 52 q-16 26-46 26 q-30 0-44-24 q-14-26 8-52 q18-20 22-40z" fill={GREEN} {...stroke} />
      <path d="M132 40 v-20" {...stroke} />
      <path d="M132 26 q22-14 34 2 q-22 10-34-2z" fill={GREEN} {...stroke} />
      <g fill={RED}>
        <circle cx="106" cy="96" r="6" />
        <circle cx="132" cy="112" r="7" />
        <circle cx="118" cy="132" r="5" />
        <circle cx="150" cy="94" r="5" />
        <circle cx="146" cy="130" r="6" />
        <circle cx="96" cy="122" r="4" />
      </g>
    </g>
  );
}

function Rev() {
  return (
    <g>
      <Ground />
      <path d="M96 96 h96" stroke={L} strokeWidth="14" strokeLinecap="round" />
      <rect x="150" y="80" width="52" height="32" rx="14" fill={DEEP} {...stroke} />
      <path d="M162 80 v32 M176 80 v32 M190 80 v32" {...thin} opacity={0.45} />
      <path d="M96 96 q-16-4-16-20" fill="none" {...stroke} />
      <path d="M204 96 q18 0 22 14" fill="none" {...stroke} />
      <g stroke={AMBER} strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M60 66 h-38 M70 96 h-50 M60 126 h-38" />
      </g>
      <g stroke={L} strokeWidth="3" fill="none" strokeLinecap="round" opacity={0.5}>
        <path d="M208 60 q12-10 8-22" />
        <path d="M224 74 q16-6 18-20" />
      </g>
    </g>
  );
}

function RotApple() {
  return (
    <g>
      <Ground />
      <path d="M130 54 q34-14 50 12 q16 26-2 58 q-16 28-48 26 q-32 2-48-26 q-18-32-2-58 q16-26 50-12z" fill={RED} {...stroke} />
      <path d="M130 54 v-20 q0-10 12-14" fill="none" {...stroke} />
      <path d="M142 34 q22-12 30 4 q-20 10-30-4z" fill={GREEN} {...thin} />
      <path d="M96 100 q22-16 40 4 q18 20 4 40 q-24 12-42-8 q-14-18-2-36z" fill={DEEP} opacity={0.85} />
      <path d="M148 82 q14 8 12 22" {...thin} opacity={0.5} />
      <path d="M74 154 q18 8 34 4" {...thin} opacity={0.4} />
    </g>
  );
}

function Songbird() {
  return (
    <g>
      <Ground />
      <ellipse cx="106" cy="112" rx="38" ry="28" fill={AMBER} {...stroke} />
      <circle cx="142" cy="86" r="20" fill={AMBER} {...stroke} />
      <circle cx="148" cy="82" r="3.5" fill={L} />
      <path d="M160 90 l20 6 l-20 6z" fill={DEEP} {...stroke} />
      <path d="M84 100 q-26-12-40 6 q20 6 32 16z" fill={DEEP} {...stroke} />
      <path d="M76 132 q-28 10-32 26" fill="none" {...stroke} />
      <path d="M104 140 v16 M122 140 v16" {...stroke} />
      <path d="M60 158 h140" {...stroke} opacity={0.4} />
      <g stroke={L} strokeWidth="3" fill="none">
        <path d="M196 62 v-30 l16-6 v30" />
        <circle cx="192" cy="64" r="6" fill={L} />
        <circle cx="208" cy="58" r="6" fill={L} />
        <path d="M226 96 v-22" />
        <circle cx="222" cy="98" r="5" fill={L} />
      </g>
    </g>
  );
}

function Spring() {
  return (
    <g>
      <Ground />
      <path
        d="M64 148 q64-16 0-30 q64-16 0-30 q64-16 0-30 q54-14 20-28"
        fill="none"
        {...stroke}
        strokeWidth="6"
      />
      <path d="M40 158 h58" {...stroke} />
      <path d="M96 32 l24-18 M112 44 l30-10" {...thin} opacity={0.6} />
      <path d="M152 30 q12-10 20 2 M170 12 q14-4 18 8" {...thin} opacity={0.55} />
      <path d="M196 44 l14-12 l6 16z" fill={AMBER} {...thin} />
    </g>
  );
}

function TapeMeasure() {
  return (
    <g>
      <Ground />
      <rect x="24" y="76" width="52" height="48" rx="8" fill={RED} {...stroke} />
      <circle cx="50" cy="100" r="12" fill={FILL} {...stroke} />
      <path d="M76 90 h158 v22 h-158z" fill={AMBER} {...stroke} />
      <g stroke={L} strokeWidth="2" strokeLinecap="round">
        <path d="M96 90 v12 M116 90 v8 M136 90 v12 M156 90 v8 M176 90 v12 M196 90 v8 M216 90 v12" />
      </g>
      <path d="M234 84 v34" {...stroke} />
    </g>
  );
}

function Taxi() {
  return (
    <g>
      <Ground />
      <path d="M32 132 v-28 h30 l24-32 h96 l20 32 h32 v28z" fill={AMBER} {...stroke} />
      <path d="M92 78 h34 v26 h-52z" fill={BLUE} {...thin} />
      <path d="M138 78 h32 l16 26 h-48z" fill={BLUE} {...thin} />
      <rect x="98" y="50" width="60" height="20" rx="5" fill={FILL} {...stroke} />
      <text x="128" y="66" textAnchor="middle" fontSize="15" fontWeight="700" fill={L}>TAXI</text>
      <circle cx="74" cy="134" r="18" fill={DEEP} {...stroke} />
      <circle cx="184" cy="134" r="18" fill={DEEP} {...stroke} />
      <path d="M96 116 h68" {...thin} opacity={0.45} />
    </g>
  );
}

function TeaSpot() {
  return (
    <g>
      <Ground />
      <path d="M70 62 h84 l-10 60 h-64z" fill={FILL} {...stroke} />
      <path d="M154 76 q28 2 28 20 q0 18-26 20" fill="none" {...stroke} />
      <ellipse cx="112" cy="62" rx="42" ry="9" fill={AMBER} {...stroke} />
      <ellipse cx="112" cy="128" rx="56" ry="12" fill={FILL} {...stroke} />
      <path d="M86 40 q6-14 16-6 M118 36 q6-16 16-6" {...thin} opacity={0.6} />
      <path d="M56 138 L92 158 M92 138 L56 158" stroke={RED} strokeWidth="6" strokeLinecap="round" />
      <path d="M148 140 L184 158 M184 140 L148 158" stroke={RED} strokeWidth="6" strokeLinecap="round" opacity={0.5} />
    </g>
  );
}

function Thong() {
  return (
    <g>
      <Ground />
      <path d="M70 148 q-14-52 12-88 q22-30 48-6 q22 22 8 62 q-8 24-34 32 q-26 6-34 0z" fill={BLUE} {...stroke} />
      <path d="M96 62 q22-24 40-2" fill="none" stroke={L} strokeWidth="6" strokeLinecap="round" />
      <path d="M118 60 v18" stroke={L} strokeWidth="6" strokeLinecap="round" />
      <path d="M148 68 l22-14 M156 84 l26 4" stroke={RED} strokeWidth="4" strokeLinecap="round" />
      <path d="M186 60 q18-10 26 4 q-18 8-26-4z" fill={BLUE} {...thin} />
    </g>
  );
}

function Tick() {
  return (
    <g>
      <Ground />
      <ellipse cx="132" cy="106" rx="44" ry="36" fill={DEEP} {...stroke} />
      <circle cx="132" cy="66" r="18" fill={DEEP} {...stroke} />
      <circle cx="126" cy="62" r="3" fill={L} />
      <circle cx="140" cy="62" r="3" fill={L} />
      <path d="M132 48 v-12" {...thin} />
      <g stroke={L} strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M92 86 L60 66 M88 106 L52 104 M94 128 L62 144" />
        <path d="M172 86 L204 66 M176 106 L212 104 M170 128 L202 144" />
      </g>
      <path d="M124 96 q8 10 16 0" {...thin} opacity={0.5} />
      <path d="M30 158 h204" {...stroke} opacity={0.35} />
    </g>
  );
}

function TinyKnit() {
  return (
    <g>
      <Ground />
      <path d="M28 140 q54-14 108 0 q54 14 106 0" fill="none" {...stroke} opacity={0.3} />
      <rect x="108" y="84" width="46" height="42" rx="4" fill={PINK} {...stroke} />
      <g stroke={L} strokeWidth="1.5" opacity={0.6}>
        <path d="M108 96 h46 M108 108 h46 M108 120 h46 M120 84 v42 M132 84 v42 M142 84 v42" />
      </g>
      <path d="M96 76 L172 130" stroke={L} strokeWidth="4" strokeLinecap="round" />
      <path d="M100 130 L176 78" stroke={L} strokeWidth="4" strokeLinecap="round" />
      <circle cx="94" cy="74" r="5" fill={AMBER} />
      <circle cx="178" cy="76" r="5" fill={AMBER} />
    </g>
  );
}

function Tongs() {
  return (
    <g>
      <Ground />
      <path d="M212 46 q-84 24-128 46 q-14 8-2 18 q12 8 30-2 q40-22 100-38" fill="none" {...stroke} strokeWidth="7" />
      <path d="M212 70 q-84 24-124 42" fill="none" {...stroke} strokeWidth="7" />
      <path d="M212 46 q16-4 16 8 q0 12-16 16z" fill={FILL} {...stroke} />
      <path d="M64 96 q-16 6-14 20 q2 12 18 8" fill="none" {...stroke} />
      <path d="M66 122 q10 10 22 4" fill="none" {...thin} opacity={0.5} />
      <path d="M232 96 q10-6 14 4 M228 116 q12-2 14 8" {...thin} opacity={0.5} />
    </g>
  );
}

function TookBargain() {
  return (
    <g>
      <Ground />
      <path d="M20 60 h100 v10 h-100z" fill={DEEP} {...stroke} />
      <path d="M36 70 v18 M104 70 v18" {...thin} opacity={0.5} />
      <path
        d="M188 152 v-40 q-14-8-8-22 q6-12 18-4 l6 8 v-24 q0-12 12-12 t12 12 v20"
        fill={FILL}
        {...stroke}
        transform="translate(-70 -10)"
      />
      <rect x="96" y="86" width="52" height="38" rx="5" fill={AMBER} {...stroke} />
      <path d="M148 96 l24-10 l4 26 l-26 4z" fill={AMBER} {...stroke} />
      <circle cx="164" cy="96" r="4" fill={L} />
      <path d="M164 96 L196 76" {...thin} />
      <path d="M100 100 h30 M100 112 h20" {...thin} opacity={0.45} />
    </g>
  );
}

function TornNote() {
  return (
    <g>
      <Ground />
      <path d="M24 62 h96 l-10 12 l10 12 l-10 12 l10 12 l-10 12 l10 12 h-96z" fill={GREEN} {...stroke} opacity={0.85} />
      <path d="M150 62 h96 v72 h-96 l10-12 l-10-12 l10-12 l-10-12 l10-12z" fill={GREEN} {...stroke} opacity={0.85} />
      <circle cx="66" cy="98" r="18" fill="none" {...thin} opacity={0.6} />
      <circle cx="204" cy="98" r="18" fill="none" {...thin} opacity={0.6} />
      <path d="M40 76 h16 M40 120 h16 M214 76 h16 M214 120 h16" {...thin} opacity={0.5} />
    </g>
  );
}

function WetPhone() {
  return (
    <g>
      <path d="M20 128 q56-16 112 0 q56 16 108 0 v40 h-220z" fill={BLUE} opacity={0.45} />
      <path d="M20 128 q56-16 112 0 q56 16 108 0" fill="none" stroke={BLUE} strokeWidth="4" strokeLinecap="round" />
      <rect x="82" y="46" width="86" height="96" rx="10" fill={DEEP} {...stroke} transform="rotate(-9 125 94)" />
      <rect x="92" y="60" width="66" height="68" rx="4" fill={FILL} {...thin} transform="rotate(-9 125 94)" />
      <g stroke={BLUE} strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M104 66 q6 20 0 40" />
        <path d="M124 62 q8 24 2 46" />
        <path d="M146 70 q6 18 0 34" />
      </g>
      <ellipse cx="126" cy="148" rx="52" ry="9" fill="none" stroke={BLUE} strokeWidth="3" opacity={0.7} />
      <path d="M196 40 q6 12-2 16 M212 60 q8 10 0 16" stroke={BLUE} strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  );
}

function WrongX() {
  return (
    <g>
      <rect x="62" y="18" width="146" height="150" rx="5" fill={FILL} {...stroke} />
      <g stroke={L} strokeWidth="2" opacity={0.35}>
        <path d="M78 48 h114 M78 70 h114 M78 92 h80 M78 114 h100 M78 136 h60" />
      </g>
      <path d="M74 44 L206 148 M206 44 L74 148" stroke={RED} strokeWidth="14" strokeLinecap="round" />
    </g>
  );
}

/* ------------------------------------------------------------------ registry */

/**
 * Only what has actually been drawn. Anything a phrase names that is not in
 * here falls back to the typographic card, per panel.
 */
export const ART: Record<string, (props: ArtProps) => JSX.Element> = {
  PalmNo,
  HairDye,
  Crab,
  Car,
  Crow,
  Dee,
  Raccoon,
  Cow,
  Pie,
  Pet,
  Leo,
  Knight,
  Knee,
  Rye,
  ChaiGlass,
  DyeBrush,
  Subway,
  OwGrab,
  Throng,
  PointYou,
  BoomboxLot,
  Pen,
  NumbTongue,
  StopSign,
  Match,
  Roo,
  Toast,
  Key,
  Shrug,
  Corn,
  Royal,
  CheckBill,
  TowRye,
  PiePang,
  Puff,
  ChaCha,
  HewSandwich,
  Sigh,
  Duck,
  Glide,
  BigEye,
  TinyLeg,
  Pirate,
  AnTile,
  BagTongue,
  Barn,
  BootMud,
  BurntMatch,
  Cheer,
  Chew,
  ChewyStuck,
  ChowKeys,
  ClockMoan,
  CoinBat,
  Dawn,
  DoughSink,
  EngineBlock,
  FeltMark,
  FullImp,
  GinGlass,
  Glub,
  Gong,
  GuyHen,
  HelmetSigh,
  HenLayO,
  Jay,
  JerryCan,
  Jot,
  Kite,
  MaJack,
  Meter,
  Mower,
  NowWatch,
  NumbKanga,
  One,
  Owl,
  Pa,
  PalmTree,
  Pendulum,
  PigMoo,
  Plough,
  RapBat,
  RashPear,
  Rev,
  RotApple,
  Songbird,
  Spring,
  TapeMeasure,
  Taxi,
  TeaSpot,
  Thong,
  Tick,
  TinyKnit,
  Tongs,
  TookBargain,
  TornNote,
  WetPhone,
  WrongX,
  // Same drawing, different prop. Registered under both names so the phrase
  // data stays readable at the call site.
  PuffFlag: (p: ArtProps) => Puff({ ...p, flag: true }),
  PirateBarn: (p: ArtProps) => Pirate({ ...p, barn: true }),
  PrawnGrill: (p: ArtProps) => Prawn({ ...p, pot: false }),
  PrawnPot: (p: ArtProps) => Prawn({ ...p, pot: true }),
  AnKnee: (p: ArtProps) => AnTile({ ...p, onKnee: true }),
  HongWater: (p: ArtProps) => Hong({ ...p, wang: false }),
  HongWang: (p: ArtProps) => Hong({ ...p, wang: true }),
  Van: (p: ArtProps) => Mower({ ...p, van: true }),
};

export function hasArt(component: string): boolean {
  return component in ART;
}
