import type { AccidentalPreference } from '../../domain/music-theory/types.ts'

interface SpellPreferenceProps {
  name: string
  value: AccidentalPreference
  onChange: (value: AccidentalPreference) => void
}

export function SpellPreference({ name, value, onChange }: SpellPreferenceProps) {
  return (
    <fieldset className="choice-row">
      <legend>Grafia</legend>
      <label>
        <input
          type="radio"
          name={name}
          value="sharp"
          checked={value === 'sharp'}
          onChange={() => onChange('sharp')}
        />
        Sustenidos
      </label>
      <label>
        <input
          type="radio"
          name={name}
          value="flat"
          checked={value === 'flat'}
          onChange={() => onChange('flat')}
        />
        Bemóis
      </label>
    </fieldset>
  )
}
