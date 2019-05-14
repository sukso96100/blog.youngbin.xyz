import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"
// import { rhythm } from "../utils/typography"
import Shell from '../components/shell';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { auto } from "eol";

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
        <div style={{margin: 0, background: 'black', color: 'white',
         width: '100%', height: '80vh', marginTop: -50}}>
          <div style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: 1000, padding: 16}}>
            <h2>{siteTitle}</h2><br/>
            <h1>{posts[0].node.frontmatter.title || posts[0].node.fields.slug}</h1>
            <p dangerouslySetInnerHTML={{
                  __html: posts[0].node.frontmatter.description || posts[0].node.excerpt,
                }}
              />
              <Link  to={posts[0].node.fields.slug}>
              <Button variant="outlined" style={{color: 'white'}}>Read more</Button>
              </Link>
          </div>
          </div>
          <Paper style={{borderRadius: 40, minHeight: '80vh', marginTop: -40,}}>
          <div style={{marginLeft: 'auto',marginRight: 'auto', maxWidth: 1000, padding: 16}}>
{posts.map(({ node }) => {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <div key={node.fields.slug}>
      <b
        style={{
          // marginBottom: rhythm(1 / 4),
        }}
      >
        <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
          {title}
        </Link>
      </b>
      <small>{node.frontmatter.date}</small>
      <p
        dangerouslySetInnerHTML={{
          __html: node.frontmatter.description || node.excerpt,
        }}
      />
    </div>
  )
})}
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
          }
        }
      }
    }
  }
`
