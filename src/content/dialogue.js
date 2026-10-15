// Dialogue scenes. Original content, not copied from the course.

export const DIALOGUES = {
  'd-arrival': {
    title: 'Madrid Airport — Arrival',
    lines: [
      { who: 'narrator', text: 'You step off the plane. The signs around you are in Spanish.' },
      { who: 'narrator', text: 'You look around, confused. A staff member notices.' },
      { who: 'staff', es: '¿Necesitas ayuda?', en: 'Do you need help?' },
      { who: 'player', text: '(You do not understand. You nod anyway.)' },
      { who: 'staff', es: 'Muchas palabras son iguales en inglés. Mira el letrero.', en: 'Many words are the same as in English. Look at the sign.' },
      { who: 'narrator', text: 'You look at a sign that reads "SALIDA".' },
    ],
  },
  'd-checkpoint': {
    title: 'Madrid Airport — Checkpoint',
    lines: [
      { who: 'narrator', text: 'You have just used real Spanish to ask for something.' },
      { who: 'narrator', text: 'The shop assistant smiles and hands you the jacket.' },
      { who: 'staff', es: '¡Perfecto! Aquí tienes.', en: 'Perfect! Here you go.' },
      { who: 'narrator', text: 'You can now buy things in Spanish. This is your first real step on the Ruta.' },
    ],
  },
}

const TOLEDO_DIALOGUES = {
  'd-toledo-arrival': {
    title: 'Toledo — Arrival',
    lines: [
      { who: 'narrator', text: 'You arrive in Toledo by train. The old city walls rise around you.' },
      { who: 'narrator', text: 'A local notices you looking lost.' },
      { who: 'local', es: '¿Necesitas ayuda?', en: 'Do you need help?' },
      { who: 'narrator', text: 'You recognise this. You know "necesitar" means "to need".' },
      { who: 'local', es: 'Muy bien. ¿Qué quieres?', en: 'Very good. What do you want?' },
    ],
  },
  'd-toledo-checkpoint': {
    title: 'Toledo — Checkpoint',
    lines: [
      { who: 'narrator', text: 'You just used a softened verb form to answer a real question.' },
      { who: 'local', es: '¡Perfecto! Aquí tienes.', en: 'Perfect! Here you go.' },
      { who: 'narrator', text: 'Toledo is the second step on your Ruta. Next: Valencia.' },
    ],
  },
}

Object.assign(DIALOGUES, TOLEDO_DIALOGUES)
