// Chapter definitions. Content is data, screens are separate.

export const CHAPTERS = {
  'madrid-arrival': {
    title: 'Madrid — Arrival',
    subtitle: 'You know almost nothing. Time to learn your first pattern.',
    sequence: [
      { kind: 'dialogue', id: 'd-arrival' },
      { kind: 'activity', id: 'a-al-intro-1' },
      { kind: 'activity', id: 'a-sign-1' },
      { kind: 'activity', id: 'a-sign-2' },
      { kind: 'activity', id: 'a-sign-3' },
      { kind: 'activity', id: 'a-task-1' },
      { kind: 'activity', id: 'a-task-2' },
      { kind: 'activity', id: 'a-checkpoint-1' },
      { kind: 'dialogue', id: 'd-checkpoint' },
    ],
    reward: 100,
    unlock: 'toledo-arrival',
  },
  'toledo-arrival': {
    title: 'Toledo — Arrival',
    subtitle: 'Use your Madrid words at speed. Meet e → ie softening.',
    sequence: [
      { kind: 'dialogue', id: 'd-toledo-arrival' },
      { kind: 'activity', id: 'a-ie-intro-1' },
      { kind: 'activity', id: 'a-ie-intro-2' },
      { kind: 'runner', id: 'run-toledo-1' },
      { kind: 'activity', id: 'a-toledo-task-1' },
      { kind: 'activity', id: 'a-toledo-checkpoint-1' },
      { kind: 'dialogue', id: 'd-toledo-checkpoint' },
    ],
    reward: 150,
    unlock: 'valencia-arrival',
  },
  // Future chapters are placeholders, not playable
  'valencia-arrival': {
    title: 'Valencia — Arrival',
    subtitle: 'Not yet built.',
    locked: true,
  },
}
