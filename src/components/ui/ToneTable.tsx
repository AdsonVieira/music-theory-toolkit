import type { BuiltTone } from '../../domain/music-theory/types.ts'

interface ToneTableProps {
  caption: string
  tones: readonly BuiltTone[]
}

export function ToneTable({ caption, tones }: ToneTableProps) {
  return (
    <div className="table-wrap">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Nota</th>
            <th scope="col">Grau</th>
            <th scope="col">Intervalo</th>
            <th scope="col">Semitons</th>
          </tr>
        </thead>
        <tbody>
          {tones.map((tone) => (
            <tr key={`${tone.degree}-${tone.label}`}>
              <td>{tone.label}</td>
              <td>{tone.degree}</td>
              <td>{tone.intervalName}</td>
              <td>{tone.semitones}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
