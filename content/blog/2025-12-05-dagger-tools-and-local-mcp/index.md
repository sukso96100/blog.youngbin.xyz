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

이를 LLM이 사용하게 하려면 여러 방법이 있는데, 모두 기본적으로 Env 객체에 함수나 모둘을 설치 해 주는 방식이다.

첫번째는 `WithCurrentModule`을 사용해서, 현재 사용중인 모듈을 Env에 설치하는 것이다. 그러면 모듈 안의 함수를 LLM이 툴 호출에 사용할 수 있게 된다.
```go
func (m *MyWorkflow) MyDaggerFunction(diff string, prTitle string, prDesc string) string {
	environment := dag.Env().
		WithCurrentModule().
		...

	work := dag.LLM().
  	WithEnv(environment).
		WithPrompt(`
			LLM 에 전달 할 프롬프트
			`)

}
```

두번째는 `CurrentEnv` 를 사용해서, 워크플로우 실행 환경을 그대로 사용하는 것이다. 물론 여기에는 별도로 작성한 Dagger Function 도 포함된다.
```go
func (m *MyWorkflow) MyDaggerFunction(diff string, prTitle string, prDesc string) string {
	environment := dag.CurrentEnv().
		...

	work := dag.LLM().
  	WithEnv(environment).
		WithPrompt(`
			LLM 에 전달 할 프롬프트
			`)

}
```

LLM 에서 툴 호출 시 정확한 방법으로 호출할 수 있도록, 호출 방법을 잘 전달하는 것도 중요하다. 호출 방법 전달은 간단하다. 그냥 주석을 함수 이름과 매개변수 등에 적절히 넣어주면 된다. 이렇게 주석을 달면 Dagger 에서는 이를 [Inline Documentation](https://docs.dagger.io/extending/documentation/)으로 보고 처리하여, LLM에도 정보를 같이 전달하게 된다.
```go
type ThreadContext struct {
	// Path to the file to add inline comment 
	FilePath 				 		string
	// Start Line number on the file to add inline comment
	LineStart 					int
	// Char offset within the Start Line on the file to add inline comment
	LineStartCharOffset int
	// End Line number on the file to add inline comment
	LineEnd 						int
	// Char offset within the End Line on the file to add inline comment
	LineEndCharOffset 	int
}
// AddAzDevOpsPRComment is used to add comment on pull request.
// Use this tool to add your own comment on specific azure devops pull request.
func (m *MyWorkflow) AddAzDevOpsPRComment(
	ctx context.Context,
	// Comment text of your pull request comment.
	comment string,
	// Reference to line of a specific file you want to add inline comment.
	threadContext *ThreadContext
) (*MyWorkflow, error) {
	...
	return m
}
```
