---
title: "Open Collective 로 글로벌 행사 자금 관리 해 보기"
author: "Youngbin Han"
date: 2024-10-22T10:50:36+09:00
draft: true
description: UbuCon Asia 2024 행사 자금 관리에 Open Collective 를 활용 해 본 후기
image: slice-of-ubuntu.png
tags:
 - dotnet
 - ubuntu
 - container
 - distroless
 - chiselled
---

2021년 부터 다른 나라 다른 도시를 돌면서 열리는 아시아 지역 우분투 커뮤니티 행사인 UbuCon Asia. 올해도 역시 열렸고, 나 또한 올해도 행사 준비위원으로 글로벌 팀의 일원으로 참여 했다. 개인 적으로 이번 행사는 이전 회차에 비하면 좋은점도 있고 아쉬운 점도 있고 하지만, 개선된 점도 많이 있었던 회차였다. 개인적으로는 이전에 비해 로컬팀과의 의사소통과 협업이 상당히 많이 개선 되었고, 글로벌 팀에서 활동하는 분들도 이전에 비해 더 적극적으로 참여 해 주셔서 좋았다. 또 한가지 좋았던 점이 개선된 행사 자금 관리 방법이다.

이전 회차까지는 행사 자금 관리와 관련된 행정처리를 모두 로컬팀에 위탁 하였다. 로컬팀에서 이벤트 대행사를 끌고 오든, 지역 비영리 단체 도움을 받든 직접 운영하는 비영리 단체 등을 이용해서, 행사 후원사와 후원 계약 채결을 하고 돈을 받아 자금 조달도 하였고, 현지 업체와 거래 하면서 결제도 로컬팀을 통해 처리 하였다. 이 뿐만 아니라 여행경비 지원이 필요한 발표자나 준비위원 경비 지원도 로컬팀이 직접 처리 하였었다. 그러다 보니 물론 좋은점도 있었지만 (글로벌 팀 입장에서 자금 관리 관련하여 크게 할 일이 없음) 단점이 더 많았었다. 나열 해 보면 아래와 같이 정리가 가능할 것 같다.

- 자금 운영 불투명: 글로벌 팀 입장에서 대략 후원사를 모집해 얼마정도 조달 했는지는 추정이 가능 했지만, 실제로 어디에 지출 했는지는 알기가 어려웠다. 로컬팀이 자금 관리를 하는 경우 로컬팀은 보통 현지에서 행사 전날이나 당일 까지도 업체에 결제하고 정리하고 하느라 정신이 없고, 행사가 끝난 후에는 로컬팀 인원이 지쳐서 지출 내역을 전달 받기가 어려웠다. 때문에 다음 년도 로컬팀에서 "작년에는 어디에 얼마 지출 했어요?" 하고 물어보면, 답변이 불가능 했다. 왜냐면 이전 년도 로컬팀이 지쳐서 지출 내역 공유를 못 해주었기 때문에...
- 자금 집행 의견 충돌시 실제 자금을 관리하는 측의 의지대로 자금 집행: 말 그대로 자금 집행 관련하여 의견 충돌이 생기면, 실제로 자금을 들고 관리하는 로컬팀 측 의견대로 집행이 되는 것이다. 지난 회차에는 여행 경비 지원과 행사장 로지스틱 관련 지출 중 어느쪽에 더 지출을 해야 하는지 의견 충돌이 있었는데, 로컬팀 측은 로지스틱에 지출을 더 해서 실제로 참석할 다수의 인원에 더 좋은 경험을 제공하자는 입장이였다. 그래서 여행 경비 지출은 그만큼 축소가 되었고, 해외에서 오는 일부 연사 분들이 지원받는 여행 경비가 부족한 문제로 여행 일정을 취소하고 발표를 철회한 일이 있었다. 
- 행사 후 남은 자금 일부 이월 불가: 행사 후 남은 자금을 다음 팀을 위해 이월이 가능하다면, 다음 팀은 후원사로부터 자금 조달 이전에 이월받은 자금으로 먼저 집행이 가능해서 행사 준비가 비교적 용이하게 할 수 있게 된다. 그런데 UbuCon Asia 의 경우 매년 로컬팀이 완전히 다르고 (다른 국가, 다른 지역 사람으로 구성), 아직까지는 한 회차가 끝나고 연말이나 연초는 되어야 다음 개최지가 확정이 되다 보니 이전 로컬팀에서 다음 로컬팀으로 남은 자금 일부라도 이월이 쉽지 않았다. 이전 회차 로컬팀이 지쳐서 이월 해 주기 어려운 상황인 경우도 있고, 나라나 지역별 법이나 규제 때문에 실질적으로 송금이 어려운 경우가 있기도 하고, 다음 로컬팀이 자금 받을 준비가 안 된 경우(단체 명의 계좌로 못 받는 경우)가 있는 경우도 있을 수 있다.

그래서 이런 문제를 어떻게 개선해야 할지 고민이 많았는데, 이번 회차때 Open Collective 에서 활동하는 Open Source Collective (미국 소재 501(c)(6) 비영리 단체)로부터 Fiscal sponsorship 을 받아 UbuCon Asia 행사 자금 관리를 위탁하여 행사 준비를 비교적 수월하게 할 수 있었다. 그래서 이 글을 통해 어떻게 Open Collective 를 통해 그 중에서도 Open Source Collective 를 통해 Fiscal sponsorship 을 받을 수 있고, 이를 통해 컨퍼런스 자금 관리를 할 수 있는지 정리 해 보고자 한다. 