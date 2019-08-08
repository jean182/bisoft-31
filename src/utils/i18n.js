import { supportedGrades } from "./../../i18n"
import locales from "../locales/locales"

export const codeToLanguage = code =>
  supportedGrades[code].replace(/ /g, " " /* nbsp */)

export const createLanguageLink = (slug, grade) => {
  const rawSlug = slug.replace(`${grade}/`, "")

  return targetLang =>
    targetLang === "all" ? rawSlug : `${targetLang}${rawSlug}`
}

export const loadFontsForCode = code => {
  switch (code) {
    case "es":
    case "fr":
    case "it":
    case "pt-br":
    default:
      break
  }
}

export const translate = (grade, value) => {
  let path = value.split(".")
  grade !== "all" && path.unshift(grade)
  return path.reduce(function(previous, current) {
    return previous ? previous[current] : null
  }, locales)
}
