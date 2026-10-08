import { describe, expect, it } from 'vitest'
import { noteFromLetter } from './notes.ts'
import { buildScale } from './scales.ts'

describe('escalas', () => {
  it('monta a escala maior de C', () => {
    const scale = buildScale(noteFromLetter('C'), 'major')
    expect(scale.tones.map((tone) => tone.label)).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
  })

  it('monta as menores de A com a grafia da armadura', () => {
    expect(buildScale(noteFromLetter('A'), 'naturalMinor').tones.map((tone) => tone.label)).toEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
    ])
    expect(buildScale(noteFromLetter('A'), 'harmonicMinor').tones.map((tone) => tone.label)).toEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G#',
    ])
    expect(buildScale(noteFromLetter('A'), 'melodicMinor').tones.map((tone) => tone.label)).toEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F#',
      'G#',
    ])
  })

  it('grafa Gb maior com as alterações da armadura', () => {
    expect(buildScale(noteFromLetter('G', -1), 'major').tones.map((tone) => tone.label)).toEqual([
      'Gb',
      'Ab',
      'Bb',
      'Cb',
      'Db',
      'Eb',
      'F',
    ])
  })
})
