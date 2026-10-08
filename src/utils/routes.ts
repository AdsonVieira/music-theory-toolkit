export const ROUTES = [
  {
    id: 'home',
    hash: '#/',
    label: 'Início',
    lead: 'Uma caixa de ferramentas para consultar, estudar e praticar teoria musical.',
    description: '',
  },
  {
    id: 'intervals',
    hash: '#/intervalos',
    label: 'Intervalos',
    lead: 'Escolha a nota de origem e a de destino. O cálculo sobe dentro da oitava.',
    description: 'Calcule a distância entre duas notas e veja o nome do intervalo.',
  },
  {
    id: 'chords',
    hash: '#/acordes',
    label: 'Acordes',
    lead: 'Monte tríades e tétrades a partir de uma fundamental.',
    description: 'Veja as notas, os graus e os intervalos de cada acorde.',
  },
  {
    id: 'scales',
    hash: '#/escalas',
    label: 'Escalas',
    lead: 'Compare a escala maior com as três formas da escala menor.',
    description: 'Acompanhe notas, graus, intervalos e semitons.',
  },
  {
    id: 'harmonic-field',
    hash: '#/campo-harmonico',
    label: 'Campo harmônico',
    lead: 'Os sete acordes construídos sobre a escala maior.',
    description: 'Visualize grau, qualidade e notas de uma tonalidade maior.',
  },
  {
    id: 'fourths',
    hash: '#/ciclo-das-quartas',
    label: 'Ciclo das quartas',
    lead: 'O sentido horário sobe em quartas justas.',
    description: 'Percorra as tonalidades em quartas e consulte a armadura.',
  },
  {
    id: 'fifths',
    hash: '#/ciclo-das-quintas',
    label: 'Ciclo das quintas',
    lead: 'O sentido horário sobe em quintas justas.',
    description: 'Percorra as tonalidades em quintas e veja escala e campo harmônico.',
  },
  {
    id: 'challenge',
    hash: '#/desafio',
    label: 'Desafio musical',
    lead: 'Responda perguntas sobre o que você acabou de estudar.',
    description: 'Pratique com perguntas de múltipla escolha e acompanhe a pontuação.',
  },
] as const

export type RouteId = (typeof ROUTES)[number]['id']

export function normalizeHash(hash: string): string {
  if (hash === '' || hash === '#' || hash === '#/') return '#/'
  return hash.endsWith('/') ? hash.slice(0, -1) : hash
}

export function routeFromHash(hash: string): RouteId {
  const normalized = normalizeHash(hash)
  const match = ROUTES.find((route) => route.hash === normalized)
  return match?.id ?? 'home'
}

export function routeById(id: RouteId): (typeof ROUTES)[number] {
  const match = ROUTES.find((route) => route.id === id)
  if (!match) return ROUTES[0]
  return match
}
