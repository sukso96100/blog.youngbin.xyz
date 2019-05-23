import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Link, graphql } from "gatsby"
import Chip from "@material-ui/core/Chip"
import Avatar from "@material-ui/core/Avatar"
import Paper from "@material-ui/core/Paper"
import Shell from "../components/shell"

const NotFoundPage = ({
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Shell title="All Tags">
    <div
      style={{
        margin: 0,
        width: "100%",
        height: "100vh",
        minHeight: 650,
        background: "black",
        color: "white",
      }}
    >
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: 1000,
          padding: 16,
          paddingTop: 64,
        }}
      >
        <h3>{title}</h3>
        <br />
        <h1>Ooops! Nothing was found here!</h1>
        <br />
        <Link to={'/'} style={{textDecoration: 'none'}}>
          <Button>Move to blog home</Button>
        </Link>
      </div>
    </div>
  </Shell>
)

NotFoundPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
