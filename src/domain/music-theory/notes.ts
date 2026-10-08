import type { Accidental, AccidentalPreference, NoteLetter, PitchClass, SpelledNote } from './types.ts'

export const LETTERS: readonly NoteLetter[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

const NATURAL_PITCH: Record<NoteLetter, PitchClass> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
}

const SHARP_SPELLING: readonly SpelledNote[] = [
  { letter: 'C', accidental: 0, pitchClass: 0 },
  { letter: 'C', accidental: 1, pitchClass: 1 },
  { letter: 'D', accidental: 0, pitchClass: 2 },
  { letter: 'D', accidental: 1, pitchClass: 3 },
  { letter: 'E', accidental: 0, pitchClass: 4 },
  { letter: 'F', accidental: 0, pitchClass: 5 },
  { letter: 'F', accidental: 1, pitchClass: 6 },
  { letter: 'G', accidental: 0, pitchClass: 7 },
  { letter: 'G', accidental: 1, pitchClass: 8 },
  { letter: 'A', accidental: 0, pitchClass: 9 },
  { letter: 'A', accidental: 1, pitchClass: 10 },
  { letter: 'B', accidental: 0, pitchClass: 11 },
]

const FLAT_SPELLING: readonly SpelledNote[] = [
  { letter: 'C', accidental: 0, pitchClass: 0 },
  { letter: 'D', accidental: -1, pitchClass: 1 },
  { letter: 'D', accidental: 0, pitchClass: 2 },
  { letter: 'E', accidental: -1, pitchClass: 3 },
  { letter: 'E', accidental: 0, pitchClass: 4 },
  { letter: 'F', accidental: 0, pitchClass: 5 },
  { letter: 'G', accidental: -1, pitchClass: 6 },
  { letter: 'G', accidental: 0, pitchClass: 7 },
  { letter: 'A', accidental: -1, pitchClass: 8 },
  { letter: 'A', accidental: 0, pitchClass: 9 },
  { letter: 'B', accidental: -1, pitchClass: 10 },
  { letter: 'B', accidental: 0, pitchClass: 11 },
]

export function pitchClass(value: number): PitchClass {
  return (((value % 12) + 12) % 12) as PitchClass
}

export function accidentalGlyph(accidental: Accidental): string {
  if (accidental === -2) return 'bb'
  if (accidental === -1) return 'b'
  if (accidental === 1) return '#'
  if (accidental === 2) return '##'
  return ''
}

export function formatNote(note: SpelledNote): string {
  return `${note.letter}${accidentalGlyph(note.accidental)}`
}

export function spellPitch(value: PitchClass, preference: AccidentalPreference): SpelledNote {
  const spelling = preference === 'flat' ? FLAT_SPELLING : SHARP_SPELLING
  const note = spelling[value]
  if (!note) {
    throw new Error(`Classe de altura inválida: ${value}`)
  }
  return note
}

export function spellByDegree(root: SpelledNote, semitoneOffset: number, letterSteps: number): SpelledNote {
  const letter = LETTERS[(LETTERS.indexOf(root.letter) + letterSteps) % LETTERS.length]
  if (!letter) {
    throw new Error('Letra de nota inválida.')
  }

  const target = pitchClass(root.pitchClass + semitoneOffset)
  const natural = NATURAL_PITCH[letter]
  let diff = target - natural
  if (diff > 6) diff -= 12
  if (diff < -6) diff += 12
  if (diff < -2 || diff > 2) {
    throw new Error(`Não é possível grafar a classe ${target} na letra ${letter}.`)
  }

  return {
    letter,
    accidental: diff as Accidental,
    pitchClass: target,
  }
}

export function noteFromLetter(letter: NoteLetter, accidental: Accidental = 0): SpelledNote {
  return spellByDegree(
    { letter, accidental: 0, pitchClass: NATURAL_PITCH[letter] },
    accidental,
    0,
  )
}
