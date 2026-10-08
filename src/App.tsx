import type { JSX } from 'react'
import { AppShell } from './components/layout/AppShell.tsx'
import { ChallengeSession } from './features/challenges/ChallengeSession.tsx'
import { ChordTool } from './features/chords/ChordTool.tsx'
import { CircleTool } from './features/circle/CircleTool.tsx'
import { HarmonicFieldTool } from './features/harmonic-field/HarmonicFieldTool.tsx'
import { Home } from './features/home/Home.tsx'
import { IntervalTool } from './features/intervals/IntervalTool.tsx'
import { ScaleTool } from './features/scales/ScaleTool.tsx'
import { useHashRoute } from './hooks/useHashRoute.ts'
import type { RouteId } from './utils/routes.ts'

const VIEWS: Record<RouteId, () => JSX.Element> = {
  home: Home,
  intervals: IntervalTool,
  chords: ChordTool,
  scales: ScaleTool,
  'harmonic-field': HarmonicFieldTool,
  fourths: () => <CircleTool cycle="fourths" />,
  fifths: () => <CircleTool cycle="fifths" />,
  challenge: ChallengeSession,
}

export default function App() {
  const route = useHashRoute()
  const View = VIEWS[route]

  return (
    <AppShell route={route}>
      <div key={route} className="view">
        <View />
      </div>
    </AppShell>
  )
}
