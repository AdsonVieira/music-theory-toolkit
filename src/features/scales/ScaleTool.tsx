import { useState } from 'react'
import { StudyPage } from '../../components/layout/StudyPage.tsx'
import { NotePicker } from '../../components/ui/NotePicker.tsx'
import { SelectField } from '../../components/ui/SelectField.tsx'
import { SpellPreference } from '../../components/ui/SpellPreference.tsx'
import { ToneTable } from '../../components/ui/ToneTable.tsx'
import { SCALE_FORMULAS } from '../../data/scales.ts'
import { spellPitch } from '../../domain/music-theory/notes.ts'
import { buildScale } from '../../domain/music-theory/scales.ts'
import type { AccidentalPreference, ScaleTypeId } from '../../domain/music-theory/types.ts'
import { usePreferredPitch } from '../../hooks/usePreferredPitch.ts'
import { routeById } from '../../utils/routes.ts'
import { capitalize, joinLabels } from '../../utils/text.ts'

export function ScaleTool() {
  const page = routeById('scales')
  const [root, setRoot] = usePreferredPitch(0)
  const [type, setType] = useState<ScaleTypeId>('major')
  const [preference, setPreference] = useState<AccidentalPreference>('sharp')
  const scale = buildScale(spellPitch(root, preference), type)

  return (
    <StudyPage title={page.label} lead={page.lead}>
      <div className="tool-layout split">
        <form className="card stack" onSubmit={(event) => event.preventDefault()}>
          <SpellPreference name="escalas-grafia" value={preference} onChange={setPreference} />
          <NotePicker id="fundamental-escala" label="Nota fundamental" value={root} preference={preference} onChange={setRoot} />
          <SelectField
            id="tipo-escala"
            label="Escala"
            value={type}
            options={SCALE_FORMULAS.map((formula) => ({ value: formula.id, label: capitalize(formula.name) }))}
            onChange={(value) => setType(value as ScaleTypeId)}
          />
        </form>
        <section className="card stack" aria-live="polite">
          <p className="eyebrow">Escala</p>
          <h2>{capitalize(scale.name)}</h2>
          <p className="note-line">{joinLabels(scale.tones.map((tone) => tone.label))}</p>
          <p className="degree-line">{joinLabels(scale.tones.map((tone) => tone.degree))}</p>
          <ToneTable caption={`Graus de ${scale.name}`} tones={scale.tones} />
        </section>
      </div>
    </StudyPage>
  )
}
