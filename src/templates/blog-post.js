import React from "react"
import { Link, graphql } from "gatsby"

import BackgroundImage from 'gatsby-background-image';
import SEO from "../components/seo"
import Shell from '../components/shell';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    let postCover;
    if(post.frontmatter.image){
      postCover = (
        <BackgroundImage
        style={{margin: 0, width: '100%', height: '90vh', minHeight: 650, marginTop: -50, zIndex: -1}}
        Tag='div'
        fluid={post.frontmatter.image.childImageSharp.fluid}
        backgroundColor={'#040e18'}>
        <div style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: 1000, padding: 16}}>
            <h2>{siteTitle}</h2><br/>
            <h1>{post.frontmatter.title || post.fields.slug}</h1>
            <small>{post.frontmatter.date}</small>
          </div>
        </BackgroundImage>
      )
    }else{
      postCover = (
        <div
        style={{margin: 0, width: '100%', height: '90vh', minHeight: 650, marginTop: -50, 
          background: 'black', color: 'white'}}>
        <div style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: 1000, padding: 16}}>
            <h2>{siteTitle}</h2><br/>
            <h1>{post.frontmatter.title || post.fields.slug}</h1>
            <small>{post.frontmatter.date}</small>
          </div>
        </div>
      )
    }

    return (
      <Shell location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        {postCover}
          <Paper style={{borderRadius: 40, minHeight: '90vh', marginTop: -40,}}>
          <div style={{marginLeft: 'auto',marginRight: 'auto', maxWidth: 1000, padding: 16, paddingTop: 32}}
           dangerouslySetInnerHTML={{ __html: post.html }} />
          </Paper>
    

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
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
