import { SCALE_FORMULAS } from '../../data/scales.ts'
import { intervalBySemitones } from './intervals.ts'
import { formatNote, spellByDegree } from './notes.ts'
import type { BuiltScale, BuiltTone, ScaleFormula, ScaleTypeId, SpelledNote } from './types.ts'

export function getScaleFormula(type: ScaleTypeId): ScaleFormula {
  const formula = SCALE_FORMULAS.find((item) => item.id === type)
  if (!formula) {
    throw new Error(`Escala desconhecida: ${type}`)
  }
  return formula
}

export function buildScale(root: SpelledNote, type: ScaleTypeId): BuiltScale {
  const formula = getScaleFormula(type)
  const tones: BuiltTone[] = formula.semitones.map((semitones, index) => {
    const note = spellByDegree(root, semitones, index)
    return {
      note,
      label: formatNote(note),
      degree: formula.degrees[index] ?? '',
      intervalName: intervalBySemitones(semitones).name,
      semitones,
    }
  })

  return {
    name: `${formatNote(root)} ${formula.name}`,
    tones,
  }
}
