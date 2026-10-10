import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  readBestScore,
  readLastPitchClass,
  writeBestScore,
  writeLastPitchClass,
} from './storage.ts'

function createMemoryStorage(): Storage {
  const store = new Map<string, string>()
  return {
    get length() {
      return store.size
    },
    clear() {
      store.clear()
    },
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null
    },
    key(index: number) {
      return [...store.keys()][index] ?? null
    },
    removeItem(key: string) {
      store.delete(key)
    },
    setItem(key: string, value: string) {
      store.set(key, value)
    },
  }
}

describe('storage de tonalidade', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createMemoryStorage())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('grava e lê classes de altura válidas de 0 a 11', () => {
    writeLastPitchClass(0)
    expect(readLastPitchClass()).toBe(0)

    writeLastPitchClass(7)
    expect(readLastPitchClass()).toBe(7)

    writeLastPitchClass(11)
    expect(readLastPitchClass()).toBe(11)
  })

  it('retorna null para valores inválidos em mtt.lastPitchClass', () => {
    localStorage.setItem('mtt.lastPitchClass', '12')
    expect(readLastPitchClass()).toBeNull()

    localStorage.setItem('mtt.lastPitchClass', '-1')
    expect(readLastPitchClass()).toBeNull()

    localStorage.setItem('mtt.lastPitchClass', 'abc')
    expect(readLastPitchClass()).toBeNull()
  })

  it('não altera mtt.bestScore ao gravar a tonalidade', () => {
    writeBestScore(42)
    writeLastPitchClass(10)

    expect(readBestScore()).toBe(42)
    expect(localStorage.getItem('mtt.bestScore')).toBe('42')
    expect(localStorage.getItem('mtt.lastPitchClass')).toBe('10')
  })
})
