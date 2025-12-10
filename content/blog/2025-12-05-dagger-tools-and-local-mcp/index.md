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

## LLM이 Dagger Function을 툴로 호출 하도록 하기
직접 만든 Dagger Function을 LLM이 도구로 호출해서 쓰도록 하는 방법은 생각보다 간단하다. 하지만 생각보다 제대로 호출 되도록 하기는 좀 어렵다.

예를 들어 아래와 같이 Azure DevOps Pull Request 에 댓글을 추가하는 Dagger Function 을 만들었다고 가정하면, 
```go
type ThreadContext struct {
	FilePath 				 		string
	LineStart 					int
	LineStartCharOffset int
	LineEnd 						int
	LineEndCharOffset 	int
}
func (m *MyWorkflow) AddAzDevOpsPRComment(
	ctx context.Context,
	comment string,
	threadContext *ThreadContext
) (*MyWorkflow, error) {
	...
	return m
}
```

이를 LLM이 사용하게 하려면, LLM이 사용할 Env 객체에 이 Dagger Function 을 제공하는 모듈 (여기서는 `MyWorkflow`) 를 넘겨주거나, 현재 환경을 넣어주는 방법이 있다. 크게 2가지 방법이 있다. 하나는 `dag.CurrentModule()`을 사용해서 현재 사용중인 모듈 정보를 넣어주는 법, 또 하나는 현재 모듈이 실행중인 환경까지 모두 다 넘겨주는 방법이다.
