import type { ReactNode } from 'react'

interface StudyPageProps {
  title: string
  lead: string
  children: ReactNode
}

export function StudyPage({ title, lead, children }: StudyPageProps) {
  return (
    <article className="study">
      <header className="study-header">
        <h1>{title}</h1>
        <p>{lead}</p>
      </header>
      {children}
    </article>
  )
}
