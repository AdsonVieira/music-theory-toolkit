import { buildChord } from './chords.ts'
import { buildScale } from './scales.ts'
import { formatNote } from './notes.ts'
import type { ChordQualityId, HarmonicDegree, HarmonicField, HarmonicMode, SpelledNote } from './types.ts'

const FIELD_DEGREES: Record<HarmonicMode, readonly { roman: string; quality: ChordQualityId }[]> = {
  major: [
    { roman: 'I', quality: 'major' },
    { roman: 'ii', quality: 'minor' },
    { roman: 'iii', quality: 'minor' },
    { roman: 'IV', quality: 'major' },
    { roman: 'V', quality: 'major' },
    { roman: 'vi', quality: 'minor' },
    { roman: 'vii°', quality: 'diminished' },
  ],
}

export function buildHarmonicField(tonic: SpelledNote, mode: HarmonicMode = 'major'): HarmonicField {
  const scale = buildScale(tonic, 'major')
  const degrees: HarmonicDegree[] = FIELD_DEGREES[mode].map((degree, index) => {
    const scaleTone = scale.tones[index]
    if (!scaleTone) {
      throw new Error('A escala maior precisa ter sete graus.')
    }
    const chord = buildChord(scaleTone.note, degree.quality)
    return {
      roman: degree.roman,
      qualityId: degree.quality,
      qualityName: chord.qualityName,
      symbol: chord.symbol,
      notes: chord.tones.map((tone) => tone.note),
      noteLabels: chord.tones.map((tone) => tone.label),
    }
  })

  return {
    mode,
    tonic,
    name: `${formatNote(tonic)} maior`,
    degrees,
  }
}

export function relativeMinor(majorTonic: SpelledNote): HarmonicDegree {
  const field = buildHarmonicField(majorTonic, 'major')
  const degree = field.degrees[5]
  if (!degree) {
    throw new Error('O campo harmônico maior não tem grau VI.')
  }
  return degree
}
