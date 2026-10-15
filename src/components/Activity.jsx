// Activity player: recognition (multiple choice), construction (tile order), production (free text).
// Phases: answering -> feedback -> next. Double taps cannot double-score.
// Hints are tracked. Wrong answers are retryable without being punished.

import { useState, useCallback, useRef } from 'react'
import { ACTIVITIES } from '../content/activities.js'
import { checkAnswer } from '../domain/assessment.js'

const MODE = { recognize: 'recognition', construct: 'construction', produce: 'production' }

export function Activity({ id, onFinish, onRecord }) {
  const act = ACTIVITIES[id]
  if (!act) return <p className="error">Missing activity: {id}</p>

  const [phase, setPhase] = useState('answering') // answering | feedback
  const [choice, setChoice] = useState(null)
  const [tiles, setTiles] = useState([])
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [hintShown, setHintShown] = useState(false)
  const answeredRef = useRef(false)

  const mode = MODE[act.type]

  const submit = useCallback((answer) => {
    if (answeredRef.current) return
    answeredRef.current = true
    const r = checkAnswer(id, answer)
    setResult(r)
    setPhase('feedback')
    onRecord(act.concept, mode, r.correct, hintShown, r.mistakeType)
  }, [id, act, hintShown, onRecord, mode])

  function next() {
    answeredRef.current = false
    setPhase('answering')
    setChoice(null); setTiles([]); setText(''); setResult(null); setHintShown(false)
    onFinish(id, result ? result.correct : false)
  }

  return <div className="panel">
    <h2 className="muted">{act.type === 'recognize' ? 'Recognise' : act.type === 'construct' ? 'Build' : 'Speak'}</h2>
    <p>{act.prompt}</p>

    {act.type === 'recognize' && (
      <div className="lane">
        {act.options.map(o => (
          <button key={o} className="option" disabled={phase === 'feedback'}
            onClick={() => { setChoice(o); submit(o) }}>{o}</button>
        ))}
      </div>
    )}

    {act.type === 'construct' && (
      <div>
        <div className="built">
          {tiles.map((t, i) => <span key={i} className="tile" onClick={() => setTiles(tiles.filter((_, j) => j !== i))}>{t}</span>)}
        </div>
        <div className="row wrap">
          {act.tiles.map((t, i) => (
            <button key={i} className="tile-opt" disabled={tiles.filter(x => x === t).length >= act.tiles.filter(x => x === t).length || phase === 'feedback'}
              onClick={() => setTiles([...tiles, t])}>{t}</button>
          ))}
        </div>
        <button disabled={tiles.length === 0 || phase === 'feedback'} onClick={() => submit(tiles.join(' '))}>Check</button>
      </div>
    )}

    {act.type === 'produce' && (
      <div>
        <input value={text} onChange={e => setText(e.target.value)} disabled={phase === 'feedback'} placeholder="Type in Spanish" />
        <button disabled={!text.trim() || phase === 'feedback'} onClick={() => submit(text)}>Check</button>
      </div>
    )}

    {phase === 'answering' && (
      <button className="ghost small" onClick={() => { setHintShown(true) }}>
        {hintShown ? act.hint : 'Show hint'}
      </button>
    )}

    {phase === 'feedback' && (
      <div className="feedback">
        <p className={result.correct ? 'good' : 'bad'}>
          {result.correct ? 'Correct' : 'Not quite'}
        </p>
        <p className="muted">{result.feedback}</p>
        <button onClick={next}>Next</button>
      </div>
    )}
  </div>
}
