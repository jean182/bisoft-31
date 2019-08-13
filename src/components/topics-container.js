import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"
import Subtopics from "./subtopics"

function TopicsContainer() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        console.log(data)
        return (
          <div className="container">
            <ol>
              {data.allMarkdownRemark.group.map(topic => (
                <li key={topic.fieldValue}>
                  <Link to={`/topics/${kebabCase(topic.fieldValue)}/`}>
                    {topic.topic}
                  </Link>
                  <ul>
                    {topic.nodes.map(post => (
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
