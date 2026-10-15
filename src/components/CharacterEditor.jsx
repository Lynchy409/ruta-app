import { useState } from 'react'

const SKINS = ['#f1c27d', '#e0ac69', '#c68642', '#8d5524']
const SHIRTS = ['#e63946', '#2a9d8f', '#457b9d', '#f4a261']
const HAIR = ['#2b2118', '#5b3a29', '#a86c46', '#d9b382']

export function Avatar({ c, size = 90 }) {
  return <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <rect x="25" y="55" width="50" height="40" rx="12" fill={c.shirt} />
    <circle cx="50" cy="38" r="20" fill={c.skin} />
    <path d="M30 28 Q50 16 70 28 L70 34 Q50 22 30 34 Z" fill={c.hair} />
    {c.cap && <path d="M28 32 Q50 8 72 32 L80 34 L28 34 Z" fill="#222" />}
  </svg>
}

export function CharacterEditor({ initial, onDone, onCancel, hasExisting }) {
  const [c, setC] = useState(initial || { name: '', skin: SKINS[0], shirt: SHIRTS[0], hair: HAIR[0], cap: true })
  const valid = c.name.trim().length > 0
  return <div className="panel">
    <h2>{hasExisting ? 'Edit traveller' : 'Create your traveller'}</h2>
    <div className="center"><Avatar c={c} size={120} /></div>
    <label className="muted" htmlFor="name">Your name</label>
    <input id="name" placeholder="Callum" value={c.name} onChange={e => setC({ ...c, name: e.target.value })} />
    <p className="muted">Skin</p>
    <div className="row">{SKINS.map(s => <span key={s} role="button" tabIndex={0} aria-label={`Skin ${s}`} className={'swatch' + (c.skin === s ? ' on' : '')} style={{ background: s }} onClick={() => setC({ ...c, skin: s })} />)}</div>
    <p className="muted">Shirt</p>
    <div className="row">{SHIRTS.map(s => <span key={s} role="button" tabIndex={0} aria-label={`Shirt ${s}`} className={'swatch' + (c.shirt === s ? ' on' : '')} style={{ background: s }} onClick={() => setC({ ...c, shirt: s })} />)}</div>
    <p className="muted">Hair</p>
    <div className="row">{HAIR.map(s => <span key={s} role="button" tabIndex={0} aria-label={`Hair ${s}`} className={'swatch' + (c.hair === s ? ' on' : '')} style={{ background: s }} onClick={() => setC({ ...c, hair: s })} />)}</div>
    <label className="row"><input type="checkbox" checked={c.cap} onChange={e => setC({ ...c, cap: e.target.checked })} /> Wear cap</label>
    <button disabled={!valid} onClick={() => onDone(c)}>Save traveller</button>
    {onCancel && <button className="ghost" onClick={onCancel}>Cancel</button>}
  </div>
}
