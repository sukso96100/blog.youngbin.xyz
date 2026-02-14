---
title: "국적이 없는 컨퍼런스 참가자를 위한 비자 초청장 작업하기"
author: "Youngbin Han"
date: 2026-02-13T22:00:00+09:00
draft: false
description: 무국적자는 그냥 사전이나 교과서 같은 것에나 나오는 용어인 줄 알았는데 아니였다... 
image: masade.jpeg
tags:
- visa
- stateless
- debian
- debconf
- conference
---

가끔씩 다른 커뮤니티 운영진 분들 만나면서 이야기 나누다 보면 꺼내는 이야기가 있다. 아쉽게도 내가 우분투 패키지 메인테이너가 되었다 같은것은 아니고, 아이러니하게도 하나는 세무랑 회계 한다고 힘들다, 또 하나는 DebConf24때 해외 참석자 분들 비자 초청장 작업을 열심히 하였는데 무국적자 참석자 분도 초대 했었다는 이야기다. 컨퍼런스에 무국적자 참석자분 비자 초청장 직접 작업 하는것이 흔한 경험은 또 아니니, 머리속에서 기억이 흐려지기 전에 글로 한번 정리 해 보았다.

## 무국적자는 존재하고, 이들도 다른나라 입국이 가능하다
무국적자, 말 그대로 어떤 국가로부터도 국민으로 인정받지 못해서 국적이 없는 사람들이다. 무국적자가 생기는 원인도 다양한데, 국적법이 국적을 부여하는 범위에 들어가지 못해서 국적이 없는 경우도 있고, 새로운 국가의 출현이나 국경의 변화로 (지정학적인 문제로) 무국적자가 발생하는 경우도 있다고 한다. 자료 조금 찾아보니 [유앤난민기구 홈페이지에 무국적자에 관한 설명이 있는데, 자세한 것은 이를 참고하면 좋을 것 같다.](https://www.unhcr.org/kr/about-unhcr/who-we-protect/stateless-people)

더 다양한 사례가 있지만, 이 글에서 다룰 사례에 해당하는 지정학적인 문제를 원인으로 하는 몇가지 사례를 소개 해 보면 아래와 같다.
- 조선적: 대한제국, 일제강점기, 광복 및 분단을 거치면서 광복 전 부터 일본에 있었고 이후에도 잔류하던 사람들 중 우리나라 혹은 북한 국적을 취득하지 않은 사람들이다.
- 에스토니아 및 라트비아 등에 거주하는 러시아계 무국적자: 소련 해체 후, 에스토니아와 라트비아가 독립 하면서 해당 지역에 거주하던 러시아계 사람들에게 국적을 자동으로 부여하지 않은 경우라고 한다.
- 이스라엘 골란 고원의 드루즈인: 골란 고원은 이스라엘과 시리아의 국경 지대면서 분쟁이 있는 지역이다. 원래 드루즈인들이 사는 곳은 시리아에서 통치하는 곳인데, 1967년의 "6일전쟁"으로 이스라엘에서 점령하고 이스라엘 국적을 부여하려고 했다고 한다. 이를 대다수는 거부하였고, 그 결과 무국적자이면서 이스라엘 영주권자가 되었다고 한다.

이 글에서 다룰 비자 서류작업을 도와드린 분은 위에 소개한 것 중 마지막인 드루즈인 분이였다. (무국적자이면서, 이스라엘 영주권자) 그러면 이런 사람들은 다른 나라에 입국할 때 어떻게 할까? 무국적자나 난민도 본인이 합법적으로 거주하고 있다면, 거주하고 곳을 관할하는 정부에서 여권은 아니지만 여권에 준하는 여행문서를 발급받을 수 있다. 바로 여행증명서(영어로는 Travel Certificate 혹은 Travel Document 등으로 부르는)이고, 생긴 것 또한 여권과 비슷하다.

이스라엘 정부에서 발급하는 Travel Document 사진이 없나 검색을 해 봤는데, [마침 이를 다룬 기사가 있다. 궁금하다면 한번 해당 기사의 사진을 확인 해 보면 좋을 것 같다.](https://newstapa.org/article/uRguV) 

## 이 사람들도 비자를 받아서 한국에 입국이 가능할까?
결론부터 말하자면, 무국적자도 유효한 여행문서가 있다면 비자를 받아서 입국이 가능하다. 보통 이스라엘 국적자면 한국에 무비자로 단기체류가 가능해서 그런지 아니면 사례가 드물어서 그런지는 모르겠지만, [대사관 홈페이지에는 무국적자 구비서류 정보가 자세히는 나와있지 않았다.](https://www.mofa.go.kr/il-ko/brd/m_11463/view.do?seq=620783&page=2) 그래서 이메일로 주이스라엘 대한민국 대사관 측에 구비서류에 대해 문의를 하여 회신을 받았다.

> Subject: Re: 이스라엘 정부 발행 여행증명서 소지 무국적자 행사 참석 목적 입국 관련 문의
> 
> 안녕하세요,
> 다음은 여행증명서 소지자를 위한 사증 발급 필수 서류 및 일반적인 안내입니다.
> 읽어보시고, 궁금한 사항 있으시면 메일 주시기 바랍니다.
> 감사합니다.
> 
> These are the required documents for Israeli provisional passport(a.k.a. Lasse Passe): All the documents needed in English
> 1. A valid passport with at least 6 months remainder validity (original and copy of bio-data page)
> 
> 2. A completed Visa application filled with the capital letters (Please see the attached file from the link: https://overseas.mofa.go.kr/il-en/brd/m_23223/view.do?seq=5&page=1) ※ Application form will not be given at the embassy
> 3. A recent passport photo (3.5 x 4.5cm, color photo with the white background)
> 4. Fee : USD 40 IN CASH ONLY
> 5. Recent 3 months history statements of Israel bank account (Credit/debit card statements will not be accepted)
> 6. Accomodation reservation (ex. Hotel booking confirmation)
> 7. If you are employed, the certificate of the employment
> 8. Round trip flight ticket reservation
> 9. Another passport original and copy if you have one.
> 10. Schedule of stay (Please see the attached file from the link: https://overseas.mofa.go.kr/il-en/brd/m_23223/view.do?seq=7&page=1)
> 11. Official certificate of your status in Israel
> 12. Israel criminal records with Apostille
> 13. If you are invited: Invitation letter, the business certificate of the company(사업자등록증 혹은 사업자등록증명원), Original gurantee letter by the invitor if you have one (Please see the attached file from the link: https://overseas.mofa.go.kr/np-ko/brd/m_1730/view.do?seq=1344334&srchFr=&srchTo=&srchWord=&srchTp=&multi_itm_seq=0&itm_seq_1=0&itm_seq_2=0&company_cd=&company_nm=&page=1)
> 
> ※ We do NOT accept any visa applications by E-mail.
> - Please be informed that it takes about 1 working week for the result.
> - If you are not a Israeli National, you have to hold residential Visa in Israel to apply for Visa through us. (Make a photocopy of your Israel visa and submit it with your application)
> - The documents validity for visa application is 3 months only. We do not accept any documents which were issued more than 3 months before the date of your visa application has been accepted.
> - We will be holding your passport during the visa process.
> - The cancellation of visa will take 1 working day.
> - We do NOT provide ANY TRACKING SERVICE(You can check your visa progress by online, please click the website https://visa.go.kr/openPage.do?MENU_ID=10301&LANG_TYPE=EN), after you submit your application. It may cause delay on your application if you try to follow up your visa process.
> - If you plan to stay in Korea more than 90 days, you have to have a specific reason with official documents to stay in Korea to obtain a proper long-term Visa.
> - Please type or print clearly when you fill out the Visa application form AND DO NOT FORGET TO SIGN AT THE BOTTOM.
> - Need at least 6 months validity on the passport to apply for a visa
> - Please email your preference time to israel@mofa.go.kr for booking your visa interview before ahead of time. 
> - As most visas are valid for 3 months from the issue date, please apply for visa no more than 2 months in advance from the planned date of entry into South Korea.
> - Opening hours: 9:30-12, Mondays - Thursdays
>  
> 
> All the best,
> 주이스라엘대한민국대사관 영사과 드림
> Consul Administration officer
> EMBASSY OF THE REPUBLIC OF KOREA

회신 받은 내용을 보고 안 것은, 그냥 해외 참석자나 무국적자인 해외 참석자나 비자 지원을 위한 초청장 등 구비서류 준비는 비슷하다는 것이였다. 심사 기준도, 이를 위해 구비하는 서류도 딱히 다르지 않다. (소득증빙을 위한 은행 거래내역이나 재직증명 등, 입국 목적 및 체류 계획 등 확인을 위한 항공편 및 숙박예약과 초청장 등) 다만 초청장과 신원보증서를 출력해다가 인감 날인하고 우편을 통해 전달해야만 하는 것은 좀 피곤하긴 했다. (다행이도 날인과 우편 발송을 당시 내가 담당 하지는 않았다)

비자 지원을 하고자 초청장을 요청하신 무국적자 분도, 회사에서 사전에 여행 승인 받으시는 것이나(여행 경비를 회사에서 지원 받으시는 듯 하였다.) 몇몇 서류 발행이 오래 걸리는 것 제외하면 구비서류 준비에 큰 어려움은 없으셨던 것 같다. 이전에도 DebConf 참석을 하셨다고 전해 들었는데, 그래서 서류 준비가 좀 익숙하신 것일수도 있고, 직장이 있으시니(누구나 알만한 글로벌 기업에서 IT 직군에 종사하신 것으로 기억) 필요한 증빙 발행도 용이하셨던 것 같기도 하다.

## 비자 승인
아무튼 한국에서는 구비서류 열심히 잘 준비하여 이스라엘로 우편 발송을 하였고, 비자 지원하시는 해당 무국적자 분도 서류 잘 준비하고 한국에서 온 서류까지 잘 받아서 비자 지원을 마쳤다. 그리고 비자가 승인되어서, 무국적자 분이 행사에 참석하실 수 있게 되었다.

아쉽게도 해당 무국적자 분은 한국 일정을 취소 하셨다. 당연하게도 단순 변심 같은 것으로 취소 하신것은 아니고, 멀지 않은 이웃에 미사일 공격이 날아와 피해가 있었고(다행이도 행사에 참석 하려던 분과 가족은 피해가 없었다고 한다), 해당 마을의 강한 공동체 의식 때문인지 여행을 떠나기 보다는 집에 있기로 하셨다고 전해 들었다. 아마도 이웃을 돕기로 마음 먹으신 모양. 처음에 듣고 나서 "이건 또 뭐지" 하는 생각이 잠깐 들었는데, 다시 생각 해 보니 그때 당시 이스라엘-하마스 전쟁이 한창이였고 초대하려는 분이 거주하시는 지역은 또 지정학적으로 사정이 복잡한 곳이기도 하니, 그럴수도 있겠거니 하며 이해 해 보려 노력했던 것 같다.

## 출처 및 참고자료
- 커버 사진: [골란 고원 Mas'ade 지역 전경. 위키피디아 출처 CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File:Mas%27ade_087a.jpg)
