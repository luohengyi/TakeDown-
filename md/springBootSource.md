# Spring Boot 深度核心

## 核心特性

### 组件自动装配

- 激活：@EnableAutoConfiguration
- 配置：/META-INFO/spring.factories
- 实现：XXXAutoConfiguration

### 嵌入式web容器

- Web Servlet：Tomcat、Jetty、 UnderTow
- Web Reactivate：Netty Web Server

### 生产准备特性

- 指标：/actuator/metrice (cup,内存等信息)
- 将康检查
- 外部化配置（借鉴与 spring foromwork）

## Web应用

### 传统Servle应用

#### Servlet组件：

> Servlet

- 实现	
  - ``@WebServlet``
  - ``extends HttpServlet``
- url映射
  - ``@WebServlet(urlPatterns = "/index")``
- 注册
  - ``@ServletComponentScan(basePackages = "diveinspringboot.servlet")``

> Filter

> Listener

#### Servlet注册：

​	Servlet注解、spring Bean、RegistrationBean[^【1】]

[^【1】]:通过配置FilterRegistrationBean类实现组件注册

#### 异步非阻塞（搞懂 异步非阻塞）：

​	异步servlet、非阻塞servlet** （搞明白 异步非阻塞 这个意思）

> spring 中实现异步servlet

```java
//asyncSupported 默认false 不支持 异步 ，设置为true 使系统支持 异步操作
@WebServlet(urlPatterns = "/index",asyncSupported = true)
public class Myservlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
			  //获取异步上下文
        AsyncContext asyncContext = req.startAsync();
        asyncContext.start(() -> {
            try {
                resp.getWriter().println("hello.word");
                //告诉系统 异步操作结束
                asyncContext.complete();
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

    }
}
```

## Spring Web Mvc 应用

### WEB MVC 视图：

> ViewResolver 视图处理器

通过 处理方法 返回一个 view

```java
public interface ViewResolver {
    @Nullable
    View resolveViewName(String var1, Locale var2) throws Exception;
}
```

> view 视图   视图只关心一件事 -> **渲染**

render 渲染方法需要用到应用上下文 以及 HttpServletRequest 、HttpServletResponse 具体的渲染功能又模版引擎实现

```java
public interface View {
    String RESPONSE_STATUS_ATTRIBUTE = View.class.getName() + ".responseStatus";
    String PATH_VARIABLES = View.class.getName() + ".pathVariables";
    String SELECTED_CONTENT_TYPE = View.class.getName() + ".selectedContentType";

    @Nullable
    default String getContentType() {
        return null;
    }

    void render(@Nullable Map<String, ?> var1, HttpServletRequest var2, HttpServletResponse var3) throws Exception;
}
```

### 模版引擎

> 当项目中存在多个模版引擎时由内容协商 **ContentNegotiatingViewResolver** 来处理，使用最合适的

- thymeleaf
- thymeleaf
- jsp

### 内容协商

- ContentNegotiationConfigurer
- ContentNegotiationStrategy
- ContentNegotiatingViewResolver

### 异常处理

- @ExceptionHandler
- HandlerExceptionResler
- BasicErrorController
- 

## WEB MVC REST

### 资源辅助

- @RequestMapping
  - @GetMapping
- @ResponseBody
- @RequestBody

### 资源跨越

- CrossOrigin

### 服务发现（restful接口处理）

- WEB MVC 核心：核心架构、处理流程、核心组件

