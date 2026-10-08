import { signatureLabel } from '../../domain/music-theory/circles.ts'
import { buildHarmonicField } from '../../domain/music-theory/harmonic-field.ts'
import { formatNote } from '../../domain/music-theory/notes.ts'
import { buildScale } from '../../domain/music-theory/scales.ts'
import type { KeySignature } from '../../domain/music-theory/types.ts'
import { joinLabels } from '../../utils/text.ts'

interface KeySummaryProps {
  signature: KeySignature
}

export function KeySummary({ signature }: KeySummaryProps) {
  const scale = buildScale(signature.tonic, 'major')
  const field = buildHarmonicField(signature.tonic, 'major')

  return (
    <section className="card stack" aria-live="polite">
      <p className="eyebrow">Tonalidade</p>
      <h2>{formatNote(signature.tonic)} maior</h2>
      <p>
        <strong>Armadura:</strong> {signatureLabel(signature)}
      </p>
      <p>
        <strong>Escala maior:</strong> {joinLabels(scale.tones.map((tone) => tone.label))}
      </p>
      <h3>Campo harmônico</h3>
      <ul className="degree-list">
        {field.degrees.map((degree) => (
          <li key={degree.roman}>
            <span>{degree.roman}</span>
            <strong>{degree.symbol}</strong>
            <small>{joinLabels(degree.noteLabels)}</small>
          </li>
        ))}
      </ul>
    </section>
  )
}
