import { FLAT_ORDER, SHARP_ORDER } from '../../data/keys.ts'
import { noteFromLetter } from './notes.ts'
import type { CircleKey, KeySignature } from './types.ts'

function signature(
  id: string,
  letter: KeySignature['tonic']['letter'],
  accidental: KeySignature['tonic']['accidental'],
  accidentals: number,
  preference: KeySignature['preference'],
): KeySignature {
  return {
    id,
    tonic: noteFromLetter(letter, accidental),
    accidentals,
    preference,
  }
}

const KEYS: Record<string, CircleKey> = {
  C: { label: 'C', signature: signature('C', 'C', 0, 0, 'sharp') },
  G: { label: 'G', signature: signature('G', 'G', 0, 1, 'sharp') },
  D: { label: 'D', signature: signature('D', 'D', 0, 2, 'sharp') },
  A: { label: 'A', signature: signature('A', 'A', 0, 3, 'sharp') },
  E: { label: 'E', signature: signature('E', 'E', 0, 4, 'sharp') },
  B: { label: 'B', signature: signature('B', 'B', 0, 5, 'sharp') },
  'F#': {
    label: 'F#/Gb',
    signature: signature('F#', 'F', 1, 6, 'sharp'),
    alternate: signature('Gb', 'G', -1, -6, 'flat'),
  },
  Db: { label: 'Db', signature: signature('Db', 'D', -1, -5, 'flat') },
  Ab: { label: 'Ab', signature: signature('Ab', 'A', -1, -4, 'flat') },
  Eb: { label: 'Eb', signature: signature('Eb', 'E', -1, -3, 'flat') },
  Bb: { label: 'Bb', signature: signature('Bb', 'B', -1, -2, 'flat') },
  F: { label: 'F', signature: signature('F', 'F', 0, -1, 'flat') },
}

const FIFTHS_ORDER = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'] as const
const FOURTHS_ORDER = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'F#', 'B', 'E', 'A', 'D', 'G'] as const

function circleFrom(order: readonly string[]): CircleKey[] {
  return order.map((id) => {
    const key = KEYS[id]
    if (!key) {
      throw new Error(`Tonalidade ausente no ciclo: ${id}`)
    }
    return key
  })
}

export function circleOfFifths(): CircleKey[] {
  return circleFrom(FIFTHS_ORDER)
}

export function circleOfFourths(): CircleKey[] {
  return circleFrom(FOURTHS_ORDER)
}

export function stepIndex(index: number, direction: 1 | -1, length = 12): number {
  return (index + direction + length) % length
}

export function signatureAccidentals(signatureValue: KeySignature): string[] {
  if (signatureValue.accidentals > 0) return [...SHARP_ORDER.slice(0, signatureValue.accidentals)]
  if (signatureValue.accidentals < 0) return [...FLAT_ORDER.slice(0, -signatureValue.accidentals)]
  return []
}

export function signatureLabel(signatureValue: KeySignature): string {
  const count = Math.abs(signatureValue.accidentals)
  if (count === 0) return 'nenhum acidente'
  const noun =
    signatureValue.accidentals > 0
      ? count === 1
        ? 'sustenido'
        : 'sustenidos'
      : count === 1
        ? 'bemol'
        : 'bemóis'
  const names = signatureAccidentals(signatureValue).join(', ')
  return `${count} ${noun} (${names})`
}
