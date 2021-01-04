import React from "react"
import { navigate, graphql } from "gatsby"

import Shell from "../components/shell"
import { SimpleGrid, IconButton, Center, Button, Stack, Heading } from "@chakra-ui/react"
import { Icon } from '@chakra-ui/icons'
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import PostCard from "../components/postCard"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = Array.from(data.allMdx.edges)
    const { prev, next, numPages, currentPage } = this.props.pageContext

    return (
      <Shell
        location={this.props.location}
        title={siteTitle}
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      >
        <Heading my="10" whiteSpace="pre-wrap">{data.site.siteMetadata.description}</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing="20px">
          {posts.map(({ node }, index) => (
            <PostCard post={node} />
          ))}
        </SimpleGrid>
        <Center margin="5">
          <Stack direction="row" spacing={2}>
            {prev && (
              <IconButton aria-label="Previous" icon={<Icon as={RiArrowLeftSLine} />} onClick={() => navigate(prev)} />
            )}
            <Button> {currentPage}/{numPages}</Button>
            {next && (
              <IconButton aria-label="Next" icon={<Icon as={RiArrowRightSLine} />} onClick={() => navigate(next)} />
            )}
          </Stack>
        </Center>
      </Shell>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 100)
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
