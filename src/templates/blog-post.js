import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import Shell from "../components/shell"
import PostCover from "../components/postCover"
import Paper from "@material-ui/core/Paper"
import Chip from "@material-ui/core/Chip"
import PostCard from "../components/postCard"
import Grid from "@material-ui/core/Grid"
import kebabCase from "lodash/kebabCase"
import Disqus from 'gatsby-plugin-disqus'


class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const { previous, next } = this.props.pageContext

    return (
      <Shell location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <PostCover post={post} siteTitle={siteTitle} />
        <Paper style={{ borderRadius: 40, minHeight: "90vh", marginTop: -40 }}>
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: 1000,
              padding: 16,
              paddingTop: 32,
              paddingBottom: 64,
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            {post.frontmatter.tags.map(item => (
              <Link
                to={`/tags/${kebabCase(item)}`}
                style={{ textDecoration: "none", margin: 8 }}
              >
                <Chip label={item} />
              </Link>
            ))}
            <Disqus
                identifier={post.id}
                title={post.title}
                url={`${siteUrl}${this.props.location.pathname}`}
                />
            <Grid
              container
              spacing={24}
              style={{ marginTop: 16, paddingBottom: 64 }}
            >
              {previous && (
                <Grid item xs={12} sm={6} key={previous.fields.slug}>
                  <PostCard post={previous} />
                </Grid>
              )}
              {next && (
                <Grid item xs={12} sm={6} key={next.fields.slug}>
                  <PostCard post={next} />
                </Grid>
              )}
            </Grid>
          </div>
        </Paper>
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
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
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
