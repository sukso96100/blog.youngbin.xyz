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
import BackgroundImage from "gatsby-background-image"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = Array.from(data.allMdx.edges)

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
        <Paper style={{ borderRadius: 40, minHeight: "80vh", marginTop: -40 }}>
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: 1000,
              padding: 16,
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
          </div>
        </Paper>
      </Shell>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
