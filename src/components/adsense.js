import React, { useEffect } from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"


function Adsense() {
    const { site } = useStaticQuery(
        graphql`
          query {
            site {
              siteMetadata {
                adsense {
                    adClient
                    adSlot
                }
              }
            }
          }
        `
      )
    
      useEffect(()=>{
        (window.adsbygoogle = window.adsbygoogle || []).push({});   
      })
        return(
            <div style={{padding: 8}}>
                <ins class="adsbygoogle"
                    style={{display: "block"}}
                    data-ad-client={site.siteMetadata.adsense.adClient}
                    data-ad-slot={site.siteMetadata.adsense.adSlot}
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
            </div>
        )
    }
    export default Adsense