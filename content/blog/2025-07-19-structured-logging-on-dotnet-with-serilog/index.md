---
title: "Serilog를 활용하여 ASP.NET Core 앱에 구조화된 로깅 적용하기"
author: "Youngbin Han"
date: 2025-07-19T23:00:00+09:00
draft: false
description: Serilog 등을 활용하여 구조화된 로깅 적용하면 나중에 찾아 분석하기에도 용이하다!
image: pay-request-review.png
tags:
- serilog
- logging
- structured-logging
- dotnet
- aspnet
---

소프트웨어를 개발 하면서, 로깅은 필요한 기능을 구현하는 것 만큼이나 꼭 중요하게 고려되는 것 같지는 않습니다. 하지만, 실제 사용자를 대상으로 배포가 되어, 예상하지 못한 문제가 발생 하였을 때, 원인을 찾아서 해결 할 때, 중요한 단서가 되는 경우가 대부분인 것 같습니다. 물론, 사용자가 제공한 정보(증상 재현 방법이나, 사용 환경 정보)또한 중요한 단서가 되기도 하지만, 어쩌면 시스템에 남아있는 로그만큼 확실한 단서가 또 없기도 합니다.

재직중인 회사 SD팀에서는 최근 RI(예약 인스턴스) 구입 업무 자동화 서비스인 RITA를 개발 하면서, 사용자의 예상치 못한 행동이나 개발 하면서는 예상하지 못한 문제가 발생 하였을 때, 쉽게 대응할 수 있도록 관련 기록을 남기는 방법에 대해서 신경써서 구현해야 할 필요가 있었습니다. 초기에는 별도의 DB 테이블에 감사로그 데이터를 만들어 쌓는 방법 등 여러 방안을 검토 하였는데, 최종적으로는 Serilog를 도입하여 구조화된 로깅을 구현 하기로 하였습니다.

## 구조화된 로깅

구조화된 로깅(Structured Logging)은 전통적인 문자열 기반 로깅 방식과 달리, 로그 데이터를 구조화된 형태(주로 JSON과 같은 형식)로 저장하는 로깅 방식입니다. 이 방식은 로그를 단순한 텍스트가 아닌 검색 가능하고 분석 가능한 데이터로 취급합니다.

기존의 일반 텍스트 로깅 방식은 다음과 같은 형태로 이루어집니다:

```csharp
logger.Info("사용자 ID: 1234가 결제를 시도했으나 실패했습니다. 금액: 50000원, 시간: 2023-06-15 14:30:22");
```

반면 구조화된 로깅은 다음과 같이 구현됩니다:

```csharp
logger.Information("사용자 {UserId}가 {Amount}원 결제를 시도했으나 {Status}했습니다.", 1234, 50000, "실패");
```

구조화된 로깅의 주요 장점은 특정 필드를 기준으로 한 효과적인 검색과 필터링, 구조화된 형태로 저장된 데이터의 분석 용이성, 다양한 형식으로 출력할 수 있는 유연성에 있습니다. 또한 로그 메시지에 관련된 모든 컨텍스트 정보를 포함하여 문제 해결이 용이하며, 로그 레벨에 따라 문자열 연산을 최소화함으로써 성능을 최적화할 수 있다는 장점도 있습니다.

## Serilog

![serilog_logo](./serilog-180px.png)

[Serilog](https://github.com/serilog/serilog)는 이러한 구조화된 로깅을 .NET 환경에서 쉽게 구현할 수 있게 해주는 인기 있는 라이브러리입니다. RITA 서비스 개발에 사용된 ASP.NET Core 기반 앱에 적용 하기도 쉽고, 다양한 싱크(Sink)를 제공하여 로그 데이터를 파일, 콘솔, 데이터베이스, 클라우드 서비스 등 다양한 대상으로 전송할 수 있는 유연성을 제공합니다.

## ASP.NET Core 앱에 적용하기

앞에서도 잠깐 언급 하였듯, RITA 백엔드는 ASP.NET Core로 개발이 되었는데요, 적용 가이드 문서도 잘 제공이 되었고, 작용 방법도 간편하여 RITA 백엔드 개발 중간에 어렵지 않게 도입하여 적용할 수 있었습니다. 

Serilog 를 적용하는 기본적인 방법은, 아래와 같은 명령으로 우선 Serilog를 의존성으로 추가하고

```python
dotnet add package Serilog.AspNetCore
```

이후, `Program.cs` 에서 종속성 주입 코드를 넣고 간단히 설정을 마칠 수 있습니다.

```csharp
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();

try
{
    Log.Information("Starting web application");

    var builder = WebApplication.CreateBuilder(args);
    builder.Services.AddSerilog(); // <-- 이 줄 추가하여 Serilog를 종속성으로 주입
    
    var app = builder.Build();
    app.MapGet("/", () => "Hello World!");

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
```

보통은 여기에 몇가지 구성을 더 추가하여 사용하게 됩니다. 저의 경우에는 로그를 JSON 형식으로 출력하고자 하여, `RenderedCompactJsonFormatte` 를 적용 하고, 그 외 세부적인 설정은 `appsettings.json` 을 활용하도록 하기 위해 `.ReadFrom.Configuration()` 또한 설정 하였습니다.

```csharp
...
builder.Services.AddSerilog((services, lc) => lc
        .ReadFrom.Configuration(builder.Configuration)
        .ReadFrom.Services(services)
        .Enrich.FromLogContext()
        .WriteTo.Console(new RenderedCompactJsonFormatter()));
...
```

`appsettings.json` 으로 Serilog 설정 방법은 https://github.com/serilog/serilog-settings-configuration 에서 확인이 가능한데, Sink 를 지정하여 로그를 어디로 출력할지(파일, 콘솔, DB 등) 지정도 가능하고, 로그 레벨 등도 설정이 가능합니다.

```json
{
  "Serilog": {
    "Using": [ "Serilog.Sinks.Console" ],
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning",
        "Microsoft.AspNetCore.Mvc": "Warning",
        "Microsoft.AspNetCore.Routing": "Warning",
        "Microsoft.AspNetCore.Hosting": "Warning"
      }
    },
    "WriteTo": []
  },
  ...
}
```

## 요청 로깅 미들웨어 사용하기

웹 백엔드에서 로깅을 한다고 하면, 보통 각 클라이언트 요청에 대한 로그 정보를 남기게 됩니다. 어떤 경로로 어떤 Method로, 응답 코드 등의 로그를 남기게 됩니다. 물론 ASP.NET Core 같은 웹 프레임워크를 사용하면 이러한 로그는 기본적으로 제공이 되지만, Serilog 에서 제공하는 요청 로깅 미들웨어를 사용하면 이러한 로그를 구조화 해서 남길 수 있을 뿐만 아니라, 확장하여 원하는 정보를 더 추가하여 로그를 남길 수 있습니다.

요청 로깅 미들웨어 또한 종속성을 주입하는 방식으로 간단히 설정이 가능합니다.

```csharp
var app = builder.Build();
...
app.UseSerilogRequestLogging(); // 요청 로깅 미들웨어 사용
...
```

그리고 `options` 콜백을 활용해서, 각 로그 이벤트 내용을 더 확장할 수 있습니다. 아래는 Serilog 문서에서 제공한 예시 입니다. 로그 메시지 템플릿이나, 기본 로그 레벨 지정, 추가적인 로그 필드 지정 등을 하는 것을 확인할 수 있습니다.

```csharp
...
app.UseSerilogRequestLogging(options =>
{
    // Customize the message template
    options.MessageTemplate = "Handled {RequestPath}";
    
    // Emit debug-level events instead of the defaults
    options.GetLevel = (httpContext, elapsed, ex) => LogEventLevel.Debug;
    
    // Attach additional properties to the request completion event
    options.EnrichDiagnosticContext = (diagnosticContext, httpContext) =>
    {
        diagnosticContext.Set("RequestHost", httpContext.Request.Host.Value);
        diagnosticContext.Set("RequestScheme", httpContext.Request.Scheme);
    };
});
...
```

RITA 에서는 아래와 같은 형태로 확장하여 적용 하였는데, 각 요청마다 공통적으로 찾을 수 있는 정보 중에도 요청 주소에 포함된 쿼리 문자열, 요청 본문 Content Type, 클라이언트 주소, 프로토콜, 스키마, 사용자 정보(ID 및 Username, Email 등) 을 추가적으로 각 요청마다 기록하도록 설정 하였습니다.

```csharp
...
app.UseSerilogRequestLogging(opt =>
{
	opt.EnrichDiagnosticContext = (diagnosticContext, httpContext) =>
	{
	  diagnosticContext.Set("QueryString", httpContext.Request!.QueryString.Value ?? string.Empty);
    diagnosticContext.Set("ContentType", httpContext.Request?.ContentType ?? string.Empty);
    diagnosticContext.Set("Host", httpContext?.Request?.Host.Value);
    diagnosticContext.Set("Protocol", httpContext?.Request?.Protocol);
    diagnosticContext.Set("Scheme", httpContext?.Request?.Scheme);
    diagnosticContext.Set("UserId", httpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
    diagnosticContext.Set("UserFullname", httpContext?.User.FindFirst(c => c.Type == "name")?.Value);
    diagnosticContext.Set("UserEmail", httpContext?.User.FindFirst(ClaimTypes.Email)?.Value);
	};
});
 ...
```

## DiagnosticContext를 활용하여 요청 로그 이벤트에 정보 추가하기

전통적인 로깅 방식에서는, 아래의 예제 코드처럼 Controller 각 메소드에서 필요할 때마다 로그를 직접 출력합니다. 이 방식은 각 로그가 독립적으로 생성되며, 하나의 요청에 대한 정보가 여러 로그 라인에 분산됩니다. 그러다 보니, 로그가 여러 줄에 분산되어 각 로그 한 줄이 어떤 요청과 연관된 것인지 확인이 어렵고, 로그 데이터 구조화도 어렵기에 필터링, 검색, 집계 등도 어렵다고 할 수 있습니다.

```csharp

[ApiController]
[Route("[controller]")]
public class RIRequestController : ControllerBase
{
    private readonly ILogger<RIRequestController> _logger;
    private readonly IRIRequestService _riRequestService;

    public RIRequestController(
        ILogger<RIRequestController> logger,
        IRIRequestService riRequestService)
    {
        _logger = logger;
        _riRequestService = riRequestService;
    }
    
    [HttpPost]
    public async Task<ActionResult<RIRequestResponse>> NewRIRequestAsync(RIRequestCreateRequest request)
    {
        _logger.LogInformation($"Request body for RIRequestCreateRequest: {JsonSerializer.Serialize(request)}");
        ...
        try
        {
            ...
            return Ok(new RIRequestResponse {...});
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Failed to create RI request for user {userId}");
            ...
        }
    }
}
```

RITA를 개발 할 때는, 아래의 코드처럼, Serilog의 DiagnosticContext를 활용하면 하나의 HTTP 요청에 대한 모든 정보를 단일 로그 이벤트에 통합하는 방식으로 작업 하였습니다. 이 방식을 사용하면 컨트롤러 각 메소드에서는 필요할 때 필요할 때 마가 로그 컨텍스트에 정보를 추가할 수 있습니다. 코드로 봐서는 기존 로깅 방법과 비슷해 보이지만, 실제로는 정보 추가를 위한 메소드 호출 때 마다 로그가 새로 출력 되는것이 아니라, HTTP요청을 모두 처리하고 반환할 때, 하나의 로그에 모든 정보가 통합되어 출력된다는 점에서 다릅니다.앞서 추가한

```csharp
[ApiController]
[Route("[controller]")]
public class RIRequestController : ControllerBase
{
    private readonly ILogger<RIRequestController> _logger;
    private readonly IRIRequestService _riRequestService;

    public RIRequestController(
        ILogger<RIRequestController> logger,
        IRIRequestService riRequestService)
    {
        _logger = logger;
        _riRequestService = riRequestService;
    }
    
    [HttpPost]
    public async Task<ActionResult<RIRequestResponse>> NewRIRequestAsync(RIRequestCreateRequest request)
    {
        _diagnosticContext.Set(nameof(RIRequestCreateRequest), JsonSerializer.Serialize(request));
        ...
        try
        {
            ...
            return Ok(new RIRequestResponse {...});
        }
        catch (Exception ex)
        {
		        _diagnosticContext.Set("Exception", JsonSerializer.Serialize(ex));
		        _diagnosticContext.Set("Exception", ex);
            ...
        }
    }
}

```

위에 두 예제 코드에서 출력되는 로그를 비교하면 아래와 같이 비교 해 볼수 있습니다. 먼저 Serilog 와 DisanosticContext 등을 사용하지 않은 기존의 로깅 방식으로 출력된 로그의 예시 입니다. 예제에서는 로그가 몇줄 되지 않아서 읽기가 어렵지 않지만, 실제 운영 환경의 로그는 각 API 핸들러 마다 추가적으로 남기는 로그가 더 많을 수 있고, 중간에 다른 API 핸들러의 로그가 섞일수도 있습니다. 하나의 요청에 대한 로그가 여러곳에 분산되어 있어, 사용자로부터 문제가 보고되면 로그를 통해 원인 등 파악하기가 어려울 수도 있습니다.

```bash
[2023-06-15 14:30:25.1234] [INFO] [RITA.Controllers.RIRequestController] Request body for RIRequestCreateRequest: {"accountId":"123","region":"ap-northeast-2","instanceType":"m5.large","term":1,"paymentOption":"All Upfront"}

[2023-06-15 14:30:26.5678] [INFO] [RITA.Services.RIRequestService] Processing RI request for user 1001

[2023-06-15 14:30:27.9012] [ERROR] [RITA.Controllers.RIRequestController] Failed to create RI request for user 1001
System.Exception: 계정에 충분한 권한이 없습니다
   at RITA.Services.RIRequestService.CreateRequestAsync() in /app/Services/RIRequestService.cs:line 42
```

그리고 아래는, Serilog 를 적용하고 JSON 방식으로 출력된 로그에 DiagnosticContext 도 활용하여, 요청에 대한 추가적인 정보도 로그 이벤트 하나에 통합 한 모습입니다. 실제로 콘솔에 이렇게 한 줄에 출력이 되는데요, 이렇게 보면 한 줄에 다 출력이 되어 확인하기에 불편하다고 생각 할 수도 있습니다.

```json
{"@t":"2025-07-18T04:31:58.0615685Z","@m":"HTTP \"GET\" \"/RIRequest/000\" responded 200 in 1932.5657 ms","@i":"62d0885c","@tr":"f578a15c49b30bf4ece104b91baa3123","@sp":"2fd043a059f75123","QueryString":"","ContentType":"","Host":"rita.example.com","Protocol":"HTTP/1.1","Scheme":"http","UserId":"73b438c8-d231-1111-aed0-11195d7fbee3","UserFullname":"Gildong Hong","UserEmail":"gildong.hong@example.com","RequestMethod":"GET","RequestPath":"/RIRequest/000","StatusCode":200,"Elapsed":1932.56572,"SourceContext":"Serilog.AspNetCore.RequestLoggingMiddleware","RequestId":"0HNE1KGB19111:00000001","ConnectionId":"0HNE1KGB19111","RIRequestCreateRequest":"{\"accountId\":\"999\",\"region\":\"ap-northeast-2\",\"instanceType\":\"m5.large\",\"term\":1,\"paymentOption\":\"All Upfront\"}","Exception":"{\"Message\":\"계정에 충분한 권한이 없습니다\",\"StackTrace\":\"   at RITA.Services.RIRequestService.CreateRequestAsync() in /app/Services/RIRequestService.cs:line 42\"}"}
```

개발 과정에서는 콘솔에 실시간으로 출력되는 로그도 많이 보겠지만. 운영 환경에서는 서비스 사용 중 문제가 있다고 전달 받고(또는 모니터링 알림 설정 한 것이 있다면 알림 등을 확인하고), 이전에 저장된 로그를 조회해서 살펴보는 경우가 많습니다. 이런 경우, Azure Log Analytics, Grafana, ELK 등을 활용하여, 쌓여있는 로그에서 필요한 것을 조회해서 분석하는 경우가 많습니다. 

이런 로그 분석 도구를 활용할 때는, 기존의 로깅 방식처럼 여러 줄에 걸쳐 로그를 출력 해 두면 오히려 분석하기가 어렵습니다. 한줄에 필요한 정보를 JSON 형태 등으로 구조화 하여 모두 넣어두면, 로그 분석 도구에서 제공하는 기능으로 필요한 로그 이벤트만 필터링 하고, 그 안에서도 필요한 필드의 데이터만 선택에서 확인이 가능하여 로그 분석을 더 편리하게 할 수 있습니다.

## ProblemDetails 활용하기

[ASP.NET](http://ASP.NET) Core 에서는 오류 발생 시 클라이언트에 반환할 오류 정보를 `ProblemDetails` 클래스를 활용하여 표준화 할 수 있습니다. `ProblemDetails` 클래스에 기본적으로 포함된 속성값은 아니지만, `ProblemDetails` 를 JSON 등으로 직렬화 할 때 기본적으로 적용되는 `DefaultProblemDetailsWriter` 에서 요청에 대한 `traceId` 를 함께 넣어 반환 해 주고, 이는 Serilog 에서도 로그 출력시 함께 출력이 됩니다. 덕분에 사용자나 프론트엔트 개발자분이 서버 API 호출 중 오류가 발생하면, 서버에서 Stack Trace 등 민감한 정보가 될 수도 있는 정보는 클라이언트에 노출하지 않으면서도, 응답에 포함된 `traceId` 로 관련 로그를 쉽게 찾아서 확인할 수 있습니다.

이러한 `ProblemDetails` 형태로 응답 반환은 Controller에서 `Problem` 메소드를 호출하여 처리하거나.

```csharp
try
{
	...
}
catch (Exception ex)
{
	return Problem("요청 처리 중 오류가 발생했습니다.", null, StatusCodes.Status500InternalServerError);
}
```

따로 처리하지 못한 서버 오류도 `ProblemDetails` 형태로 반환되도록, `Program.cs` 에서 미들웨어 설정하여 사용하여 처리할 수 있었습니다.

```csharp
...
builder.Services.AddProblemDetails();
...
```

이렇게 설정한 것은 운영환경 뿐만이 아니라, 개발 단계에서도 프론트엔드 개발자 분들과 백엔드에서 발생하는 오류 관련하여 소통하고 조치하기 편해서 상당히 유용 했습니다. 이전에는 프론트엔드 개발자 분들이 백엔드에서 제공하는 API 사용 중 오류를 만나면, 어떤 API를 어떻게 호출 하였는지, 백엔드에서 어떤 응답 데이터를 주었는지 등을 확인해야, 오류를 파악할 수 있었는데, Serilog 및 `ProblemDetails` 구성 이후로는 응답 데이터에 포함된 `traceId` 정도만 받아 로그를 조회하여 오류를 더 빠르고 편리하게 파악할 수 있게 되었습니다.

![image.png](./image(2).png)

  

실제로 반환된 오류 응답 데이터 예시

```json
{
    "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
    "title": "Bad Request",
    "status": 400,
    "detail": "There was an error while reading an XLSX file. Please see the inner exception:",
    "traceId": "00-aeae89a33ce614e4d888172304dc783a-3e08bdf4b0283f31-00"
}
```

## Azure Log Analytics 활용하기

이렇게 출력한 구조화된 로그는, 출력을 잘 하는것도 중요하지만 보관 해 두었다가 분석할 수 있도록 로그 분석 도구로 보내는 것 또한 중요하겠습니다. RITA를 비롯하여 SD팀에서 개발한 서비스(티켓몬스터, 빌링 등)다수가 Azure Container App 를 사용하여 배포 및 운영되고 있는데요. 

Azure Container Apps 에서는 기본적으로 애플리케이션에서 출력한 로그를 Azure Log Analytics 로 보내줍니다. 또 구조화된 로그 분석 기능을 Log Analytics 에서 기본적으로 잘 제공하고 있기에, Log Analytics 만 잘 활용하여도 보관해 둔 로그를 잘 분석할 수 있습니다.

![image.png](./image(3).png)

Azure Log Analytics 에서 제공하는 Kusto 쿼리도 RITA 로그 분석에 유용하게 활용 하였는데요. 로그 데이터를 JSON 으로 파싱하고, 파싱된 JSON 데이터의 특정 필드 기준으로 로그 필터링도 가능해서, 앞서 백엔드에서 오류 발생 시 응답 데이터에 함께 반환하는 `traceId` 값으로 필터 하는 등의 용도로 활용 하였습니다. 

![image.png](./image(4).png)

## 정리

이번 글에서는 RITA 서비스를 개발하면서, Serilog 를 이용해 JSON 형식의 구조화된 로깅을 적용한 사례는 물론, 로그 분석 도구에서 로그 검색과 분석을 용이하게 할 수 있도록, 로그 이벤트 하나에 필요한 정보를 모두 넣는 방법, 백엔드 오류 시 로그 필터에 사용할 수 있는 값 정도만 응답 데이터로 반환하여 민감할 수 있는 정보 노출은 최소화 하면서도 로그 분석으로 빠르게 찾을 수 있도록 설정한 사례, 그리고 이렇게 쌓인 구조화된 로그를 Azure Log Analytics 로 분석하는 방법까지 알아보았습니다.

구조화된 로그를 남기는 것은 꼭 Serilog 가 아니라고 하여도, 각 프로그래밍 언어나 웹 프레임워크별로 구조화된 로그를 남길 수 있도록 돕는 로그 라이브러리가 많이 있습니다. 로그를 남기고 추후 분석하는것이 중요한 서비스를 개발하거나 운영 중이라면, 구조화된 로깅 적용과 로그 분석 도구 활용을 통해 서비스에 문제가 발견되었을 때 이를 파악하기 위한 로그를 찾아 분석하는 데 많은 도움이 될 것입니다.