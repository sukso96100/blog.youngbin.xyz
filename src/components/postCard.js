import React from "react"
import {
  Card,
  Heading,
  AspectImage,
  Text,
  Divider,
  Flex,
  jsx,
} from "theme-ui"
import { navigate } from "gatsby"


export default class PostCard extends React.Component {
  render() {
    const post = this.props.post
    const title = post.frontmatter.title || post.fields.slug
    const imageComponent = post.frontmatter.image? (
              <AspectImage
                sx={{ flex: "1 1 auto", borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                ratio={2 / 1}
                src={post.frontmatter.image.childImageSharp.fluid.src}
              />
    ):(<div></div>)
    return (
        <Card
          sx={{
            width: "100%",
            height: "100%",
            maxHeight: 500,
          }}
          onClick={()=>navigate(post.fields.slug)}
        >
          <Flex sx={{ flexDirection: "column", height: "100%",}}>
            {imageComponent}
            <Flex
              style={{ padding: 10 }}
              sx={{ flexDirection: "column", flex: "1 1 auto" }}
            >
              <Heading as="h3" style={{marginTop: 4}}>{title}</Heading>
              <Text sx={{ flex: "1 1 auto" }}>
                {post.frontmatter.description || post.excerpt}
              </Text>
              <Divider />
              <Text>{post.frontmatter.date}</Text>
            </Flex>
          </Flex>
        </Card>
    )
  }
}
