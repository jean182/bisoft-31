export const systemFont = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
"Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
"Droid Sans", "Helvetica Neue", sans-serif`

export const isRunningInBrowser = () =>
  typeof window !== "undefined" ? true : false

export const formatPostDate = (date, grade) => {
  if (typeof Date.prototype.toLocaleDateString !== "function") {
    return date
  }

  date = new Date(date)
  const args = [
    grade,
    { day: "numeric", month: "long", year: "numeric" },
  ].filter(Boolean)
  return date.toLocaleDateString(...args)
}

export const formatReadingTime = minutes => {
  const roundMinutes = Math.ceil(minutes)
  return `${roundMinutes} min de lectura`
}

export const gameGrade = grade => {
  switch (grade) {
    case "cuarto-grado":
      return "Cuarto Grado"
    case "quinto-grado":
      return "Quinto Grado"
    case "sexto-grado":
      return "Sexto Grado"
    default:
      break
  }
}

export const gameTopic = topic => {
  switch (topic) {
    case "sociologia":
      return "Sociología"
    case "geografia":
      return "Geografía"
    case "historia":
      return "Historia"
    default:
      break
  }
}
