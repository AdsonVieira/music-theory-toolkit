import { describe, expect, it } from 'vitest'
import { buildHarmonicField } from './harmonic-field.ts'
import { noteFromLetter } from './notes.ts'

describe('campo harmônico', () => {
  it('lista os sete graus de C maior', () => {
    const field = buildHarmonicField(noteFromLetter('C'))
    expect(field.degrees.map((degree) => `${degree.roman} ${degree.symbol}`)).toEqual([
      'I C',
      'ii Dm',
      'iii Em',
      'IV F',
      'V G',
      'vi Am',
      'vii° B°',
    ])
    expect(field.degrees[0]?.noteLabels).toEqual(['C', 'E', 'G'])
    expect(field.degrees[6]?.noteLabels).toEqual(['B', 'D', 'F'])
  })

  it('respeita a armadura de G maior no V e no vii°', () => {
    const field = buildHarmonicField(noteFromLetter('G'))
    expect(field.degrees[4]?.symbol).toBe('D')
    expect(field.degrees[4]?.noteLabels).toEqual(['D', 'F#', 'A'])
    expect(field.degrees[6]?.symbol).toBe('F#°')
    expect(field.degrees[6]?.noteLabels).toEqual(['F#', 'A', 'C'])
  })
})
