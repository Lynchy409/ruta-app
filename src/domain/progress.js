// Progress reducer and rules. Domain logic, not UI.

import { ACTIVITIES } from '../content/activities.js'

export const SCHEMA_VERSION = 2

export function createEmptySave() {
  return {
    schemaVersion: SCHEMA_VERSION,
    character: null,
    xp: 0,
    journey: {
      chapterId: null,
      completedActivities: [],
      worldFlags: {},
    },
    rewardsGranted: [],
    concepts: {},
  }
}

export function conceptRecord() {
  return {
    recognition: { attempts: 0, correct: 0, incorrect: 0 },
    construction: { attempts: 0, correct: 0, incorrect: 0 },
    production: { attempts: 0, correct: 0, incorrect: 0 },
    hintsUsed: 0,
    mistakeTypes: {},
    lastPractisedAt: null,
    nextReviewAt: null,
  }
}

// One-time reward ledger
export function grantReward(state, rewardId, amount) {
  if (state.rewardsGranted.includes(rewardId)) return state
  return {
    ...state,
    rewardsGranted: [...state.rewardsGranted, rewardId],
    xp: state.xp + amount,
  }
}

// Record an attempt. mode is 'recognition' | 'construction' | 'production'
export function recordAttempt(state, conceptId, mode, correct, usedHint, mistakeType) {
  const rec = state.concepts[conceptId] || conceptRecord()
  const newRec = { ...rec }
  const bucket = mode === 'recognition' ? 'recognition'
    : mode === 'construction' ? 'construction'
    : 'production'

  newRec[bucket] = {
    ...newRec[bucket],
    attempts: newRec[bucket].attempts + 1,
    correct: newRec[bucket].correct + (correct ? 1 : 0),
    incorrect: newRec[bucket].incorrect + (correct ? 0 : 1),
  }
  if (usedHint) newRec.hintsUsed += 1
  if (mistakeType) newRec.mistakeTypes[mistakeType] = (newRec.mistakeTypes[mistakeType] || 0) + 1
  newRec.lastPractisedAt = Date.now()
  newRec.nextReviewAt = Date.now() + (correct ? 24 * 3600 * 1000 : 6 * 3600 * 1000)

  return {
    ...state,
    concepts: { ...state.concepts, [conceptId]: newRec },
  }
}

// Check if an activity has already been completed (prevents duplicate rewards)
export function isActivityComplete(state, activityId) {
  return state.journey.completedActivities.includes(activityId)
}

// Mark an activity complete. Idempotent.
export function completeActivity(state, activityId) {
  if (state.journey.completedActivities.includes(activityId)) return state
  return {
    ...state,
    journey: {
      ...state.journey,
      completedActivities: [...state.journey.completedActivities, activityId],
    },
  }
}
