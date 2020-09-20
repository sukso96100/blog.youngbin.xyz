import React, { useState } from "react"
import { navigate, graphql, StaticQuery } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import {
  faGlobeAsia,
  faHome,
  faTags,
  faSearch,
  faAdjust,
} from "@fortawesome/free-solid-svg-icons"
import { Heading, Text, Grid, useColorMode } from "theme-ui"
import SEO from "../components/seo"

export default function Shell(props) {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <StaticQuery
      query={socialQuery}
      render={data => {
        const social = data.site.siteMetadata.social
        return (
          <React.Fragment>
            <SEO title={props.title} keywords={props.keywords} />
            <Grid
              gap={2}
              columns={[1, "3fr 1fr", "4fr 1fr"]}
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: 1200,
                padding: 16,
                paddingBottom: 40,
                paddingTop: 40,
              }}
            >
              <div style={{ flex: 1 }}>
                <Heading onClick={() => navigate("/")}>{props.title}</Heading>
                <Text style={{ marginTop: 8 }}>
                  {data.site.siteMetadata.description}
                </Text>
              </div>
              <div>
                {[
                  {
                    label: "Home",
                    onClick: () => navigate("/"),
                    icon: <FontAwesomeIcon icon={faHome} />,
                  },
                  {
                    label: "Tags",
                    onClick: () => navigate("/tags"),
                    icon: <FontAwesomeIcon icon={faTags} />,
                  },
                  {
                    label: "Search",
                    onClick: () => navigate("/search"),
                    icon: <FontAwesomeIcon icon={faSearch} />,
                  },
                  {
                    label: "Light/Dark Mode",
                    onClick: () =>
                      setColorMode(
                        colorMode === "default" ? "dark" : "default"
                      ),
                    icon: <FontAwesomeIcon icon={faAdjust} />,
                  },
                ].map((item, index) => (
                  <a
                    style={{
                      padding: 8,
                    }}
                    onClick={item.onClick}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </Grid>
            <div>{props.children}</div>
            <Grid
              gap={2}
              columns={[1, "3fr 1fr", "4fr 1fr"]}
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: 1200,
                padding: 16,
                paddingBottom: 40,
                paddingTop: 40,
              }}
            >
              <div style={{ flex: 1 }}>
                <Text style={{ marginTop: 8 }}>
                  {data.site.siteMetadata.copyright}
                </Text>
              </div>
              <div>
                {[
                  {
                    label: social.web.title,
                    path: social.web.url,
                    icon: <FontAwesomeIcon icon={faGlobeAsia} />,
                  },
                  {
                    label: "GitHub",
                    path: `https://github.com/${social.github}`,
                    icon: <FontAwesomeIcon icon={faGithub} />,
                  },
                  {
                    label: "Facebook",
                    path: `https://fb.me/${social.faceook}`,
                    icon: <FontAwesomeIcon icon={faFacebook} />,
                  },
                  {
                    label: "Twitter",
                    path: `https://twitter.com/${social.twitter}`,
                    icon: <FontAwesomeIcon icon={faTwitter} />,
                  },
                ].map((item, index) => (
                  <a
                    onClick={() => navigate(item.path)}
                    style={{
                      padding: 8,
                    }}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </Grid>
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
