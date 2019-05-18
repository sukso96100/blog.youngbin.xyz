import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import Shell from '../components/shell';
import PostCover from '../components/postCover';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './header.css'
class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Shell location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <PostCover
          post={post} siteTitle={siteTitle}/>
          <Paper style={{borderRadius: 40, minHeight: '90vh', marginTop: -40,}}>
          <div style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: 1000, padding: 16, 
          paddingTop: 32, paddingBottom: 64}}>
          <div  dangerouslySetInnerHTML={{ __html: post.html }} />
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
