import { CHORD_FORMULAS } from '../../data/chords.ts'
import { intervalBySemitones } from './intervals.ts'
import { formatNote, spellByDegree } from './notes.ts'
import type { BuiltChord, BuiltTone, ChordFormula, ChordQualityId, SpelledNote } from './types.ts'

export function getChordFormula(quality: ChordQualityId): ChordFormula {
  const formula = CHORD_FORMULAS.find((item) => item.id === quality)
  if (!formula) {
    throw new Error(`Tipo de acorde desconhecido: ${quality}`)
  }
  return formula
}

export function buildChord(root: SpelledNote, quality: ChordQualityId): BuiltChord {
  const formula = getChordFormula(quality)
  const rootLabel = formatNote(root)
  const tones: BuiltTone[] = formula.semitones.map((semitones, index) => {
    const note = spellByDegree(root, semitones, index * 2)
    return {
      note,
      label: formatNote(note),
      degree: formula.degrees[index] ?? '',
      intervalName: intervalBySemitones(semitones).name,
      semitones,
    }
  })

  return {
    name: `${rootLabel} ${formula.name}`,
    symbol: `${rootLabel}${formula.symbolSuffix}`,
    qualityName: formula.name,
    tones,
  }
}
