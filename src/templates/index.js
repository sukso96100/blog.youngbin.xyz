import React from "react"
import { navigate, graphql } from "gatsby"

import Shell from "../components/shell"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PostCard from "../components/postCard"
import { Grid, Text, Container } from "theme-ui"

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
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: 1200,
            padding: 16,
            paddingBottom: 80,
          }}
        >
          <Grid gap={3} columns={[1, 2, 3]}>
            {posts.map(({ node }, index) => (
              <PostCard post={node} />
            ))}
          </Grid>
          <Grid width={[3, 3, 3]} style={{marginTop: 16}}>
            {prev && (
              <Container p={4} bg="muted" onClick={() => navigate(prev)} style={{textAlign: 'left'}}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Container>
            )}
            <Container p={4} bg="muted" style={{textAlign: 'center'}}>
              <Text>
                {currentPage}/{numPages}
              </Text>
            </Container>
            {next && (
              <Container p={4} bg="muted" onClick={() => navigate(next)} style={{textAlign: 'right'}}>
                <FontAwesomeIcon icon={faArrowRight} />
              </Container>
            )}
          </Grid>
        </div>
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
