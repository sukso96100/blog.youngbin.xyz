import React from "react"
import { navigate, graphql } from "gatsby"
import SEO from "../components/seo"
import Shell from "../components/shell"
import BuyMeACoffee from "../components/coffee"
import kebabCase from "lodash/kebabCase"
import Disqus from "gatsby-plugin-disqus"
import { MDXRenderer } from "gatsby-plugin-mdx"
import {
  Text, useColorModeValue, Box, Divider, Image, Badge, SimpleGrid, Heading, Center
} from "@chakra-ui/react"

function NavCard(props) {
  const bgColor = useColorModeValue("white", "gray.800")
  const bgPress = useColorModeValue("gray.50", "gray.900")
  return (
    <Box maxW="xl" maxH="md" borderRadius="lg" overflow="hidden" boxShadow="md" borderWidth="1px"
      bg={bgColor} onClick={() => navigate(props.fields.slug)} _hover={{ backgroundColor: bgPress }}>
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            <Text>{props.label}</Text>
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated>
          {props.frontmatter.title}
        </Box>
      </Box>
    </Box>
  )
}
class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const buymeacoffee = this.props.data.site.siteMetadata.social.coffee
    const { previous, next } = this.props.pageContext
    const coverImage = post.frontmatter.image ? (
      <Image
        sx={{ marginTop: 4 }}
        src={post.frontmatter.image.childImageSharp.fluid.src}
      />
    ) : (
        <div></div>
      )
    return (
      <Shell location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />

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
          <Heading as="h1">
            {post.frontmatter.title || post.fields.slug}
          </Heading>
          <Text>{post.frontmatter.description}</Text>
          <Text>{post.frontmatter.date}</Text>
          <div>
            {post.frontmatter.tags.map(item => (
              <Badge
                onClick={() => navigate(`/tags/${kebabCase(item)}`)}
                sx={{ margin: 1 }}
              >
                {item}
              </Badge>
            ))}
          </div>
          {coverImage}
          <Divider/>
          <MDXRenderer>
            {post.body}
          </MDXRenderer>
          <Divider/>
          <Center margin="5">
            <BuyMeACoffee username={buymeacoffee} />
          </Center>
          <Disqus
            config={{
              url: `${siteUrl}${this.props.location.pathname}`,
              identifier: post.id,
              title: post.title,
            }}
          />
          <SimpleGrid columns={[1, null, 2]} spacing="20px" margin="5">
            {previous && (
              <NavCard {...previous} label="Previous:" />
            )}
            {next && (
              <NavCard {...next} label="Next:" />
            )}
          </SimpleGrid>
        </div>
      </Shell>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        social {
          coffee
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "YYYY. MM. DD")
        description
        tags
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
`
