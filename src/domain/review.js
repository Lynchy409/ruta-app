// Review scheduling: decide which concepts come back, and when.

export function getDueConcepts(state, now = Date.now()) {
  return Object.entries(state.concepts)
    .filter(([id, rec]) => rec.nextReviewAt && rec.nextReviewAt <= now)
    .map(([id, rec]) => ({
      id,
      nextReviewAt: rec.nextReviewAt,
      accuracy: totalAccuracy(rec),
    }))
    .sort((a, b) => a.nextReviewAt - b.nextReviewAt)
}

function totalAccuracy(rec) {
  const all = ['recognition', 'construction', 'production']
  let a = 0, c = 0, w = 0
  for (const k of all) {
    a += rec[k].attempts
    c += rec[k].correct
    w += rec[k].incorrect
  }
  return a ? c / a : 0
}

// Pick the next item to review, prioritising weaker concepts
export function pickNextReview(due, limit = 5) {
  return [...due].sort((a, b) => a.accuracy - b.accuracy).slice(0, limit)
}
