---
title: "Dagger 에서 LLM 사용시 추가 도구 붙이기"
author: "Youngbin Han"
date: 2025-11-19T01:00:00+09:00
draft: false
description: Dagger Function을 LLM에서 Tool로 호출 할 수 있도록 붙이고, 로컬 MCP도 Dagger에 붙이기
image: prompt-optimize.png
tags:
- dagger
- golang
- llm
- genai
---

[지난 번 글에서는, Dagger 로 LLM 호출하여 코드리뷰 파이프라인 만든 과정을 소개 하였다.](../2025-11-19-dagger-llm-azdevops-codereview/) 사용 하다보니, AI 코드리뷰를 좀 더 개선하면 좋겠다고 생각을 하였는데, 하나는 관련된 코드도 읽어서 참고 하도록 하되 필요한 것만 찾아 읽어다 빠르게 검토 하도록 하는 것이고, 또 하나는 Pull Request 에 포함된 diff 의 특정 부분에 인라인으로 코멘트를 달도록 하면 좋겠다는 생각을 했다.

Dagger 에서 LLM이 사용할 환경에, 소스코드 포함된 호스트의 디렉토리를 마운트 한 우분투 컨테이너를 주고 거기에서 읽으라고 하면 보통 LLM 루프가 돌면서 필요한 명령줄 실행하여 파일을 잘 읽긴 한다. 다만 간혹 파일 찾는것에 오래 걸리거나 불필요한 파일도 읽거나 하는 경우도 있어서, 코드 검색 프로그램을 활용하도록 수정을 하였다. [Probe](https://probelabs.com/) 라는 코드 검색 도구를 붙였는데, MCP 서버 형태로도 제공이 되어서 최근 Dagger 에 추가된 MCP 연동 기능을 활용하여 붙였다.

인라인으로 코멘트를 다는 부분은, 인라인 코멘트 달도록 Azure DevOps API를 호출하는 Dagger Function 을 만들고 이를 LLM에서 툴로 호출 하도록 구성하는 작업을 하였다.
