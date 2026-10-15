// Activities: prompts, hints, accepted answers. Separate from screen code.
// Each activity has an id used by the progress tracker.
// Mode: 'recognize' | 'construct' | 'produce'

export const ACTIVITIES = {
  // Madrid arrival - pattern intro (r-al-cognate)
  'a-al-intro-1': {
    type: 'recognize',
    prompt: 'The sign says "SALIDA". Which English word does this come from?',
    options: ['salad', 'exit', 'salary'],
    answer: 'exit',
    concept: 'r-al-cognate',
    hint: 'SAL- means "go out" or "leave". Think of the English word for leaving.',
    explanation: 'Salida comes from salir, "to go out". Spanish often adds -ida or -ado to make nouns.',
    accepted: ['exit', 'exit door', 'way out'],
  },

  // Madrid arrival - sign challenge
  'a-sign-1': {
    type: 'recognize',
    prompt: 'A sign says "MUSEO NACIONAL". What does "NACIONAL" mean?',
    options: ['national', 'natural', 'native'],
    answer: 'national',
    concept: 'r-al-cognate',
    hint: 'The -al ending stays the same in Spanish.',
    explanation: 'National is a direct -al cognate.',
    accepted: ['national'],
  },
  'a-sign-2': {
    type: 'recognize',
    prompt: 'A sign says "PROHIBIDO FUMAR". What does "PROHIBIDO" mean?',
    options: ['prohibited', 'allowed', 'encouraged'],
    answer: 'prohibited',
    concept: 'r-al-cognate',
    hint: 'Look for the English word "prohibit" inside it.',
    explanation: 'Prohibido is the past participle of prohibir.',
    accepted: ['prohibited', 'forbidden'],
  },
  'a-sign-3': {
    type: 'recognize',
    prompt: 'A sign says "INFORMACIÓN". What does this mean?',
    options: ['information', 'informant', 'informal'],
    answer: 'information',
    concept: 'r-acion-cion',
    hint: '-tion becomes -ción.',
    explanation: 'Information is a -tion → -ción cognate.',
    accepted: ['information', 'info'],
  },

  // Madrid arrival - practical task (build "Quiero la chaqueta")
  'a-task-1': {
    type: 'construct',
    prompt: 'Build the sentence: "I want the jacket"',
    // Tiles the player taps in order
    tiles: ['Quiero', 'la', 'chaqueta', 'Queremos', 'el', 'chaqueta'],
    answer: 'Quiero la chaqueta',
    concept: 'w-querer',
    hint: 'Use the "I" form of querer, and the feminine article la.',
    explanation: 'Quiero is the "I" form of querer. La chaqueta is feminine.',
    accepted: ['quiero la chaqueta'],
  },
  'a-task-2': {
    type: 'construct',
    prompt: 'Build the sentence: "We want the jacket"',
    tiles: ['Queremos', 'la', 'chaqueta', 'Quiero', 'las', 'chaquetas'],
    answer: 'Queremos la chaqueta',
    concept: 'w-querer',
    hint: 'Use the "we" form. Queremos.',
    explanation: 'Queremos is the "we" form. No softening here because the stress is on the ending.',
    accepted: ['queremos la chaqueta'],
  },

  // Madrid arrival - communication checkpoint
  'a-checkpoint-1': {
    type: 'produce',
    prompt: 'A shop assistant asks: "¿Qué quiere?" — What do you want?',
    // Player must type the answer freely
    expectedKeywords: ['quiero', 'la', 'chaqueta'],
    concept: 'w-querer',
    hint: 'Start with the "I" form of querer. Use "la chaqueta" for "the jacket".',
    explanation: 'Quiero la chaqueta is the correct answer. You have now produced Spanish from scratch.',
    accepted: ['quiero la chaqueta', 'quiero chaqueta', 'la chaqueta quiero'],
    feedbackFor: {
      'queremos la chaqueta': 'That is "we want". For "I want" you need quiero.',
      'quiero el chaqueta': 'Chaqueta is feminine, so it takes la, not el.',
    },
  },
}

// A curated lesson sequence for Madrid arrival
export const MADRID_SEQUENCE = [
  { kind: 'dialogue', id: 'd-arrival' },
  { kind: 'activity', id: 'a-al-intro-1' },
  { kind: 'activity', id: 'a-sign-1' },
  { kind: 'activity', id: 'a-sign-2' },
  { kind: 'activity', id: 'a-sign-3' },
  { kind: 'activity', id: 'a-task-1' },
  { kind: 'activity', id: 'a-task-2' },
  { kind: 'activity', id: 'a-checkpoint-1' },
  { kind: 'dialogue', id: 'd-checkpoint' },
]

// Toledo arrival — e → ie softening intro (lessons 15-17)
Object.assign(ACTIVITIES, {
  'a-ie-intro-1': {
    type: 'recognize',
    prompt: 'You know quiero. Now imagine a verb like tener. What is the "he/she" form?',
    options: ['tene', 'tiene', 'teno'],
    answer: 'tiene',
    concept: 'r-e-ie',
    hint: 'The stressed e in the stem splits into ie in the present tense.',
    explanation: 'tener → tiene. The stressed e splits. This is not predictable per verb; you have to learn each one.',
    accepted: ['tiene'],
  },
  'a-ie-intro-2': {
    type: 'recognize',
    prompt: 'What is the "I" form of pensar (to think)?',
    options: ['penso', 'pienso', 'pensar'],
    answer: 'pienso',
    concept: 'r-e-ie',
    hint: 'Same e → ie pattern as tengo → tengo / tiene.',
    explanation: 'pensar → pienso. pienso + to-form also means "I plan to".',
    accepted: ['pienso'],
  },
  'a-toledo-task-1': {
    type: 'construct',
    prompt: 'Build the sentence: "I want the jacket" using the softened "I" form',
    tiles: ['Quiero', 'la', 'chaqueta', 'Queremos', 'el', 'chaqueta'],
    answer: 'Quiero la chaqueta',
    concept: 'w-querer',
    hint: 'Querer softens in the "I" form: quiero.',
    explanation: 'Quiero is the softened "I" form of querer.',
    accepted: ['quiero la chaqueta'],
  },
  'a-toledo-checkpoint-1': {
    type: 'produce',
    prompt: 'A local asks: "¿Qué quieres?" — What do you want?',
    expectedKeywords: ['quiero', 'la', 'chaqueta'],
    concept: 'w-querer',
    hint: 'Use quiero, the softened "I" form. Then la chaqueta.',
    explanation: 'Quiero la chaqueta. You have now produced a softened verb form from scratch.',
    accepted: ['quiero la chaqueta', 'quiero chaqueta', 'la chaqueta quiero'],
    feedbackFor: {
      'queremos la chaqueta': 'That is "we want". For "I want" use quiero.',
      'querer la chaqueta': 'That is the "to" form. You need the "I" form: quiero.',
    },
  },
}
)
