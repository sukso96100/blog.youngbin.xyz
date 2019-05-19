import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"
import PostCard from '../components/postCard';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Shell from "../components/shell"
import Button from '@material-ui/core/Button';


const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  return (
    <Shell title={data.site.siteMetadata.title}>
        <div
        style={{margin: 0, width: '100%', height: '90vh', minHeight: 650, 
          background: 'black', color: 'white'}}>
        <div style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: 1000,
         padding: 16, paddingTop: 64}}>
            <h3>{data.site.siteMetadata.title}</h3><br/>
            <h1>Posts tagged with</h1>
            <Chip
                avatar={<Avatar>{totalCount}</Avatar>}
                label={tag}/><br/><br/>
            <Link to='/tags/' style={{textDecoration: 'none'}}>
              <Button style={{color: 'white'}}>All tags</Button>
            </Link>
          </div>
        </div>
          <Paper style={{borderRadius: 40, minHeight: '80vh', marginTop: -40,}}>
          <div style={{marginLeft: 'auto',marginRight: 'auto', maxWidth: 1000, padding: 16}}>
          <Grid container spacing={24} style={{paddingBottom: 64}}>
          {edges.map(({ node }, index) => {
              return(
                  <Grid item xs={12} sm={6} key={node.fields.slug}>
                    <PostCard post={node}/>
                  </Grid>
                )
              }
          )}
            </Grid>
          </div>
          </Paper>
      </Shell>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
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
    allMarkdownRemark(
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