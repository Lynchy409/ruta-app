// Dialogue scene player. Story only — never counted as a language answer.

import { useState } from 'react'
import { DIALOGUES } from '../content/dialogue.js'

export function Scene({ id, onDone }) {
  const d = DIALOGUES[id]
  const [i, setI] = useState(0)
  const [showEn, setShowEn] = useState(false)
  if (!d) return <p className="error">Missing scene: {id}</p>
  const line = d.lines[i]
  const last = i >= d.lines.length - 1

  function next() {
    setShowEn(false)
    if (!last) setI(i + 1)
    else onDone()
  }

  return <div className="panel">
    <h2>{d.title}</h2>
    <div className="bubble">
      {line.who === 'narrator' || line.who === 'player' ? (
        <p>{line.text}</p>
      ) : (
        <>
          <p className="es">{line.es}</p>
          {showEn && <p className="muted">{line.en}</p>}
          <button className="ghost small" onClick={() => setShowEn(!showEn)}>{showEn ? 'Hide' : 'Show'} English</button>
        </>
      )}
    </div>
    <button onClick={next}>{last ? 'Continue' : 'Next'}</button>
  </div>
}
