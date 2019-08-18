import React from "react"
import { Link, graphql } from "gatsby"
import _ from "lodash"
import get from "lodash/get"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Grades from "../components/grades"
import { rhythm, scale } from "../utils/typography"
import {
  codeToLanguage,
  createLanguageLink,
  loadFontsForCode,
} from "../utils/i18n"
import { formatPostDate, formatReadingTime } from "../utils/helpers"

const GITHUB_USERNAME = "jean182"
const GITHUB_REPO_NAME = "bisoft-31"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, "data.site.siteMetadata.title")
    let {
      previous,
      next,
      slug,
      translations,
      translatedLinks,
    } = this.props.pageContext
    const grade = post.fields.langKey || ""

    let html = post.html
    translatedLinks.forEach(link => {
      function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      }
      let translatedLink = "/" + grade + link
      html = html.replace(
        new RegExp('"' + escapeRegExp(link) + '"', "g"),
        '"' + translatedLink + '"'
      )
    })

    translations = translations.slice()
    translations.sort((a, b) => {
      return codeToLanguage(a) < codeToLanguage(b) ? -1 : 1
    })

    loadFontsForCode(grade)
    // TODO: this curried function is annoying
    const gradeLink = createLanguageLink(slug, grade)
    const enSlug = gradeLink("all")
    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/develop/src/pages/${enSlug.slice(
      1,
      enSlug.length - 1
    )}/index${grade === "all" ? "" : "." + grade}.md`

    return (
      <Layout
        currentLanguage={grade}
        location={this.props.location}
        title={siteTitle}
      >
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <div className="px-5">
          <h1 className="mt-0 article__content__title">
            {post.frontmatter.title}
          </h1>
          <p
            className="article-misc"
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
              marginTop: rhythm(-1),
            }}
          >
            {formatPostDate(post.frontmatter.date, grade)} -{" "}
            {formatReadingTime(post.fields.readingTime.minutes)}
          </p>
          {translations.length > 0 && (
            <Grades
              editUrl={editUrl}
              translations={translations}
              gradeLink={gradeLink}
              grade={grade}
              topic={_.kebabCase(_.head(post.frontmatter.topics))}
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />

          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        topics
      }
      fields {
        readingTime {
          minutes
        }
        slug
        langKey
      }
    }
  }
`
