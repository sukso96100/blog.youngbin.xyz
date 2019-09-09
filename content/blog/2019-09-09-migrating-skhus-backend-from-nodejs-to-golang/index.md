---
description: ''
date: 2019-09-09
title: "작성중/draft - 3년 묶은 Node.js 기반 백엔드를 Golang 으로 옮기다."
tags: ["skhus", "nodejs", "javascript", "puppeteer", "golang", "chromedp"]
# image: './adsense.jpg'
---

2016년 8월 쯤 부터 지금까지 거의 3년 가까의 참여해 온 프로젝트가 하나 있습니다. SKHU's 모바일 앱 프로젝트 입니다. 2016년 여름에 학교(성공회대학교)의 종합정보시스템을 모바일에서도 사용하고 싶다는 열망이 모여 당시 두명의 같은 학과 선배와 개발하여 출시한 프로젝트 입니다. 프로젝트는 크게 두가지 부분으로 구성됩니다. 사용자 휴대전화에서 돌아가는 모바일 앱, 그리고 학교 종합정보시스템과 모바일 앱 사이에서 통신을 돕는 앱 백엔드 입니다.

이 백엔드는 기존에 Node.js, Express.js, Puppeteer.js, jsdom 등을 이용하여 작성되어 있었는데요. 지난 8월에 Go 기반으로 모두 다시 작성하면서 많은 부분에서 이득을 보았습니다. 이 글에서는 기존 백엔드는 어떻게 변해 왔는지 간단히 설명해 보고, 이를 Go 기반으로 전환한 과정과 실제 배포 과정 등에 대해 이야기 하고자 합니다.

## 기존 Node.js 기반의 백엔드

일반적으로 웹 서비스에서 백엔드는 프론트엔드와 통신을 해서 서버에 데이터를 저장하거나 제공을 하는 역할을 주로 하는데요, SKHU's 앱의 경우는 이미 있는 웹사이트인 [성공회대학교 종합정보시스템](https://forest.skhu.ac.kr)의 데이터를 모바일 앱에 가져와야 했습니다. 하지만 보통의 학교 웹사이트는 페이스북, 구글, 카카오 등과 같은 거대하고 대중적인 서비스에서 서드파티 앱을 통한 API 를 통해 권한이나 데이터를 제공하는 것과 달리 API 가 따로 없습니다. 그래서 데이터를 종합정보시스템에서 가져오려면 크롤링(Crawling) 혹은 웹 스크래핑(Web Scraping) 을 해서 페이지에 직접 접속하여 필요한 데이터를 긁어오는 비공식적인 방법을 통해야 합니다.

인증이 따로 필요 없고, 그냥 들어가면 정보가 표시되는 웹사이트라면 앱에서 크롤링을 간단히 구현해서 불러올 수 있습니다. 하지만 종합정보시스템은 로그인을 먼저 해야하고, 로그인을 해서 얻은 세션값이 있어야 데이터를 긁어올 수 있습니다. 그리고 강의계획서 조회 같은 기능은 과목을 검색해서 나오는 목록을 긁어오도록 구현해야 합니다. 아무래도 앱에서 처리 하기에는 복잡합니다.

그래서 Node.js 기반의 백엔드를 개발하여 종합정보시스템에서 데이터를 긁어오는 작업을 하도록 했습니다. 초반에는 Node.js 에 [Phantom.js](https://phantomjs.org/)를 사용 했습니다. Phantom.js 는 서버에 웹 브라우저를 하나 두고, 이를 정해진 인터페이스를 통해 코드로 브라우저 동작을 제어하여 사람이 폰이나 PC 에서 웹브라우저에서 하는 행위(클릭, 스크롤 등등)을 프로그램이 할 수 있도록 해 주는 일종의 웹 드라이버 입니다.

초기에는 이런 Phantom.js 를 이용하여 아래와 같은 방식으로 로그인을 구현 했습니다. 사용자로부터 받은 학번과 비밀번호를 서버가 종합정보 시스템에 Phantom.js 를 통해 대신 접속하여 로그인울 수행하는 방식입니다.

> [ph_login.js](https://github.com/s-owl/skhu-backend/blob/415b0b61ad5a0ee939d78453edd316aa6c51fd79/routes/ph_login.js)
```js
var system = require('system');
var webPage = require('webpage');
var page = webPage.create();

var logInPageUrl = "https://forest.skhu.ac.kr/Gate/UniLogin.aspx";
var mainPageUrl = "https://forest.skhu.ac.kr/Gate/UniMyMain.aspx";

var ID = system.args[1];
var PW = system.args[2];

// User Agent(웹 브라우저가 서버에 보내는 브라우저 정보)를 IE 로 설정
page.settings.userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
page.settings.javascriptEnabled = true;

// 페이지 열기
page.open(logInPageUrl, function(status) {
});

// 페이지 로딩 완료 이벤트
page.onLoadFinished = function(status) {
  if(page.url == logInPageUrl){
    logIn(); //로그인 페이지면 로그인 시도
  }else if (page.url == mainPageUrl) {
    // 메인 페이지면 로그인 완료 처리
    console.log(JSON.stringify(page.cookies));
    phantom.exit();
  }
};

function logIn(){
    // 로그인 페이지에서 학번, PW 입력
  page.evaluate(function(id, pw){
    document.querySelector("input[name='txtID']").value = id;
    document.querySelector("input[name='txtPW']").value = pw;
    document.all.ibtnLogin.click();
  }, ID, PW);
}


page.onError = function(msg, trace) {

  var msgStack = ['ERROR: ' + msg];

  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
  }

  console.error(msgStack.join('\n'));
  phantom.exit();
};
```

## Phantom.js 프로젝트의 중단과 Puppeteer 도입
앱이 런칭된지 1년 쯤 되어 2017년 4월 쯤, [Phantom.js 프로젝트의 메인테이너가 메인테이너를 그만 두겠다는 소식이 올라왔습니다.](https://groups.google.com/d/msg/phantomjs/9aI5d-LDuNE/5Z3SMZrqAQAJ)

>**Vitaly Slobodin**   	
>
>Hi,
>
>I want to make an announcement.
>
>Headless Chrome is coming - https://www.chromestatus.com/features/5678767817097216  
>(https://news.ycombinator.com/item?id=14101233)
>
>I think people will switch to it, eventually. Chrome is faster and more stable than PhantomJS. And it doesn't eat memory like crazy.
>
>I don't see any future in developing PhantomJS. Developing PhantomJS 2 and 2.5 as a single developer is a bloody hell.  
>Even with recently released 2.5 Beta version with new and shiny QtWebKit, I can't physically support all 3 platforms at once (I even bought the Mac for that!). We have no support.  
>From now, I am stepping down as maintainer. If someone wants to continue - feel free to reach me.
>
>I want to give credits to Ariya, James and Ivan! It was the pleasure to work with you. Cheers!  
>I also want to say thanks to all people who supported and tried to help us. Thank you!
>
>With regards,  
>Vitaly.

Headless Chrome 이라는 Chrome 기반의 비슷한 프로젝트가 생겼고 점차 현실화 되는 반면, Phantom.js 는 한명에서 개발을 해서 유지보수 하는것과 많은 사람들의 기대에 충족하도록 하는것이 힘들고 어렵다는 이유 였습니다. 새로운 프로젝트 메인터이너가 등장하지 않는 이상 프로젝트 업데이트가 끝난 것과도 같으니, Phantom.js 를 대체할 것을 찾아보았고, 그 결과 [Puppeteer](https://github.com/GoogleChrome/puppetee) 라는 Chrome 기반의 프로젝트를 발견하게 됩니다.

Puppeteer 의 경우 Google Chrome 팀에서 관리를 하다 보니, 상대적으로 프로젝트도 잘 유지되고 제공하는 문서도 좋은것은 물론, API 도 쓰기 좋으면서도 다양하게 잘 구성되어 있었습니다. 팀원들과 의논해서 Phantom.js 에서 Puppeteer 로 전환 하기로 했고, 2017년 12월 부터 Puppeteer 로 전환하는 작업을 시작 하였습니다. 추가적으로 오래된 라이브러리 버전 업데이트 하는 작업까지 같이 진행하였습니다.

또한 2017년 말이 되자, [학사정보시스템](https://sam.skhu.ac.kr) 이라는 기존 종합정보시스템을 점진적으로 대체하는 새로운 시스템이 등장합니다. 이에 대해 대응하는 작업도 같이 진행하여야 했습니다.

Pupeteer 로 전환하는 작업과 오래된 버전의 라이브러리를 업데이트 하는 작업은 생각보다 지지부진 했습니다. 2018년 말에서 2019년 초가 되어서야 작업이 모두 끝났기 때문입니다. 여러 이유가 있지만, 주요한 원인은 생각보다 많은 작업량 그리고 연락 안되는 팀원과 자주 바뀌는 팀원 구성이 작업을 많이 지연 시켰습니다. 초기 팀을 구성했던 선배 둘은 구직이나 대외활동으로 팀에서 빠졌고, SKHU's 프로젝트에 참여하고 싶어 들어온 새 팀원들은 다양한 이유로 연락이 끊기거나, 그렇지 않은 경우 대부분 프로그램을 잘 이해하지 못해 기능을 구현하거나 수정하는데 많은 어려움을 겪었습니다.

결국 혼자 거의 모든 작업을 다 해서 2019년 초에 업데이트를 배포 했습니다. 어떻게든 하긴 했습니다. 로그인의 경우 종합정보시스템과 학사행정시스템까지 모두 처리해야 하다 보니 이전에 비해 많이 복잡해 졌습니다.

> [login.js](https://github.com/s-owl/skhu-backend/blob/cafc9032bee8789468bb549983ecdc66799ca17f/routes/user/login.js)
```js
...
// Prepare headless chrome browser
  const browser = await puppeteer.launch({ignoreHTTPSErrors: true});
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(true);
  await page.setUserAgent(utils.userAgentIE);

  // 페이지 로드 완료 이벤트
  page.on('load', () => {
    if(page.url() == logInPageUrl){
      if(tried){
        // 로그인 페이지 두 번 나오면 로그인 실패
        res.send("LOGIN FAILED!");
      }else{
        // 2. 종합정보시스템 로그인
        (async ()=>{
          let elementHandle = await page.$('#txtID');
          await elementHandle.type(ID);
          elementHandle = await page.$('#txtPW');
          await elementHandle.type(PW);
          elementHandle.press("Enter")
        })();
      }
    }else if(page.url() == mainPageUrl){
      // 5. 종합정보시스템 로그인 완료
      (async ()=>{
        try{
          // 6.페이지 쿠키 추출
          const cookieObj = await page.cookies();
          for(let i in cookieObj){
            credentialOld += `${cookieObj[i].name}=${cookieObj[i].value}; `;
          }
          // 7. 학사행정시스템으로 이동
          await page.goto(utils.samBaseUrl);

        }catch(e){
          console.log(e);
        }
      })();
    }else if(page.url().startsWith(newLogInPageUrl)){
      (async ()=>{
        try{
            // 학사행정시스템 로그인 수행
          let elementHandle = await page.$('#login-username');
          await elementHandle.type(ID);
          elementHandle = await page.$('#login-password');
          await elementHandle.type(PW);
          elementHandle.press("Enter")
        }catch(e){
          console.log(e);
        }
      })();
    }else if(page.url().startsWith(utils.samBaseUrl)){
      //10. 학사행정시스템 로그인 완료 및 쿠키 추출
      (async ()=>{
        const cookieObj = await page.cookies();
        for(let i in cookieObj){
          credentialNew += `${cookieObj[i].name}=${cookieObj[i].value}; `;
        }
        //11.인증 토큰 추출
        console.log("sam.skhu.ac.kr - logged in");
        credentialNewToken = await page.evaluate(() => {
          return document.body.getAttribute("ncg-request-verification-token");
        });

        // 12. 클라이언트에 전송
        res.json({
          "credential-old": credentialOld,
          "credential-new": credentialNew,
          "credential-new-token": credentialNewToken
        });
      })();
    }
  });

  try{
    // 1. 로그인 실행
    await page.goto(logInPageUrl);
  } catch(e){
    console.log(e);
  }
  ```

  ## Go 로의 전환
  서론이 많이 길었는데요, 여기서부터는 최근 있었던 Go 기반 백엔드로의 전환에 대해 예기하겠습니다.