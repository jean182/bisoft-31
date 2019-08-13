import React from "react"
import { Link } from "gatsby"

const Subtopics = ({ frontmatter, fields }) => {
  const { title } = frontmatter
  const { slug } = fields
  return (
    <li>
      <Link to={slug}>{title}</Link>
    </li>
  )
}

export default Subtopics
