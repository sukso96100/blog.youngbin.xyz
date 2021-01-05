import React from "react"
import { navigate, graphql, StaticQuery } from "gatsby"
import SEO from "../components/seo"
import {
  IconButton, Button, Text, Flex, useColorMode, Box, SimpleGrid,
  Menu, MenuButton, MenuList, MenuItem, Container, Stack
} from "@chakra-ui/react"
import { Icon } from '@chakra-ui/icons'
import {
  RiPriceTag3Line, RiSearchLine, RiUser3Line, RiContrastLine, RiRssLine,
  RiFacebookCircleLine, RiGithubLine, RiTwitterLine, RiGlobalLine
} from "react-icons/ri";

export default function Shell(props) {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <StaticQuery
      query={socialQuery}
      render={data => {
        const social = data.site.siteMetadata.social
        return (
          <React.Fragment>
            <SEO title={props.title} keywords={props.keywords} />
            <Container maxW="7xl">
              <SimpleGrid  marginTop="10" marginBottom="5" columns={[1, 2, 2]}>
                <Box flex="1">
                  <Button variant="ghost" onClick={() => navigate("/")}>
                    {props.title}
                  </Button>
                </Box>
                <Flex>
                  <Box flex="1"></Box>
                  <Stack direction="row" spacing={2}>
                    {[
                      {
                        label: "Tags",
                        onClick: () => navigate("/tags"),
                        icon: <Icon as={RiPriceTag3Line} />,
                      },
                      {
                        label: "Subscribe to RSS",
                        onClick: () => navigate("/rss.xml"),
                        icon: <Icon as={RiRssLine} />
                      },
                      {
                        label: "Search",
                        onClick: () => navigate("/search"),
                        icon: <Icon as={RiSearchLine} />,
                      },
                      {
                        label: "Light/Dark Mode",
                        onClick: () =>
                          toggleColorMode(
                            colorMode === "default" ? "dark" : "default"
                          ),
                        icon: <Icon as={RiContrastLine} />,
                      },
                    ].map((item, index) => (
                      <IconButton aria-label={item.label} icon={item.icon} onClick={item.onClick} />
                    ))}
                    <Menu>
                      <MenuButton as={IconButton} icon={<RiUser3Line />}>
                      </MenuButton>
                      <MenuList>
                        {[
                          {
                            label: social.web.title,
                            path: social.web.url,
                            icon: <RiGlobalLine />,
                          },
                          {
                            label: "GitHub",
                            path: `https://github.com/${social.github}`,
                            icon: <RiGithubLine />,
                          },
                          {
                            label: "Facebook",
                            path: `https://fb.me/${social.faceook}`,
                            icon: <RiFacebookCircleLine />,
                          },
                          {
                            label: "Twitter",
                            path: `https://twitter.com/${social.twitter}`,
                            icon: <RiTwitterLine />,
                          },
                        ].map((item, index) => (
                          <MenuItem minH="40px" icon={item.icon} onClick={() => navigate(item.path)}>
                            <span>{item.label}</span>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </Stack>
                </Flex>
              </SimpleGrid >
              <Container maxW="7xl" mx="auto" marginBottom="10">
                {props.children}
                <Text my="5">{data.site.siteMetadata.copyright}</Text>
              </Container>
            </Container>
          </React.Fragment>
        )
      }}
    />
  )
}

const socialQuery = graphql`
  query {
    site {
      siteMetadata {
        description
        copyright
        social {
          github
          twitter
          facebook
          web {
            title
            url
          }
        }
      }
    }
  }
`
