export type Tone = 'mid' | 'low' | 'falling' | 'high' | 'rising';

export interface Syllable {
  roman: string; // 'khàwp' — with tone diacritic
  tone: Tone;
}

/**
 * Spec §2 lists nine categories. The content brief in §8 also asks for
 * transport, accommodation, illness/pharmacy, weather and general shopping,
 * which none of the nine express. Five values are added rather than folded into
 * near-misses, because Browse filters on this and "pharmacy under emergency"
 * makes the filter lie.
 */
export type Category =
  | 'politeness'
  | 'smalltalk'
  | 'yesno'
  | 'food'
  | 'money'
  | 'shopping'
  | 'directions'
  | 'transport'
  | 'stay'
  | 'time'
  | 'health'
  | 'weather'
  | 'emergency'
  | 'modules';

export const CATEGORIES: Category[] = [
  'politeness',
  'smalltalk',
  'yesno',
  'food',
  'money',
  'shopping',
  'directions',
  'transport',
  'stay',
  'time',
  'health',
  'weather',
  'emergency',
  'modules',
];

export const CATEGORY_LABELS: Record<Category, string> = {
  politeness: 'Politeness',
  smalltalk: 'Small talk',
  yesno: 'Yes / no',
  food: 'Food',
  money: 'Money',
  shopping: 'Shopping',
  directions: 'Directions',
  transport: 'Transport',
  stay: 'Accommodation',
  time: 'Time',
  health: 'Health',
  weather: 'Weather',
  emergency: 'Emergency',
  modules: 'Modules',
};

/**
 * One meaningful chunk of a phrase, with what it means on its own.
 *
 * Deliberately word-level, not syllable-level. Thai words are often more than
 * one syllable, and glossing สวัสดี as sà + wàt + dii would invent three
 * meanings that do not exist — it is a single Sanskrit borrowing. Where a part
 * genuinely carries no independent meaning, the gloss says so rather than
 * making one up.
 */
export interface Word {
  thai: string;
  roman: string;
  gloss: string;
  /** How many entries of Phrase.syllables this word covers. */
  span: number;
}

export type ArtSpec = { component: string; props?: Record<string, unknown> };

export interface Phrase {
  id: string; // stable slug. Never renumber.
  thai: string;
  syllables: Syllable[];
  /** Word-by-word breakdown. Spans must add up to syllables.length. */
  words: Word[];
  meaning: string;
  literal?: string;
  mnemonic: string[]; // one entry per panel
  scene: string[]; // same length as mnemonic; alt text + illustration brief
  art?: ArtSpec[]; // same length as mnemonic when present
  category: Category;
  rank: number; // 1-100 usefulness rank
  gendered?: boolean;
  notes?: string;
  weak: boolean; // honest self-assessment of the mnemonic
}

export type Direction = 'recognition' | 'production' | 'listening';

export const DIRECTIONS: Direction[] = ['recognition', 'production', 'listening'];

export type Stage = 'new' | 'learning' | 'review' | 'relearning';

export type Grade = 'again' | 'hard' | 'good' | 'easy';

export const GRADES: Grade[] = ['again', 'hard', 'good', 'easy'];

export interface CardState {
  key: string; // `${phraseId}:${direction}`
  phraseId: string;
  direction: Direction;
  due: number; // epoch ms
  interval: number; // days
  ease: number; // 1.3 min, 2.5 start
  reps: number;
  lapses: number;
  stage: Stage;
  learningStep: number;
  suspended: boolean;
  lastReviewed: number | null;
}

export interface Settings {
  newPerDay: number;
  reviewsPerDay: number;
  directions: Record<Direction, boolean>;
  voiceURI: string | null;
  rate: number; // 0.5 - 1.0
  autoplay: boolean;
  showContours: boolean;
  hideWeak: boolean;
  theme: 'light' | 'dark' | 'system';
  ttsBannerDismissed: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  newPerDay: 10,
  reviewsPerDay: 100,
  directions: { recognition: true, production: true, listening: false },
  voiceURI: null,
  rate: 0.85,
  autoplay: true,
  showContours: true,
  hideWeak: false,
  theme: 'system',
  ttsBannerDismissed: false,
};

export interface Backup {
  format: 'thai-flashcards-backup';
  version: 1;
  exportedAt: number;
  cards: CardState[];
  settings: Settings;
  dailyLog: DailyLog[];
}

export interface DailyLog {
  day: string; // local YYYY-MM-DD
  newDone: number;
  reviewsDone: number;
}
