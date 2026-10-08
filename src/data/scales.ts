import type { ScaleFormula } from '../domain/music-theory/types.ts'

export const SCALE_FORMULAS: readonly ScaleFormula[] = [
  { id: 'major', name: 'maior', degrees: ['1', '2', '3', '4', '5', '6', '7'], semitones: [0, 2, 4, 5, 7, 9, 11] },
  {
    id: 'naturalMinor',
    name: 'menor natural',
    degrees: ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
    semitones: [0, 2, 3, 5, 7, 8, 10],
  },
  {
    id: 'harmonicMinor',
    name: 'menor harmônica',
    degrees: ['1', '2', 'b3', '4', '5', 'b6', '7'],
    semitones: [0, 2, 3, 5, 7, 8, 11],
  },
  {
    id: 'melodicMinor',
    name: 'menor melódica',
    degrees: ['1', '2', 'b3', '4', '5', '6', '7'],
    semitones: [0, 2, 3, 5, 7, 9, 11],
  },
]
