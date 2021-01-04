import React from "react"
import PropTypes from "prop-types"
import { Text, Badge, Heading, Button } from "@chakra-ui/react"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Link, graphql } from "gatsby"
import Shell from "../components/shell"

const NotFoundPage = ({
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Shell title={title}>
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 1200,
        padding: 16,
        paddingTop: 64,
      }}
    >
      <Heading>404: Page not found!</Heading>
      <Text>Nothing was found here!</Text>
      <br />
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Button>Move to home</Button>
      </Link>
    </div>
  </Shell>
)

NotFoundPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
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
