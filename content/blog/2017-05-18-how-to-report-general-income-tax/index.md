---
author: "Youngbin Han"
description: ''
date: 2017-05-18
image: "./gen-income-tax2.png"
title: "종합소득세 신고하기"
tags: ["freelance", "tax", "tip", "note"]
---
보통 가끔씩 외주를 받아서 하고, 약속된 금액을 받게 되면 총 금액에서 3.3% 는 원천징수 되고, 나머지 96.7% 를 수령하게 된다.
외주로 돈을 벌면 그에 대해 소득세 3% 와 지방소득세 0.3% 를 신고하고 내야 하는데, 이를 발주자 또는 발주사가 대신 원천징수를 해서 납부해 주는 것이다.

이렇게 원천징수된 금액은 5월 한달동안 신청받는 **종합소득세 신고** 를 통해서 전체 또는 일부를 환급받을 수 있다.
종합소득세 신고를 하는 방법은 여러 가지가 있는데, 이 글에서는 [국세청 홈텍스](https://www.hometax.go.kr) 를 통해 하는 방법을 다뤄볼 것이다.

먼저 아래와 같은 것들이 필요하다.

- Windows 환경
- Internet Explorer 7 이상
- 공인인증서(권장)

문재인 정부가 들어섰고(2017.05.10 ~), 문재인 대통령의 공약이 정부 사이트 플러그인 죄다 걷어내는 거긴 한데, 지금 이 글을 쓰는 시점에서는 아직 플러그인이 걷어내지지 않았다. 그리고 사이트가 요구하는 플러그인들이 죄다 Windows 용 이다... 그리고 사이트 자체가 요구하는 브라우저가 IE... 마이크로소프트도 버린 IE... 를 아직도 요구한다. 그래서 Windows 와 IE 가 필요하다. 정부 사이트에서 요구하는 플러그인 참 ~~거지같이~~ 많고, 덕지덕지 깔려서 컴퓨터 속도가 느려질 것이 뻔하니, VM 등의 격리된 환경을 이용하는 것을 추천한다.(도대체 거지같은 플러그인 언제쯤... 문재인 대통령 정부에서 어서 걷어내 주길 기다려야지...) 공인 인증서의 경우 꼭 필요하진 않으나, 홈텍스에서 공인인증서가 아닌 다른 수단으로 인증하고 로그인 하면 볼 수 있는 정보가 제한될 수 있으니 있다면 준비하자. 없으면 말고. 괜히 준비하다 시간만 다 나가고 힘만 빠진다.

자, 준비가 다 되었다면 [국세청 홈텍스](https://www.hometax.go.kr) 에 접속하자. 반드시 Windows 에서 IE 를 통해 접속해야 한다.
홈텍스 메인 화면이 나온다면, `종합소득세 신고` 메뉴로 들어간다.
![Hometax Main](https://sukso96100.github.io/blogimgs/gen-income-tax0.png)

글을 작성하는 시점에서는 마침 종합소득세 신고 기간이라, 접속시 사진처럼 임시 페이지가 나온다. `종합소득세신고 바로가기` 를 눌러 들어가면 된다.
그리고 로그인을 한다. 본인이 선호하는 인증 방식으로 인증하고 로그인 하면 된다. 필자는 비회훤 로그인으로 하고, 공인인증서로 인증했다.
![Hometax TempMain](https://sukso96100.github.io/blogimgs/gen-income-tax1.png)

그럼 사진과 같은 종합소득세 신고 메뉴가 나타난다.
먼저 `신고도움 서비스` 메뉴를 들어가서, 어떤 항목을 신고하게 되는지 확인 해 보자. 신고해야 할 항목을 이미 사이트에서 기억하고 있고, 이를 바로 보여준다.
![GenIncomeTaxReport Main](https://sukso96100.github.io/blogimgs/gen-income-tax2.png)
![Help Page](https://sukso96100.github.io/blogimgs/gen-income-tax3.png)

확인 했으면, 이를 참고하여 본격적으로 신고를 해 보자. 다시 종합 소득세 메인으로 돌아간다.
![Help Page](https://sukso96100.github.io/blogimgs/gen-income-tax4.png)
*단일소득-단순경비율 추계신고서* 와 *일반신고서* 중, 본인에계 더 유리한 것을 선택하여 신고하면 된다.
이 글에서는 *단일소득-단순경비율 추계신고서* 를 선택하겠다. *단일소득-단순경비율 추계신고서* 에서 `정기신고 작성` 버튼을 눌러 작성을 시작하자.

![OneOfStep1](https://sukso96100.github.io/blogimgs/gen-income-tax5.png)
먼저 기본적인 정보를 입력하자. 신고할 년도를 선택한다. 보통 신고하는 날의 년도 바로 전 년도 것을 선택해서 신고한다.(예를들어, 2017년 5월 중 신고한다면 2016년으로 선택.) 그리고 주민등록번호 칸 옆에 `조회` 버튼을 눌러서, 기본적인 정보를 불러온다. 이름이나 주소 같은 정보들이 자동으로 로드되어 표시된다. 나머지 빈칸을 채우고, `저장 후 다음이동` 을 눌러서 넘어간다.

![TwoOfStep1](https://sukso96100.github.io/blogimgs/gen-income-tax6.png)
세액을 계산해 보자. 별로 할거 없고, `(13)업종 코드` 옆에 `조회` 버튼 누르면, 신고할 금액이 다 자동으로 계산되 나온다. 확인 해 보고 수정할 것 있으면 수정하고, 페이지에서 좀 스크롤 하면 다른 입력란도 보인다, 예를 들면 정치 후원금 공제 등등. 해당사항 있으면 입력하고 아니면 입력하지 않아도 된다. 그리고 가장 아래쪽에, 다음 단계로 넘어가는 버튼 바로 위에 계좌 정보를 입력하는 칸이 있다. 환급이 되는 경우 여기서 입력한 계좌로 환급 되므로 정확히 계좌정보를 기입하자. 다 입력 했으면 다음 단계로 넘어가면 된다.

![ThreeOfStep1](https://sukso96100.github.io/blogimgs/gen-income-tax7.png)
작성된 정보를 최종적으로 확인하고. 계산되어 나온 `납부할 세액` 도 확인한다. 환급이 되는 경우, 금액이 음수로 표시 된다.
문제가 없다면, `신고서 제출하기` 를 눌러 제출하자. 축하한다. ~~거지같은 플러그인으로 떡칠된~~ 홈텍스를 이용하여 성공적으로 종합소득세 신고를 마쳤다.