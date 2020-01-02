import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"
import _ from "lodash"
import Subtopics from "./subtopics"

function TopicsContainer() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        return (
          <div className="container mt-3">
            <ol>
              {data.allMarkdownRemark.group.map(topic => (
                <li key={topic.fieldValue}>
                  <Link to={`/temas/${kebabCase(topic.fieldValue)}/`}>
                    {topic.topic}
                  </Link>
                  <ul>
                    {_.uniqBy(topic.nodes, "frontmatter.title").map(post => (
                      <Subtopics key={post.id} {...post} />
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        )
      }}
    />
  )
}

export default TopicsContainer

export const query = graphql`
  query {
    allMarkdownRemark {
      group(field: frontmatter___topics) {
        topic: fieldValue
        totalCount
        fieldValue
        nodes {
          id
          fields {
            slug
            langKey
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
