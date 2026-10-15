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
