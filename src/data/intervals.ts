import type { IntervalDefinition } from '../domain/music-theory/types.ts'

export const INTERVALS: readonly IntervalDefinition[] = [
  { id: 'unison', name: 'uníssono', semitones: 0 },
  { id: 'minor2', name: 'segunda menor', semitones: 1 },
  { id: 'major2', name: 'segunda maior', semitones: 2 },
  { id: 'minor3', name: 'terça menor', semitones: 3 },
  { id: 'major3', name: 'terça maior', semitones: 4 },
  { id: 'perfect4', name: 'quarta justa', semitones: 5 },
  { id: 'tritone', name: 'trítono', semitones: 6 },
  { id: 'perfect5', name: 'quinta justa', semitones: 7 },
  { id: 'minor6', name: 'sexta menor', semitones: 8 },
  { id: 'major6', name: 'sexta maior', semitones: 9 },
  { id: 'minor7', name: 'sétima menor', semitones: 10 },
  { id: 'major7', name: 'sétima maior', semitones: 11 },
  { id: 'octave', name: 'oitava', semitones: 12 },
]
