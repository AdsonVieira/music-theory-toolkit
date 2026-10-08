import type { ChordFormula } from '../domain/music-theory/types.ts'

export const CHORD_FORMULAS: readonly ChordFormula[] = [
  { id: 'major', name: 'maior', symbolSuffix: '', degrees: ['1', '3', '5'], semitones: [0, 4, 7] },
  { id: 'minor', name: 'menor', symbolSuffix: 'm', degrees: ['1', 'b3', '5'], semitones: [0, 3, 7] },
  { id: 'diminished', name: 'diminuto', symbolSuffix: '°', degrees: ['1', 'b3', 'b5'], semitones: [0, 3, 6] },
  { id: 'augmented', name: 'aumentado', symbolSuffix: '+', degrees: ['1', '3', '#5'], semitones: [0, 4, 8] },
  {
    id: 'major7',
    name: 'maior com sétima',
    symbolSuffix: 'maj7',
    degrees: ['1', '3', '5', '7'],
    semitones: [0, 4, 7, 11],
  },
  {
    id: 'minor7',
    name: 'menor com sétima',
    symbolSuffix: 'm7',
    degrees: ['1', 'b3', '5', 'b7'],
    semitones: [0, 3, 7, 10],
  },
  {
    id: 'dominant7',
    name: 'dominante com sétima',
    symbolSuffix: '7',
    degrees: ['1', '3', '5', 'b7'],
    semitones: [0, 4, 7, 10],
  },
]
