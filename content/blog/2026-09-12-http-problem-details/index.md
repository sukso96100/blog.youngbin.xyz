---
title: "HTTP Problem Details"
author: "Youngbin Han"
date: 2026-09-13T16:00:00+09:00
draft: true
description: HTTP API 에서 오류 응답을 제공하는 표준에 대해 알아보기
# image: masade.jpeg
tags:
- http 
- api 
- error
---

오래간만의 회사 일 이야기. 계속해서 개발에 참여 중인 빌링 포털 서비스의 백엔드에 요 근래에 오류 응답 구조에 대한 표준을 도입 하기로 하였다. 새로 팀에 합류 하신 동료 분께서 먼저 프로젝트에서 사용할 오류 응답 표준을 정의하여 제안 해 주셨는데, 여기에 다른 프로젝트 에서도 활용 하였던 HTTP Problem Details 형식으로 응답하면 어떤지 의견을 드렸다. 아무튼 해당 프로젝트에서 새로 도입된 오류 응답 표준은 HTTP Problem Details 형식을 바탕으로 조금 확정하여 사용하기로 하였고, 관련하여 사용할 클래스 등도 정의가 되었다. 

그런데 그것은 동료 분께서 주로 기여를 해 주신 것이기도 하여(?) 이 글에서는 프로젝트에서 어떻게 구현 하였나 보다는, HTTP Problem Details 표준 자체에 대해서 알아보고, 일반적으로 어떻게 구현 하는지 등을 이참에 정리 해 보고자 한다.

## RFC 9457: Problem Details for HTTP APIs

일반적으로 서버에서는 요청을 처리 하다가 오류가 있으면, 이에 해당하는 HTTP Status Code (보통 4xx 또는 5xx)와 함께 오류 메시지를 클라이언트에 반환한다. 예를 들면 아래와 같다.

```
HTTP/1.1 400 Bad Request
Date: Sun, 13 Sep 2026 17:16:00 GMT
Server: nginx/1.18.0
Content-Type: text/plain; charset=UTF-8
Content-Length: 43
Connection: close

올바른 이메일 형식이 아닙니다.
```

요즘 HTTP API 에서는 JSON 형식으로 응답을 많이 제공하니 아래와 같은 예시도 있을 수 있다. 

```
HTTP/1.1 400 Bad Request
Date: Sun, 13 Sep 2026 17:16:00 GMT
Server: nginx/1.18.0
Content-Type: text/plain; charset=UTF-8
Content-Length: 64
Connection: close

{
    "message": "올바른 이메일 형식이 아닙니다."
}
```

이렇게 하고, 메시지를 바로 사용자에게 보여주는 것으로 충분 하다면 좋겠지만, 항상 그렇지는 않다. 같은 HTTP Status Code 에 대해서도 여러 종류의 오류가 있을 수 있고, 오류 유형에 따라서 다음 동작 분기를 해야 하는 경우도 자주 있을 수 있다. 때문에 HTTP Status Code 와 메시지 텍스트 만으로는 부족할 수 있다. Problem Details 는 RFC 9457로 표준이 정의되어 있는데, [이 문서의 서론에도 처음부터 아래와 같은 배경이 설명되어 있다.](https://www.rfc-editor.org/info/rfc9457/#name-introduction)

> 1. Introduction  
> HTTP status codes (Section 15 of [HTTP]) cannot always convey enough information about errors to be helpful. While humans using web browsers can often understand an HTML [HTML5] response content, non-human consumers of HTTP APIs have difficulty doing so.  
> To address that shortcoming, this specification defines simple JSON [JSON] and XML [XML] document formats to describe the specifics of a problem encountered -- "problem details".

> 1. 서론  
> HTTP 상태 코드 ([HTTP]의 섹션 15)는 항상 유용하기에 충분한 정보를 전달 할 수는 없다. 사람은 웹 브라우저를 사용하며 보통 HTML [HTML5] 응답 내용을 이해할 수 있지만, HTTP API의 사람이 아닌 소비자는 이를 이해하기 어려울 수 있다.  
> 이러한 단점을 보완하기 위해, 본 명세서는 발생한 문제의 구체적인 내용, 즉 '문제 세부 정보(problem details)'를 기술하기 위한 간단한 JSON [JSON] 및 XML [XML] 문서 형식을 정의한다.

그래서 이것이 무엇인지는 [초록에 간단히 나와있다.
](https://www.rfc-editor.org/info/rfc9457/#abstract)

> Abstract  
> This document defines a "problem detail" to carry machine-readable details of errors in HTTP response content to avoid the need to define new error response formats for HTTP APIs.

> 초록  
> 이 문서는 HTTP API를 위한 새로운 오류 응답 형식을 정의할 필요가 없도록, HTTP 응답 콘텐츠 내 오류에 관한 기계 판독 가능한 세부 정보를 전달하는 '문제 세부 정보(problem detail)'를 정의한다.

## 어떻게 생겼는가

흔히 보던 JSON 형식으로 응답 내용이 구성되어 있고 아래와 같은 형태이다. 아래 예시는 해당 RFC 문서에서 발췌 하였다.

예를 들어 아래와 같이 상점에서 물건을 주문하는 API 를 호출 하였는데,
```
POST /purchase HTTP/1.1
Host: store.example.com
Content-Type: application/json
Accept: application/json, application/problem+json

{
  "item": 123456,
  "quantity": 2
}
```

크레딧이 부족하여 주문 오류가 발생 하였다고 가정하자, 그러면 `Content-Type: application/problem+json` 으로 식별할 수 있는, Problem Details 형식으로 아래와 같이 오류 정보를 제공할 수 있다.
```
HTTP/1.1 403 Forbidden
Content-Type: application/problem+json
Content-Language: en

{
 "type": "https://example.com/probs/out-of-credit",
 "title": "You do not have enough credit.",
 "detail": "Your current balance is 30, but that costs 50.",
 "instance": "/account/12345/msgs/abc",
 "balance": 30,
 "accounts": ["/account/12345",
              "/account/67890"]
}
```

설계나 구현에 따라서, 같은 문제 유형에 대해서 여러 오류 인스턴스를 제공하는 것도 가능하다.
```
POST /details HTTP/1.1
Host: account.example.com
Accept: application/json

{
  "age": 42.3,
  "profile": {
    "color": "yellow"
  }
}
```
```
HTTP/1.1 422 Unprocessable Content
Content-Type: application/problem+json
Content-Language: en

{
 "type": "https://example.net/validation-error",
 "title": "Your request is not valid.",
 "errors": [
             {
               "detail": "must be a positive integer",
               "pointer": "#/age"
             },
             {
               "detail": "must be 'green', 'red' or 'blue'",
               "pointer": "#/profile/color"
             }
          ]
}
```

혹시나 HTTP API 에서 응답을 XML 형식으로 제공한다면, 아래 예시처럼 Problem Details 또한 XML 형식으로 제공할 수 있다.
```
HTTP/1.1 403 Forbidden
Content-Type: application/problem+xml
Content-Language: en

<?xml version="1.0" encoding="UTF-8"?>
<problem xmlns="urn:ietf:rfc:7807">
  <type>https://example.com/probs/out-of-credit</type>
  <title>You do not have enough credit.</title>
  <detail>Your current balance is 30, but that costs 50.</detail>
  <instance>https://example.net/account/12345/msgs/abc</instance>
  <balance>30</balance>
  <accounts>
    <i>https://example.net/account/12345</i>
    <i>https://example.net/account/67890</i>
  </accounts>
</problem>
```

이러한 Problem Details 형식 응답을 보면, 몇가지 공통적인 필드도 있고 그렇지 않은 필드도 있다. RFC 문서를 참고해서 정리 해 보면 아래와 같다.

- `type`: 클라이언트에서 문제 유형을 식별 할 때 사용해야 하는 값 이다. 일반적으로 URI 형태이고, `http://` `https://` 로 시작하는 주소 형태이면, 실제로 접속 가능한 주소여야 한다는 요건이 있다. `type` 에 들어가는 URI 는 상대경로 형태일 수도 있고 (예: `/errors/validation-error`), 실제로 접속은 불가한 임의의 URI 로 할 수도 있다. (예: `tag:example@example.org,2021-09-17:OutOfLuck`)
- `status`: HTTP 상태 코드이다. 편의성 목적으로 제공되는 것 인데, 서버에서는 응답에 포함한 HTTP Status Code 값과 당연하게도 동일한 것으로 제공해야 한다.
- `title`: 사람이 읽을 수 있는 오류에 대한 간단할 설명 텍스트이다.
- `detail`: 오류에 대한 세부적인 설명 등을 포함한 사람이 읽을 수 있는 텍스트이다. 클라이언트에서는 여기에 들어간 값을 파싱해서 사용하면 안 되고, 그대로 보여주는 용도로 사용해야 한다.
- `instance`: 오류가 발생한 요청의 URI 를 나타내는 값이다. 일반적으로 클라이언트가 호출한 서버의 URI 를 보여주는 경우가 많다.

위 필드 이외에 추가적으로 확장 필드를 정의하여 사용 하기도 한다.

- 위에 예시처럼 `errors` 필드에 오류 상세 정보를 포함 시키키고 하고
- `type` 필드와 별도로, `code` 필드를 추가하여 간단한 오류 코드 값을 제공하여, 클라이언트에서 분기 로직 처리에 유용하게 활용할 수 있도록 하기도 한다. 예를 들면 `ERROR_DUPLICATE` 와 같은.

## 구현 
회사 프로젝트 개발에서는 ASP.NET Core (.NET 8, C#)을 자주 사용한다. 그러니 먼저 이 프레임워크에서 지원하는 기능을 활용하는 법을 소개하면 좋을 것 같다.

ASP.NET Core 에서는 Problem Details 관련 기능이 내장되어 있다. 이를 활용하는 것 만으로 간단히 구현이 가능하다. 아래 예시처럼, 컨트롤러 단에서 직접 `ProblemDetails` 객체를 생성하여 반환하는 방법도 있고.

```csharp
[Route("api/[controller]/[action]")]
[ApiController]
public class Values3Controller : ControllerBase
{
    // /api/values3/divide/1/2
    [HttpGet("{Numerator}/{Denominator}")]
    public IActionResult Divide(double Numerator, double Denominator)
    {
        if (Denominator == 0)
        {
            var errorType = new MathErrorFeature
            {
                MathError = MathErrorType.DivisionByZeroError
            };
            HttpContext.Features.Set(errorType);
            return Problem(
                title: "Bad Input",
                detail: "Divison by zero is not defined.",
                type: "https://en.wikipedia.org/wiki/Division_by_zero",
                statusCode: StatusCodes.Status400BadRequest
                );
        }

        return Ok(Numerator / Denominator);
    }

}
```

직접 ProblemDetails 로 반환 하도록 각 컨트롤러마다 수정하면 좋겠지만, 한번에 다 바꾸기는 힘들기도 하니 Exception Handler 를 등록하여 전역 처리를 함께 하기도 한다. 간혹 컨트롤러단에서 미처 처리하지 못한 예외가 발생하는 경우가 있는데, 이런 경우 Exception Handler 설정이 없으면 클라이언트에 Stack Trace 가 응답에 그대로 노출된다. 이를 방지하기 위한 목적으로도 설정하면 보안 측면에서도 좋다고 할 수 있다.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.MapControllers();
app.Run();
```
