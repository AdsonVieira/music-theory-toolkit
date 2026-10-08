import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { ROUTES, routeById, type RouteId } from '../../utils/routes.ts'

interface AppShellProps {
  route: RouteId
  children: ReactNode
}

export function AppShell({ route, children }: AppShellProps) {
  const current = routeById(route)

  useEffect(() => {
    document.title = route === 'home' ? 'Music Theory Toolkit' : `${current.label} · Music Theory Toolkit`
  }, [current.label, route])

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <div className="app">
        <header className="site-header">
          <a className="brand" href="#/">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="28" height="28">
                <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M18 8v12.2a3.2 3.2 0 1 1-1.6-2.8V11.2l7-1.4V8.2L18 10V8z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span>
              <strong>Music Theory Toolkit</strong>
              <small>Ferramentas de teoria musical</small>
            </span>
          </a>
          <nav aria-label="Módulos">
            <ul>
              {ROUTES.map((item) => (
                <li key={item.id}>
                  <a href={item.hash} aria-current={item.id === route ? 'page' : undefined}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main id="conteudo" tabIndex={-1}>
          {children}
        </main>
      </div>
    </>
  )
}
