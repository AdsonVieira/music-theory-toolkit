import { describe, expect, it } from 'vitest'
import { buildChord } from './chords.ts'
import { noteFromLetter } from './notes.ts'

describe('acordes', () => {
  it('monta tríades e o acorde dominante', () => {
    expect(buildChord(noteFromLetter('C'), 'major').tones.map((tone) => tone.label)).toEqual(['C', 'E', 'G'])
    expect(buildChord(noteFromLetter('D'), 'minor').tones.map((tone) => tone.label)).toEqual(['D', 'F', 'A'])
    expect(buildChord(noteFromLetter('B'), 'diminished').tones.map((tone) => tone.label)).toEqual(['B', 'D', 'F'])
    expect(buildChord(noteFromLetter('C'), 'dominant7').tones.map((tone) => tone.label)).toEqual(['C', 'E', 'G', 'Bb'])
  })

  it('expõe graus e semitons da fundamental', () => {
    const chord = buildChord(noteFromLetter('C'), 'major')
    expect(chord.name).toBe('C maior')
    expect(chord.symbol).toBe('C')
    expect(chord.tones.map((tone) => tone.degree)).toEqual(['1', '3', '5'])
    expect(chord.tones.map((tone) => tone.semitones)).toEqual([0, 4, 7])
  })
})
