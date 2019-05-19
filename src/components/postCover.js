import BackgroundImage from 'gatsby-background-image';
import React from "react"
import { Link } from "gatsby"
import Button from '@material-ui/core/Button';

export default class PostCover extends React.Component{
    render(){
    const post = this.props.post;
    let postCover, readBtn;
    if(typeof this.props.url != 'undefined'){
        readBtn = (
            <div>
                <p dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.excerpt,
                }}
                />
                <Link to={this.props.url} style={{textDecoration: 'none'}}>
                    <Button variant="outlined" style={{color: 'white'}}>Read more</Button>
                </Link>
            </div>
        )
    }else{
        readBtn = (<div></div>)
    }
    if(post.frontmatter.image){
      postCover = (
        <div>
        <BackgroundImage
        className='headerSection'
        style={{margin: 0, width: '100%', height: '90vh', minHeight: 650,
          zIndex: -1, filter: 'brightness(0.7)'}}
        Tag='div' fluid={post.frontmatter.image.childImageSharp.fluid}
        backgroundColor={'#040e18'}>
        </BackgroundImage>
        <div style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: 1000, height: '90vh',
         minHeight: 650, padding: 16, paddingTop: 64, color: 'white', marginTop: '-90vh'}}>
           <h3>{this.props.siteTitle}</h3><br/>
           <h1>{post.frontmatter.title || post.fields.slug}</h1>
           <small>{post.frontmatter.date}</small>
           {readBtn}
         </div>  
         </div>
      )
    }else{
      postCover = (
        <div
        style={{margin: 0, width: '100%', height: '90vh', minHeight: 650, 
          background: 'black', color: 'white'}}>
        <div style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: 1000,
         padding: 16, paddingTop: 64}}>
            <h3>{this.props.siteTitle}</h3><br/>
            <h1>{post.frontmatter.title || post.fields.slug}</h1>
            <small>{post.frontmatter.date}</small>
            {readBtn}
          </div>
        </div>
      )
    }
    return postCover;
    }
}