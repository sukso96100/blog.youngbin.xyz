import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"
import PostCard from "../components/postCard"
import Shell from "../components/shell"
import { Heading, Text, Badge, Button, Divider, Grid, Container } from "theme-ui"
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  return (
    <Shell title={data.site.siteMetadata.title}>

        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: 1200,
            padding: 16,
          }}
        >
          <Link to="/tags/" style={{ textDecoration: "none" }}>
            <Text><FontAwesomeIcon icon={faArrowLeft}/> All tags</Text>
          </Link>
          <Heading>Posts tagged with</Heading>
          <Badge sx={{ margin: 1 }}>{tag}</Badge>
            <Text>{totalCount} Posts</Text>
        </div>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: 1000,
            padding: 16,
          }}
        >
          <Grid
              gap={3}
              columns={[ 1, 2, 3 ]}>
              {edges.map(({ node }, index) => <PostCard post={node}/>)}
            </Grid>
         
        </div>
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
