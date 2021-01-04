import React from "react"
import { navigate, graphql } from "gatsby"

import Shell from "../components/shell"
import PostCard from "../components/postCard"
import { SimpleGrid, Input, Heading } from "@chakra-ui/react"

import * as JsSearch from 'js-search';



export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    }
  }

  componentDidMount() {
    var REGEX = /\s+/; // Split on spaces
    const tokenizer = {
      tokenize(text) {
        return text
          .split(REGEX)
          .filter(
            (text) => text // Filter empty tokens
          );
      }
    }

    let search = new JsSearch.Search(['node', 'frontmatter', 'date']);
    search.tokenizer = tokenizer;
    search.addIndex(['node', 'frontmatter', 'title']);
    search.addIndex(['node', 'frontmatter', 'description']);
    const { data } = this.props;
    const posts = Array.from(data.allMdx.edges);
    search.addDocuments(posts);
    this.search = search;
  }
  runSearch(keyword) {
    this.setState({
      searchResults: this.search.search(keyword)
    })
  }
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title

    return (
      <Shell
        location={this.props.location}
        title={siteTitle}
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      >
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: 1200,
            padding: 16,
            paddingBottom: 80,
          }}
        >
          <Heading margin="5">Search</Heading>
          <Input variant="filled" placeholder="Type keyword..." mb="5"
            onChange={event => this.runSearch(event.target.value)} />
          <SimpleGrid columns={[1, 2, 3]} spacing="20px">
            {this.state.searchResults.map(({ node }, index) => (
              <PostCard post={node} />
            ))}
          </SimpleGrid>
        </div>
      </Shell>
    )
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
