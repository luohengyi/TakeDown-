# Spring Boot 深度核心

## 核心特性

### 组件自动装配

##### Spring Framework 手动装配

> 装配方式

- ``<context:component-scan>``

  - ```xml
    <beans>
    <!-- 启用注解驱动 -->
    <context:annotation-config/>
      
    <!-- 寻找被@component或者其派生注解标记的类 -->
    <context:component-scan base-package="com.cshr.controller,com.cshr.services,com.cshr.task,com.cshr.mapper,com.cshr.bean"/>
    
    ```

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

> Spring mvc是一个传统的servlet应用是一个同步阻塞的I/O模型

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

### WEB MVC REST

#### 资源辅助

- @RequestMapping
  - @GetMapping
- @ResponseBody
- @RequestBody

#### 资源跨越

- CrossOrigin（标记在方法或类上，该方法或类允许被跨域访问）

#### 服务发现（restful接口处理）

- HATEOS

###  WEB MVC 核心

#### 核心架构

#### 处理流程

#### 核心组件

- DispatcherServlet

- handlemapping
  - ​	根据配置以及请求参数查找对应的handle并返回

- handleAdapter
  - 执行查找到的handle并且返回ModelAndview
- viewResolver
  - 解析之心handle并且返回ModelAndview返回的view，最后放入响应中
- handleExceptionResolver
  - 解析异常

## Spring WebFlux 应用

> spring5开始支持异步非阻塞，springFlux主要是异步支持

### Reactor 基础

- Java Lambda
- Mono
- Flux

### Web Flux 核心：

- Web MVC注解
- 函数式声明
  - RouterFunction
- 异步非阻塞

## Web Server 应用

### 切换Web Server

```xml
<dependency>  
            <groupId>org.springframework.boot</groupId>  
            <artifactId>spring-boot-starter-web</artifactId>  
            <exclusions>  
                <!--  排除 tomcat 默认使用的是tomcat-->
                <exclusion>  
                    <groupId>org.springframework.boot</groupId>  
                    <artifactId>spring-boot-starter-tomcat</artifactId>  
                </exclusion>  
            </exclusions>  
</dependency>  
  
        <!-- Jetty适合长连接应用，就是聊天类的长连接 -->  
        <!-- 使用Jetty，需要在spring-boot-starter-web排除spring-boot-starter-tomcat，因为SpringBoot默认使用tomcat -->  
<dependency>  
  <groupId>org.springframework.boot</groupId>  
<artifactId>spring-boot-starter-jetty</artifactId>  
<!-- 使用webflux需要注释传统的web容器依赖 两者无法共存   -->  
<dependency>  
  <groupId>org.springframework.boot</groupId>  
<artifactId>spring-boot-starter-webflux</artifactId>
```



### 自定义Servlet Web Server

## 数据相关

### 关系型数据库

#### JDBC

> 依赖

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
```

- 数据源
  - Java 接口DataSource
- jdbcTemplate
  - 一套连接数据库访问数据的接口
- 自动装配

#### JPA

> maven依赖, 默认是Hibernate实现

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

> 另外 JPA 需要 jdbc 的DataSource以及连接池

```java
@Configuration
@EnableConfigurationProperties({HibernateProperties.class})
@ConditionalOnSingleCandidate(DataSource.class)
class HibernateJpaConfiguration extends JpaBaseConfiguration {
```

- 实体映射关系
  - 一对多
  - 多对多
  - 。。。
- 实体操作
  - Javax.
- 自动装配
  - HibernateJpaConfiguration

#### 事务

> maven依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
</dependency>
```

##### spring 事务抽象

- PlatformTransactionManager

##### jdbc 事务

- DataSourceTransactionManager

##### 自动装配

- TransactionAutoConfiguration

## Spring Boot 应用

#### SpringApplication

#### 失败分析

#### 应用特性

- SpringAplication

##### Fluent Api

```java
public static void main(String[] args) {
		// Fluent Api 在此处调用
    new SpringApplicationBuilder(DemoApplication.class)
            .web(WebApplicationType.NONE)
            .run(args);
}
```

- web(). 设置Spring Boot 应用类型

#### 事件监听器

### Spring Boot 配置

#### 外部化配置

- ConfigurationProperty

  - ```java
    private final ConfigurationPropertyName name;
    private final Object value;
    //在since 2.0.0中加入了 配置来源的属性，可以查看这个配置想是在哪里配置的
    private final Origin origin;
    ```

#### Profile

> 根据不同的环境加载不同的配置

#### 配置属性

- PropertySource

### Spring Boot Starter

#### Starter开发

#### 最佳实践