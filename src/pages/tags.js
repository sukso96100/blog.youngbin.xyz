import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { navigate, graphql } from "gatsby"
import Shell from "../components/shell"
import {Text, Button, SimpleGrid, Badge, Heading} from "@chakra-ui/react"


const TagsPage = ({
  data: {
    allMdx: { group },
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
        paddingTop: 32,
        paddingBottom: 64,
      }}
    >
      <Heading margin="5">All Tags</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing="20px">
      {group.map(tag => (
          <Button
            onClick={() => navigate(`/tags/${kebabCase(tag.fieldValue)}/`)}
          >
            <Badge sx={{ margin: 1 }}>{tag.fieldValue}</Badge>
            <Text>{tag.totalCount} Posts</Text>
          </Button>
        ))}
      </SimpleGrid>
    </div>
  </Shell>
)

TagsPage.propTypes = {
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

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
