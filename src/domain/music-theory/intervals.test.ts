import { describe, expect, it } from 'vitest'
import { intervalBetween } from './intervals.ts'
import { noteFromLetter } from './notes.ts'

describe('intervalos', () => {
  it('reconhece uníssono, segunda menor, terça maior, trítono e quinta justa', () => {
    expect(intervalBetween(noteFromLetter('C'), noteFromLetter('C')).definition.name).toBe('uníssono')
    expect(intervalBetween(noteFromLetter('C'), noteFromLetter('D', -1)).definition.name).toBe('segunda menor')
    expect(intervalBetween(noteFromLetter('C'), noteFromLetter('E')).definition.name).toBe('terça maior')
    expect(intervalBetween(noteFromLetter('C'), noteFromLetter('F', 1)).definition.name).toBe('trítono')
    expect(intervalBetween(noteFromLetter('B'), noteFromLetter('C')).definition.name).toBe('segunda menor')

    const fifth = intervalBetween(noteFromLetter('C'), noteFromLetter('G'))
    expect(fifth.semitones).toBe(7)
    expect(fifth.definition.name).toBe('quinta justa')
  })
})
