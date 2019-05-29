import React from "react"
import { Link, graphql } from "gatsby"

// import { rhythm } from "../utils/typography"
import Shell from "../components/shell"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import PostCover from "../components/postCover"
import PostCard from "../components/postCard"
import { auto } from "eol"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = Array.from(data.allMarkdownRemark.edges)
    const { prev, next, numPages, currentPage } = this.props.pageContext

    return (
      <Shell
        location={this.props.location}
        title={siteTitle}
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      >
        <PostCover
          post={posts[0].node}
          siteTitle={siteTitle}
          url={posts[0].node.fields.slug}
        />
        <Paper style={{ borderRadius: 40, minHeight: "80vh", marginTop: -50 }}>
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: 1000,
              padding: 16,
              paddingBottom: 80,
            }}
          >
            <Grid container spacing={24} style={{ paddingBottom: 64 }}>
              {posts.map(({ node }, index) => {
                if (index > 0) {
                  return (
                    <Grid item xs={12} sm={6} key={node.fields.slug}>
                      <PostCard post={node} />
                    </Grid>
                  )
                }
              })}
            </Grid>
            {prev && (
              <Link to={prev} style={{ textDecoration: "none" }}>
                <Button>Previous</Button>
              </Link>
            )}
            <b>
              {currentPage}/{numPages}
            </b>
            {next && (
              <Link to={next} style={{ textDecoration: "none" }}>
                <Button>Next</Button>
              </Link>
            )}
          </div>
        </Paper>
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
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
