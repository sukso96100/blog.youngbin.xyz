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
        let script = document.createElement("script");
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        script.async = true;
        document.body.appendChild(script);    
      })
        return(
            <div>
                <ins class="adsbygoogle"
                    style={{display: "block"}}
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