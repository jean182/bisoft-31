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

export const formatReadingTime = (minutes, grade) => {
  const roundMinutes = Math.ceil(minutes)
  switch (grade) {
    case "es":
      return `${roundMinutes} min de lectura`
    case "fr":
      return `${roundMinutes} min de lecture`
    case "it":
      return `${roundMinutes} min di lettura`
    case "pt-br":
      return `${roundMinutes} min de leitura`
    default:
      return `${roundMinutes} min read`
  }
}
