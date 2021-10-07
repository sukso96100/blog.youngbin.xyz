---
author: "Youngbin Han"
description: ''
date: 2019-08-31
title: "GastbyJS 블로그에 Google Adsense 와 Analytics 달기"
tags: ["gatsbyjs", "javascript","google","adsense","analytics"]
image: './adsense.jpg'
---

몇달 전에 블로그를 Jekyll 에서 GatsbyJS 로 옮겼는데, 대충 옮겨놓기만 하고 기존 Jekyll 블로그에 달아뒀던 
Google Adsense, Google Analytics 를 다는걸 깜빡했다. 그래서 최근에야 다시 달았다. GatsbyJS 로 만든 블로그는 아무래도 React 기반 PWA 형태 블로그라 Jekyll 하고는 조금 달라서 간단히 정리를 해보려 한다.

## Google Analytics 달기
이건 별로 어렵지 않다. GatsbyJS 용 플러그인을 쓰면 된다. `gastby-config.js` 의 `plugins` 쪽에 설정을 추가하면 된다. `trackingId` 에 Google Analytics 에서 발급한 추적 ID 를 넣으면 된다. 이렇게 넣고 빌드해서 올리면 된다.

```js
module.exports = {
  siteMetadata: {
      ...
  },
  plugins: [
    ...
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-XXXXXXXX-X`, // 이 부분에 Google Analytics 추적ID 를 넣는다.
      },
    },
  ]
}
```

## Google Adsense 달기
이건 GatsbyJS 용 플러그인이 따로 있지는 않은 것 같아, 간단히 React 컴포넌트를 만들어나 넣었다. 먼저 `gastby-config.js` 의 `siteMetadata` 부분에 `adsense` 속성을 추가한다. 이걸 컴포넌트에서 정적 쿼리로 불러와서 사용하기 위함이다. Adsense 관리 사이트에서 코드 생성기에 들어가면 나오는 코드에서, `data-ad-client`, `data-ad-slot` 부분 값을 아래와 같이 넣어준다.

```js
module.exports = {
  siteMetadata: {
    ...
    adsense: {
      adClient: "ca-pub-XXXXXXXXXXXXXXXX",
      adSlot: "XXXXXXXXXX"
    },
  },
  ...
}
```
그리고 아래와 같이 컴포넌트를 하나 만들어 준다. `src/components/` 경로에 생성하면 된다. 필자의 경우 파일명을 `adsense.js`로 했다. 여기서 앞서 `gatsby-config.js` 에서 설정한 값을 `useStaticQuery()` 를 이용해 가져온다. 참고로 아래 코드는 배너형 광고 컴포넌트다.

```js
import React, { useEffect } from "react"
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
```
하나 빠진것이 있는데, Adsense 스크립트를 불러오기 위한 구문이다. 사이트 전역으로 로드해야 제대로 작성해서, 위에서 만든 `Adsense` 컴포넌트에 넣는 대신, `html.js` 에 넣어준다. 보통은 기본 `html.js` 를 사용하고, 수정해 쓸 일이 잘 없어, 프로젝트 폴더에 없다. 수정해다 쓰려면, 빌드해서 생긴 캐시에 있는 것을 가져다 수정하면 된다.

```bash
cp .cache/default-html.js src/html.js
```

아래와 같이 `<body>` 태그 닫히기 전에 구문을 넣어주면 된다.

```js
import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        ...
      </head>
      <body {...props.bodyAttributes}>
        ...
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </body>
    </html>
  )
}
...

```

이제 `Adsense` 컴포넌트를 블로그 포스트 탬플릿의 원하는 위치에 넣어준다.
```js
import React from "react"
import { Link, graphql } from "gatsby"
...
import Adsense from "../components/adsense"

class BlogPostTemplate extends React.Component {
  render() {
      ...

    return (
        <div>
        ...
        <Adsense/>
        </div
    )
  }
  ...
}

```
그리고 빌드해서 올리면 된다. 결과는 아래 사진과 같다.

![](./adsense.jpg)

## 참고 문서
- [gatsby-plugin-google-analytics | GatsbyJS](https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/)
- [Customizing html.js | GatsbyJS](https://www.gatsbyjs.org/docs/custom-html/)
