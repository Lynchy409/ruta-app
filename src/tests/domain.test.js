// Automated tests for progress, assessment and persistence logic.
// Run with: node --test src/tests/domain.test.js
import test from 'node:test'
import assert from 'node:assert'
import { createEmptySave, grantReward, recordAttempt, completeActivity } from '../domain/progress.js'
import { checkAnswer } from '../domain/assessment.js'
import { isValidSave, importSave, exportSave } from '../domain/persistence.js'

test('createEmptySave has a valid schema', () => {
  const s = createEmptySave()
  assert.equal(s.schemaVersion, 2)
  assert.deepEqual(s.rewardsGranted, [])
  assert.deepEqual(s.journey.completedActivities, [])
})

test('grantReward is one-time only', () => {
  let s = createEmptySave()
  s = grantReward(s, 'chapter:madrid-arrival', 100)
  assert.equal(s.xp, 100)
  s = grantReward(s, 'chapter:madrid-arrival', 100)
  assert.equal(s.xp, 100, 'Should not double-grant')
  assert.equal(s.rewardsGranted.length, 1)
})

test('completeActivity is idempotent', () => {
  let s = createEmptySave()
  s = completeActivity(s, 'a-sign-1')
  assert.equal(s.journey.completedActivities.length, 1)
  s = completeActivity(s, 'a-sign-1')
  assert.equal(s.journey.completedActivities.length, 1, 'Should not duplicate')
})

test('recordAttempt tracks attempts and hints', () => {
  let s = createEmptySave()
  s = recordAttempt(s, 'w-querer', 'construction', true, false, null)
  assert.equal(s.concepts['w-querer'].construction.correct, 1)
  s = recordAttempt(s, 'w-querer', 'construction', false, true, 'wrong-answer')
  assert.equal(s.concepts['w-querer'].construction.incorrect, 1)
  assert.equal(s.concepts['w-querer'].hintsUsed, 1)
  assert.equal(s.concepts['w-querer'].mistakeTypes['wrong-answer'], 1)
})

test('checkAnswer accepts curated alternatives', () => {
  const r = checkAnswer('a-checkpoint-1', '  Quiero la chaqueta!  ')
  assert.ok(r.correct)
})

test('checkAnswer does NOT accept wrong accents', () => {
  // The real answer is 'quiero'. 'quiéro' has a misplaced accent and must fail.
  const r = checkAnswer('a-checkpoint-1', 'quiéro la chaqueta')
  assert.equal(r.correct, false)
})

test('checkAnswer requires exact Spanish including accents', () => {
  // mañana must keep its ñ
  const r = checkAnswer('a-sign-1', 'manana')
  assert.equal(r.correct, false)
})

test('checkAnswer flags a common mistake with targeted feedback', () => {
  const r = checkAnswer('a-checkpoint-1', 'quiero el chaqueta')
  assert.equal(r.correct, false)
  assert.equal(r.mistakeType, 'targeted-feedback')
})

test('isValidSave rejects malformed data', () => {
  assert.equal(isValidSave(null), false)
  assert.equal(isValidSave({}), false)
  assert.equal(isValidSave({ schemaVersion: 1 }), false)
  assert.equal(isValidSave(createEmptySave()), true)
})

test('export then import round-trips', () => {
  let s = createEmptySave()
  s = recordAttempt(s, 'w-querer', 'recognition', true, false, null)
  const json = exportSave(s)
  const imported = importSave(json)
  assert.deepEqual(imported, s)
})

test('importSave rejects invalid JSON', () => {
  assert.throws(() => importSave('not json'), Error)
  assert.throws(() => importSave('{"foo":1}'), Error)
})
