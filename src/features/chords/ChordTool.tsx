import { useState } from 'react'
import { StudyPage } from '../../components/layout/StudyPage.tsx'
import { NotePicker } from '../../components/ui/NotePicker.tsx'
import { SelectField } from '../../components/ui/SelectField.tsx'
import { SpellPreference } from '../../components/ui/SpellPreference.tsx'
import { ToneTable } from '../../components/ui/ToneTable.tsx'
import { CHORD_FORMULAS } from '../../data/chords.ts'
import { buildChord } from '../../domain/music-theory/chords.ts'
import { spellPitch } from '../../domain/music-theory/notes.ts'
import type { AccidentalPreference, ChordQualityId } from '../../domain/music-theory/types.ts'
import { usePreferredPitch } from '../../hooks/usePreferredPitch.ts'
import { routeById } from '../../utils/routes.ts'
import { capitalize, joinLabels } from '../../utils/text.ts'

export function ChordTool() {
  const page = routeById('chords')
  const [root, setRoot] = usePreferredPitch(0)
  const [quality, setQuality] = useState<ChordQualityId>('major')
  const [preference, setPreference] = useState<AccidentalPreference>('sharp')
  const chord = buildChord(spellPitch(root, preference), quality)

  return (
    <StudyPage title={page.label} lead={page.lead}>
      <div className="tool-layout split">
        <form className="card stack" onSubmit={(event) => event.preventDefault()}>
          <SpellPreference name="acordes-grafia" value={preference} onChange={setPreference} />
          <NotePicker id="fundamental-acorde" label="Nota fundamental" value={root} preference={preference} onChange={setRoot} />
          <SelectField
            id="tipo-acorde"
            label="Tipo de acorde"
            value={quality}
            options={CHORD_FORMULAS.map((formula) => ({ value: formula.id, label: capitalize(formula.name) }))}
            onChange={(value) => setQuality(value as ChordQualityId)}
          />
        </form>
        <section className="card stack" aria-live="polite">
          <p className="eyebrow">Acorde</p>
          <h2>{capitalize(chord.name)}</h2>
          <p className="symbol">{chord.symbol}</p>
          <p className="note-line">{joinLabels(chord.tones.map((tone) => tone.label))}</p>
          <p className="degree-line">{joinLabels(chord.tones.map((tone) => tone.degree))}</p>
          <ToneTable caption={`Notas de ${chord.name}`} tones={chord.tones} />
        </section>
      </div>
    </StudyPage>
  )
}
