// Curriculum concepts. Each has an id used by the progress tracker.
// Provenance: lessons_1_20 notes, reviewed but NOT verified against official course.

export const CONCEPTS = {
  // Words
  'w-normal': { type: 'word', es: 'normal', en: 'normal' },
  'w-legal': { type: 'word', es: 'legal', en: 'legal' },
  'w-natural': { type: 'word', es: 'natural', en: 'natural' },
  'w- posible': { type: 'word', es: 'posible', en: 'possible' },
  'w-ayer': { type: 'word', es: 'ayer', en: 'yesterday' },
  'w-mañana': { type: 'word', es: 'mañana', en: 'tomorrow' },
  'w-venir': { type: 'word', es: 'venir', en: 'to come', source: 'lessons_1_14' },
  'w-tener': { type: 'word', es: 'tener', en: 'to have', source: 'lessons_1_14' },
  'w-poder': { type: 'word', es: 'poder', en: 'to be able', source: 'lessons_15_17' },
  'w-querer': { type: 'word', es: 'querer', en: 'to want', source: 'lessons_15_17' },
  'w-hacer': { type: 'word', es: 'hacer', en: 'to do/make' },
  'w-ir': { type: 'word', es: 'ir', en: 'to go', source: 'lessons_18_20' },
  'w-ver': { type: 'word', es: 'ver', en: 'to see', source: 'lessons_18_20' },

  // Rules
  'r-al-cognate': {
    type: 'rule',
    explanation: 'English words ending in -al stay as -al in Spanish. Stress moves to the end syllable.',
    examples: ['normal', 'legal', 'natural'],
    exceptions: [],
    source: 'lessons_1_14',
  },
  'r-acion-cion': {
    type: 'rule',
    explanation: '-tion in English becomes -ción in Spanish. Drop -ción and add -r to get the verb. Always take the long route: creación → crear.',
    examples: ['preparación → preparar', 'creación → crear', 'opinión → opinar'],
    exceptions: ['explanation → explicación', 'demonstration → demostración'],
    source: 'lessons_1_14',
  },
  'r-e-ie': {
    type: 'rule',
    explanation: 'In the present tense, a stressed e often splits into ie. Which verbs split is not predictable — you have to learn each one.',
    examples: ['tener → tengo / tiene', 'querer → quiero', 'venir → vengo / viene', 'pensar → pienso', 'entender → entiendo'],
    exceptions: ['The "I" form of -go verbs does not split: tengo, vengo', 'llegar → llego does not split', 'esperar → espero does not split'],
    source: 'lessons_15_17',
  },
  'r-o-ue': {
    type: 'rule',
    explanation: 'In the present tense, a stressed o often splits into ue. Same unpredictability as e → ie.',
    examples: ['poder → puedo', 'dormir → duermo', 'encontrar → encuentro'],
    exceptions: ['comer → como does not split'],
    source: 'lessons_15_17',
  },
  'r-we-ar': {
    type: 'rule',
    explanation: 'For -ar verbs, the "we" form ends in -amos. The stress moves to the ending, so the stem never splits here.',
    examples: ['hablamos', 'tomamos', 'encontramos'],
    exceptions: [],
    source: 'lessons_15_17',
  },
  'r-we-er-ir': {
    type: 'rule',
    explanation: 'For -er and -ir verbs, the "we" form ends in -emos and -imos. Same principle: stress on the ending, no split.',
    examples: ['vemos', 'vivimos', 'preferimos'],
    exceptions: [],
    source: 'lessons_18_20',
  },
  'r-backwards-we': {
    type: 'rule',
    explanation: 'From a "we" present form you can rebuild the verb. Drop the ending and add -ar, -er or -ir.',
    examples: ['hablamos → hablar', 'venimos → venir', 'vivimos → vivir'],
    exceptions: ['ir gives "vo" but the real form is voy', 'ver gives "vo" but the real form is veo'],
    source: 'lessons_18_20',
  },
  'r-gender-esta-este': {
    type: 'rule',
    explanation: 'esta goes with feminine words, este with masculine. If you hear esta, the noun is feminine.',
    examples: ['esta noche', 'este año'],
    exceptions: ['Some -a words are masculine', 'Words ending in -e give no hint'],
    source: 'lessons_18_20',
  },
  'r-future-present': {
    type: 'rule',
    explanation: 'Present tense can mean future when a time word is present: mañana, más tarde, esta noche, pronto.',
    examples: ['la veo más tarde', 'nos vemos pronto'],
    exceptions: [],
    source: 'lessons_18_20',
  },
}

// Concepts for the Madrid arrival chapter specifically
export const MADRID_CONCEPTS = [
  'w-normal', 'w-legal', 'w-natural', 'w-venir', 'w-querer',
  'r-al-cognate', 'r-e-ie',
]
