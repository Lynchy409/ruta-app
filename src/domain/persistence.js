// Save/load with versioning, migration and export/import.

import { SCHEMA_VERSION, createEmptySave } from './progress.js'

const KEY = 'ruta-save-v2'
const LEGACY_KEY = 'ruta-save-v1'

// Storage may be unavailable in sandboxed previews. Fall back to memory so the
// app still runs (progress just won't persist) instead of crashing on load.
function safeStorage() {
  try {
    const t = globalThis.localStorage
    t.setItem('__ruta_test', '1')
    t.removeItem('__ruta_test')
    return t
  } catch {
    return null
  }
}
const memoryStore = new Map()
const storage = safeStorage() || {
  getItem: k => memoryStore.get(k) ?? null,
  setItem: (k, v) => { memoryStore.set(k, String(v)) },
  removeItem: k => { memoryStore.delete(k) },
}

export const persistenceAvailable = !!safeStorage()

export function loadSave() {
  try {
    const raw = storage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (!isValidSave(parsed)) return migrateLegacy()
      return parsed
    }
    // Fall back to legacy save if present
    const legacyRaw = storage.getItem(LEGACY_KEY)
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw)
      if (legacy && typeof legacy === 'object') {
        return migrateLegacy(legacy)
      }
    }
  } catch (e) {
    console.warn('Save load failed', e)
  }
  return createEmptySave()
}

export function saveSave(state) {
  try {
    storage.setItem(KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('Save write failed', e)
  }
}

function migrateLegacy(legacy) {
  const base = createEmptySave()
  if (!legacy) return base
  return {
    ...base,
    character: legacy.character || null,
    xp: legacy.xp || 0,
    journey: {
      ...base.journey,
      worldFlags: { legacyChapters: legacy.completed || [] },
    },
  }
}

export function isValidSave(s) {
  if (!s || typeof s !== 'object') return false
  return (
    s.schemaVersion === SCHEMA_VERSION &&
    typeof s.concepts === 'object' &&
    Array.isArray(s.rewardsGranted)
  )
}

export function exportSave(state) {
  return JSON.stringify(state, null, 2)
}

export function importSave(json) {
  const parsed = JSON.parse(json)
  if (!isValidSave(parsed)) throw new Error('Invalid save format')
  return parsed
}

export function resetSave() {
  storage.removeItem(KEY)
  storage.removeItem(LEGACY_KEY)
  return createEmptySave()
}
