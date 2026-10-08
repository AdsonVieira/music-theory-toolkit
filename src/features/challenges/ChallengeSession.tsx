import { useState } from 'react'
import { StudyPage } from '../../components/layout/StudyPage.tsx'
import { nextChallenge, type Challenge } from '../../domain/music-theory/challenges.ts'
import { routeById } from '../../utils/routes.ts'
import { readBestScore, writeBestScore } from '../../utils/storage.ts'

function drawChallenge(): Challenge {
  return nextChallenge(Math.random)
}

export function ChallengeSession() {
  const page = routeById('challenge')
  const [challenge, setChallenge] = useState(drawChallenge)
  const [selected, setSelected] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [best, setBest] = useState(readBestScore)

  function answer(index: number) {
    if (selected !== null) return
    const isCorrect = index === challenge.correctIndex
    const nextCorrect = correctCount + (isCorrect ? 1 : 0)
    setSelected(index)
    setAnswered((current) => current + 1)
    setCorrectCount(nextCorrect)
    if (nextCorrect > best) {
      setBest(nextCorrect)
      writeBestScore(nextCorrect)
    }
  }

  function next() {
    setChallenge(drawChallenge())
    setSelected(null)
  }

  const revealed = selected !== null
  const isCorrect = selected === challenge.correctIndex

  return (
    <StudyPage title={page.label} lead={page.lead}>
      <section className="score-bar" aria-label="Pontuação">
        <p>
          Sessão: <strong>{correctCount}</strong> de {answered}
        </p>
        <p>
          Recorde: <strong>{best}</strong>
        </p>
      </section>
      <section className="card stack">
        <h2 id="pergunta">{challenge.prompt}</h2>
        <div className="choices" role="group" aria-labelledby="pergunta">
          {challenge.choices.map((choice, index) => {
            const correctChoice = index === challenge.correctIndex
            const chosen = index === selected
            const className = [
              'choice',
              revealed && correctChoice ? 'is-correct' : '',
              revealed && chosen && !correctChoice ? 'is-wrong' : '',
            ]
              .filter(Boolean)
              .join(' ')
            return (
              <button key={choice} type="button" className={className} disabled={revealed} onClick={() => answer(index)}>
                {choice}
              </button>
            )
          })}
        </div>
        {revealed ? (
          <p className={isCorrect ? 'feedback is-correct' : 'feedback is-wrong'} role="status">
            {isCorrect ? 'Correto.' : 'Incorreto.'} A resposta correta é {challenge.answer}. {challenge.explanation}
          </p>
        ) : null}
        {revealed ? (
          <button type="button" className="primary" onClick={next}>
            Próxima pergunta
          </button>
        ) : null}
      </section>
    </StudyPage>
  )
}
