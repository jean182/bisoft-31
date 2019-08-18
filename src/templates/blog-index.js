import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { formatPostDate, formatReadingTime } from "../utils/helpers"
import "bootstrap-4-grid/css/grid.min.css"
import "../styles/main.scss"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const langKey = this.props.pageContext.langKey
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout
        currentLanguage={langKey}
        location={this.props.location}
        title={siteTitle}
      >
        <div className="container">
          <SEO title="All posts" />
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
                  {formatPostDate(node.frontmatter.date, langKey)} -{" "}
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
  }
`
