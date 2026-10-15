// Runner component: a real, scrolling sign challenge.
// Familiar words only, fast pace, honest fail state.

import { useState, useEffect, useRef, useCallback } from 'react'
import { RUNNERS } from '../content/runner.js'

export function Runner({ id, onFinish, onRecord }) {
  const run = RUNNERS[id]
  if (!run) return <p className="error">Missing runner: {id}</p>

  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(run.timePerRound)
  const [phase, setPhase] = useState('running') // running | feedback | done
  const [feedback, setFeedback] = useState(null)
  const answeredRef = useRef(false)
  const timerRef = useRef(null)

  const total = run.rounds.length
  const current = run.rounds[round]

  const finishRound = useCallback((correct, mistakeType) => {
    if (answeredRef.current) return
    answeredRef.current = true
    clearInterval(timerRef.current)
    if (correct) setScore(s => s + 1)
    setFeedback({ correct, mistakeType })
    setPhase('feedback')
    onRecord(current.concept, 'recognition', correct, false, mistakeType)
  }, [current, onRecord])

  // Countdown
  useEffect(() => {
    if (phase !== 'running') return
    timerRef.current = setInterval(() => {
      setTime(t => {
        if (t <= 1) {
          finishRound(false, 'timeout')
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [phase, round, finishRound])

  function nextRound() {
    answeredRef.current = false
    setFeedback(null)
    setPhase('running')
    setTime(run.timePerRound)
    if (round + 1 >= total) {
      const passed = score >= run.passScore
      setPhase('done')
      onFinish(id, passed)
    } else {
      setRound(round + 1)
    }
  }

  function pick(option) {
    const correct = option === current.answer
    finishRound(correct, correct ? null : 'wrong-answer')
  }

  if (phase === 'done') {
    const passed = score >= run.passScore
    return <div className="panel center">
      <h2>{run.title}</h2>
      <p className="bigscore">{score} / {total}</p>
      {passed ? (
        <>
          <p className="good">Passed</p>
          <p className="muted">You recognised {score} signs at speed.</p>
          <button onClick={() => onFinish(id, true)}>Continue</button>
        </>
      ) : (
        <>
          <p className="bad">Not quite</p>
          <p className="muted">You need {run.passScore} of {total}. This is a speed challenge, not a test of your Spanish.</p>
          <button onClick={() => { setRound(0); setScore(0); setPhase('running'); setTime(run.timePerRound) }}>Try again</button>
        </>
      )}
    </div>
  }

  return <div className="panel">
    <div className="hud">
      <span className="muted">Sign {round + 1} / {total}</span>
      <span className="timer">{time}s</span>
      <span className="muted">Score {score}</span>
    </div>
    <div className="signboard">
      <p className="sign-es">{current.es}</p>
    </div>
    <div className="lane">
      {current.options.map(o => (
        <button key={o} className="option" disabled={phase !== 'running'} onClick={() => pick(o)}>{o}</button>
      ))}
    </div>
    {phase === 'feedback' && (
      <div className="feedback">
        <p className={feedback.correct ? 'good' : 'bad'}>{feedback.correct ? 'Correct' : 'Missed'}</p>
        <p className="muted">{current.answer}</p>
        <button onClick={nextRound}>{round + 1 >= total ? 'Finish' : 'Next sign'}</button>
      </div>
    )}
  </div>
}
