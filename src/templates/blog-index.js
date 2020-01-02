import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import {
  formatPostDate,
  formatReadingTime,
  gameGrade,
  gameTopic,
} from "../utils/helpers"
import { systemFont } from "../utils/helpers"
import "bootstrap-4-grid/css/grid.min.css"
import "../styles/main.scss"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const langKey = this.props.pageContext.langKey
    const posts = data.allMarkdownRemark.edges
    const games = data.allJuegosJson.nodes

    return (
      <Layout
        currentLanguage={langKey}
        location={this.props.location}
        title={siteTitle}
      >
        <div className="container">
          <SEO title="All posts" />
          {langKey !== "all" ? (
            <div>
              <h1 className="article__content__title">Lista de temas.</h1>
              {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug
                return (
                  <div key={node.fields.slug}>
                    <h3
                      style={{
                        marginBottom: rhythm(1 / 4),
                      }}
                    >
                      <Link className="post__link" to={node.fields.slug}>
                        {title}
                      </Link>
                    </h3>
                    <small>
                      {formatPostDate(node.frontmatter.date, "es")} -{" "}
                      {formatReadingTime(node.fields.readingTime.minutes)}
                    </small>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="jumbotron p-5 mx-5">
              <h1 className="display-4">Bienvenido a my educational site</h1>
              <p className="lead">
                En este sitio vas a aprender todo lo necesario para ser un
                completo guru en los estudios sociales, ademas de divertirte
                mientras aprendes.
              </p>
              <p>
                Mediante lecturas, videos y juegos se van a revisar todos los
                temas requeridos acorde a tu grado.
              </p>
              <h3>Lista de Juegos</h3>
              <div className="row">
                {games.map((node, index) => {
                  let badgeColor =
                    index % 2 === 0 ? "badge-primary" : "badge-secondary"
                  return (
                    <div className="col-sm-3" key={node.id}>
                      <h3
                        style={{
                          marginBottom: rhythm(1 / 4),
                        }}
                      >
                        <Link
                          className="link-unstyled"
                          to={`/juegos/${node.topic}/${node.grade}/`}
                        >
                          {gameTopic(node.topic)}
                        </Link>
                      </h3>
                      <span
                        style={{ fontFamily: systemFont }}
                        className={`badge ${badgeColor}`}
                      >
                        {gameGrade(node.grade)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query($langKey: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            langKey
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
          fields {
            readingTime {
              minutes
            }
          }
        }
      }
    }
    allJuegosJson {
      nodes {
        id
        grade
        topic
      }
    }
  }
`
