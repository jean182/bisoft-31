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
