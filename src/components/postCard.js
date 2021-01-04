import React from "react"
import { navigate } from "gatsby"
import { Box, Badge, Image, AspectRatio, useColorModeValue } from "@chakra-ui/react"


export default function PostCard(props) {

  const bgColor = useColorModeValue("white", "gray.800")
  const bgPress = useColorModeValue("gray.50", "gray.900")
  const post = props.post
  const title = post.frontmatter.title || post.fields.slug
  const imageComponent = post.frontmatter.image ? (
    <AspectRatio ratio={5 / 3}>
      <Image src={post.frontmatter.image.childImageSharp.fluid.src} objectFit="cover" alt={post.fields.slug} />
    </AspectRatio>
  ) : (<div></div>)

  return (
    <Box maxW="sm" maxH="sm" borderRadius="lg" overflow="hidden" boxShadow="md" borderWidth="1px"
      bg={bgColor} onClick={() => navigate(post.fields.slug)} _hover={{ backgroundColor: bgPress }}>
      {imageComponent}

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            {post.frontmatter.date}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {title}
        </Box>

        <Box as="span" color="gray.600" fontSize="sm">
          {post.frontmatter.image ? (post.frontmatter.description || post.excerpt) : (post.excerpt)}
        </Box>
      </Box>
    </Box>

    // <Card
    //   sx={{
    //     width: "100%",
    //     height: "100%",
    //     maxHeight: 500,
    //   }}
    //   onClick={()=>navigate(post.fields.slug)}
    // >
    //   <Flex sx={{ flexDirection: "column", height: "100%",}}>
    //     {imageComponent}
    //     <Flex
    //       style={{ padding: 10 }}
    //       sx={{ flexDirection: "column", flex: "1 1 auto" }}
    //     >
    //       <Heading as="h3" style={{marginTop: 4}}>{title}</Heading>
    //       <Text sx={{ flex: "1 1 auto" }}>
    //         {post.frontmatter.description || post.excerpt}
    //       </Text>
    //       <Divider />
    //       <Text>{post.frontmatter.date}</Text>
    //     </Flex>
    //   </Flex>
    // </Card>
  )
}
