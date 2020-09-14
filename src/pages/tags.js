import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { navigate, graphql } from "gatsby"
import Shell from "../components/shell"
import { Heading, Text, Badge, Grid, Container } from "theme-ui"

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
      <Heading>All Tags</Heading>
      <Grid gap={3} columns={[2, 3, 4]} sx={{marginTop: 10}}>
        {group.map(tag => (
          <Container
          sx={{padding: 2}}
            onClick={() => navigate(`/tags/${kebabCase(tag.fieldValue)}/`)}
          >
            <Badge sx={{ margin: 1 }}>{tag.fieldValue}</Badge>
            <Text>{tag.totalCount} Posts</Text>
          </Container>
        ))}
      </Grid>
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
