import { useState, useEffect, useCallback } from 'react'
import { CHAPTERS } from './content/chapters.js'
import { loadSave, saveSave, resetSave, exportSave, importSave } from './domain/persistence.js'
import { recordAttempt, completeActivity, grantReward } from './domain/progress.js'
import { CharacterEditor } from './components/CharacterEditor.jsx'
import { Scene } from './components/Scene.jsx'
import { Activity } from './components/Activity.jsx'
import { JourneyMap } from './components/JourneyMap.jsx'

export default function App() {
  const [save, setSave] = useState(loadSave)
  const [screen, setScreen] = useState('title')
  const [chapterId, setChapterId] = useState(null)
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => { saveSave(save) }, [save])

  function update(mut) { setSave(s => mut(s)) }

  function startChapter(id) {
    setChapterId(id)
    setStepIndex(0)
    setScreen('chapter')
  }

  function onRecord(conceptId, mode, correct, hint, mistakeType) {
    update(s => recordAttempt(s, conceptId, mode, correct, hint, mistakeType))
  }

  function onStepDone(stepId, correct) {
    const ch = CHAPTERS[chapterId]
    const step = ch.sequence[stepIndex]
    update(s => {
      let ns = s
      if (step.kind === 'activity') ns = completeActivity(ns, step.id)
      return ns
    })
    if (stepIndex < ch.sequence.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      // Chapter complete: grant one-time reward and go to map
      update(s => {
        let ns = s
        ns = completeActivity(ns, `chapter:${chapterId}`)
        ns = grantReward(ns, `chapter:${chapterId}`, ch.reward)
        ns = { ...ns, journey: { ...ns.journey, chapterId } }
        return ns
      })
      setScreen('map')
    }
  }

  const onRecordCb = useCallback(onRecord, [save])

  return <div className="app">
    {screen === 'title' && <Title
      hasChar={!!save.character}
      onStart={() => setScreen(save.character ? 'map' : 'create')}
      onEdit={() => setScreen('create')}
      onReset={() => { setSave(resetSave()); setScreen('title') }}
      onExport={() => {
        const blob = new Blob([exportSave(save)], { type: 'application/json' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = 'ruta-save.json'
        a.click()
      }}
      onImport={() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.json'
        input.onchange = async (e) => {
          const file = e.target.files[0]
          if (!file) return
          try {
            const text = await file.text()
            const imported = importSave(text)
            setSave(imported)
            setScreen('map')
          } catch (err) {
            alert('Could not import: ' + err.message)
          }
        }
        input.click()
      }}
    />}
    {screen === 'create' && <CharacterEditor
      initial={save.character}
      hasExisting={!!save.character}
      onDone={c => { update(s => ({ ...s, character: c })); setScreen('map') }}
      onCancel={() => setScreen(save.character ? 'map' : 'title')}
    />}
    {screen === 'map' && <JourneyMap
      save={save}
      onOpenChapter={startChapter}
      onEditCharacter={() => setScreen('create')}
    />}
    {screen === 'chapter' && (
      <ChapterPlayer
        chapterId={chapterId}
        stepIndex={stepIndex}
        onRecord={onRecordCb}
        onStepDone={onStepDone}
      />
    )}
  </div>
}

function Title({ hasChar, onStart, onEdit, onReset, onExport, onImport }) {
  return <div className="center">
    <h1 className="logo">Ruta</h1>
    <p className="sub">Road to Fluent</p>
    <button onClick={onStart}>{hasChar ? 'Continue journey' : 'Start journey'}</button>
    {hasChar && <button className="ghost" onClick={onEdit}>Edit traveller</button>}
    {hasChar && <>
      <button className="ghost" onClick={onExport}>Export progress</button>
      <button className="ghost" onClick={onImport}>Import progress</button>
      <button className="ghost danger" onClick={onReset}>Reset progress</button>
    </>}
  </div>
}

function ChapterPlayer({ chapterId, stepIndex, onRecord, onStepDone }) {
  const ch = CHAPTERS[chapterId]
  if (!ch) return <p className="error">Unknown chapter</p>
  const step = ch.sequence[stepIndex]
  if (!step) return <p className="error">Step missing</p>

  return <div className="panel">
    <div className="hud">
      <span className="muted">Step {stepIndex + 1} of {ch.sequence.length}</span>
      <span className="muted">{ch.title}</span>
    </div>
    {step.kind === 'dialogue' && <Scene id={step.id} onDone={() => onStepDone(step.id)} />}
    {step.kind === 'activity' && <Activity id={step.id} onFinish={onStepDone} onRecord={onRecord} />}
  </div>
}
