// Answer checking. Conservative: accept curated alternatives,
// normalize case/punctuation but NOT accents.

import { ACTIVITIES } from '../content/activities.js'

function normalize(s) {
  return s.trim().toLowerCase().replace(/[.,!?¿¡]/g, '').replace(/\s+/g, ' ')
}

export function checkAnswer(activityId, playerAnswer) {
  const act = ACTIVITIES[activityId]
  if (!act) throw new Error(`Unknown activity: ${activityId}`)

  const accepted = (act.accepted || [act.answer]).map(normalize)
  const guess = normalize(playerAnswer)

  const correct = accepted.includes(guess)

  let mistakeType = null
  let feedback = null
  if (!correct) {
    mistakeType = 'wrong-answer'
    feedback = act.explanation
    // Check the curated feedback map first
    if (act.feedbackFor && act.feedbackFor[guess]) {
      feedback = act.feedbackFor[guess]
      mistakeType = 'targeted-feedback'
    }
    // Loose accent match is NOT accepted — accents matter in Spanish
  }

  return { correct, mistakeType, feedback }
}
