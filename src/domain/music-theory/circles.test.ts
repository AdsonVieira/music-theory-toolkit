import { describe, expect, it } from 'vitest'
import { circleOfFifths, circleOfFourths, signatureLabel, stepIndex } from './circles.ts'
import { formatNote } from './notes.ts'

describe('ciclos', () => {
  it('avança e recua uma quinta a partir de C e fecha o ciclo em 12 passos', () => {
    const fifths = circleOfFifths()
    const cIndex = fifths.findIndex((key) => key.signature.id === 'C')
    expect(formatNote(fifths[stepIndex(cIndex, 1)]!.signature.tonic)).toBe('G')
    expect(formatNote(fifths[stepIndex(cIndex, -1)]!.signature.tonic)).toBe('F')

    let index = cIndex
    for (let step = 0; step < 12; step += 1) index = stepIndex(index, 1)
    expect(index).toBe(cIndex)
    expect(fifths).toHaveLength(12)
  })

  it('avança uma quarta a partir de C', () => {
    const fourths = circleOfFourths()
    const cIndex = fourths.findIndex((key) => key.signature.id === 'C')
    expect(formatNote(fourths[stepIndex(cIndex, 1)]!.signature.tonic)).toBe('F')
    expect(fourths).toHaveLength(12)
  })

  it('trata F# e Gb como a mesma classe com armaduras de 6 sustenidos e 6 bemóis', () => {
    const enharmonic = circleOfFifths().find((key) => key.label === 'F#/Gb')
    expect(enharmonic?.signature.tonic.pitchClass).toBe(6)
    expect(enharmonic?.alternate?.tonic.pitchClass).toBe(6)
    expect(enharmonic?.signature.accidentals).toBe(6)
    expect(enharmonic?.alternate?.accidentals).toBe(-6)
    expect(signatureLabel(enharmonic!.signature)).toContain('6 sustenidos')
    expect(signatureLabel(enharmonic!.alternate!)).toContain('6 bemóis')
  })
})
