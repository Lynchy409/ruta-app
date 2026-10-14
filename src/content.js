export const LEVELS = [
  { id: 'madrid', name: 'Madrid Airport', desc: 'You land. You understand nothing.', x: 45, y: 40 },
  { id: 'signs', name: 'Sign Runner', desc: 'Spot the -al cognates.', x: 30, y: 60, requires: 'madrid' },
  { id: 'toledo', name: 'Toledo', desc: 'Recognise words and ask to enter.', x: 55, y: 75, requires: 'signs' },
]
export const MADRID_DIALOGUE = [
  { who: 'Assistant', es: '¡Hola! ¿Necesitas ayuda?', en: 'Hello! Do you need help?' },
  { who: 'You', es: '...', en: '(You cannot understand.)' },
  { who: 'Assistant', es: 'Tranquilo. Muchas palabras son iguales en inglés.', en: 'Relax. Many words are the same in English.' },
  { who: 'Assistant', es: 'Normal, legal, natural... ¡Ya sabes español!', en: 'Normal, legal, natural... You already know Spanish!' },
]
export const SIGN_ROUNDS = [
  { en: 'normal', options: ['normal', 'normo', 'normante'] },
  { en: 'legal', options: ['legado', 'legal', 'legión'] },
  { en: 'natural', options: ['naturo', 'natura', 'natural'] },
  { en: 'cultural', options: ['cultural', 'culto', 'culturo'] },
  { en: 'animal', options: ['animo', 'animal', 'animante'] },
]
export const TOLEDO = {
  question: 'A guard asks: "¿Qué quieres?" (What do you want?)',
  options: ['Quiero entrar', 'Quiero moderno', 'Entrar quiero no'],
  answer: 'Quiero entrar',
  sign: 'MUSEO MODERNO',
}
