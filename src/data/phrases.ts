import type { Phrase } from '../types';

/**
 * Authored content. Never written to at runtime.
 *
 * TONES — how they were verified
 * ------------------------------
 * Every tone below was derived from the Thai spelling with the standard tone
 * rules (consonant class × live/dead syllable × vowel length × tone mark), then
 * checked against the romanisation in the source table. Where the two
 * disagreed, the spelling won.
 *
 * Result: the 40 seed rows in the brief were re-derived and all 40 came out
 * matching the hand-drafted marks. Two are worth stating because they look
 * wrong until you apply the leading-consonant (อักษรนำ) rule:
 *   - อร่อย à-ròi. ร่ is low class with mai ek, which alone gives a falling
 *     tone. The mid-class อ leads it, so ร borrows mid-class behaviour and
 *     mai ek yields LOW. à-ròi is right; a-rôi is not.
 *   - ตำรวจ ต leads ร the same way (not used below, but the same rule drives
 *     สนาม, หน่อย, ไหม, ไหน, หมู, หนาว — all ห- or mid-class leaders).
 *
 * Nothing here is a guess. Where a phrase could not be pinned down with
 * confidence it was dropped and replaced, per the brief.
 *
 * ROMANISATION — matches the brief's own conventions:
 *   ก g · ต t · ป p · ข/ค kh · ถ/ท th · ผ/พ ph · เออ er · ออ aw · โอ oo
 *   อู uu · อือ eu · แอ ae · ไอ/ใอ ai · เอีย ia · อัว ua
 */

export const PHRASES: Phrase[] = [
  // ---------------------------------------------------------------- politeness
  {
    id: 'sawatdee',
    thai: 'สวัสดี',
    syllables: [
      { roman: 'sà', tone: 'low' },
      { roman: 'wàt', tone: 'low' },
      { roman: 'dii', tone: 'mid' },
    ],
    words: [
      { thai: 'สวัสดี', roman: 'sà-wàt-dii', gloss: 'one word, borrowed whole from Sanskrit svasti ("well-being"). No part means anything on its own.', span: 3 },
    ],
    meaning: 'hello / goodbye',
    mnemonic: ['so what', 'Dee'],
    scene: [
      'A figure caught mid-shrug, both palms turned up.',
      'Dee waving hello with one hand raised high.',
    ],
    art: [{ component: 'Shrug' }, { component: 'Dee', props: { action: 'wave' } }],
    category: 'politeness',
    rank: 1,
    gendered: true,
    notes:
      'Works for hello and goodbye, any time of day. Add ครับ / ค่ะ or it sounds curt. Thai people often skip it with close friends.',
    weak: false,
  },
  {
    id: 'khawp-khun',
    thai: 'ขอบคุณ',
    syllables: [
      { roman: 'khàwp', tone: 'low' },
      { roman: 'khun', tone: 'mid' },
    ],
    words: [
      { thai: 'ขอบ', roman: 'khàwp', gloss: 'edge, rim — in this phrase, being indebted', span: 1 },
      { thai: 'คุณ', roman: 'khun', gloss: 'goodness, virtue; also the polite word for "you"', span: 1 },
    ],
    meaning: 'thank you',
    mnemonic: ['cop coon'],
    scene: ['A raccoon dressed as a police officer hands back a wallet.'],
    art: [{ component: 'Raccoon', props: { holding: 'wallet', hat: 'police' } }],
    category: 'politeness',
    rank: 2,
    gendered: true,
    weak: false,
  },
  {
    id: 'khrap',
    thai: 'ครับ',
    syllables: [{ roman: 'khráp', tone: 'high' }],
    words: [
      { thai: 'ครับ', roman: 'khráp', gloss: 'polite particle used by men. Carries no meaning — it marks respect.', span: 1 },
    ],
    meaning: 'polite particle (men)',
    mnemonic: ['crab'],
    scene: ['A crab holding one claw up in a stiff, polite salute.'],
    art: [{ component: 'Crab' }],
    category: 'modules',
    rank: 3,
    gendered: true,
    notes:
      'Men end almost every sentence with this. It carries no meaning — leaving it off is what sounds rude, not what you said.',
    weak: false,
  },
  {
    id: 'kha',
    thai: 'ค่ะ',
    syllables: [{ roman: 'khâ', tone: 'falling' }],
    words: [
      { thai: 'ค่ะ', roman: 'khâ', gloss: 'polite particle used by women. Carries no meaning — it marks respect.', span: 1 },
    ],
    meaning: 'polite particle (women)',
    mnemonic: ['car'],
    scene: ['A small car with its passenger door held politely open.'],
    art: [{ component: 'Car' }],
    category: 'modules',
    rank: 4,
    gendered: true,
    notes:
      'Falling ค่ะ ends a statement. Rising คะ khá asks a question or softens a greeting. Same spelling family, different tone, and Thais hear the difference instantly.',
    weak: false,
  },
  {
    id: 'khaw-thoot',
    thai: 'ขอโทษ',
    syllables: [
      { roman: 'khǎw', tone: 'rising' },
      { roman: 'thôot', tone: 'falling' },
    ],
    words: [
      { thai: 'ขอ', roman: 'khǎw', gloss: 'to ask for', span: 1 },
      { thai: 'โทษ', roman: 'thôot', gloss: 'blame, punishment', span: 1 },
    ],
    meaning: 'sorry / excuse me',
    mnemonic: ['caw', 'toast'],
    scene: [
      'The Crow letting out a loud CAW, one wing raised.',
      'A slice of toast burnt black at one corner.',
    ],
    art: [{ component: 'Crow', props: { action: 'caw' } }, { component: 'Toast' }],
    category: 'politeness',
    rank: 5,
    gendered: true,
    notes: 'Also the way you get past someone in a crowd.',
    weak: false,
  },
  {
    id: 'mai-pen-rai',
    thai: 'ไม่เป็นไร',
    syllables: [
      { roman: 'mâi', tone: 'falling' },
      { roman: 'pen', tone: 'mid' },
      { roman: 'rai', tone: 'mid' },
    ],
    words: [
      { thai: 'ไม่', roman: 'mâi', gloss: 'not', span: 1 },
      { thai: 'เป็น', roman: 'pen', gloss: 'to be', span: 1 },
      { thai: 'ไร', roman: 'rai', gloss: 'anything (short for อะไร)', span: 1 },
    ],
    meaning: 'no worries / never mind',
    mnemonic: ['my pen', 'rye'],
    scene: [
      'A single fountain pen held up between two fingers.',
      'A sheaf of rye stalks tied with string.',
    ],
    art: [{ component: 'Pen' }, { component: 'Rye' }],
    category: 'politeness',
    rank: 6,
    notes:
      "The reply to almost any apology or small problem. Also what you say instead of 'you're welcome'.",
    weak: false,
  },
  {
    id: 'yin-dii',
    thai: 'ยินดี',
    syllables: [
      { roman: 'yin', tone: 'mid' },
      { roman: 'dii', tone: 'mid' },
    ],
    words: [
      { thai: 'ยิน', roman: 'yin', gloss: 'to hear — only used inside compounds like this one', span: 1 },
      { thai: 'ดี', roman: 'dii', gloss: 'good', span: 1 },
    ],
    meaning: "you're welcome / glad to",
    mnemonic: ['yin, Dee'],
    scene: ['Dee holding up a big black-and-white yin-yang disc.'],
    art: [{ component: 'Dee', props: { holding: 'yinyang' } }],
    category: 'politeness',
    rank: 12,
    notes: "Warmer than ไม่เป็นไร. ยินดีที่ได้รู้จัก yin-dii thîi dâai rúu-jàk is 'pleased to meet you'.",
    weak: false,
  },

  // ---------------------------------------------------------------- small talk
  {
    id: 'sabai-dii-mai',
    thai: 'สบายดีไหม',
    syllables: [
      { roman: 'sà', tone: 'low' },
      { roman: 'baai', tone: 'mid' },
      { roman: 'dii', tone: 'mid' },
      { roman: 'mǎi', tone: 'rising' },
    ],
    words: [
      { thai: 'สบาย', roman: 'sà-baai', gloss: 'comfortable, at ease, well', span: 2 },
      { thai: 'ดี', roman: 'dii', gloss: 'good', span: 1 },
      { thai: 'ไหม', roman: 'mǎi', gloss: 'question particle — turns the sentence into a yes/no question', span: 1 },
    ],
    meaning: 'how are you?',
    mnemonic: ['subway', 'Dee, my?'],
    scene: [
      'A subway train pulling into a tiled platform.',
      'Dee with both eyebrows up and a big question mark overhead.',
    ],
    art: [{ component: 'Subway' }, { component: 'Dee', props: { action: 'ask' } }],
    category: 'smalltalk',
    rank: 7,
    gendered: true,
    notes:
      'Less automatic than English "how are you". Thais use it when they have not seen you in a while, not as a greeting filler.',
    weak: false,
  },
  {
    id: 'sabai-dii',
    thai: 'สบายดี',
    syllables: [
      { roman: 'sà', tone: 'low' },
      { roman: 'baai', tone: 'mid' },
      { roman: 'dii', tone: 'mid' },
    ],
    words: [
      { thai: 'สบาย', roman: 'sà-baai', gloss: 'comfortable, at ease, well', span: 2 },
      { thai: 'ดี', roman: 'dii', gloss: 'good', span: 1 },
    ],
    meaning: "I'm fine",
    mnemonic: ['subway', 'Dee'],
    scene: [
      'A subway train pulling into a tiled platform.',
      'Dee giving a relaxed thumbs up, eyes shut.',
    ],
    art: [{ component: 'Subway' }, { component: 'Dee', props: { action: 'thumbsup' } }],
    category: 'smalltalk',
    rank: 8,
    gendered: true,
    weak: false,
  },
  {
    id: 'chook-dii',
    thai: 'โชคดี',
    syllables: [
      { roman: 'chôok', tone: 'falling' },
      { roman: 'dii', tone: 'mid' },
    ],
    words: [
      { thai: 'โชค', roman: 'chôok', gloss: 'luck, fortune', span: 1 },
      { thai: 'ดี', roman: 'dii', gloss: 'good', span: 1 },
    ],
    meaning: 'good luck',
    mnemonic: ['choke, Dee'],
    scene: ['Dee choking on a four-leaf clover, eyes wide, one hand at the throat.'],
    art: [{ component: 'Dee', props: { action: 'choke' } }],
    category: 'smalltalk',
    rank: 9,
    notes: 'Also a normal way to say goodbye to someone setting off somewhere.',
    weak: false,
  },
  {
    id: 'laa-gawn',
    thai: 'ลาก่อน',
    syllables: [
      { roman: 'laa', tone: 'mid' },
      { roman: 'gàwn', tone: 'low' },
    ],
    words: [
      { thai: 'ลา', roman: 'laa', gloss: 'to take leave of', span: 1 },
      { thai: 'ก่อน', roman: 'gàwn', gloss: 'before, first', span: 1 },
    ],
    meaning: 'goodbye (final)',
    mnemonic: ['la! corn'],
    scene: ['A cob of corn singing a long LAAA, music notes rising off it.'],
    art: [{ component: 'Corn' }],
    category: 'smalltalk',
    rank: 10,
    notes:
      'Heavier than it looks — closer to "farewell". For a normal goodbye use สวัสดี or แล้วเจอกัน.',
    weak: false,
  },
  {
    id: 'laew-jer-gan',
    thai: 'แล้วเจอกัน',
    syllables: [
      { roman: 'láew', tone: 'high' },
      { roman: 'jer', tone: 'mid' },
      { roman: 'gan', tone: 'mid' },
    ],
    words: [
      { thai: 'แล้ว', roman: 'láew', gloss: 'then; already', span: 1 },
      { thai: 'เจอ', roman: 'jer', gloss: 'to meet, to run into', span: 1 },
      { thai: 'กัน', roman: 'gan', gloss: 'each other, together', span: 1 },
    ],
    meaning: 'see you later',
    mnemonic: ['lay-oh', 'jerkin'],
    scene: [
      'A hen laying a single egg with a big letter O painted on it.',
      'A brown leather jerkin hanging on a peg.',
    ],
    art: [{ component: 'HenLayO' }, { component: 'Jerkin' }],
    category: 'smalltalk',
    rank: 11,
    weak: true,
    notes:
      'Weak: “lay” is the wrong vowel for แล้ว — a flat held “eh”, not the “ay” of “lay”. Say “leh-o”. “Jerkin” is good: กัน is the unaspirated k of “skin”, not the puffed k of “kin”.',
  },

  // ------------------------------------------------------------------- yes/no
  {
    id: 'chai',
    thai: 'ใช่',
    syllables: [{ roman: 'châi', tone: 'falling' }],
    words: [
      { thai: 'ใช่', roman: 'châi', gloss: 'that is so — confirms a statement, not a general "yes"', span: 1 },
    ],
    meaning: 'yes / that’s right',
    mnemonic: ['chai'],
    scene: ['A steaming glass of chai tea on a saucer.'],
    art: [{ component: 'ChaiGlass' }],
    category: 'yesno',
    rank: 13,
    notes:
      'Confirms a statement, it is not a general "yes". To answer "can you?" you say ได้ dâai, not ใช่.',
    weak: false,
  },
  {
    id: 'mai-chai',
    thai: 'ไม่ใช่',
    syllables: [
      { roman: 'mâi', tone: 'falling' },
      { roman: 'châi', tone: 'falling' },
    ],
    words: [
      { thai: 'ไม่', roman: 'mâi', gloss: 'not', span: 1 },
      { thai: 'ใช่', roman: 'châi', gloss: 'so, correct', span: 1 },
    ],
    meaning: "no / that's not it",
    mnemonic: ['my', 'chai'],
    scene: [
      'A flat palm held out, pushing something away.',
      'A steaming glass of chai tea on a saucer.',
    ],
    art: [{ component: 'PalmNo' }, { component: 'ChaiGlass' }],
    category: 'yesno',
    rank: 14,
    weak: false,
  },
  {
    id: 'mai',
    thai: 'ไม่',
    syllables: [{ roman: 'mâi', tone: 'falling' }],
    words: [
      { thai: 'ไม่', roman: 'mâi', gloss: 'not — goes in front of the verb', span: 1 },
    ],
    meaning: 'not / no',
    mnemonic: ['my'],
    scene: ['A flat palm pressed down on a suitcase, claiming it — MY bag.'],
    art: [{ component: 'PalmNo' }],
    category: 'modules',
    rank: 15,
    notes:
      'Goes in front of the verb: ไม่เอา, ไม่เผ็ด, ไม่ได้. Do not confuse with ไหม mǎi (rising), which turns a sentence into a question.',
    weak: false,
  },
  {
    id: 'khao-jai',
    thai: 'เข้าใจ',
    syllables: [
      { roman: 'khâo', tone: 'falling' },
      { roman: 'jai', tone: 'mid' },
    ],
    words: [
      { thai: 'เข้า', roman: 'khâo', gloss: 'to enter, to go in', span: 1 },
      { thai: 'ใจ', roman: 'jai', gloss: 'heart, mind', span: 1 },
    ],
    meaning: 'I understand',
    mnemonic: ['cow jive'],
    scene: ['The Cow doing a jive step, one hoof kicked out to the side.'],
    art: [{ component: 'Cow', props: { action: 'jive' } }],
    category: 'yesno',
    rank: 16,
    weak: false,
  },
  {
    id: 'mai-khao-jai',
    thai: 'ไม่เข้าใจ',
    syllables: [
      { roman: 'mâi', tone: 'falling' },
      { roman: 'khâo', tone: 'falling' },
      { roman: 'jai', tone: 'mid' },
    ],
    words: [
      { thai: 'ไม่', roman: 'mâi', gloss: 'not', span: 1 },
      { thai: 'เข้า', roman: 'khâo', gloss: 'to enter', span: 1 },
      { thai: 'ใจ', roman: 'jai', gloss: 'heart, mind', span: 1 },
    ],
    meaning: "I don't understand",
    mnemonic: ['my', 'cow jive'],
    scene: [
      'A flat palm held out, pushing something away.',
      'The Cow doing a jive step, one hoof kicked out to the side.',
    ],
    art: [{ component: 'PalmNo' }, { component: 'Cow', props: { action: 'jive' } }],
    category: 'yesno',
    rank: 17,
    notes: 'The single most useful sentence you will own in your first month.',
    weak: false,
  },
  {
    id: 'mai-ruu',
    thai: 'ไม่รู้',
    syllables: [
      { roman: 'mâi', tone: 'falling' },
      { roman: 'rúu', tone: 'high' },
    ],
    words: [
      { thai: 'ไม่', roman: 'mâi', gloss: 'not', span: 1 },
      { thai: 'รู้', roman: 'rúu', gloss: 'to know (a fact)', span: 1 },
    ],
    meaning: "I don't know",
    mnemonic: ['my', 'roo'],
    scene: [
      'A flat palm held out, pushing something away.',
      'A kangaroo joey peering out of the pouch with a shrug.',
    ],
    art: [{ component: 'PalmNo' }, { component: 'Roo' }],
    category: 'yesno',
    rank: 18,
    weak: false,
  },
  {
    id: 'phuut-chaa-chaa',
    thai: 'พูดช้าๆ',
    syllables: [
      { roman: 'phûut', tone: 'falling' },
      { roman: 'cháa', tone: 'high' },
      { roman: 'cháa', tone: 'high' },
    ],
    words: [
      { thai: 'พูด', roman: 'phûut', gloss: 'to speak', span: 1 },
      { thai: 'ช้าๆ', roman: 'cháa-cháa', gloss: 'slow, doubled — Thai repeats an adjective to soften it into "a bit slower"', span: 2 },
    ],
    meaning: 'please speak slowly',
    mnemonic: ['poot', 'cha-cha'],
    scene: [
      'A mouth blowing out one round puff of air.',
      'Two feet on numbered footprints doing a slow cha-cha.',
    ],
    art: [{ component: 'Puff' }, { component: 'ChaCha' }],
    category: 'yesno',
    rank: 19,
    notes: 'Add หน่อย nòi on the end to soften it: พูดช้าๆ หน่อย.',
    weak: false,
  },

  // --------------------------------------------------------------------- food
  {
    id: 'aroi',
    thai: 'อร่อย',
    syllables: [
      { roman: 'à', tone: 'low' },
      { roman: 'ròi', tone: 'low' },
    ],
    words: [
      { thai: 'อร่อย', roman: 'à-ròi', gloss: 'tasty, delicious. One word; the à- is not a separate piece.', span: 2 },
    ],
    meaning: 'delicious',
    mnemonic: ['a royal'],
    scene: ['A crowned king kissing his fingertips over a steaming bowl of noodles.'],
    art: [{ component: 'Royal' }],
    category: 'food',
    rank: 20,
    notes:
      'Say it to the cook, not just to your friend. อร่อยมาก à-ròi mâak is the compliment that gets you a bigger portion next time.',
    weak: false,
  },
  {
    id: 'phet',
    thai: 'เผ็ด',
    syllables: [{ roman: 'phèt', tone: 'low' }],
    words: [
      { thai: 'เผ็ด', roman: 'phèt', gloss: 'chilli-hot (not temperature-hot — that is ร้อน ráwn)', span: 1 },
    ],
    meaning: 'spicy',
    mnemonic: ['pet'],
    scene: ['Pet panting hard with a bright red tongue and a flame over its head.'],
    art: [{ component: 'Pet', props: { action: 'burn' } }],
    category: 'food',
    rank: 21,
    weak: false,
  },
  {
    id: 'mai-phet',
    thai: 'ไม่เผ็ด',
    syllables: [
      { roman: 'mâi', tone: 'falling' },
      { roman: 'phèt', tone: 'low' },
    ],
    words: [
      { thai: 'ไม่', roman: 'mâi', gloss: 'not', span: 1 },
      { thai: 'เผ็ด', roman: 'phèt', gloss: 'chilli-hot', span: 1 },
    ],
    meaning: 'not spicy',
    mnemonic: ['my', 'pet'],
    scene: [
      'A flat palm held out, pushing something away.',
      'Pet panting hard with a bright red tongue and a flame over its head.',
    ],
    art: [{ component: 'PalmNo' }, { component: 'Pet', props: { action: 'burn' } }],
    category: 'food',
    rank: 22,
    notes:
      'Thai "not spicy" is still spicy. นิดหน่อย nít-nòi ("a little") after it gets you closer to what you meant.',
    weak: false,
  },
  {
    id: 'naam',
    thai: 'น้ำ',
    syllables: [{ roman: 'náam', tone: 'high' }],
    words: [
      { thai: 'น้ำ', roman: 'náam', gloss: 'water; also liquid generally', span: 1 },
    ],
    meaning: 'water',
    mnemonic: ['Viet-NAM'],
    scene: ['A conical Vietnamese hat floating on the surface of a lake.'],
    art: [{ component: 'VietHat' }],
    category: 'food',
    rank: 23,
    weak: false,
    notes:
      'The last syllable of Vietnam said the British way — it rhymes with “calm”, not “ham”. Shortens to nám inside compounds (น้ำเปล่า nám-plào).',
  },
  {
    id: 'gin-khaao',
    thai: 'กินข้าว',
    syllables: [
      { roman: 'gin', tone: 'mid' },
      { roman: 'khâao', tone: 'falling' },
    ],
    words: [
      { thai: 'กิน', roman: 'gin', gloss: 'to eat', span: 1 },
      { thai: 'ข้าว', roman: 'khâao', gloss: 'rice — and by extension any meal', span: 1 },
    ],
    meaning: 'to eat (a meal)',
    mnemonic: ['gin, cow'],
    scene: ['The Cow tipping a glass of gin over a bowl of rice.'],
    art: [{ component: 'Cow', props: { action: 'gin' } }],
    category: 'food',
    rank: 24,
    notes:
      'TONE PAIR: ข้าว khâao (falling) is rice/food. ขาว khǎao (rising) is the colour white. Wrong tone at a food stall gets you a blank stare.',
    weak: false,
  },
  {
    id: 'hiu',
    thai: 'หิว',
    syllables: [{ roman: 'hǐu', tone: 'rising' }],
    words: [
      { thai: 'หิว', roman: 'hǐu', gloss: 'hungry. หิวน้ำ hǐu náam ("hungry for water") is thirsty.', span: 1 },
    ],
    meaning: 'hungry',
    mnemonic: ['hew'],
    scene: ['An axe hewing straight down into a giant sandwich.'],
    art: [{ component: 'HewSandwich' }],
    category: 'food',
    rank: 25,
    notes: 'หิวน้ำ hǐu náam is thirsty — literally "hungry for water".',
    weak: false,
  },
  {
    id: 'chek-bin',
    thai: 'เช็คบิล',
    syllables: [
      { roman: 'chék', tone: 'high' },
      { roman: 'bin', tone: 'mid' },
    ],
    words: [
      { thai: 'เช็ค', roman: 'chék', gloss: 'from English "check"', span: 1 },
      { thai: 'บิล', roman: 'bin', gloss: 'from English "bill"', span: 1 },
    ],
    meaning: 'the bill, please',
    mnemonic: ['check bill'],
    scene: ['A restaurant bill on a saucer with a thick red tick across it.'],
    art: [{ component: 'CheckBill' }],
    category: 'food',
    rank: 26,
    notes:
      'Thai-ised English, so the mnemonic is nearly the word itself. คิดเงิน khít ngern is the more Thai version and works everywhere.',
    weak: false,
  },
  {
    id: 'khaw',
    thai: 'ขอ',
    syllables: [{ roman: 'khǎw', tone: 'rising' }],
    words: [
      { thai: 'ขอ', roman: 'khǎw', gloss: 'to ask for. Put it in front of any noun for a polite request.', span: 1 },
    ],
    meaning: 'may I have',
    mnemonic: ['caw'],
    scene: ['The Crow letting out a loud CAW with one wing held out, asking.'],
    art: [{ component: 'Crow', props: { action: 'caw' } }],
    category: 'modules',
    rank: 27,
    notes:
      'Put it in front of any noun and you have a polite request: ขอน้ำ, ขอเมนู, ขอบิล. Add หน่อย nòi to soften.',
    weak: false,
  },

  // -------------------------------------------------------------------- money
  {
    id: 'thao-rai',
    thai: 'เท่าไหร่',
    syllables: [
      { roman: 'thâo', tone: 'falling' },
      { roman: 'rài', tone: 'low' },
    ],
    words: [
      { thai: 'เท่า', roman: 'thâo', gloss: 'equal to, as much as', span: 1 },
      { thai: 'ไหร่', roman: 'rài', gloss: 'what (a worn-down อะไร)', span: 1 },
    ],
    meaning: 'how much?',
    mnemonic: ['tow rye'],
    scene: ['A tow truck dragging away a giant sheaf of rye.'],
    art: [{ component: 'TowRye' }],
    category: 'money',
    rank: 28,
    weak: false,
  },
  {
    id: 'phaeng-pai',
    thai: 'แพงไป',
    syllables: [
      { roman: 'phaeng', tone: 'mid' },
      { roman: 'pai', tone: 'mid' },
    ],
    words: [
      { thai: 'แพง', roman: 'phaeng', gloss: 'expensive', span: 1 },
      { thai: 'ไป', roman: 'pai', gloss: 'to go — after an adjective it means "too, excessively"', span: 1 },
    ],
    meaning: 'too expensive',
    mnemonic: ['pang! pie'],
    scene: ['A Pie flying through the air and hitting an open wallet with a PANG.'],
    art: [{ component: 'PiePang' }],
    category: 'money',
    rank: 29,
    notes: 'Say it smiling. Haggling in Thailand is friendly or it does not work.',
    weak: false,
  },
  {
    id: 'lot-noi-dai-mai',
    thai: 'ลดหน่อยได้ไหม',
    syllables: [
      { roman: 'lót', tone: 'high' },
      { roman: 'nòi', tone: 'low' },
      { roman: 'dâai', tone: 'falling' },
      { roman: 'mǎi', tone: 'rising' },
    ],
    words: [
      { thai: 'ลด', roman: 'lót', gloss: 'to lower, to reduce', span: 1 },
      { thai: 'หน่อย', roman: 'nòi', gloss: 'a little — softens a request', span: 1 },
      { thai: 'ได้', roman: 'dâai', gloss: 'can, to be able', span: 1 },
      { thai: 'ไหม', roman: 'mǎi', gloss: 'question particle', span: 1 },
    ],
    meaning: 'any discount?',
    literal: 'lower it a little, can you?',
    mnemonic: ['lot noise', 'dye my'],
    scene: [
      'A boombox blaring in a parking lot, sound waves radiating.',
      'A head having its hair dyed bright pink with a brush.',
    ],
    art: [{ component: 'BoomboxLot' }, { component: 'HairDye' }],
    category: 'money',
    rank: 30,
    weak: false,
  },
  {
    id: 'ao-an-nii',
    thai: 'เอาอันนี้',
    syllables: [
      { roman: 'ao', tone: 'mid' },
      { roman: 'an', tone: 'mid' },
      { roman: 'níi', tone: 'high' },
    ],
    words: [
      { thai: 'เอา', roman: 'ao', gloss: 'to take, to want', span: 1 },
      { thai: 'อัน', roman: 'an', gloss: 'classifier for a small object — "item, piece"', span: 1 },
      { thai: 'นี้', roman: 'níi', gloss: 'this', span: 1 },
    ],
    meaning: "I'll take this one",
    mnemonic: ['ow!', 'on knee'],
    scene: [
      'A hand snatching an item off a stall, thumb stubbed — OW!',
      'A market trinket balanced ON a bare KNEE with a plaster.',
    ],
    art: [{ component: 'OwGrab' }, { component: 'OnKnee' }],
    category: 'money',
    rank: 31,
    weak: false,
    notes:
      'อัน an is the classifier for a small object — it does the work of “one” or “piece”.',
  },
  {
    id: 'mai-ao',
    thai: 'ไม่เอา',
    syllables: [
      { roman: 'mâi', tone: 'falling' },
      { roman: 'ao', tone: 'mid' },
    ],
    words: [
      { thai: 'ไม่', roman: 'mâi', gloss: 'not', span: 1 },
      { thai: 'เอา', roman: 'ao', gloss: 'to take, to want', span: 1 },
    ],
    meaning: "I don't want it",
    mnemonic: ['my', 'ow!'],
    scene: [
      'A flat palm held out, pushing something away.',
      'A hand snatching back from a stall, thumb stubbed — OW!',
    ],
    art: [{ component: 'PalmNo' }, { component: 'OwGrab' }],
    category: 'money',
    rank: 32,
    notes: 'Blunt but normal. It is the standard way to wave off a tout.',
    weak: false,
  },

  // --------------------------------------------------------------- directions
  {
    id: 'pai',
    thai: 'ไป',
    syllables: [{ roman: 'pai', tone: 'mid' }],
    words: [
      { thai: 'ไป', roman: 'pai', gloss: 'to go', span: 1 },
    ],
    meaning: 'go',
    mnemonic: ['pie'],
    scene: ['A Pie sprouting two legs and running.'],
    art: [{ component: 'Pie', props: { action: 'run' } }],
    category: 'directions',
    rank: 33,
    weak: false,
  },
  {
    id: 'pai-nai',
    thai: 'ไปไหน',
    syllables: [
      { roman: 'pai', tone: 'mid' },
      { roman: 'nǎi', tone: 'rising' },
    ],
    words: [
      { thai: 'ไป', roman: 'pai', gloss: 'to go', span: 1 },
      { thai: 'ไหน', roman: 'nǎi', gloss: 'where', span: 1 },
    ],
    meaning: 'where are you going?',
    mnemonic: ['pie', 'nigh?'],
    scene: [
      'A Pie sprouting two legs and running.',
      'A knight in armour pointing down a forked road, question mark overhead.',
    ],
    art: [{ component: 'Pie', props: { action: 'run' } }, { component: 'Knight' }],
    category: 'directions',
    rank: 34,
    notes:
      'Half greeting, half question. "Just out" — ไปเที่ยว pai thîao — is a complete and normal answer.',
    weak: false,
  },
  {
    id: 'trong-pai',
    thai: 'ตรงไป',
    syllables: [
      { roman: 'trong', tone: 'mid' },
      { roman: 'pai', tone: 'mid' },
    ],
    words: [
      { thai: 'ตรง', roman: 'trong', gloss: 'straight, direct', span: 1 },
      { thai: 'ไป', roman: 'pai', gloss: 'to go', span: 1 },
    ],
    meaning: 'straight on',
    mnemonic: ['throng of', 'pie'],
    scene: [
      'A throng of people packed shoulder to shoulder, marching in one straight line.',
      'A Pie sprouting two legs and running.',
    ],
    art: [{ component: 'Throng' }, { component: 'Pie', props: { action: 'run' } }],
    category: 'directions',
    rank: 35,
    weak: false,
  },
  {
    id: 'liao-saai',
    thai: 'เลี้ยวซ้าย',
    syllables: [
      { roman: 'líao', tone: 'high' },
      { roman: 'sáai', tone: 'high' },
    ],
    words: [
      { thai: 'เลี้ยว', roman: 'líao', gloss: 'to turn', span: 1 },
      { thai: 'ซ้าย', roman: 'sáai', gloss: 'left', span: 1 },
    ],
    meaning: 'turn left',
    mnemonic: ['Leo', 'sighs'],
    scene: [
      'Leo the lion leaning hard into a left-hand turn.',
      'A long puff of breath escaping, shoulders slumped to the left.',
    ],
    art: [{ component: 'Leo', props: { turn: 'left' } }, { component: 'Sigh' }],
    category: 'directions',
    rank: 36,
    weak: false,
  },
  {
    id: 'liao-khwaa',
    thai: 'เลี้ยวขวา',
    syllables: [
      { roman: 'líao', tone: 'high' },
      { roman: 'khwǎa', tone: 'rising' },
    ],
    words: [
      { thai: 'เลี้ยว', roman: 'líao', gloss: 'to turn', span: 1 },
      { thai: 'ขวา', roman: 'khwǎa', gloss: 'right', span: 1 },
    ],
    meaning: 'turn right',
    mnemonic: ['Leo', 'kwaaa!'],
    scene: [
      'Leo the lion leaning hard into a right-hand turn.',
      'A duck facing right, beak wide open, letting out one long climbing KWAAA.',
    ],
    art: [{ component: 'Leo', props: { turn: "right" } }, { component: 'Duck' }],
    category: 'directions',
    rank: 37,
    weak: false,
    notes:
      'The call, not the word “quack” — no k on the end, and let it climb. That climb is the rising tone.',
  },
  {
    id: 'yut',
    thai: 'หยุด',
    syllables: [{ roman: 'yùt', tone: 'low' }],
    words: [
      { thai: 'หยุด', roman: 'yùt', gloss: 'to stop, to halt', span: 1 },
    ],
    meaning: 'stop',
    mnemonic: ["you'd"],
    scene: ['A flat palm painted across a red octagonal stop sign.'],
    art: [{ component: 'StopSign' }],
    category: 'directions',
    rank: 38,
    notes: 'What you say to a driver who has gone past your turning.',
    weak: false,
  },
  {
    id: 'hawng-naam-yuu-nai',
    thai: 'ห้องน้ำอยู่ไหน',
    syllables: [
      { roman: 'hâwng', tone: 'falling' },
      { roman: 'náam', tone: 'high' },
      { roman: 'yùu', tone: 'low' },
      { roman: 'nǎi', tone: 'rising' },
    ],
    words: [
      { thai: 'ห้อง', roman: 'hâwng', gloss: 'room', span: 1 },
      { thai: 'น้ำ', roman: 'náam', gloss: 'water', span: 1 },
      { thai: 'อยู่', roman: 'yùu', gloss: 'to be located at', span: 1 },
      { thai: 'ไหน', roman: 'nǎi', gloss: 'where', span: 1 },
    ],
    meaning: "where's the toilet?",
    literal: 'water room is where?',
    mnemonic: ['Hong', 'Viet-NAM', 'you, nigh?'],
    scene: [
      'The Hong Kong skyline at dusk.',
      'A conical Vietnamese hat floating on the water below it.',
      'A knight in armour pointing straight out of the frame at YOU.',
    ],
    art: [{ component: 'HongWang' }, { component: 'VietHat' }, { component: 'KnightYou' }],
    category: 'directions',
    rank: 39,
    weak: false,
    notes:
      'ห้อง hâwng is “room” and น้ำ náam is “water” — a water room. Both are worth knowing alone.',
  },

  // ---------------------------------------------------------------- emergency
  {
    id: 'chuay-duay',
    thai: 'ช่วยด้วย',
    syllables: [
      { roman: 'chûay', tone: 'falling' },
      { roman: 'dûay', tone: 'falling' },
    ],
    words: [
      { thai: 'ช่วย', roman: 'chûay', gloss: 'to help', span: 1 },
      { thai: 'ด้วย', roman: 'dûay', gloss: 'with, too — here it adds urgency, "help me too!"', span: 1 },
    ],
    meaning: 'help!',
    mnemonic: ['chewy', 'doughy'],
    scene: [
      'A hand stuck fast in a stretching chewy toffee, straining to pull free.',
      'A hand sinking into a mound of doughy bread, only the fingertips showing.',
    ],
    art: [{ component: 'ChewyStuck' }, { component: 'DoughSink' }],
    category: 'emergency',
    rank: 40,
    notes: 'ช่วย on its own means "help/assist" and is used constantly: ช่วยหน่อย chûay nòi.',
    weak: false,
  },

  // ------------------------------------------------------------------ modules
  {
    id: 'dai-mai',
    thai: 'ได้ไหม',
    syllables: [
      { roman: 'dâai', tone: 'falling' },
      { roman: 'mǎi', tone: 'rising' },
    ],
    words: [
      { thai: 'ได้', roman: 'dâai', gloss: 'can, to be able', span: 1 },
      { thai: 'ไหม', roman: 'mǎi', gloss: 'question particle', span: 1 },
    ],
    meaning: 'can you? / is that possible?',
    mnemonic: ['dye my'],
    scene: ['A head having its hair dyed bright pink with a brush.'],
    art: [{ component: 'HairDye' }],
    category: 'modules',
    rank: 41,
    notes:
      'Bolt it onto the end of almost anything to turn it into a request: ลดหน่อยได้ไหม, ลองได้ไหม, ช่วยได้ไหม.',
    weak: false,
  },

  // ------------------------------------------------------------------- yes/no
  {
    id: 'dai',
    thai: 'ได้',
    syllables: [{ roman: 'dâai', tone: 'falling' }],
    words: [
      { thai: 'ได้', roman: 'dâai', gloss: 'can, to be able; also "to get"', span: 1 },
    ],
    meaning: 'can / OK / sure',
    mnemonic: ['dye'],
    scene: ['A brush loaded with bright pink hair dye, dripping.'],
    art: [{ component: 'DyeBrush' }],
    category: 'yesno',
    rank: 42,
    notes: 'The answer to any ได้ไหม question. This is the "yes" you will use most.',
    weak: false,
  },
  {
    id: 'mai-dai',
    thai: 'ไม่ได้',
    syllables: [
      { roman: 'mâi', tone: 'falling' },
      { roman: 'dâai', tone: 'falling' },
    ],
    words: [
      { thai: 'ไม่', roman: 'mâi', gloss: 'not', span: 1 },
      { thai: 'ได้', roman: 'dâai', gloss: 'can', span: 1 },
    ],
    meaning: "can't / not allowed",
    mnemonic: ['my', 'dye'],
    scene: [
      'A flat palm held out, pushing something away.',
      'A brush loaded with bright pink hair dye, dripping.',
    ],
    art: [{ component: 'PalmNo' }, { component: 'DyeBrush' }],
    category: 'yesno',
    rank: 43,
    weak: false,
  },
  {
    id: 'mai-mii',
    thai: 'ไม่มี',
    syllables: [
      { roman: 'mâi', tone: 'falling' },
      { roman: 'mii', tone: 'mid' },
    ],
    words: [
      { thai: 'ไม่', roman: 'mâi', gloss: 'not', span: 1 },
      { thai: 'มี', roman: 'mii', gloss: 'to have; there is', span: 1 },
    ],
    meaning: "there isn't any / I don't have",
    mnemonic: ['my', 'me'],
    scene: [
      'A flat palm held out, pushing something away.',
      'Dee jabbing a thumb at their own chest — me.',
    ],
    art: [{ component: 'PalmNo' }, { component: 'Dee', props: { action: 'me' } }],
    category: 'yesno',
    rank: 44,
    notes: 'The most common answer at a stall when they have run out.',
    weak: false,
  },
  {
    id: 'mai-tawng',
    thai: 'ไม่ต้อง',
    syllables: [
      { roman: 'mâi', tone: 'falling' },
      { roman: 'tâwng', tone: 'falling' },
    ],
    words: [
      { thai: 'ไม่', roman: 'mâi', gloss: 'not', span: 1 },
      { thai: 'ต้อง', roman: 'tâwng', gloss: 'must, have to', span: 1 },
    ],
    meaning: "no need / don't bother",
    mnemonic: ['my', 'tong'],
    scene: [
      'A flat palm held out, pushing something away.',
      'A pair of kitchen tongs snapping shut on nothing.',
    ],
    art: [{ component: 'PalmNo' }, { component: 'Tongs' }],
    category: 'yesno',
    rank: 45,
    notes: 'Softer than ไม่เอา. Use it to decline a bag, a straw, a receipt.',
    weak: false,
  },

  // --------------------------------------------------------------- small talk
  {
    id: 'chue-a-rai',
    thai: 'ชื่ออะไร',
    syllables: [
      { roman: 'chûe', tone: 'falling' },
      { roman: 'à', tone: 'low' },
      { roman: 'rai', tone: 'mid' },
    ],
    words: [
      { thai: 'ชื่อ', roman: 'chûe', gloss: 'name; to be named', span: 1 },
      { thai: 'อะไร', roman: 'à-rai', gloss: 'what', span: 2 },
    ],
    meaning: "what's your name?",
    mnemonic: ['chew', 'a rye'],
    scene: [
      'A mouth chewing hard, jaw working.',
      'A single stalk of rye held up with a question mark beside it.',
    ],
    art: [{ component: 'Chew' }, { component: 'Rye', props: { asking: true } }],
    category: 'smalltalk',
    rank: 46,
    notes: 'Full polite form: คุณชื่ออะไรครับ/คะ khun chûe à-rai.',
    weak: false,
  },
  {
    id: 'maa-jaak-nai',
    thai: 'มาจากไหน',
    syllables: [
      { roman: 'maa', tone: 'mid' },
      { roman: 'jàak', tone: 'low' },
      { roman: 'nǎi', tone: 'rising' },
    ],
    words: [
      { thai: 'มา', roman: 'maa', gloss: 'to come', span: 1 },
      { thai: 'จาก', roman: 'jàak', gloss: 'from', span: 1 },
      { thai: 'ไหน', roman: 'nǎi', gloss: 'where', span: 1 },
    ],
    meaning: 'where are you from?',
    mnemonic: ['ma jack', 'nigh?'],
    scene: [
      'A mother cranking a car jack under a heavy suitcase.',
      'A knight in armour pointing down a forked road, question mark overhead.',
    ],
    art: [{ component: 'MaJack' }, { component: 'Knight' }],
    category: 'smalltalk',
    rank: 47,
    weak: false,
  },
  {
    id: 'suay',
    thai: 'สวย',
    syllables: [{ roman: 'sǔay', tone: 'rising' }],
    words: [
      { thai: 'สวย', roman: 'sǔay', gloss: 'beautiful, pretty', span: 1 },
    ],
    meaning: 'beautiful',
    mnemonic: ['sway'],
    scene: ['A palm tree swaying in the breeze against a low sun.'],
    art: [{ component: 'PalmTree' }],
    category: 'smalltalk',
    rank: 48,
    notes:
      'TONE PAIR, and this one bites: สวย sǔay (rising) = beautiful. ซวย suay (mid, flat) = rotten luck / cursed. Say it flat and you have just insulted someone.',
    weak: false,
  },
  {
    id: 'phuut-thai-mai-dai',
    thai: 'พูดไทยไม่ได้',
    syllables: [
      { roman: 'phûut', tone: 'falling' },
      { roman: 'thai', tone: 'mid' },
      { roman: 'mâi', tone: 'falling' },
      { roman: 'dâai', tone: 'falling' },
    ],
    words: [
      { thai: 'พูด', roman: 'phûut', gloss: 'to speak', span: 1 },
      { thai: 'ไทย', roman: 'thai', gloss: 'Thai', span: 1 },
      { thai: 'ไม่', roman: 'mâi', gloss: 'not', span: 1 },
      { thai: 'ได้', roman: 'dâai', gloss: 'can — Thai puts "cannot" after the verb, not before', span: 1 },
    ],
    meaning: "I can't speak Thai",
    mnemonic: ['poot Thai', 'my', 'dye'],
    scene: [
      'A mouth blowing one round puff of air across a Thai flag.',
      'A flat palm held out, pushing something away.',
      'A brush loaded with bright pink hair dye, dripping.',
    ],
    art: [
      { component: 'PuffFlag' },
      { component: 'PalmNo' },
      { component: 'DyeBrush' },
    ],
    category: 'smalltalk',
    rank: 49,
    notes: 'Saying this in Thai is funny enough that it usually buys you goodwill.',
    weak: false,
  },
  {
    id: 'maak',
    thai: 'มาก',
    syllables: [{ roman: 'mâak', tone: 'falling' }],
    words: [
      { thai: 'มาก', roman: 'mâak', gloss: 'much, very — goes after the word it boosts', span: 1 },
    ],
    meaning: 'very / a lot',
    mnemonic: ['mark'],
    scene: ['A thick felt-tip mark scrawled edge to edge across a page.'],
    art: [{ component: 'FeltMark' }],
    category: 'smalltalk',
    rank: 50,
    notes:
      'Goes after the word it boosts: อร่อยมาก, แพงมาก, ร้อนมาก. Use the non-rhotic "mahk" — no r.',
    weak: false,
  },

  // --------------------------------------------------------------------- food
  {
    id: 'im-laew',
    thai: 'อิ่มแล้ว',
    syllables: [
      { roman: 'ìm', tone: 'low' },
      { roman: 'láew', tone: 'high' },
    ],
    words: [
      { thai: 'อิ่ม', roman: 'ìm', gloss: 'full, sated (of food)', span: 1 },
      { thai: 'แล้ว', roman: 'láew', gloss: 'already — marks the state as reached', span: 1 },
    ],
    meaning: "I'm full",
    mnemonic: ['imp', 'lay-oh'],
    scene: [
      'A little imp with a bulging round belly, patting it with both hands.',
      'A hen laying a single egg with a big letter O painted on it.',
    ],
    art: [{ component: 'FullImp' }, { component: 'HenLayO' }],
    category: 'food',
    rank: 51,
    weak: true,
    notes:
      'Weak on both halves: “imp” adds a p, and “lay” is the wrong vowel for แล้ว — it is a flat “eh” held long, not the “ay” of “lay”. Say “leh-o”. แล้ว means “already” and turns up everywhere.',
  },
  {
    id: 'nam-plao',
    thai: 'น้ำเปล่า',
    syllables: [
      { roman: 'nám', tone: 'high' },
      { roman: 'plào', tone: 'low' },
    ],
    words: [
      { thai: 'น้ำ', roman: 'nám', gloss: 'water', span: 1 },
      { thai: 'เปล่า', roman: 'plào', gloss: 'plain, empty, bare', span: 1 },
    ],
    meaning: 'plain water',
    mnemonic: ['Viet-NAM', 'plough'],
    scene: [
      'A conical Vietnamese hat floating on the surface of a lake.',
      'A plough turning one straight furrow through bare earth.',
    ],
    art: [{ component: 'VietHat' }, { component: 'Plough' }],
    category: 'food',
    rank: 52,
    weak: false,
    notes:
      'Order this and you get bottled still water, not tap. เปล่า plào on its own means “plain, empty”.',
  },
  {
    id: 'gin-jee',
    thai: 'กินเจ',
    syllables: [
      { roman: 'gin', tone: 'mid' },
      { roman: 'jee', tone: 'mid' },
    ],
    words: [
      { thai: 'กิน', roman: 'gin', gloss: 'to eat', span: 1 },
      { thai: 'เจ', roman: 'jee', gloss: 'strict Buddhist vegan food, from the Chinese 齋', span: 1 },
    ],
    meaning: 'I eat vegetarian',
    mnemonic: ['gin', 'jay'],
    scene: ['A glass of gin.', 'A blue jay perched on a cabbage.'],
    art: [{ component: 'GinGlass' }, { component: 'Jay' }],
    category: 'food',
    rank: 53,
    notes:
      'เจ is strict Buddhist vegan: no meat, no fish sauce, no egg, no garlic or onion. If you only avoid meat, มังสวิรัติ mang-sà-wí-rát is accurate but hardly anyone at a stall uses it — เจ is what gets understood.',
    weak: false,
  },
  {
    id: 'ao-glap-baan',
    thai: 'เอากลับบ้าน',
    syllables: [
      { roman: 'ao', tone: 'mid' },
      { roman: 'glàp', tone: 'low' },
      { roman: 'bâan', tone: 'falling' },
    ],
    words: [
      { thai: 'เอา', roman: 'ao', gloss: 'to take', span: 1 },
      { thai: 'กลับ', roman: 'glàp', gloss: 'to return, to go back', span: 1 },
      { thai: 'บ้าน', roman: 'bâan', gloss: 'home, house', span: 1 },
    ],
    meaning: 'takeaway, please',
    literal: 'take it back home',
    mnemonic: ['ow!', 'glub', 'barn'],
    scene: [
      'A hand grabbing a hot food box, thumb stubbed — OW!',
      'One fat bubble going GLUB up through water.',
      'A red barn with both doors swung open.',
    ],
    art: [{ component: 'OwGrab' }, { component: 'Glub' }, { component: 'Barn' }],
    category: 'food',
    rank: 54,
    notes: 'Most stalls will just say กลับบ้าน glàp bâan back at you and start bagging it.',
    weak: false,
  },
  {
    id: 'gai',
    thai: 'ไก่',
    syllables: [{ roman: 'gài', tone: 'low' }],
    words: [
      { thai: 'ไก่', roman: 'gài', gloss: 'chicken', span: 1 },
    ],
    meaning: 'chicken',
    mnemonic: ['guy'],
    scene: ['A guy in a flat cap, arms folded, a hen roosting on his shoulder.'],
    art: [{ component: 'GuyHen' }],
    category: 'food',
    rank: 55,
    notes: 'Half the menu is ผัดกะเพราไก่, ข้าวมันไก่, ไก่ย่าง. Learn this one and หมู first.',
    weak: false,
  },
  {
    id: 'muu',
    thai: 'หมู',
    syllables: [{ roman: 'mǔu', tone: 'rising' }],
    words: [
      { thai: 'หมู', roman: 'mǔu', gloss: 'pig, pork. Also slang for "easy".', span: 1 },
    ],
    meaning: 'pork',
    mnemonic: ['moo'],
    scene: ['A pig at a microphone letting out a long MOO, looking confused.'],
    art: [{ component: 'PigMoo' }],
    category: 'food',
    rank: 56,
    notes: 'Also slang for "easy": งานหมูๆ ngaan mǔu-mǔu is a piece of cake.',
    weak: false,
  },
  {
    id: 'nit-noi',
    thai: 'นิดหน่อย',
    syllables: [
      { roman: 'nít', tone: 'high' },
      { roman: 'nòi', tone: 'low' },
    ],
    words: [
      { thai: 'นิด', roman: 'nít', gloss: 'a tiny amount', span: 1 },
      { thai: 'หน่อย', roman: 'nòi', gloss: 'a little, slightly', span: 1 },
    ],
    meaning: 'just a little',
    mnemonic: ['knit', 'noise'],
    scene: [
      'A knitted square no bigger than a thumbnail, needles still in it.',
      'A boombox blaring, sound waves radiating.',
    ],
    art: [{ component: 'TinyKnit' }, { component: 'BoomboxLot', props: { lot: false } }],
    category: 'food',
    rank: 57,
    weak: false,
    notes: '"noise" bolts a z onto the end — stop dead at nòi. Softens almost any request.',
  },
  {
    id: 'mai-sai-nam-khaeng',
    thai: 'ไม่ใส่น้ำแข็ง',
    syllables: [
      { roman: 'mâi', tone: 'falling' },
      { roman: 'sài', tone: 'low' },
      { roman: 'nám', tone: 'high' },
      { roman: 'khǎeng', tone: 'rising' },
    ],
    words: [
      { thai: 'ไม่', roman: 'mâi', gloss: 'not', span: 1 },
      { thai: 'ใส่', roman: 'sài', gloss: 'to put in, to add', span: 1 },
      { thai: 'น้ำ', roman: 'nám', gloss: 'water', span: 1 },
      { thai: 'แข็ง', roman: 'khǎeng', gloss: 'hard — น้ำแข็ง is literally "hard water", i.e. ice', span: 1 },
    ],
    meaning: 'no ice, please',
    mnemonic: ['my', 'sigh', 'NAM-kang'],
    scene: [
      'A flat palm held out, pushing something away.',
      'Dee letting out a long sigh, shoulders dropping.',
      'A kangaroo in a conical Vietnamese hat, holding up one ice cube.',
    ],
    art: [
      { component: 'PalmNo' },
      { component: 'Dee', props: { action: "sigh" } },
      { component: 'NamKanga' },
    ],
    category: 'food',
    rank: 58,
    weak: false,
    notes:
      'ใส่ sài on its own means “put in”, and น้ำแข็ง is literally “hard water”. Four syllables is a lot — ไม่ใส่ mâi sài alone already means “without”.',
  },

  // -------------------------------------------------------------------- money
  {
    id: 'gii-baat',
    thai: 'กี่บาท',
    syllables: [
      { roman: 'gìi', tone: 'low' },
      { roman: 'bàat', tone: 'low' },
    ],
    words: [
      { thai: 'กี่', roman: 'gìi', gloss: 'how many', span: 1 },
      { thai: 'บาท', roman: 'bàat', gloss: 'baht, the currency', span: 1 },
    ],
    meaning: 'how many baht?',
    mnemonic: ['key', 'baht'],
    scene: [
      'A heavy brass key lying flat.',
      'A fan of purple banknotes spread like a hand of cards.',
    ],
    art: [{ component: 'Key' }, { component: 'BahtNotes' }],
    category: 'money',
    rank: 59,
    weak: false,
    notes:
      '“Baht” is the same word in English — it just needs the long ah and a low tone. กี่ gìì means “how many” and works with any counted thing.',
  },
  {
    id: 'ngern-thawn',
    thai: 'เงินทอน',
    syllables: [
      { roman: 'ngern', tone: 'mid' },
      { roman: 'thawn', tone: 'mid' },
    ],
    words: [
      { thai: 'เงิน', roman: 'ngern', gloss: 'money; also silver', span: 1 },
      { thai: 'ทอน', roman: 'thawn', gloss: 'to give change back', span: 1 },
    ],
    meaning: 'change (money back)',
    mnemonic: ['ng-earn', 'torn'],
    scene: [
      'A wage packet split open with coins spilling out — what you EARN.',
      'A banknote torn clean in half.',
    ],
    art: [{ component: 'WagePacket' }, { component: 'TornNote' }],
    category: 'money',
    rank: 60,
    weak: true,
    notes:
      'Weak, and unfixably so: English never starts a word with ng-. Say “singer”, hold the ng, then drop the si-. The rime is exactly “earn”, which is also what money is.',
  },
  {
    id: 'thuuk',
    thai: 'ถูก',
    syllables: [{ roman: 'thùuk', tone: 'low' }],
    words: [
      { thai: 'ถูก', roman: 'thùuk', gloss: 'cheap — and, separately, "correct". Context decides.', span: 1 },
    ],
    meaning: 'cheap',
    mnemonic: ['took'],
    scene: ['A hand that has just took a bargain off a shelf, price tag flapping.'],
    art: [{ component: 'TookBargain' }],
    category: 'money',
    rank: 61,
    notes:
      'FALSE FRIEND WITH ITSELF: ถูก also means "correct". ถูกแล้ว thùuk láew is "that’s right", not "it got cheap".',
    weak: false,
  },
  {
    id: 'rap-bat-mai',
    thai: 'รับบัตรไหม',
    syllables: [
      { roman: 'ráp', tone: 'high' },
      { roman: 'bàt', tone: 'low' },
      { roman: 'mǎi', tone: 'rising' },
    ],
    words: [
      { thai: 'รับ', roman: 'ráp', gloss: 'to receive, to accept', span: 1 },
      { thai: 'บัตร', roman: 'bàt', gloss: 'card', span: 1 },
      { thai: 'ไหม', roman: 'mǎi', gloss: 'question particle', span: 1 },
    ],
    meaning: 'do you take cards?',
    mnemonic: ['rap bat', 'my?'],
    scene: [
      'A rapper holding a cricket bat up like a microphone.',
      'A knight in armour pointing down a forked road, question mark overhead.',
    ],
    art: [{ component: 'RapBat' }, { component: 'Knight' }],
    category: 'money',
    rank: 62,
    notes: 'Outside malls the answer is usually ไม่รับ mâi ráp. Carry cash.',
    weak: false,
  },

  // ----------------------------------------------------------------- shopping
  {
    id: 'mii-mai',
    thai: 'มีไหม',
    syllables: [
      { roman: 'mii', tone: 'mid' },
      { roman: 'mǎi', tone: 'rising' },
    ],
    words: [
      { thai: 'มี', roman: 'mii', gloss: 'to have; there is', span: 1 },
      { thai: 'ไหม', roman: 'mǎi', gloss: 'question particle', span: 1 },
    ],
    meaning: 'do you have any?',
    mnemonic: ['me', 'my?'],
    scene: [
      'Dee jabbing a thumb at their own chest — me.',
      'A knight in armour pointing down a forked road, question mark overhead.',
    ],
    art: [{ component: 'Dee', props: { action: 'me' } }, { component: 'Knight' }],
    category: 'shopping',
    rank: 63,
    weak: false,
  },
  {
    id: 'laawng-dai-mai',
    thai: 'ลองได้ไหม',
    syllables: [
      { roman: 'laawng', tone: 'mid' },
      { roman: 'dâai', tone: 'falling' },
      { roman: 'mǎi', tone: 'rising' },
    ],
    words: [
      { thai: 'ลอง', roman: 'laawng', gloss: 'to try, to test out', span: 1 },
      { thai: 'ได้', roman: 'dâai', gloss: 'can', span: 1 },
      { thai: 'ไหม', roman: 'mǎi', gloss: 'question particle', span: 1 },
    ],
    meaning: 'can I try it?',
    mnemonic: ['long', 'dye my'],
    scene: [
      'A tape measure pulled out long and straight.',
      'A head having its hair dyed bright pink with a brush.',
    ],
    art: [{ component: 'TapeMeasure' }, { component: 'HairDye' }],
    category: 'shopping',
    rank: 64,
    notes: 'Works for clothes, shoes, and tasting food at a market.',
    weak: false,
  },
  {
    id: 'an-nai',
    thai: 'อันไหน',
    syllables: [
      { roman: 'an', tone: 'mid' },
      { roman: 'nǎi', tone: 'rising' },
    ],
    words: [
      { thai: 'อัน', roman: 'an', gloss: 'classifier for a small object — "item, piece"', span: 1 },
      { thai: 'ไหน', roman: 'nǎi', gloss: 'which, where', span: 1 },
    ],
    meaning: 'which one?',
    mnemonic: ['on nigh?'],
    scene: ['A knight in armour perched ON a signpost at a fork, pointing down one road.'],
    art: [{ component: 'KnightOn' }],
    category: 'shopping',
    rank: 65,
    weak: false,
    notes:
      'Both syllables in one image: the knight sits ON the sign. Pair it with อันนี้ an-níí, “this one”.',
  },
  {
    id: 'yai',
    thai: 'ใหญ่',
    syllables: [{ roman: 'yài', tone: 'low' }],
    words: [
      { thai: 'ใหญ่', roman: 'yài', gloss: 'big, large', span: 1 },
    ],
    meaning: 'big',
    mnemonic: ['y-eye'],
    scene: ['One huge eye, wide open, filling the whole panel.'],
    art: [{ component: 'BigEye' }],
    category: 'shopping',
    rank: 66,
    weak: false,
  },
  {
    id: 'lek',
    thai: 'เล็ก',
    syllables: [{ roman: 'lék', tone: 'high' }],
    words: [
      { thai: 'เล็ก', roman: 'lék', gloss: 'small, little', span: 1 },
    ],
    meaning: 'small',
    mnemonic: ['leg'],
    scene: ["One tiny doll's leg lying on a giant open palm."],
    art: [{ component: 'TinyLeg' }],
    category: 'shopping',
    rank: 67,
    weak: false,
    notes:
      'Ends in a swallowed k, not a voiced g — Thai final stops are never released. เล็ก is also a very common nickname; half of Thailand has a friend called Lek.',
  },
  {
    id: 'mai-ao-thung',
    thai: 'ไม่เอาถุง',
    syllables: [
      { roman: 'mâi', tone: 'falling' },
      { roman: 'ao', tone: 'mid' },
      { roman: 'thǔng', tone: 'rising' },
    ],
    words: [
      { thai: 'ไม่', roman: 'mâi', gloss: 'not', span: 1 },
      { thai: 'เอา', roman: 'ao', gloss: 'to take, to want', span: 1 },
      { thai: 'ถุง', roman: 'thǔng', gloss: 'bag', span: 1 },
    ],
    meaning: 'no bag, thanks',
    mnemonic: ['my', 'ow!', 'tongue'],
    scene: [
      'A flat palm held out, pushing something away.',
      'A hand snatching back from a counter, thumb stubbed — OW!',
      'A big tongue stuck out with a plastic bag hanging off the tip.',
    ],
    art: [
      { component: 'PalmNo' },
      { component: 'OwGrab' },
      { component: 'BagTongue' },
    ],
    category: 'shopping',
    rank: 68,
    notes: 'You will need this at every 7-Eleven, several times a day.',
    weak: false,
  },

  // --------------------------------------------------------------- directions
  {
    id: 'yuu-nai',
    thai: 'อยู่ไหน',
    syllables: [
      { roman: 'yùu', tone: 'low' },
      { roman: 'nǎi', tone: 'rising' },
    ],
    words: [
      { thai: 'อยู่', roman: 'yùu', gloss: 'to be located at', span: 1 },
      { thai: 'ไหน', roman: 'nǎi', gloss: 'where', span: 1 },
    ],
    meaning: 'where is it?',
    mnemonic: ['you', 'nigh?'],
    scene: [
      'A finger jabbing straight out of the frame at YOU.',
      'A knight in armour pointing down a forked road, question mark overhead.',
    ],
    art: [{ component: 'PointYou' }, { component: 'Knight' }],
    category: 'directions',
    rank: 69,
    notes: 'Put any noun in front: ห้องน้ำอยู่ไหน, โรงพยาบาลอยู่ไหน, รถไฟอยู่ไหน.',
    weak: false,
  },
  {
    id: 'thii-nii',
    thai: 'ที่นี่',
    syllables: [
      { roman: 'thîi', tone: 'falling' },
      { roman: 'nîi', tone: 'falling' },
    ],
    words: [
      { thai: 'ที่', roman: 'thîi', gloss: 'place; at', span: 1 },
      { thai: 'นี่', roman: 'nîi', gloss: 'this, here', span: 1 },
    ],
    meaning: 'here',
    mnemonic: ['tea', 'knee'],
    scene: [
      'A cup of tea set down hard on a spot marked with an X.',
      'A bare knee with a plaster on it.',
    ],
    art: [{ component: 'TeaSpot' }, { component: 'Knee' }],
    category: 'directions',
    rank: 70,
    weak: false,
  },
  {
    id: 'glai-near',
    thai: 'ใกล้',
    syllables: [{ roman: 'glâi', tone: 'falling' }],
    words: [
      { thai: 'ใกล้', roman: 'glâi', gloss: 'near, close by', span: 1 },
    ],
    meaning: 'near',
    mnemonic: ['cli(mb)'],
    scene: ['A climber\'s hand already over the ledge, the top a few inches away.'],
    art: [{ component: 'Climb', props: { far: false } }],
    category: 'directions',
    rank: 71,
    weak: false,
    notes:
      'TONE PAIR, the classic trap: ใกล้ glâi (falling) = near. ไกล glai (mid, flat) = far. Same consonants, opposite answers. Thais double it — ใกล้ๆ — or point. “Climb” has the right kl- cluster; let the m fall away.',
  },
  {
    id: 'glai-far',
    thai: 'ไกล',
    syllables: [{ roman: 'glai', tone: 'mid' }],
    words: [
      { thai: 'ไกล', roman: 'glai', gloss: 'far, distant', span: 1 },
    ],
    meaning: 'far',
    mnemonic: ['cli(mb)'],
    scene: ['A climber at the foot of a cliff, the summit a tiny notch far above.'],
    art: [{ component: 'Climb', props: { far: true } }],
    category: 'directions',
    rank: 72,
    weak: false,
    notes:
      'TONE PAIR with ใกล้ glâi (near). Flat tone = far, falling tone = near — the contour above is doing the real work. “Climb” has the right kl- cluster; let the m fall away.',
  },

  // ---------------------------------------------------------------- transport
  {
    id: 'taek-sii',
    thai: 'แท็กซี่',
    syllables: [
      { roman: 'tháek', tone: 'high' },
      { roman: 'sîi', tone: 'falling' },
    ],
    words: [
      { thai: 'แท็กซี่', roman: 'tháek-sîi', gloss: 'taxi — the English word, respelled with Thai tones', span: 2 },
    ],
    meaning: 'taxi',
    mnemonic: ['taxi'],
    scene: ['A taxi with its roof light lit, waiting at a kerb.'],
    art: [{ component: 'Taxi' }],
    category: 'transport',
    rank: 73,
    notes:
      'A loanword, so the sounds are free — the tones are not. Flat English "taxi" often does not land; high then falling does.',
    weak: false,
  },
  {
    id: 'jawt-trong-nii',
    thai: 'จอดตรงนี้',
    syllables: [
      { roman: 'jàwt', tone: 'low' },
      { roman: 'trong', tone: 'mid' },
      { roman: 'níi', tone: 'high' },
    ],
    words: [
      { thai: 'จอด', roman: 'jàwt', gloss: 'to park, to pull up', span: 1 },
      { thai: 'ตรง', roman: 'trong', gloss: 'straight; exactly at', span: 1 },
      { thai: 'นี้', roman: 'níi', gloss: 'this', span: 1 },
    ],
    meaning: 'stop right here',
    mnemonic: ['jot', 'throng', 'knee'],
    scene: [
      'A pen jotting one quick line on a notepad.',
      'A throng of people packed shoulder to shoulder in a straight line.',
      'A bare knee with a plaster on it.',
    ],
    art: [{ component: 'Jot' }, { component: 'Throng' }, { component: 'Knee' }],
    category: 'transport',
    rank: 74,
    notes: 'The one to have ready in a taxi or songthaew before you miss your street.',
    weak: false,
  },
  {
    id: 'pert-mii-ter',
    thai: 'เปิดมิเตอร์',
    syllables: [
      { roman: 'pèrt', tone: 'low' },
      { roman: 'mí', tone: 'high' },
      { roman: 'ter', tone: 'mid' },
    ],
    words: [
      { thai: 'เปิด', roman: 'pèrt', gloss: 'to open, to switch on', span: 1 },
      { thai: 'มิเตอร์', roman: 'mí-ter', gloss: 'meter — the English word', span: 2 },
    ],
    meaning: 'turn the meter on',
    mnemonic: ['pert', 'meter'],
    scene: [
      'A tulip snapping open, stem bolt upright and pert.',
      'A taxi meter clicking over from 35.',
    ],
    art: [{ component: 'PertTulip' }, { component: 'Meter' }],
    category: 'transport',
    rank: 75,
    weak: false,
    notes:
      'Thai ป is between English b and p — lips together, no puff of air. Say this before the taxi moves, not after.',
  },
  {
    id: 'rot-tit',
    thai: 'รถติด',
    syllables: [
      { roman: 'rót', tone: 'high' },
      { roman: 'tìt', tone: 'low' },
    ],
    words: [
      { thai: 'รถ', roman: 'rót', gloss: 'vehicle, car', span: 1 },
      { thai: 'ติด', roman: 'tìt', gloss: 'stuck, attached, jammed', span: 1 },
    ],
    meaning: 'traffic jam',
    literal: 'the car is stuck',
    mnemonic: ['rot', 'tit'],
    scene: [
      'A rotting apple, brown and collapsing in on itself.',
      'A great tit clamped to a bird feeder, claws locked, refusing to let go.',
    ],
    art: [{ component: 'RotApple' }, { component: 'TitBird' }],
    category: 'transport',
    rank: 76,
    weak: false,
    notes:
      'ติด tìt means “stuck, attached” and turns up everywhere — ติดต่อ tìt tàw is to contact someone. End it on an unreleased t, tongue stopping behind the teeth.',
  },
  {
    id: 'maw-ter-sai',
    thai: 'มอเตอร์ไซค์',
    syllables: [
      { roman: 'maw', tone: 'mid' },
      { roman: 'ter', tone: 'mid' },
      { roman: 'sai', tone: 'mid' },
    ],
    words: [
      { thai: 'มอเตอร์ไซค์', roman: 'maw-ter-sai', gloss: 'motorcycle — the English word, all three syllables flat', span: 3 },
    ],
    meaning: 'motorbike',
    mnemonic: ['motor', 'sigh'],
    scene: [
      'A bare engine block with its pistons showing.',
      'A crash helmet with a long sigh of steam escaping the visor.',
    ],
    art: [{ component: 'EngineBlock' }, { component: 'HelmetSigh' }],
    category: 'transport',
    rank: 77,
    notes:
      'All three syllables are flat mid tone — do not sing it. วิน win is the motorbike-taxi rank on the corner.',
    weak: false,
  },
  {
    id: 'chao',
    thai: 'เช่า',
    syllables: [{ roman: 'châo', tone: 'falling' }],
    words: [
      { thai: 'เช่า', roman: 'châo', gloss: 'to rent, to hire', span: 1 },
    ],
    meaning: 'to rent',
    mnemonic: ['chow'],
    scene: ['A steaming bowl of chow with a set of rental keys resting on the rim.'],
    art: [{ component: 'ChowKeys' }],
    category: 'transport',
    rank: 78,
    notes:
      'เช่ามอเตอร์ไซค์ châo maw-ter-sai rents you a bike. They will want your passport — a photocopy is usually enough, and safer.',
    weak: false,
  },

  // ------------------------------------------------------------ accommodation
  {
    id: 'mii-hawng-waang-mai',
    thai: 'มีห้องว่างไหม',
    syllables: [
      { roman: 'mii', tone: 'mid' },
      { roman: 'hâwng', tone: 'falling' },
      { roman: 'wâang', tone: 'falling' },
      { roman: 'mǎi', tone: 'rising' },
    ],
    words: [
      { thai: 'มี', roman: 'mii', gloss: 'to have; there is', span: 1 },
      { thai: 'ห้อง', roman: 'hâwng', gloss: 'room', span: 1 },
      { thai: 'ว่าง', roman: 'wâang', gloss: 'free, vacant, empty', span: 1 },
      { thai: 'ไหม', roman: 'mǎi', gloss: 'question particle', span: 1 },
    ],
    meaning: 'any rooms free?',
    mnemonic: ['me', 'Hong', 'wang!', 'my?'],
    scene: [
      'Dee jabbing a thumb at their own chest — me.',
      'The Hong Kong skyline at dusk.',
      'A brass gong struck hard right beside an ear — WANG.',
      'A knight in armour pointing down a forked road, question mark overhead.',
    ],
    art: [
      { component: 'Dee', props: { action: "me" } },
      { component: 'HongWang' },
      { component: 'Gong' },
      { component: 'Knight' },
    ],
    category: 'stay',
    rank: 79,
    weak: false,
    notes:
      'Four short panels, one sound each. ว่าง wâang means “free, vacant” and is worth learning alone — it is also how you say you are free to meet.',
  },
  {
    id: 'naam-rawn',
    thai: 'น้ำร้อน',
    syllables: [
      { roman: 'náam', tone: 'high' },
      { roman: 'ráwn', tone: 'high' },
    ],
    words: [
      { thai: 'น้ำ', roman: 'náam', gloss: 'water', span: 1 },
      { thai: 'ร้อน', roman: 'ráwn', gloss: 'hot (temperature)', span: 1 },
    ],
    meaning: 'hot water',
    mnemonic: ['Viet-NAM', '(p)rawn'],
    scene: [
      'A conical Vietnamese hat floating on the surface of a lake.',
      'A prawn dropped into a steaming pot, curling as it hits.',
    ],
    art: [{ component: 'VietHat' }, { component: 'PrawnPot' }],
    category: 'stay',
    rank: 80,
    weak: false,
    notes:
      'Drop the p off “prawn” and you have ráwn exactly. Both syllables are high tone — say them level and up.',
  },

  // --------------------------------------------------------------------- time
  {
    id: 'gii-moong',
    thai: 'กี่โมง',
    syllables: [
      { roman: 'gìi', tone: 'low' },
      { roman: 'moong', tone: 'mid' },
    ],
    words: [
      { thai: 'กี่', roman: 'gìi', gloss: 'how many', span: 1 },
      { thai: 'โมง', roman: 'moong', gloss: 'o\'clock — the daytime hour word', span: 1 },
    ],
    meaning: 'what time is it?',
    mnemonic: ['key', 'moan'],
    scene: [
      'A heavy brass key lying flat.',
      'Dee moaning at a wall clock, hands over the face.',
    ],
    art: [{ component: 'Key' }, { component: 'ClockMoan' }],
    category: 'time',
    rank: 81,
    weak: false,
    notes:
      'โมง ends in -ng, not -n — hold the nasal at the back of the mouth. Answering needs โมง too: 9 โมง is nine in the morning.',
  },
  {
    id: 'tawn-nii',
    thai: 'ตอนนี้',
    syllables: [
      { roman: 'tawn', tone: 'mid' },
      { roman: 'níi', tone: 'high' },
    ],
    words: [
      { thai: 'ตอน', roman: 'tawn', gloss: 'moment, period, part', span: 1 },
      { thai: 'นี้', roman: 'níi', gloss: 'this', span: 1 },
    ],
    meaning: 'right now',
    mnemonic: ['dawn', 'knee'],
    scene: [
      'A sun cracking the horizon at dawn.',
      'A bare knee with a plaster on it.',
    ],
    art: [{ component: 'Dawn' }, { component: 'Knee' }],
    category: 'time',
    rank: 82,
    notes:
      'Thai ต is unaspirated — closer to English d than t. "dawn" is the better match; "torn" is เงินทอน.',
    weak: false,
  },
  {
    id: 'wan-nii',
    thai: 'วันนี้',
    syllables: [
      { roman: 'wan', tone: 'mid' },
      { roman: 'níi', tone: 'high' },
    ],
    words: [
      { thai: 'วัน', roman: 'wan', gloss: 'day', span: 1 },
      { thai: 'นี้', roman: 'níi', gloss: 'this', span: 1 },
    ],
    meaning: 'today',
    mnemonic: ['one', 'knee'],
    scene: [
      'A single large numeral 1 standing on its own.',
      'A bare knee with a plaster on it.',
    ],
    art: [{ component: 'One' }, { component: 'Knee' }],
    category: 'time',
    rank: 83,
    weak: false,
  },
  {
    id: 'phrung-nii',
    thai: 'พรุ่งนี้',
    syllables: [
      { roman: 'phrûng', tone: 'falling' },
      { roman: 'níi', tone: 'high' },
    ],
    words: [
      { thai: 'พรุ่ง', roman: 'phrûng', gloss: 'morrow — only ever used with นี้', span: 1 },
      { thai: 'นี้', roman: 'níi', gloss: 'this', span: 1 },
    ],
    meaning: 'tomorrow',
    mnemonic: ['prong', 'knee'],
    scene: ['A single fork prong bent sharply upward.', 'A bare knee with a plaster on it.'],
    art: [{ component: 'Prong' }, { component: 'Knee' }],
    category: 'time',
    rank: 84,
    weak: true,
    notes:
      'Weak: “prong” nails the pr- and the -ng, but its vowel is an “o” where Thai wants a tight “u”. Say “proong”. นี้ níi is the same “this” as in วันนี้ and ตอนนี้.',
  },
  {
    id: 'muea-waan',
    thai: 'เมื่อวาน',
    syllables: [
      { roman: 'mûea', tone: 'falling' },
      { roman: 'waan', tone: 'mid' },
    ],
    words: [
      { thai: 'เมื่อ', roman: 'mûea', gloss: 'when, at the time of', span: 1 },
      { thai: 'วาน', roman: 'waan', gloss: 'the previous day', span: 1 },
    ],
    meaning: 'yesterday',
    mnemonic: ['mmm-uh', 'wan'],
    scene: [
      'A mouth humming MMM with the lips pulled flat and wide, never rounded.',
      'A pale, wan face with dark circles under the eyes.',
    ],
    art: [{ component: 'MmmFlat' }, { component: 'WanFace' }],
    category: 'time',
    rank: 85,
    weak: true,
    notes:
      'Weak because English has no letter for this vowel: say “me”, then pull your lips flat and slide your tongue back. Rounding them turns it into the wrong word. วาน waan is a long ah, and Thai has no v — start it with a w.',
  },
  {
    id: 'muea-rai',
    thai: 'เมื่อไหร่',
    syllables: [
      { roman: 'mûea', tone: 'falling' },
      { roman: 'rài', tone: 'low' },
    ],
    words: [
      { thai: 'เมื่อ', roman: 'mûea', gloss: 'when, at the time of', span: 1 },
      { thai: 'ไหร่', roman: 'rài', gloss: 'what (a worn-down อะไร)', span: 1 },
    ],
    meaning: 'when?',
    mnemonic: ['mmm-uh', 'rye'],
    scene: [
      'A mouth humming MMM with the lips pulled flat and wide, never rounded.',
      'A sheaf of rye stalks tied with string.',
    ],
    art: [{ component: 'MmmFlat' }, { component: 'Rye' }],
    category: 'time',
    rank: 86,
    weak: true,
    notes:
      'Weak for the same reason as เมื่อวาน: lips flat, not rounded. ไหร่ rài is the same worn-down อะไร as in เท่าไหร่ thâo-rài.',
  },
  {
    id: 'diao',
    thai: 'เดี๋ยว',
    syllables: [{ roman: 'dǐao', tone: 'rising' }],
    words: [
      { thai: 'เดี๋ยว', roman: 'dǐao', gloss: 'a moment, in a second', span: 1 },
    ],
    meaning: 'hold on / in a moment',
    mnemonic: ['Dee: ow!'],
    scene: ['Dee hopping on one foot, clutching a stubbed toe.'],
    art: [{ component: 'Dee', props: { action: 'ow' } }],
    category: 'time',
    rank: 87,
    notes: 'เดี๋ยวๆ dǐao-dǐao doubled is "wait wait wait". You will hear it constantly.',
    weak: false,
  },
  {
    id: 'reo',
    thai: 'เร็ว',
    syllables: [{ roman: 'reo', tone: 'mid' }],
    words: [
      { thai: 'เร็ว', roman: 'reo', gloss: 'fast, quick', span: 1 },
    ],
    meaning: 'fast / hurry',
    mnemonic: ['rev'],
    scene: ['A motorbike throttle twisted hard, speed lines and exhaust puffs behind.'],
    art: [{ component: 'Rev' }],
    category: 'time',
    rank: 88,
    weak: false,
    notes:
      'Ends in a w-glide, not a v — but Thai has no v and Thai speakers substitute w for it anyway, so "rev" lands. Say "ray-oh" run together fast.',
  },

  // ------------------------------------------------------------------- health
  {
    id: 'mai-sabai',
    thai: 'ไม่สบาย',
    syllables: [
      { roman: 'mâi', tone: 'falling' },
      { roman: 'sà', tone: 'low' },
      { roman: 'baai', tone: 'mid' },
    ],
    words: [
      { thai: 'ไม่', roman: 'mâi', gloss: 'not', span: 1 },
      { thai: 'สบาย', roman: 'sà-baai', gloss: 'comfortable, well', span: 2 },
    ],
    meaning: "I'm not well",
    mnemonic: ['my', 'subway'],
    scene: [
      'A flat palm held out, pushing something away.',
      'A subway train pulling into a tiled platform.',
    ],
    art: [{ component: 'PalmNo' }, { component: 'Subway' }],
    category: 'health',
    rank: 89,
    notes: 'Covers everything from a cold to a hangover. Nobody asks for detail.',
    weak: false,
  },
  {
    id: 'puat-hua',
    thai: 'ปวดหัว',
    syllables: [
      { roman: 'pùat', tone: 'low' },
      { roman: 'hǔa', tone: 'rising' },
    ],
    words: [
      { thai: 'ปวด', roman: 'pùat', gloss: 'to ache — pairs with any body part', span: 1 },
      { thai: 'หัว', roman: 'hǔa', gloss: 'head', span: 1 },
    ],
    meaning: 'headache',
    mnemonic: ['poor \'at', 'who-ah?'],
    scene: [
      'A battered, sorry-looking hat, brim collapsed.',
      'An owl turning its head right round, eyes screwed shut, calling WHO-AH.',
    ],
    art: [{ component: 'PoorHat' }, { component: 'Owl' }],
    category: 'health',
    rank: 90,
    weak: true,
    notes:
      'Weak: “poor ‘at” is two beats doing the work of one. ปวด pùat is a single syllable — slide straight from the oo into the ah without stopping. It pairs with any body part.',
  },
  {
    id: 'puat-thawng',
    thai: 'ปวดท้อง',
    syllables: [
      { roman: 'pùat', tone: 'low' },
      { roman: 'tháwng', tone: 'high' },
    ],
    words: [
      { thai: 'ปวด', roman: 'pùat', gloss: 'to ache', span: 1 },
      { thai: 'ท้อง', roman: 'tháwng', gloss: 'belly, stomach; also "pregnant"', span: 1 },
    ],
    meaning: 'stomach ache',
    mnemonic: ['poor \'at', 't-hong'],
    scene: [
      'A battered, sorry-looking hat, brim collapsed.',
      'A rubber flip-flop with its strap snapped clean through.',
    ],
    art: [{ component: 'PoorHat' }, { component: 'Thong' }],
    category: 'health',
    rank: 91,
    weak: true,
    notes:
      'Weak for the same reason as ปวดหัว. Also: ท is a hard t with a puff of air, not the th of “thing”. ท้อง tháwng is belly — and, on its own, “pregnant”.',
  },
  {
    id: 'pen-khai',
    thai: 'เป็นไข้',
    syllables: [
      { roman: 'pen', tone: 'mid' },
      { roman: 'khâi', tone: 'falling' },
    ],
    words: [
      { thai: 'เป็น', roman: 'pen', gloss: 'to be; to have (an illness)', span: 1 },
      { thai: 'ไข้', roman: 'khâi', gloss: 'fever', span: 1 },
    ],
    meaning: 'I have a fever',
    mnemonic: ['pen', 'KAY-ak'],
    scene: [
      'A single fountain pen held up between two fingers.',
      'A kayak nose-down in the water, shipping over the side.',
    ],
    art: [{ component: 'Pen' }, { component: 'Kayak' }],
    category: 'health',
    rank: 92,
    weak: false,
    notes:
      'Only the first syllable of “kayak” counts — stop before the -ak. ไข้ khâi (fever, falling) is one tone away from ไข่ khài (egg, low). เป็นไข่ would be “I am an egg”.',
  },
  {
    id: 'yaa',
    thai: 'ยา',
    syllables: [{ roman: 'yaa', tone: 'mid' }],
    words: [
      { thai: 'ยา', roman: 'yaa', gloss: 'medicine, drug', span: 1 },
    ],
    meaning: 'medicine',
    mnemonic: ['yaar!'],
    scene: ['A pirate with an eyepatch shouting YAAR over a bottle of pills.'],
    art: [{ component: 'Pirate' }],
    category: 'health',
    rank: 93,
    notes:
      'Pharmacy is ร้านขายยา ráan khǎai yaa — literally "shop that sells medicine". Thai pharmacies hand over most things across the counter with no prescription.',
    weak: false,
  },
  {
    id: 'roong-pha-yaa-baan',
    thai: 'โรงพยาบาล',
    syllables: [
      { roman: 'roong', tone: 'mid' },
      { roman: 'phá', tone: 'high' },
      { roman: 'yaa', tone: 'mid' },
      { roman: 'baan', tone: 'mid' },
    ],
    words: [
      { thai: 'โรง', roman: 'roong', gloss: 'hall, building — the prefix on โรงเรียน school, โรงแรม hotel', span: 1 },
      { thai: 'พยาบาล', roman: 'phá-yaa-baan', gloss: 'to nurse; a nurse', span: 3 },
    ],
    meaning: 'hospital',
    mnemonic: ['wrong', 'pa', 'yaar!', 'barn'],
    scene: [
      'A big red X stamped across a test paper.',
      'A father in a flat cap, arms folded.',
      'A pirate with an eyepatch shouting YAAR over a bottle of pills.',
      'A red barn with both doors swung open.',
    ],
    art: [
      { component: 'WrongX' },
      { component: 'Pa' },
      { component: 'Pirate' },
      { component: 'Barn' },
    ],
    category: 'health',
    rank: 94,
    weak: false,
    notes:
      'Four panels, one clean sound each — long, but nothing is welded together. โรง roong is the “building” prefix: โรงเรียน school, โรงแรม hotel. Pair it with อยู่ไหน.',
  },
  {
    id: 'phae',
    thai: 'แพ้',
    syllables: [{ roman: 'pháe', tone: 'high' }],
    words: [
      { thai: 'แพ้', roman: 'pháe', gloss: 'to be allergic to — and, separately, to lose a contest', span: 1 },
    ],
    meaning: "I'm allergic to",
    mnemonic: ['pear'],
    scene: ['A pear with a red rash of spots spreading across its skin.'],
    art: [{ component: 'RashPear' }],
    category: 'health',
    rank: 95,
    notes:
      'แพ้ถั่ว pháe thùa is "allergic to peanuts" — the one worth memorising exactly. แพ้ also means "to lose" a game.',
    weak: false,
  },

  // ------------------------------------------------------------------ weather
  {
    id: 'rawn',
    thai: 'ร้อน',
    syllables: [{ roman: 'ráwn', tone: 'high' }],
    words: [
      { thai: 'ร้อน', roman: 'ráwn', gloss: 'hot (temperature)', span: 1 },
    ],
    meaning: 'hot',
    mnemonic: ['(p)rawn'],
    scene: ['A prawn sizzling and curling on a hot grill.'],
    art: [{ component: 'PrawnGrill' }],
    category: 'weather',
    rank: 96,
    weak: false,
    notes:
      'Drop the p off “prawn” and you have ráwn exactly — and the grill is carrying the meaning as well as the sound.',
  },
  {
    id: 'naao',
    thai: 'หนาว',
    syllables: [{ roman: 'nǎao', tone: 'rising' }],
    words: [
      { thai: 'หนาว', roman: 'nǎao', gloss: 'cold — of weather and of you. For cold objects use เย็น yen.', span: 1 },
    ],
    meaning: 'cold (weather)',
    mnemonic: ['now!'],
    scene: ['A finger jabbing a watch face — NOW! — with frost creeping across the glass.'],
    art: [{ component: 'NowWatch' }],
    category: 'weather',
    rank: 97,
    notes:
      'For cold objects or drinks use เย็น yen. หนาว is what the weather does to you.',
    weak: false,
  },
  {
    id: 'fon-tok',
    thai: 'ฝนตก',
    syllables: [
      { roman: 'fǒn', tone: 'rising' },
      { roman: 'tòk', tone: 'low' },
    ],
    words: [
      { thai: 'ฝน', roman: 'fǒn', gloss: 'rain', span: 1 },
      { thai: 'ตก', roman: 'tòk', gloss: 'to fall — also in ตกใจ tòk jai, "startled"', span: 1 },
    ],
    meaning: "it's raining",
    literal: 'rain falls',
    mnemonic: ['fawn', 'tock'],
    scene: [
      'A fawn standing out in the rain, ears flattened.',
      'A clock pendulum caught at the far right of its swing — TOCK.',
    ],
    art: [{ component: 'Fawn' }, { component: 'Pendulum' }],
    category: 'weather',
    rank: 98,
    weak: false,
    notes:
      'Clip “fawn” short and let it rise. ตก tòk means “to fall” and turns up in ตกใจ tòk jai, “startled” — literally the heart falling.',
  },

  // ---------------------------------------------------------------- emergency
  {
    id: 'ra-wang',
    thai: 'ระวัง',
    syllables: [
      { roman: 'rá', tone: 'high' },
      { roman: 'wang', tone: 'mid' },
    ],
    words: [
      { thai: 'ระวัง', roman: 'rá-wang', gloss: 'to be careful, to watch out. One word.', span: 2 },
    ],
    meaning: 'watch out! / be careful',
    mnemonic: ['rah!', 'wang!'],
    scene: [
      'A cheerleader\'s open mouth mid RAH, one pom-pom thrust up.',
      'A brass gong struck hard right beside an ear — WANG.',
    ],
    art: [{ component: 'Cheer' }, { component: 'Gong' }],
    category: 'emergency',
    rank: 99,
    weak: true,
    notes:
      'Weak: both Thai syllables are short and clipped, and a shouted “RAH… WANG” stretches them out. Say it fast and flat. Printed on every step and doorway in Thailand, so you will read it long before you need to say it.',
  },
  {
    id: 'fai-mai',
    thai: 'ไฟไหม้',
    syllables: [
      { roman: 'fai', tone: 'mid' },
      { roman: 'mâi', tone: 'falling' },
    ],
    words: [
      { thai: 'ไฟ', roman: 'fai', gloss: 'fire; also light and electricity', span: 1 },
      { thai: 'ไหม้', roman: 'mâi', gloss: 'to burn, to be scorched', span: 1 },
    ],
    meaning: 'fire!',
    mnemonic: ['fie', 'my'],
    scene: [
      'A match struck, the flame just catching.',
      'A flat palm held out, pushing something away.',
    ],
    art: [{ component: 'Match' }, { component: 'PalmNo' }],
    category: 'emergency',
    rank: 100,
    notes:
      'ไหม้ mâi (burnt) is a homophone of ไม่ mâi (not). Nobody confuses them, because nobody shouts this casually. ไฟ fai alone is fire, light, or electricity.',
    weak: false,
  },
];

/** Sorted copy in default deck order (ascending rank). */
export const PHRASES_BY_RANK = [...PHRASES].sort((a, b) => a.rank - b.rank);

export const PHRASE_BY_ID = new Map(PHRASES.map((p) => [p.id, p]));
