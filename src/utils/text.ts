export function capitalize(text: string): string {
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function joinLabels(labels: readonly string[]): string {
  return labels.join(' — ')
}

export function semitoneLabel(count: number): string {
  return count === 1 ? '1 semitom' : `${count} semitons`
}
