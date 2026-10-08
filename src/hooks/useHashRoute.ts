import { useEffect, useState } from 'react'
import { routeFromHash, type RouteId } from '../utils/routes.ts'

export function useHashRoute(): RouteId {
  const [route, setRoute] = useState<RouteId>(() => routeFromHash(window.location.hash))

  useEffect(() => {
    const sync = () => setRoute(routeFromHash(window.location.hash))
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  return route
}
