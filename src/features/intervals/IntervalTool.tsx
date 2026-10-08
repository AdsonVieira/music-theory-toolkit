import { useState } from 'react'
import { StudyPage } from '../../components/layout/StudyPage.tsx'
import { NotePicker } from '../../components/ui/NotePicker.tsx'
import { SemitoneRuler } from '../../components/ui/SemitoneRuler.tsx'
import { SpellPreference } from '../../components/ui/SpellPreference.tsx'
import { INTERVALS } from '../../data/intervals.ts'
import { intervalBetween } from '../../domain/music-theory/intervals.ts'
import { formatNote, spellPitch } from '../../domain/music-theory/notes.ts'
import type { AccidentalPreference, PitchClass } from '../../domain/music-theory/types.ts'
import { usePreferredPitch } from '../../hooks/usePreferredPitch.ts'
import { routeById } from '../../utils/routes.ts'
import { capitalize, semitoneLabel } from '../../utils/text.ts'

export function IntervalTool() {
  const page = routeById('intervals')
  const [origin, setOrigin] = usePreferredPitch(0)
  const [target, setTarget] = useState<PitchClass>(7)
  const [preference, setPreference] = useState<AccidentalPreference>('sharp')

  const from = spellPitch(origin, preference)
  const to = spellPitch(target, preference)
  const interval = intervalBetween(from, to)
  const fromLabel = formatNote(from)
  const toLabel = formatNote(to)

  return (
    <StudyPage title={page.label} lead={page.lead}>
      <div className="tool-layout split">
        <form className="card stack" onSubmit={(event) => event.preventDefault()}>
          <SpellPreference name="intervalos-grafia" value={preference} onChange={setPreference} />
          <NotePicker id="nota-origem" label="Nota de origem" value={origin} preference={preference} onChange={setOrigin} />
          <NotePicker id="nota-destino" label="Nota de destino" value={target} preference={preference} onChange={setTarget} />
        </form>
        <section className="card stack" aria-live="polite">
          <p className="eyebrow">Intervalo ascendente</p>
          <h2>{capitalize(interval.definition.name)}</h2>
          <p className="note-line">
            {fromLabel} — {toLabel}
          </p>
          <p>{semitoneLabel(interval.semitones)} entre as duas classes de altura.</p>
          <SemitoneRuler semitones={interval.semitones} />
          <p className="hint">
            A régua marca a subida de 0 a 12. Distância 0 é uníssono. A oitava justa repete a mesma
            classe de altura doze semitons acima e não depende de um registro separado.
          </p>
        </section>
      </div>
      <section className="card">
        <h2>Referência</h2>
        <ul className="interval-list">
          {INTERVALS.map((item) => (
            <li key={item.id} className={item.id === interval.definition.id ? 'is-current' : undefined}>
              <span>{capitalize(item.name)}</span>
              <span>{semitoneLabel(item.semitones)}</span>
            </li>
          ))}
        </ul>
      </section>
    </StudyPage>
  )
}
