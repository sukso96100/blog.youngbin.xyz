import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"
// import { rhythm } from "../utils/typography"
import Shell from '../components/shell';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PostCover from '../components/postCover';
import { auto } from "eol";
import BackgroundImage from "gatsby-background-image";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = Array.from(data.allMarkdownRemark.edges)

    return (
      <Shell location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <PostCover
          post={posts[0].node} siteTitle={siteTitle} url={posts[0].node.fields.slug}/>
          <Paper style={{borderRadius: 40, minHeight: '80vh', marginTop: -40,}}>
          <div style={{marginLeft: 'auto',marginRight: 'auto', maxWidth: 1000, padding: 16}}>
          <Grid container spacing={24} style={{paddingBottom: 64}}>
          {posts.map(({ node }, index) => {
            if(index > 0){
              const title = node.frontmatter.title || node.fields.slug
              if(node.frontmatter.image){
                return (
                  <Grid item xs={12} sm={6} key={node.fields.slug}>
                  <Paper style={{borderRadius: 40}}>
                  <div style={{zIndex: 5, color: 'white', padding: 32, borderRadius: 40,
                    background: `linear-gradient(rgba(0,0,0, 0.3), rgba(0,0,0, 0.3)), 
                    url(${node.frontmatter.image.childImageSharp.fluid.src}) center / cover`}}>

                  <h2>{title}</h2>
                          <small>{node.frontmatter.date}</small>
                          <p
                              dangerouslySetInnerHTML={{
                              __html: node.frontmatter.description || node.excerpt,
                              }}
                          />
                          <Link  to={node.fields.slug}>
                          <Button>Read more</Button>
                          </Link>
                  </div>
                  </Paper>
                  
                  </Grid>
                )
              }else{
                return (
                  <Grid item xs={12} sm={6} key={node.fields.slug}>
                      <Paper style={{padding: 32, borderRadius: 40}}>
                          <h2>{title}</h2>
                          <small>{node.frontmatter.date}</small>
                          <p
                              dangerouslySetInnerHTML={{
                              __html: node.frontmatter.description || node.excerpt,
                              }}
                          />
                          <Link  to={node.fields.slug}>
                          <Button>Read more</Button>
                          </Link>
                      </Paper>
                  </Grid>
                )  
              }
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
