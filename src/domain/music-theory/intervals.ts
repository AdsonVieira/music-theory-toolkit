import { INTERVALS } from '../../data/intervals.ts'
import { formatNote } from './notes.ts'
import type { IntervalDefinition, ResolvedInterval, SpelledNote } from './types.ts'

export function intervalBySemitones(semitones: number): IntervalDefinition {
  const match = INTERVALS.find((interval) => interval.semitones === semitones)
  if (!match) {
    throw new Error(`Não há intervalo mapeado para ${semitones} semitons.`)
  }
  return match
}

export function intervalBetween(from: SpelledNote, to: SpelledNote): ResolvedInterval {
  const semitones = (to.pitchClass - from.pitchClass + 12) % 12
  return {
    definition: intervalBySemitones(semitones),
    semitones,
    ascending: true,
  }
}

export function describeInterval(from: SpelledNote, to: SpelledNote): string {
  const interval = intervalBetween(from, to)
  return `${formatNote(from)} → ${formatNote(to)}: ${interval.definition.name} (${interval.semitones} semitons)`
}
