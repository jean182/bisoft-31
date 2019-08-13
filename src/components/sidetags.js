import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"

function SideTags() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        console.log(data)
        return (
          <div>
            <ul>
              {data.allMarkdownRemark.group.map(tag => (
                <Link
                  key={tag.fieldValue}
                  to={`/tags/${kebabCase(tag.fieldValue)}/`}
                >
                  <li>{tag.tag}</li>
                </Link>
              ))}
            </ul>
          </div>
        )
      }}
    />
  )
}

export default SideTags

export const query = graphql`
  query {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
        fieldValue
        nodes {
          id
          frontmatter {
            title
          }
        }
      }
    }
  }
`
