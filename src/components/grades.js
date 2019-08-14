import React from "react"
import Panel from "./panel"
import _ from "lodash"
import { Link } from "gatsby"
import { codeToLanguage } from "../utils/i18n"
import { systemFont } from "../utils/helpers"

class Grades extends React.Component {
  render() {
    let { translations, grade, gradeLink, editUrl, topic } = this.props
    let readerGrades = translations.filter(grade => grade !== "all")
    let gradeURL = grade === "all" ? "/" : `/${grade}`
    return (
      <div className="translations">
        <Panel style={{ fontFamily: systemFont }}>
          {translations.length > 0 && (
            <span>
              <span>Disponible para: </span>
              {readerGrades.map((l, i) => (
                <React.Fragment key={l}>
                  {l === grade ? (
                    <b>{codeToLanguage(l)}</b>
                  ) : (
                    <Link
                      style={{ color: "var(--fallBackLink)" }}
                      to={gradeLink(l)}
                    >
                      {codeToLanguage(l)}
                    </Link>
                  )}
                  {i === readerGrades.length - 1 ? "" : " ⋮ "}
                </React.Fragment>
              ))}
            </span>
          )}
          {
            <>
              <br />
              <br />
              {grade !== "all" && _.includes(translations, "all") && (
                <>
                  <Link
                    style={{ color: "var(--fallBackLink)" }}
                    to={gradeLink("all")}
                  >
                    Ver Principal
                  </Link>
                  <span> ⋮ </span>
                </>
              )}
              <a
                style={{ color: "var(--fallBackLink)" }}
                href={editUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Mejorar este tema
              </a>
              {" ⋮ "}
              <Link style={{ color: "var(--fallBackLink)" }} to={gradeURL}>
                Ver todos por grado
              </Link>{" "}
              {" ⋮ "}
              <Link
                style={{ color: "var(--fallBackLink)" }}
                to={`/temas/${topic}`}
              >
                Ver todos por tema
              </Link>{" "}
            </>
          }
        </Panel>
      </div>
    )
  }
}

export default Grades
