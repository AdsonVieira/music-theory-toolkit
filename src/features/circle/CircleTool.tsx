import { useState } from 'react'
import { StudyPage } from '../../components/layout/StudyPage.tsx'
import { circleOfFifths, circleOfFourths } from '../../domain/music-theory/circles.ts'
import { formatNote } from '../../domain/music-theory/notes.ts'
import { usePreferredPitch } from '../../hooks/usePreferredPitch.ts'
import { routeById, type RouteId } from '../../utils/routes.ts'
import { CircleDiagram } from './CircleDiagram.tsx'
import { KeySummary } from './KeySummary.tsx'

interface CircleToolProps {
  cycle: 'fifths' | 'fourths'
}

export function CircleTool({ cycle }: CircleToolProps) {
  const routeId: RouteId = cycle === 'fifths' ? 'fifths' : 'fourths'
  const page = routeById(routeId)
  const keys = cycle === 'fifths' ? circleOfFifths() : circleOfFourths()
  const [pitch, setPitch] = usePreferredPitch(0)
  const storedIndex = keys.findIndex(
    (key) => key.signature.tonic.pitchClass === pitch || key.alternate?.tonic.pitchClass === pitch,
  )
  const [index, setIndex] = useState(storedIndex >= 0 ? storedIndex : 0)
  const [useAlternate, setUseAlternate] = useState(false)
  const selected = keys[index] ?? keys[0]
  if (!selected) return null

  const signature = useAlternate && selected.alternate ? selected.alternate : selected.signature

  function select(next: number) {
    const key = keys[next]
    if (!key) return
    setIndex(next)
    setUseAlternate(false)
    setPitch(key.signature.tonic.pitchClass)
  }

  return (
    <StudyPage title={page.label} lead={page.lead}>
      <div className="tool-layout split">
        <section className="card stack">
          <CircleDiagram
            keys={keys}
            selectedIndex={index}
            label={page.label}
            centerLabel={formatNote(signature.tonic)}
            onSelect={select}
          />
          {selected.alternate ? (
            <button type="button" className="text-button" onClick={() => setUseAlternate((current) => !current)}>
              {useAlternate
                ? `Mostrar como ${formatNote(selected.signature.tonic)} maior`
                : `Mostrar como ${formatNote(selected.alternate.tonic)} maior`}
            </button>
          ) : null}
        </section>
        <KeySummary signature={signature} />
      </div>
    </StudyPage>
  )
}
