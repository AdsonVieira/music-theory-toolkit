export type PitchClass = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export type NoteLetter = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'

export type Accidental = -2 | -1 | 0 | 1 | 2

export type AccidentalPreference = 'sharp' | 'flat'

export interface SpelledNote {
  letter: NoteLetter
  accidental: Accidental
  pitchClass: PitchClass
}

export type IntervalId =
  | 'unison'
  | 'minor2'
  | 'major2'
  | 'minor3'
  | 'major3'
  | 'perfect4'
  | 'tritone'
  | 'perfect5'
  | 'minor6'
  | 'major6'
  | 'minor7'
  | 'major7'
  | 'octave'

export interface IntervalDefinition {
  id: IntervalId
  name: string
  semitones: number
}

export type ChordQualityId =
  | 'major'
  | 'minor'
  | 'diminished'
  | 'augmented'
  | 'major7'
  | 'minor7'
  | 'dominant7'

export interface ChordFormula {
  id: ChordQualityId
  name: string
  symbolSuffix: string
  degrees: readonly string[]
  semitones: readonly number[]
}

export type ScaleTypeId = 'major' | 'naturalMinor' | 'harmonicMinor' | 'melodicMinor'

export interface ScaleFormula {
  id: ScaleTypeId
  name: string
  degrees: readonly string[]
  semitones: readonly number[]
}

export interface BuiltTone {
  note: SpelledNote
  label: string
  degree: string
  intervalName: string
  semitones: number
}

export interface BuiltChord {
  name: string
  symbol: string
  qualityName: string
  tones: BuiltTone[]
}

export interface BuiltScale {
  name: string
  tones: BuiltTone[]
}

export type HarmonicMode = 'major'

export interface HarmonicDegree {
  roman: string
  qualityId: ChordQualityId
  qualityName: string
  symbol: string
  notes: SpelledNote[]
  noteLabels: string[]
}

export interface HarmonicField {
  mode: HarmonicMode
  tonic: SpelledNote
  name: string
  degrees: HarmonicDegree[]
}

export interface KeySignature {
  id: string
  tonic: SpelledNote
  accidentals: number
  preference: AccidentalPreference
}

export interface CircleKey {
  label: string
  signature: KeySignature
  alternate?: KeySignature
}

export interface ResolvedInterval {
  definition: IntervalDefinition
  semitones: number
  ascending: true
}
