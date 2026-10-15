// Runner activity: real, fast-paced sign challenge.
// Uses ONLY words the player has already learned. This is not a quiz.

// Each round: a sign scrolls in, the player must tap the correct meaning
// before the timer runs out. Speed ramps up, but never for new grammar.

export const RUNNERS = {
  'run-toledo-1': {
    title: 'Sign Runner — Toledo',
    // All words come from Madrid concepts only
    rounds: [
      { es: 'SALIDA', options: ['exit', 'salary', 'salad'], answer: 'exit', concept: 'r-al-cognate' },
      { es: 'MUSEO', options: ['museum', 'music', 'market'], answer: 'museum', concept: 'r-al-cognate' },
      { es: 'NACIONAL', options: ['national', 'natural', 'naval'], answer: 'national', concept: 'r-al-cognate' },
      { es: 'PROHIBIDO', options: ['prohibited', 'allowed', 'promoted'], answer: 'prohibited', concept: 'r-al-cognate' },
      { es: 'INFORMACIÓN', options: ['information', 'inflation', 'invitation'], answer: 'information', concept: 'r-acion-cion' },
      { es: 'MODERNO', options: ['modern', 'mode', 'modest'], answer: 'modern', concept: 'r-al-cognate' },
      { es: 'LEGAL', options: ['legal', 'legion', 'lethal'], answer: 'legal', concept: 'r-al-cognate' },
      { es: 'NORMAL', options: ['normal', 'northern', 'nominal'], answer: 'normal', concept: 'r-al-cognate' },
      { es: 'NATURAL', options: ['natural', 'national', 'neutral'], answer: 'natural', concept: 'r-al-cognate' },
      { es: 'CULTURAL', options: ['cultural', 'cultured', 'curable'], answer: 'cultural', concept: 'r-al-cognate' },
    ],
    // Seconds per round. This is a speed challenge on FAMILIAR material, not new grammar.
    timePerRound: 5,
    passScore: 7, // out of 10
  },
}
