import React from "react"
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
    
    
        return(
            <div>
                <Helmet>
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                </Helmet>
                <ins class="adsbygoogle"
                    style="display:block"
                    data-ad-client={site.siteMetadata.adsense.adClient}
                    data-ad-slot={site.siteMetadata.adsense.adSlot}
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>
        )
    }
    export default Adsense