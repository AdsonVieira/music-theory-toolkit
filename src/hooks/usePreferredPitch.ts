import { useState } from 'react'
import type { PitchClass } from '../domain/music-theory/types.ts'
import { readLastPitchClass, writeLastPitchClass } from '../utils/storage.ts'

export function usePreferredPitch(initial: PitchClass = 0): [PitchClass, (value: PitchClass) => void] {
  const [value, setValue] = useState<PitchClass>(() => readLastPitchClass() ?? initial)

  const update = (next: PitchClass) => {
    setValue(next)
    writeLastPitchClass(next)
  }

  return [value, update]
}
