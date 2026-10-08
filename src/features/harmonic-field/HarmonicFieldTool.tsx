import { useState } from 'react'
import { StudyPage } from '../../components/layout/StudyPage.tsx'
import { NotePicker } from '../../components/ui/NotePicker.tsx'
import { SpellPreference } from '../../components/ui/SpellPreference.tsx'
import { buildHarmonicField } from '../../domain/music-theory/harmonic-field.ts'
import { spellPitch } from '../../domain/music-theory/notes.ts'
import type { AccidentalPreference } from '../../domain/music-theory/types.ts'
import { usePreferredPitch } from '../../hooks/usePreferredPitch.ts'
import { routeById } from '../../utils/routes.ts'
import { capitalize, joinLabels } from '../../utils/text.ts'

export function HarmonicFieldTool() {
  const page = routeById('harmonic-field')
  const [tonic, setTonic] = usePreferredPitch(0)
  const [preference, setPreference] = useState<AccidentalPreference>('sharp')
  const field = buildHarmonicField(spellPitch(tonic, preference), 'major')

  return (
    <StudyPage title={page.label} lead={page.lead}>
      <form className="card form-row" onSubmit={(event) => event.preventDefault()}>
        <SpellPreference name="campo-grafia" value={preference} onChange={setPreference} />
        <NotePicker id="tonalidade" label="Tonalidade" value={tonic} preference={preference} onChange={setTonic} />
      </form>
      <section className="card" aria-live="polite">
        <h2>Campo harmônico de {field.name}</h2>
        <div className="table-wrap">
          <table>
            <caption>Graus, qualidades e notas de {field.name}</caption>
            <thead>
              <tr>
                <th scope="col">Grau</th>
                <th scope="col">Acorde</th>
                <th scope="col">Qualidade</th>
                <th scope="col">Notas</th>
              </tr>
            </thead>
            <tbody>
              {field.degrees.map((degree) => (
                <tr key={degree.roman}>
                  <th scope="row">{degree.roman}</th>
                  <td>{degree.symbol}</td>
                  <td>{capitalize(degree.qualityName)}</td>
                  <td>{joinLabels(degree.noteLabels)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </StudyPage>
  )
}
