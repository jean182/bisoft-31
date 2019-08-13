import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, Link, graphql } from "gatsby"
import Img from "gatsby-image"
import TopicsContainer from "./topics-container"

function Sidebar() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const sources = [
          data.mobileImage.childImageSharp.fluid,
          {
            ...data.desktopImage.childImageSharp.fluid,
            media: `(min-width: 168px)`,
          },
        ]
        return (
          <div
            className="col-sm-3"
            style={{ borderRight: "1px solid #dee2e6!important" }}
          >
            <nav className="container">
              <Link className="link-unstyled" to={`/`}>
                <Img fluid={sources} />
              </Link>
              <TopicsContainer />
            </nav>
          </div>
        )
      }}
    />
  )
}

Sidebar.propTypes = {
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  langKey: PropTypes.string.isRequired,
}

export default Sidebar

export const query = graphql`
  query {
    mobileImage: file(absolutePath: { regex: "/logo-mep.png/" }) {
      childImageSharp {
        fluid(maxWidth: 200, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    desktopImage: file(absolutePath: { regex: "/logo-mep.png/" }) {
      childImageSharp {
        fluid(maxWidth: 350, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
