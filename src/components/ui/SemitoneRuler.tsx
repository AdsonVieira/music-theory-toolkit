interface SemitoneRulerProps {
  semitones: number
}

export function SemitoneRuler({ semitones }: SemitoneRulerProps) {
  const steps = Array.from({ length: 13 }, (_, index) => index)

  return (
    <ol className="ruler" aria-hidden="true">
      {steps.map((step) => {
        const active = step <= semitones
        const edge = step === 0 || step === semitones
        return (
          <li key={step} className={active ? 'is-active' : undefined} data-edge={edge ? 'true' : undefined}>
            <span>{step}</span>
          </li>
        )
      })}
    </ol>
  )
}
