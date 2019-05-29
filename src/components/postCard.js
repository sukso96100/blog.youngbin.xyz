import BackgroundImage from "gatsby-background-image"
import React from "react"
import { Link } from "gatsby"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"

export default class PostCard extends React.Component {
  render() {
    const post = this.props.post
    const title = post.frontmatter.title || post.fields.slug
    if (post.frontmatter.image) {
      return (
        <Paper style={{ borderRadius: 40 }}>
          <div
            style={{
              zIndex: 5,
              color: "white",
              padding: 32,
              borderRadius: 40,
              background: `linear-gradient(rgba(0,0,0, 0.3), rgba(0,0,0, 0.3)),
                    url(${
                      post.frontmatter.image.childImageSharp.fluid.src
                    }) center / cover`,
              height: 400,
            }}
          >
            <h2>{title}</h2>
            <small>{post.frontmatter.date}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: post.frontmatter.description || post.excerpt,
              }}
            />
            <Link to={post.fields.slug} style={{ textDecoration: "none" }}>
              <Button style={{ color: "white" }}>Read more</Button>
            </Link>
          </div>
        </Paper>
      )
    } else {
      return (
        <Paper style={{ padding: 32, borderRadius: 40, height: 400 }}>
          <h2>{title}</h2>
          <small>{post.frontmatter.date}</small>
          <p
            dangerouslySetInnerHTML={{
              __html: post.frontmatter.description || post.excerpt,
            }}
          />
          <Link to={post.fields.slug} style={{ textDecoration: "none" }}>
            <Button>Read more</Button>
          </Link>
        </Paper>
      )
    }
  }
}
