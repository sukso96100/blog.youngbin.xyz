import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"
import PostCard from "../components/postCard"
import Shell from "../components/shell"
import { Icon } from '@chakra-ui/icons'
import { RiArrowLeftSLine } from "react-icons/ri";
import { Text, Box, SimpleGrid, Badge, Heading, Button } from "@chakra-ui/react"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  return (
    <Shell title={data.site.siteMetadata.title}>

      <Box margin="5">
        <Link to="/tags/">
          <Button leftIcon={<Icon as={RiArrowLeftSLine} />} size="sm">
            <Text>All tags</Text>
          </Button>
        </Link>
        <Heading>Posts tagged with</Heading>
        <Badge sx={{ margin: 1 }}>{tag}</Badge>
        <Text>{totalCount} Posts</Text>
      </Box>
      <Box>
        <SimpleGrid columns={[1, 2, 3]} spacing="20px">
          {edges.map(({ node }, index) => <PostCard post={node} />)}
        </SimpleGrid>
      </Box>
    </Shell>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY. MM. DD")
            title
            description
            image {
              childImageSharp {
                fluid(quality: 90, maxWidth: 2000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
