---
title: Gatsby 블로그에 Netlify CMS 연동하기
date: 2020-09-19T14:44:36.765Z
description: 이제 글 하나 쓰려고 클론, 커밋, 푸시 할 필요가 없다.
image: './스크린샷-2020-09-19-오후-11.37.04-2-.png'
tags:
  - notes
  - web
  - gatsbyjs
---
![]()

이번에 Gatsby 로 만든 블로그 리모델링(?) 작업을 했다. [Theme UI](https://theme-ui.com/) 기반으로 테마도 다시 만들고, 다크모드도 넣고, [JS Search](https://github.com/bvaughn/js-search) 로 검색엔진도 새로 만들어 넣었다. 때마침 블로그가 Netlify 에 호스팅을 하고 있으니, 덤으로 Netlify CMS 연동도 했다.

## 플러그인 설치 및 설정

간단하다. 그냥 관련 패키지 설치하고, `gatsby-config.js` 파일만 수정하고 커밋해서 푸시하면 된다.

먼저 `netlify-cms-app`, `gatsby-plugin-netlify-cms` 패키지를 설치한다.

```shell
yarn add netlify-cms-app gatsby-plugin-netlify-cms
```

`static` 폴더 에 `admin` 폴더를 하나 만들고, `config.yml` 파일을 생성하여 아래와 같은 내용을 넣는다. Netlify CMS 가 다룰  컨텐츠 파일 경로와 컨텐츠에 들어가는 미디어(이미지 등) 파일 경로, 그리고 컨텐츠(게시물)의 메타데이터 등을 설정한다고 보면 된다. `fields` 부분이 메타데이터 인데, 마크다운으로 작성된 게시물에서 `frontmatter` 에 해당하는 부분이다.

```yaml
backend:
  name: git-gateway
  branch: master

media_folder: static/img
public_folder: /img

collections:
  - name: 'blog'
    label: 'Blog'
    folder: 'content/blog'
    create: true
    slug: 'index'
    media_folder: ''
    public_folder: ''
    path: '{{title}}/index'
    editor:
      preview: false
    fields:
      - { label: 'Title', name: 'title', widget: 'string' }
      - { label: 'Publish Date', name: 'date', widget: 'datetime' }
      - { label: 'Description', name: 'description', widget: 'string' }
      - { label: 'Tags', name: 'tags', widget: 'list' }
      - { label: 'Body', name: 'body', widget: 'markdown' }
```
필요하다면, `slug`(게시물 주소) 에 대한 규칙과, 게시물 마다 커버 이미지도 들어간다면 해당 필드도 넣어주자.
필자의 블로그는 게시물 주소 형식이 `년-월-일-영문-문장` 형식이여서, `encoding` 을 `ascii`, `sanitize_replacement` 는 `-`로, `collections` 에 `slug` 부분을 `"{{year}}-{{month}}-{{day}}-{{slug}}"` 로 지정하였다.
그리고 `fields` 부분에 `widget` 타입이 `image`인 필드도 하나 추가 하였다.

```yaml
...
slug:
  encoding: "ascii"
  clean_accents: true
  sanitize_replacement: "-"
...
collections:
  - name: 'blog'
    ...
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      ...
      - { label: "Cover Image", name: "image", widget: "image", required: false }
``` 

그리고, gatsby-config.js 의 plugin 부분에 `gatsby-plugin-netlify-cms`를 추가한다.

```javascript
module.exports = {
  siteMetadata: {
    title: `YoungbinLab Blog`,
    ...
    },
  plugins: [
    ...
    `gatsby-plugin-netlify-cms`, // 이렇게 추가하면 된다.
    ...
    ]
 }
```

코드 만지는건 여기 까지가 끝이다. 이제 커밋하고 푸시하자. Netlify 자동 빌드 설정 되어 있다면 금방 자동 적용될 것이다.

```shell
git add .
git commit -m "Add Netlify CMS Plugin"
git push
```

## Netlify Identity Service 설정

다들 Netlify 에 GitHub 저장소 연동은 이미 했다고 치고 건너 뛰도록 하겠다. 그러면 Identity service 만 활성화 하고 설정 해 주면 된다.

* Settings -> Identity 로 들어간다.
* Enable Identity service 를 눌러 서비스를 활성화 한다.
* Registration 부분에서 Open 으로 할지, Invite Only(초대만 가능)으로 할지 설정한다.(기본 Open 이다.)
* 필요하면 External Providers 에 타사 oAuth 로그인도 추가한다.
* Services 부분으로 가서 Git Gateway 도 활성화 하자. Netlify CMS 에서 Git 저장소에 바로 접근하기 위해 사용된다.

설정 다 했으니 이제 접속해 보자. 웹사이트_주소/admin 경로로 들어가면 된가. 예를 들어 이 블로그는 blog.youngbin.xyz 이니, blog.youngbin.xyz/admin 으로 들어간다. Netlify CMS 화면이 나오고, 로그인 버튼을 누르면 사진처 로그인 화면이 나온다.

![](스크린샷-2020-09-19-오후-11.37.04-2-.png)

앞서 Identity 설정의 Registration 을 Open 으로 했다면 가입 하거나 oAuth 로그인(Google, GitHub 로그인 등) 을 하면 되고, Invite Only 인 경우 이메일 전송으로 초대를 해야 하는데, 그러려면 유료 플랜 업그레이드가 필요하다. 귀찮으니 그냥 임시로 Open 으로 바꾼 뒤 가입 한 다음, 다시 Invite Only 로 바꾸자. 로그인 하면 아래 사진처럼 포스트 목록이 보이고,

![](스크린샷-2020-09-19-오후-11.36.18-2-.png)

New Blog 를 누르면 게시물 작성 화면이 나온다.

![](스크린샷-2020-09-19-오후-11.36.37-2-.png)

작성 완료 후, Publish 를 누르면 알아서 커밋을 생성해 준다. 사진이 포함되어 있다면, 사진도 포함되어 커밋이 생성된다.

![](스크린샷-2020-09-20-오전-12.47.50.png)

이제 블로그 글 하나 쓰자고 클론, 커밋, 푸시를 할 필요가 없게 되었다. 커밋이 많으면 그만큼 저장공간 차지도 많아서 클론에 시간이 오래 걸리는데, 그런 불편함도 좀 덜었다. 근데 문제가 하나 있다. Netlify CMS 게시물 편집기가 마치 페이스북 처럼 한글 입력이 계속 씹힌다. 이런... 한국어 로케일도 아직 없는데, 나중에 시간나면 한번 PR열어서 추가 해줘야 곘다.

## 참고자료

* [Netlify CMS - Platform guides - Gatsby](https://www.netlifycms.org/docs/gatsby/)
* [Netlify CMS - Configuration Options](https://www.netlifycms.org/docs/configuration-options)