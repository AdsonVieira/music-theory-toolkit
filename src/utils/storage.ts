import type { PitchClass } from '../domain/music-theory/types.ts'
import { pitchClass } from '../domain/music-theory/notes.ts'

const PITCH_KEY = 'mtt.lastPitchClass'
const BEST_SCORE_KEY = 'mtt.bestScore'

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // A preferência local é opcional; a sessão segue sem persistência.
  }
}

export function readLastPitchClass(): PitchClass | null {
  const raw = readStorage(PITCH_KEY)
  if (raw === null) return null
  const value = Number(raw)
  if (!Number.isInteger(value) || value < 0 || value > 11) return null
  return pitchClass(value)
}

export function writeLastPitchClass(value: PitchClass): void {
  writeStorage(PITCH_KEY, String(value))
}

export function readBestScore(): number {
  const raw = readStorage(BEST_SCORE_KEY)
  const value = Number(raw)
  if (!Number.isInteger(value) || value < 0) return 0
  return value
}

export function writeBestScore(score: number): void {
  writeStorage(BEST_SCORE_KEY, String(score))
}
