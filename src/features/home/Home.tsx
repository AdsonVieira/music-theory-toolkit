import { ROUTES } from '../../utils/routes.ts'

export function Home() {
  const modules = ROUTES.filter((route) => route.id !== 'home')

  return (
    <article className="home">
      <header className="hero">
        <p className="eyebrow">Estudo musical</p>
        <h1>Consulte, visualize e pratique teoria.</h1>
        <p>
          Intervalos, acordes, escalas, campos harmônicos e os ciclos de quartas e quintas, com um
          desafio para fixar o que você estudou.
        </p>
      </header>
      <ul className="module-grid">
        {modules.map((module, index) => (
          <li key={module.id}>
            <a className="module-card" href={module.hash}>
              <span className="module-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2>{module.label}</h2>
              <p>{module.description}</p>
              <span className="module-link">Abrir</span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}
