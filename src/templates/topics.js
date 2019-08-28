import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import { formatPostDate, formatReadingTime } from "../utils/helpers"

const Topics = ({ pageContext, data }) => {
  const { topic } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const topicHeader = `${totalCount} ${
    totalCount === 1 ? "subtema" : "subtemas"
  } de "${topic}"`
  return (
    <Layout>
      <h1>{topicHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <div key={slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link className="post__link" to={slug}>
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
      </ul>
      {/*
              This links to a page that does not yet exist.
              We'll come back to it!
            */}
      <Link to="/topics">Todos los temas</Link>
    </Layout>
  )
}
Topics.propTypes = {
  pageContext: PropTypes.shape({
    topic: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}
export default Topics
export const pageQuery = graphql`
  query($topic: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { topics: { in: [$topic] } } }
    ) {
      totalCount
      edges {
        node {
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
  }
`
