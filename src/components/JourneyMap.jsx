import { CHAPTERS } from '../content/chapters.js'
import { Avatar } from './CharacterEditor.jsx'

export function JourneyMap({ save, onOpenChapter, onEditCharacter }) {
  return <div className="panel">
    <div className="hud">
      <button className="ghost small" onClick={onEditCharacter}><Avatar c={save.character} size={44} /></button>
      <div><b>{save.character?.name}</b></div>
      <span className="xp">{save.xp} XP</span>
    </div>
    <h2>Your Ruta</h2>
    {Object.entries(CHAPTERS).map(([id, ch]) => {
      const done = save.journey.chapterId === id || save.journey.completedActivities.length > 0
      const locked = ch.locked && !isUnlocked(save, id)
      return <button key={id} className="chapter" disabled={locked} onClick={() => onOpenChapter(id)}>
        <div>
          <b>{ch.title}</b>
          <p className="muted">{ch.subtitle}</p>
        </div>
        {locked && <span className="lock">🔒</span>}
      </button>
    })}
  </div>
}

function isUnlocked(save, chapterId) {
  // A chapter is unlocked if its prerequisites are done, or if it's the first one.
  // For now, only madrid-arrival is truly playable.
  return chapterId === 'madrid-arrival'
}
