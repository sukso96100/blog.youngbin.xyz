import React from "react"
import { navigate, graphql } from "gatsby"
import SEO from "../components/seo"
import Shell from "../components/shell"
import BuyMeACoffee from "../components/coffee"
import kebabCase from "lodash/kebabCase"
import Disqus from "gatsby-plugin-disqus"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Heading, Text, Badge, Image, Divider, Grid, Container } from "theme-ui"

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
          <Divider />
          <MDXRenderer>{post.body}</MDXRenderer>
          <div style={{ textAlign: "center" }}>
            <BuyMeACoffee username={buymeacoffee} />
          </div>

          <Disqus
            identifier={post.id}
            title={post.title}
            url={`${siteUrl}${this.props.location.pathname}`}
          />
          <Grid width={[1, 2]}>
            {previous && (
              <Container
                p={4}
                bg="muted"
                onClick={() => navigate(previous.fields.slug)}
              >
                <Text>Previous:</Text>
                <Heading>{previous.frontmatter.title}</Heading>
              </Container>
            )}
            {next && (
              <Container
                p={4}
                bg="muted"
                onClick={() => navigate(next.fields.slug)}
              >
                <Text>Next:</Text>
                <Heading>{next.frontmatter.title}</Heading>
              </Container>
            )}
          </Grid>
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
