import React from "react"
import Panel from "./panel"
import { Link } from "gatsby"
import { codeToLanguage } from "../utils/i18n"
import { systemFont } from "../utils/helpers"

class Grades extends React.Component {
  render() {
    let { translations, grade, gradeLink, editUrl } = this.props
    let readerGrades = translations.filter(grade => grade !== "ru")

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
          {grade !== "all" && (
            <>
              <br />
              <br />
              <Link
                style={{ color: "var(--fallBackLink)" }}
                to={gradeLink("all")}
              >
                Ver Principal
              </Link>
              {" ⋮ "}
              <a
                style={{ color: "var(--fallBackLink)" }}
                href={editUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Mejorar este tema
              </a>
              {" ⋮ "}
              <Link style={{ color: "var(--fallBackLink)" }} to={`/${grade}`}>
                Ver Todos
              </Link>{" "}
            </>
          )}
        </Panel>
      </div>
    )
  }
}

export default Grades
