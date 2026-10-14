import { useEffect, useState } from 'react'
import { LEVELS, MADRID_DIALOGUE, SIGN_ROUNDS, TOLEDO } from './content.js'

const fresh = { character: null, xp: 0, completed: [] }
const load = () => fresh

export default function App() {
  const [save, setSave] = useState(load)
  const [screen, setScreen] = useState('title')
  const complete = (id, xp) => {
    setSave(s => ({ ...s, xp: s.xp + xp, completed: s.completed.includes(id) ? s.completed : [...s.completed, id] }))
    setScreen('map')
  }
  return <div className="app">
    {screen === 'title' && <Title onStart={() => setScreen(save.character ? 'map' : 'create')} onReset={() => setSave(fresh)} hasSave={!!save.character} />}
    {screen === 'create' && <Create onDone={c => { setSave(s => ({ ...s, character: c })); setScreen('map') }} />}
    {screen === 'map' && <WorldMap save={save} onPlay={setScreen} />}
    {screen === 'madrid' && <Dialogue onDone={() => complete('madrid', 20)} />}
    {screen === 'signs' && <SignRunner onDone={() => complete('signs', 50)} onQuit={() => setScreen('map')} />}
    {screen === 'toledo' && <Toledo onDone={() => complete('toledo', 40)} />}
  </div>
}

function Title({ onStart, onReset, hasSave }) {
  return <div className="center">
    <h1 className="logo">Ruta</h1><p className="sub">Road to Fluent</p>
    <button onClick={onStart}>{hasSave ? 'Continue' : 'Start journey'}</button>
    {hasSave && <button className="ghost" onClick={onReset}>Reset progress</button>}
  </div>
}

const SKINS = ['#f1c27d', '#e0ac69', '#c68642', '#8d5524']
const SHIRTS = ['#e63946', '#2a9d8f', '#457b9d', '#f4a261']
function Avatar({ c, size = 90 }) {
  return <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x="25" y="55" width="50" height="40" rx="12" fill={c.shirt} />
    <circle cx="50" cy="38" r="20" fill={c.skin} />
    {c.cap && <path d="M28 32 Q50 8 72 32 L80 34 L28 34 Z" fill="#222" />}
  </svg>
}
function Create({ onDone }) {
  const [c, setC] = useState({ name: '', skin: SKINS[0], shirt: SHIRTS[0], cap: true })
  return <div className="panel">
    <h2>Create your traveller</h2>
    <div className="center"><Avatar c={c} size={120} /></div>
    <input placeholder="Your name" value={c.name} onChange={e => setC({ ...c, name: e.target.value })} />
    <p>Skin tone</p><div className="row">{SKINS.map(s => <span key={s} className={'swatch' + (c.skin === s ? ' on' : '')} style={{ background: s }} onClick={() => setC({ ...c, skin: s })} />)}</div>
    <p>Shirt</p><div className="row">{SHIRTS.map(s => <span key={s} className={'swatch' + (c.shirt === s ? ' on' : '')} style={{ background: s }} onClick={() => setC({ ...c, shirt: s })} />)}</div>
    <label className="row"><input type="checkbox" checked={c.cap} onChange={e => setC({ ...c, cap: e.target.checked })} /> Wear cap</label>
    <button disabled={!c.name.trim()} onClick={() => onDone(c)}>Fly to Spain</button>
  </div>
}

function WorldMap({ save, onPlay }) {
  return <div className="panel">
    <div className="hud"><Avatar c={save.character} size={44} /><b>{save.character.name}</b><span className="xp">{save.xp} XP</span></div>
    <div className="map">
      {LEVELS.map(l => {
        const done = save.completed.includes(l.id)
        const open = !l.requires || save.completed.includes(l.requires)
        return <button key={l.id} className={'pin ' + (done ? 'done' : open ? 'open' : 'locked')} style={{ left: l.x + '%', top: l.y + '%' }} disabled={!open} onClick={() => onPlay(l.id)}>
          {done ? '✓' : open ? '●' : '🔒'}<small>{l.name}</small>
        </button>
      })}
    </div>
    {LEVELS.map(l => <p key={l.id} className="muted"><b>{l.name}:</b> {l.desc}</p>)}
  </div>
}

function Dialogue({ onDone }) {
  const [i, setI] = useState(0)
  const [showEn, setShowEn] = useState(false)
  const line = MADRID_DIALOGUE[i]
  return <div className="panel">
    <h2>Madrid Airport</h2>
    <div className="bubble"><b>{line.who}</b><p className="es">{line.es}</p>{showEn && <p className="muted">{line.en}</p>}</div>
    <button className="ghost" onClick={() => setShowEn(!showEn)}>{showEn ? 'Hide' : 'Show'} English</button>
    <button onClick={() => { setShowEn(false); i < MADRID_DIALOGUE.length - 1 ? setI(i + 1) : onDone() }}>{i < MADRID_DIALOGUE.length - 1 ? 'Next' : 'Finish (+20 XP)'}</button>
  </div>
}

function SignRunner({ onDone, onQuit }) {
  const [r, setR] = useState(0), [score, setScore] = useState(0), [fb, setFb] = useState(null), [time, setTime] = useState(8)
  const finished = r >= SIGN_ROUNDS.length
  useEffect(() => {
    if (finished || fb) return
    if (time <= 0) { pick(null); return }
    const t = setTimeout(() => setTime(time - 1), 1000); return () => clearTimeout(t)
  }, [time, fb, finished])
  function pick(o) {
    const ok = o === SIGN_ROUNDS[r].en
    if (ok) setScore(s => s + 1)
    setFb(ok ? '¡Correcto!' : `It was "${SIGN_ROUNDS[r].en}"`)
    setTimeout(() => { setFb(null); setR(x => x + 1); setTime(8) }, 900)
  }
  if (finished) return <div className="panel center">
    <h2>Sign Runner complete</h2><p>{score} / {SIGN_ROUNDS.length} correct</p>
    <p className="muted">English words ending in -al are usually identical in Spanish.</p>
    {score >= 3 ? <button onClick={onDone}>Continue (+50 XP)</button> : <><p>Get 3+ to pass.</p><button onClick={() => { setR(0); setScore(0) }}>Retry</button></>}
    <button className="ghost" onClick={onQuit}>Back to map</button>
  </div>
  const round = SIGN_ROUNDS[r]
  return <div className="panel">
    <div className="hud"><span>Sign {r + 1}/{SIGN_ROUNDS.length}</span><span className="xp">{time}s</span></div>
    <h2>Find the Spanish for "{round.en}"</h2>
    <div className="lane">{round.options.map(o => <button key={o} className="sign" disabled={!!fb} onClick={() => pick(o)}>{o}</button>)}</div>
    {fb && <p className="fb">{fb}</p>}
  </div>
}

function Toledo({ onDone }) {
  const [step, setStep] = useState(0), [wrong, setWrong] = useState(false)
  return <div className="panel">
    <h2>Toledo</h2>
    {step === 0 && <>
      <div className="bigsign">{TOLEDO.sign}</div>
      <p>You recognise this word: <b>moderno</b> = modern. Spanish adds -o to many English words.</p>
      <button onClick={() => setStep(1)}>Walk to the entrance</button>
    </>}
    {step === 1 && <>
      <div className="bubble"><p>{TOLEDO.question}</p></div>
      {TOLEDO.options.map(o => <button key={o} className="ghost" onClick={() => o === TOLEDO.answer ? setStep(2) : setWrong(true)}>{o}</button>)}
      {wrong && <p className="fb">Try again: "quiero" = I want, "entrar" = to enter.</p>}
    </>}
    {step === 2 && <><p className="es">¡Adelante! (Go ahead!)</p><button onClick={onDone}>Finish (+40 XP)</button></>}
  </div>
}
