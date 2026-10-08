import type { AccidentalPreference, PitchClass } from '../../domain/music-theory/types.ts'
import { formatNote, pitchClass, spellPitch } from '../../domain/music-theory/notes.ts'

const PITCHES: readonly PitchClass[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

interface NotePickerProps {
  id: string
  label: string
  value: PitchClass
  preference: AccidentalPreference
  onChange: (value: PitchClass) => void
}

export function NotePicker({ id, label, value, preference, onChange }: NotePickerProps) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(pitchClass(Number(event.target.value)))}
      >
        {PITCHES.map((item) => (
          <option key={item} value={item}>
            {formatNote(spellPitch(item, preference))}
          </option>
        ))}
      </select>
    </label>
  )
}
