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
  // Future chapters are placeholders, not playable
  'toledo-arrival': {
    title: 'Toledo — Arrival',
    subtitle: 'Not yet built.',
    locked: true,
  },
}
