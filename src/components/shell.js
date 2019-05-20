import React, { useState } from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"

import SearchIcon from "@material-ui/icons/Search"
import MoreIcon from "@material-ui/icons/MoreVert"
import MenuIcon from "@material-ui/icons/Menu"
import HomeIcon from "@material-ui/icons/Home"
import LabelIcon from "@material-ui/icons/Label"
import ArchiveIcon from "@material-ui/icons/Archive"
import WebIcon from "@material-ui/icons/Language"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import SEO from "../components/seo"

export default function Shell(props) {
  const [drawer, setDrawer] = useState(false)
  const toggleDrawer = event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setDrawer(!drawer)
  }

  return (
    <StaticQuery
      query={socialQuery}
      render={data => {
        const social = data.site.siteMetadata.social
        return (
          <React.Fragment>
            <SEO title={props.title} keywords={props.keywords} />
            <div>{props.children}</div>

            <AppBar
              position="fixed"
              color="primary"
              style={{
                margin: 0,
                top: "auto",
                bottom: 0,
                background: "white",
                color: "black",
              }}
            >
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={() => setDrawer(!drawer)}
                  onClose={() => setDrawer(false)}
                >
                  <MenuIcon />
                </IconButton>
                <IconButton color="inherit">
                  <SearchIcon />
                </IconButton>
                <IconButton edge="end" color="inherit">
                  <MoreIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer
              anchor="left"
              open={drawer}
              onClick={e => toggleDrawer(e)}
              onKeyDown={e => toggleDrawer(e)}
            >
              <div style={{ width: 250 }} role="presentation">
                <List>
                  {[
                    { label: "Home", path: "/", icon: <HomeIcon /> },
                    { label: "Tags", path: "/tags", icon: <LabelIcon /> },
                    { label: "Archive", path: "/", icon: <ArchiveIcon /> },
                  ].map((item, index) => (
                    <Link
                      to={item.path}
                      onClick={e => toggleDrawer(e)}
                      style={{ textDecoration: "none" }}
                    >
                      <ListItem button key={item.label}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider />
                <List>
                  {[
                    {
                      label: social.web.title,
                      path: social.web.url,
                      icon: <WebIcon />,
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
                      href={item.path}
                      onClick={e => this.toggleDrawer(e)}
                      style={{ textDecoration: "none" }}
                    >
                      <ListItem button key={item.label}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    </a>
                  ))}
                </List>
              </div>
            </Drawer>
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
