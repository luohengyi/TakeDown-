# Spring Boot 深度核心

## 核心特性

### 组件手动装配

#### 模式注解 @Component

##### 装配方式 

- ``<context:component-scan>``

  - ```xml
    <beans>
    <!-- 启用注解驱动 -->
    <context:annotation-config/>
      
    <!-- 寻找被@component或者其派生注解标记的类 -->
    <context:component-scan base-package="com.cshr.controller,com.cshr.services,com.cshr.task,com.cshr.mapper,com.cshr.bean"/>
    
    ```

- @ComponentScan 

  - ```java
    @ComponentScan(basePackages = "diveinspringboot.servlet")
    public class DemoApplication {
    	......
    }
    ```

##### 自定义模式注解

- ```java
  @Target(ElementType.TYPE)
  @Retention(RetentionPolicy.RUNTIME)
  @Documented
  //被Repository注解标记的注解具有原@Repository的性质
  @Repository
  public @interface FirstLeve {
      String value();
  }
  ```

#### 模块化装配 @Enable

##### 实现方式

> 注解驱动方式,通过Import注解将导入Config类中的配置bean，spring利用Import注解实现单模块类的加载

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import(Config.class)
public @interface TestEnable {
}
```

```java
@Configuration
public class Config {

    @Bean("helloWord")
    public String helloWord(){
        return "hello word123";
    }
}
```

> 接口驱动实现 虽然过程多了一步但是弹性加大了，在导入配置bean时拥有了操作性

```java
@Configuration
public class Config {

    @Bean("helloWord")
    public String helloWord(){
        return "hello word123";
    }
}
```

```java
public class EnableInport implements ImportSelector {
    @Override
    public String[] selectImports(AnnotationMetadata annotationMetadata) {
        return new String[]{Config.class.getName()};
    }
}
```

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import(EnableInport.class)
public @interface TestEnable {
}
```

> 标记启动类

```java
@TestEnable
public class DemoApplication {

    public static void main(String[] args) {

        ConfigurableApplicationContext context = new SpringApplicationBuilder(DemoApplication.class)
                .web(WebApplicationType.NONE)
                .run(args);
        String helloWord = context.getBean("helloWord", String.class);
        System.out.println(helloWord);

    }

}
```

#### 条件装配

> 从spring formwork 3.1 开始允许bean在装配时增加前置条件判断

##### 配置方式 @Profile

```java
@Profile("java7")
@Service
public class Java7CalculateService implements CalculateService {
    @Override
    public Integer sum(Integer... value) {
        int sum = 0;
        for (int i = 0; i < value.length; i++) {
            sum+=value[i];
        }
        return sum;
    }
}
```

```java
@Profile("java8")
@Service
public class Java8CalculateService implements CalculateService {
    @Override
    public Integer sum(Integer... value) {
        int sum = Stream.of(value).reduce(0,Integer::sum);
        return null;
    }
}
```

>通过 Fluent Api 设置 profiles 为java7

```java
@SpringBootApplication(scanBasePackages = "diveinspringboot.service")
public class DemoApplication {

    public static void main(String[] args) {

        ConfigurableApplicationContext context = new SpringApplicationBuilder(DemoApplication.class)
                .web(WebApplicationType.NONE)
                .profiles("java7")
                .run(args);
        CalculateService helloWord = context.getBean(CalculateService.class);
        Integer sum = helloWord.sum(1, 2, 3);
        System.out.println(sum);

    }

}
```

##### 编程方式 Condition

> 定义注解  在MyCondition类中实现条件判断

```java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE,ElementType.METHOD})
@Documented
//MyCondition实现验证
@Conditional(MyCondition.class)
public @interface ConditionSystem {
    String name();
    String value();
}
```

> 实现接口  获取系统的 ·name ·属性和注解定义的value比较是否一致

```java
public class MyCondition implements Condition {
    @Override
    public boolean matches(ConditionContext conditionContext, AnnotatedTypeMetadata annotatedTypeMetadata) {
				//Map中装有注解中的属性
        Map<String, Object> annotationAttributes =
                annotatedTypeMetadata.getAnnotationAttributes(ConditionSystem.class.getName());

        String name = String.valueOf(annotationAttributes.get("name"));
        String value = String.valueOf(annotationAttributes.get("value"));

        return value.equals(System.getProperty(name));

    }
}
```

> 使用注解实现条件装配.  

```java
@ConditionSystem(name = "user.name",value = "luohengyi")
@Bean
public String helloWord(){
    return "helloWord123";
}
```

### 1组件自动装配

> 依赖注入是靠自动装配来实现的

- 定义：基本约定大于配置的原则，实现spring Boot组件的自动装配的目地
- 装配：模式注解，@Enable模块，条件装配，工厂加载机制
- 实现：激活自动化装配、实现自动化装配、配置自动化装配实现

#### 自定义自动装配

> 实现自动化装配 通过 模块化装配、条件装配等手动装配方式装配bean

```java
@Configuration
@HelloWordEnable //模块化装配
@ConditionSystem(name = "user.name",value = "luohengyi") //条件装配
public class HelloWordAutoConfiguration {
}
```

> 配置工厂加载设置  配置路径 META-INF/*spring.factories

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
diveinspringboot.config.HelloWordAutoConfiguration
```

> 激活自动化装配 @EnableAutoConfiguration

```java
@EnableAutoConfiguration
public class DemoApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = new SpringApplicationBuilder(DemoApplication.class)
                .web(WebApplicationType.NONE)
                .run(args);
        String helloWord = context.getBean("helloWord", String.class);
        System.out.println(helloWord);
        context.close();
    }
}
```

> 自动装配流程

`HelloWordAutoConfiguration`

- 条件判断 ``@ConditionSystem(name = "user.name",value = "luohengyi")``
- 模式注解 ``@Configuration``
- 模块化装配 ``@HelloWordEnable``->``EnableInportSelector``->``HelloWordConfiguration``->``HelloWord``

#### 完全自动装配

- DispatcherServlet：DispatcherServletAutoConfiguration
- 替换@EnableWebMvc：WebMvcAutoConfiguration
- Servlet容器：ServletWebServerFactoryAutoConfigutation

### 2嵌入式web容器

- Web Servlet：Tomcat、Jetty、 UnderTow
- Web Reactivate：Netty Web Server

### 3生产准备特性

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

render 渲染方法需要用到应用上下文 以及 HttpServletRequest 、HttpServletResponse 具体的渲染功能由模版引擎实现

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

![image-20191012143815110](/Users/luohengyi/Library/Application Support/typora-user-images/image-20191012143815110.png)

> 当项目中存在多个模版引擎时由内容协商 **ContentNegotiatingViewResolver** 来处理，使用最合适的

- thymeleaf

- thymeleaf

- jsp

  ```java
  //多个模版引擎时自定义ViewResolver设置他的Order优先级来使用
  @Bean
  public ViewResolver viewResolver(){
      InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
      viewResolver.setViewClass(JstlView.class);
      viewResolver.setPrefix("/WEB-INF/jsp/");
      viewResolver.setSuffix(".jsp");
      viewResolver.setOrder(Ordered.LOWEST_PRECEDENCE-10);
      return viewResolver;
  }
  ```

### 内容协商

- ContentNegotiationConfigurer
- ContentNegotiationStrategy
- ContentNegotiatingViewResolver

### 异常处理

- @ExceptionHandler
- HandlerExceptionResler
- BasicErrorController

### WEB MVC REST

#### 资源辅助

> 请求

- @RequestMapping
  - @GetMapping
- @RequestBody 获取完整请求主体内容
  - 主要用来接收前端传递给后端的json字符串中的数据的(请求体中的数据的)
  - 使用@RequestBody接收数据时，前端不能使用GET方式提交数据，而是用POST方式进行提交。在后端的同一个接收方法里
  - @RequestBody与@RequestParam()可以同时使用，@RequestBody最多只能有一个，而@RequestParam()可以有多个
  - 当同时使用@RequestParam（）和@RequestBody时，@RequestParam（）指定的参数可以是普通元素、
- @RequestParam 请求参数
- @PathVariable 获取请求路径变量
- @RequestHeader 请求头数据
- @CookieValue cookie 获取数据

> 响应

- @ResponseBody 响应主体
- @ResponseEntity 响应体（包括响应头和响应数据）
- @ResponseCookie（5.0）响应Cookie

> 拦截

- @RestControllerAdvice 控制器拦截

- HandlerInterceptor 方法拦截接口

> 跨域

- CrossOrigin 资源跨域声明
- CrossFilter  资源跨域拦截器
- WebMvcConfigurer#addCrossMappings 注册资源跨域信息

#### 资源跨越

- CrossOrigin（标记在方法或类上，该方法或类允许被跨域访问）

#### 服务发现（restful接口处理）

- HATEOS

#### 核心组件

- 处理方法参数解析器：**HandlerMethodArgumentResolver**
- 处理方法返回值解析器：**HandlerMethodReturnValueHandler**
- 内容协商管理：**ContentNegotiationManager**
- 媒体类型：MediaType
- 消费媒体类型：@RequesMapping#consumes
- 生产媒体类型：@RequesMapping#produces
- Http消息转化器：HttpMessageConverter
- Rest 配置器：WebMvcConfigurer

#### 处理流程

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190510122041956.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tvMDQ5MQ==,size_16,color_FFFFFF,t_70)

- 请求发送到DispatcherServlet
- 调用handlerMappings，HandlerMapping会把请求映射为HandlerExecutionChain对象（包含Handler）
- 根据HandlerExecutionChain中的handler寻找适配器HandlerAdapter。
  - HandlerAdapter处理器有多种例如，方法上有请求参数的，
- 在HandlerAdapter中执行 HandlerExecutionChain 中的 Handler处理器
- 由HandlerMethodReturnValueHandlerComposite处理返回结果
  - 其中有多个处理器，由合适的处理器来处理返回结果

#### 内容协商

> 针对HandlerMethodReturnValueHandlerComposite处理后的返回结果，转化为合适的http消息类型

<img src="/Users/luohengyi/Library/Application Support/typora-user-images/image-20191020102209802.png" alt="image-20191020102209802" style="zoom:50%;" />

**由MappingJackson2HttpMessageConverter来处理响应类型，以及对象的反序列化**

###  WEB MVC 核心

#### 核心架构

##### 基础架构	

> Servlet 

##### 核型架构

> 前端控制器 font Controller

![image-20191002183537197](/Users/luohengyi/Library/Application Support/typora-user-images/image-20191002183537197.png)

#### 处理流程

![image-20191002183819523](/Users/luohengyi/Library/Application Support/typora-user-images/image-20191002183819523.png)

#### 核心组件

##### 处理器管理

- 映射:	HandlerMaping

  - HandlerMapping会把请求映射为HandlerExecutionChain对象（包含Handler）

- 适配:    HandlerAdapter

  - 调用 HandlerExecutionChain中的Handler

  - ```java
    // Actually invoke the handler.
    mv = ha.handle(processedRequest, response, mappedHandler.getHandler());
    ```

- 执行:    HandlerExecutionChain

  - 在HandlerAdapter中执行 HandlerExecutionChain 中的 Handler处理器，返回ModelAndView

  - ModelAndView 包含视图名称 view，数据 model

    ```java
    @Nullable
    private Object view;
    
    /** Model Map */
    @Nullable
    private ModelMap model;
    ```

    

##### 页面渲染

- 视图解析：ViewResolver

  - 通过 initViewResolvers 初始化 ,ViewResolver的具体实现就是jsp等

  - ```java
    @Nullable
    private List<ViewResolver> viewResolvers;
    ```

  - 解析 ModelAndView返回View

- 国际支持：LocaleResolver、LocaleContextResolver

- 个性化：ThemeResolver

##### 异常处理

- 异常解析：HandlerExceptionResolver

#### 注解驱动

```java
@Configuration
@EnableWebMvc
public class WebConfig {

    @Bean
    ViewResolver viewResolver(){
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setViewClass(JstlView.class);
        viewResolver.setPrefix("/WEB-INF/jsp");
        viewResolver.setSuffix(".jsp");
        return viewResolver;
    }
}
```

- @RequestHeader 获取请求头

- @CookieValue 获取 Cookie值

- @ModelAttribute 方法上标注，统一设置某个属性的值

- @ControllerAdvice 控制器增强

- @ExceptionHandler 异常处理

  - ```java
    //设置哪一个控制器的切面通知,如果不设置，使用全部的控制器
    @ControllerAdvice(assignableTypes = HelloWordController.class)
    public class HelloWordControllerAdvice {
    		//设置拦截的异常类型
        @ExceptionHandler(Exception.class)
        public ResponseEntity<String> onException(Throwable throwable){
          //补货异常后的处理方式 也可以@ResponseBody 方式直接向客户端响应错误信息
            return  ResponseEntity.ok(throwable.getMessage());
        }
    }
    ```

- @Valid、@validated 参数校验

#### 自动装配

##### servlet Api

> 在 Set 接口中允许以编程的方式动态的添加 servlet 组件，所以在springBoot中不需要手动配置DispatcherServlet

```java
public interface ServletContainerInitializer {
    public void onStartup(Set<Class<?>> c, ServletContext ctx)
        throws ServletException; 
}
```

##### Spring 适配

> 在spring 中对 ServletContainerInitializer进行了适配实现了一些自己东西

```java
//筛选器，告诉容器启动时那些类需要被装载
@HandlesTypes({WebApplicationInitializer.class})
public class SpringServletContainerInitializer implements ServletContainerInitializer {
    public SpringServletContainerInitializer() {
    }

    public void onStartup(@Nullable Set<Class<?>> webAppInitializerClasses, ServletContext servletContext) throws ServletException {
      ........
```

##### Spring spi

- 基础接口：WebApplicationInitializer
- 编程驱动:   AbstractDispatcherServletInitializer
  - 该抽象类中的registerDispatcherServlet方法动态的添加了dispatcherServlet
- 注解驱动：AbstractAnnotationConfigDispatcherServletInitializer
  - 继承于AbstractDispatcherServletInitializer提供了3个抽象方法用于配置DispatcherServlet

##### 示例重构

```java
@ComponentScan(basePackages = "com.imooc.web")
public class DispatcherServletConfig {
}
```

```java
public class DefaultAnnotationConfigDispatcherServletInitializer
extends AbstractAnnotationConfigDispatcherServletInitializer {
    //web.xml
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[0];
    }

    //DispatcherServlet的配置
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{DispatcherServletConfig.class};
    }

    //映射
    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}
```

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

##### 准备阶段

- 配置：spring Bean 来源
  - spring 配置class
  
  - xml上下文配置文件集合
  
  - ```java
    public static void main(String[] args) {
        //这里传入的DemoApplication.class 只要是被@SpringBootApplication标注的类就可以，不一定要主类
        ConfigurableApplicationContext context = new SpringApplicationBuilder(DemoApplication.class)
                .web(WebApplicationType.NONE)
                .profiles("java7")
          			//通过sources Class<?>... sources 传入多个配置源
          			.sources()
                .run(args);
    }
    ```
  
- 推断：Web 应用类型 和 主引导类

  - 根据当前classPath中是否存在相关实现类来推断web类型包括
    
    - ```java
      static WebApplicationType deduceFromClasspath() {
         if (ClassUtils.isPresent(WEBFLUX_INDICATOR_CLASS, null) && !ClassUtils.isPresent(WEBMVC_INDICATOR_CLASS, null)
               && !ClassUtils.isPresent(JERSEY_INDICATOR_CLASS, null)) {
            return WebApplicationType.REACTIVE;
         }
         for (String className : SERVLET_INDICATOR_CLASSES) {
            if (!ClassUtils.isPresent(className, null)) {
               return WebApplicationType.NONE;
            }
         }
         return WebApplicationType.SERVLET;
      }
      ```
      
    - Web Reactive
    
    - Web Servlet
    
    - 非Web
    
  - 推断主引导类

    - 查看堆栈中那个类中有main方法，就是那个类是主引导类

    - ```java
      private Class<?> deduceMainApplicationClass() {
         try {
            StackTraceElement[] stackTrace = new RuntimeException().getStackTrace();
            for (StackTraceElement stackTraceElement : stackTrace) {
               if ("main".equals(stackTraceElement.getMethodName())) {
                  return Class.forName(stackTraceElement.getClassName());
               }
            }
         }
         catch (ClassNotFoundException ex) {
            // Swallow and continue
         }
         return null;
      }
      ```

- 加载：应用上下文初始器 和 应用监听器

  - 加载上下文初始化起 ApplicationContextInitializer

    > 利用spring 工厂记载机制，实例化ApplicationContextInitializer实现类，并排序对象集合

    - 实现

      - ```java
        public static <T> List<T> loadFactories(Class<T> factoryClass, @Nullable ClassLoader classLoader) {
           Assert.notNull(factoryClass, "'factoryClass' must not be null");
           ClassLoader classLoaderToUse = classLoader;
           if (classLoaderToUse == null) {
              classLoaderToUse = SpringFactoriesLoader.class.getClassLoader();
           }
           List<String> factoryNames = loadFactoryNames(factoryClass, classLoaderToUse);
           if (logger.isTraceEnabled()) {
              logger.trace("Loaded [" + factoryClass.getName() + "] names: " + factoryNames);
           }
           List<T> result = new ArrayList<>(factoryNames.size());
           for (String factoryName : factoryNames) {
              result.add(instantiateFactory(factoryName, factoryClass, classLoaderToUse));
           }
          //排序实现
           AnnotationAwareOrderComparator.sort(result);
           return result;
        }
        ```

      - 自定义上下文初始化器 当存在多个自定义上下文初始化器时候 **使用@Order注解排序**

        - ```java
          @Order(Ordered.HIGHEST_PRECEDENCE)
          public class HellowordContext<C extends ConfigurableApplicationContext>
                  implements ApplicationContextInitializer<C> {
          
              @Override
              public void initialize(C configurableApplicationContext) {
                  ConfigurableListableBeanFactory beanFactory = configurableApplicationContext.getBeanFactory();
          
                  System.out.println("max id="+configurableApplicationContext.getId());
              }
          }
          ```

          在spring.factories文件中添加

          ```properties
          org.springframework.context.ApplicationContextInitializer=\
          diveinspringboot.context.HellowordContext
          ```

  - 加载 应用监听器 ApplicationListener

    > 利用spring 工厂记载机制，实例化ApplicationListener实现类，并排序对象集合

    - 自定义上 **应用监听器** 当存在多个 **应用监听器** 时候 **使用@Order注解排序

    - ```java
      @Order(Ordered.HIGHEST_PRECEDENCE)
      public class HelloWordListener implements ApplicationListener<ContextRefreshedEvent> {
      
          @Override
          public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
              System.out.println("HelloWordListener:"+contextRefreshedEvent.getApplicationContext().getId()+",time:"
              +contextRefreshedEvent.getTimestamp());
          }
      ```

    - 在spring.factories文件中添加

      ```properties
      org.springframework.context.ApplicationListener=\
      diveinspringboot.listener.HelloWordListener
      ```

##### 运行阶段

- 加载：SpringApplication运行监听器

  - 加载SpringApplication运行监听器（SpringApplictionRunListeners）,利用工厂加载机制加载SpringApplictionRunListener对象集合，并且封装到组合类SpringApplictionRunListeners

- 运行：SringApplication运行监听器

  - 运行 SpringApplication 运行监听器( SpringApplicationRunListeners )

  - SpringApplicationRunListener监听多个运行状态方法：

  - | 监听方法                                         | 阶段说明                                                     | Spring Boot 起始版本 |
    | ------------------------------------------------ | :----------------------------------------------------------- | -------------------- |
    | starting()                                       | Spring 应用刚启动                                            | 1.0                  |
    | environmentPrepared(ConfigurableEnvironment)     | ConfigurableEnvironment 准备妥当，允许将其调整               | 1.0                  |
    | contextPrepared(ConfigurableApplicationContext)  | ConfigurableApplicationContext 准备妥当，允许将其调整        | 1.0                  |
    | contextLoaded(ConfigurableApplicationContext)    | ConfigurableApplicationContext 已装载，但仍未启动            | 1.0                  |
    | started(ConfigurableApplicationContext)          | ConfigurableApplicationContext 已启动，此时 Spring Bean 已初始化完成 | 2.0                  |
    | running(ConfigurableApplicationContext)          | Spring 应用正在运行                                          | 2.0                  |
    | failed(ConfigurableApplicationContext,Throwable) | Spring 应用运行失败                                          | 2.0                  |
    
  - 自定义运行监听器：

    - ```java
    public class HelloWordRunListener implements SpringApplicationRunListener {
        //构造器必须要有2个参数，系统创建时，传入了2个参数
      public HelloWordRunListener(SpringApplication springApplication,String[] args) 		{}
      
          @Override
          public void starting() {
              System.out.println("HelloWordRunListener.starting()...");
      
          }
        ....其他方法实现
      }
      ```
    
      在spring.factories文件中添加
    
      ```properties
      org.springframework.boot.SpringApplicationRunListener=\
      diveinspringboot.run.HelloWordRunListener
      ```

- 监听：Spring Boot事件，Spring事件

  **Spring Boot 通过 SpringApplicationRunListener 的实现类 EventPublishingRunListener 利用 Spring Framework 事件API ，广播 Spring Boot 事件**。

  > Spring framework 事件/监听器 编程模型

  - Spring 应用事件
    - 普通应用事件:  ``ApplicationEvent``
    - 应用上下文事件: ``ApplicationContextEvent``
    
  - Spring 应用监听器
    - 接口编程模型：``ApplicationListener``
    - 注解编程模型：``@EnevenListener``
    
  - Spring 应用广播器
    - 接口：``ApplicationEventMultiCaster``
    - 实现类：``SimpleApplicationEventMultiCaster``
    
  - ```java
    AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
    
    context.addApplicationListener(event ->{
        System.out.println("监听到"+event);
    } );
    
    context.refresh();
    
    //发送事件
    context.publishEvent("HelloWord");
    context.publishEvent(new ApplicationEvent("11111") {
    });
    
    context.close();
    ```

EventPublishingRunListener 监听方法与 Spring Boot 事件对应关系 

| 监听方法                                         | Spring Boot 事件                    | 起始版本 |
| :----------------------------------------------- | ----------------------------------- | -------- |
| starting()                                       | ApplicationStartingEvent            | 1.5      |
| environmentPrepared(ConfigurableEnvironment)     | ApplicationEnvironmentPreparedEvent | 1.0      |
| contextPrepared(ConfigurableApplicationContext)  |                                     |          |
| contextLoaded(ConfigurableApplicationContext)    | ApplicationPreparedEvent            | 1.0      |
| started(ConfigurableApplicationContext)          | ApplicationStartedEvent             | 2.0      |
| running(ConfigurableApplicationContext)          | ApplicationReadyEvent               | 2.0      |
| failed(ConfigurableApplicationContext,Throwable) | ApplicationFailedEvent              | 1.0      |

- 创建：
  - 应用上下文
    - Web Reactive: AnnotationConfigReactiveWebServerApplicationContext
    - Web Servlet: AnnotationConfigServletWebServerApplicationContext
    - 非 Web: AnnotationConfigApplicationContext
  - EnvironMent（**抽象环境对象***）
    - Web Reactive: StandardEnvironment
    - Web Servlet: StandardServletEnvironment
    - 非 Web: StandardEnvironment
  - 其他（不重要）
- 失败：故障分析报告
- 回调：CommandLinRunner、ApplicationRun

#### 失败分析

#### 应用特性

- SpringAplication

##### Fluent Api

```java
public static void main(String[] args) {
		// Fluent Api 在此处调用
    new SpringApplicationBuilder(DemoApplication.class)
            .web(WebApplicationType.NONE)
      			.profiles("java7")
            .run(args);
}
```

- web(). 设置Spring Boot 应用类型

#### 事件监听器

### Spring Boot 配置

#### 应用场景

- XML Bean 定义的熟悉占位符

  - spring springframework 时代已经实现了外部化配置

    - 指定配置文件地址

      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <beans xmlns="http://www.springframework.org/schema/beans"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
      
      
          <bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
              <property name="location" value="classpath:application.properties"/>
              <property name="fileEncoding" value="UTF-8"/>
          </bean>
      
      </beans>
      ```

    - 配置bean

    - ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <beans xmlns="http://www.springframework.org/schema/beans"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
        
          <bean name="users" class="com.example.demo.configuration.bean.Users">
            <property name="id" value="${users.id}"/>
            <property name="name" value="${users.name}"/>
          </bean>
        
        </beans>
      ```

    - 装载配置文件并装配bean对象

      ```java
      String[] location= {"META-INF/srping/spring-context.xml","META-INF/srping/user-context.xml"};
      ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(location);
      Users user = context.getBean("users",Users.class);
      System.err.println("user对象："+user);
      ```

  - spring Boot 时代使用注解方式自动加载方式

    - ```java
      //通过ImportResource注解指定配置文件地址。spring boot 会自动加载source目录下的application.properties文件
      @ImportResource("META-INF/srping/user-context.xml")
      @EnableAutoConfiguration
      public class XmlEnableConfigStrap {
      
          public static void main(String[] args) {
              ConfigurableApplicationContext context = new SpringApplicationBuilder(XmlEnableConfigStrap.class)
                      .web(WebApplicationType.NONE).run(args);
              Users user = context.getBean("users", Users.class);
              System.err.println("user对象：" + user);
          }
      
      }
      ```

- @Value 注入

  - ``@Value("${user.desc:helloWord}")`` 停工默认值的实现

  - 构造注入 常用于 配置bean，

    - ```java
      @EnableAutoConfiguration // 必须被@Configuration标记
      public class XmlEnableConfigStrap {
      
          private final Long id;
          private final String name;
          private final int age;
          private final String desc;
      
          public XmlEnableConfigStrap(
                  @Value("${user.id}")Long id,
                  @Value("${user.name}") String name,
                  @Value("${user.age}") int age,
                  @Value("${user.desc:helloWord}") String desc) {
              this.id = id;
              this.name = name;
              this.age = age;
              this.desc = desc;
          }
      
          @Bean
          public User user(){
              User user = new User();
              user.setId(id);
              user.setName(name);
              user.setAge(age);
              user.setDesc(desc);
              return  user;
          }
      }
      ```

  - 方法注入的方式

  - ```java
    @Bean
    public User user(
            @Value("${user.id}")Long id,
            @Value("${user.name}") String name,
            @Value("${user.age}") int age,
            @Value("${user.desc:helloWord}") String desc){
        User user = new User();
        user.setId(id);
        user.setName(name);
        user.setAge(age);
        user.setDesc(desc);
        return  user;
    }
    ```

  - 复用配置  ``@Value("${user.age:${myuser.age:32}}")`` 在配置中调用其他配置来装配自己,前提是自己这个配置不存在时，以上表达式为：user.age不存在时使用myuser.age，myuser.age也不存在时使用32

  - ```java
    @Bean
    public User user(
            @Value("${user.id}")Long id,
            @Value("${user.name}") String name,
            @Value("${user.age:${myuser.age:32}}") int age,
            @Value("${user.desc:helloWord}") String desc){
        User user = new User();
        user.setId(id);
        user.setName(name);
        user.setAge(age);
        user.setDesc(desc);
        return  user;
    }
    ```

- Environment 读取

  > Environment由SpringApplication创建，且项目中只有1个bean对象,BeanFactoryAware接口优先于EnvironmentAware接口先执行

  - Environment的获取方式

    - 方法/构造注入

      ```
      @Bean(name = "user2")
      @Autowired
      public User user2(Environment environment){
          return  user;
      }
      ```

    - 通过EnvironmentAware接口获取

      - ```java
        public class XmlEnableConfigStrap implements EnvironmentAware {
        
            private Environment environment;
        
            @Override
            public void setEnvironment(Environment environment) {
                this.environment = environment;
            }
        }
        ```

    - 通过BeanFactory查找Environment

      - ```java
        private Environment environment;
        
        @Override
        public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
            environment = beanFactory.getBean(Environment.class);
        }
        ```

  - 通过以Environment接口（Environment实际是扩展了PropertyResolver来的，内置了很多获取配置的方法）的方式获取配置

    - ```java
      @Bean(name = "user2")
      @Autowired
      public User user2(Environment environment){
          Long id = environment.getProperty("user.id", Long.class);
          String name = environment.getProperty("user.name", String.class);
          Integer age = environment.getProperty("user.age", Integer.class,
                  environment.getProperty("myuser.age",Integer.class,32));
          User user = new User();
          user.setId(id);
          user.setName(name);
          user.setAge(age);
          return  user;
      }
      ```

- ConfigurationProperty Bean 绑定

  > ``@ConfigurationProperty``支持嵌套类型的绑定，使用过set，get方法注入配置值的

  - 使用``@ConfigurationProperty``作用于类上

    - 使用``@ConfigurationProperty``设置配置属性的前缀

      ```java
      @ConfigurationProperties(prefix = "user")
      public class User {
          private Long id;
          private String name;
      }
      ```

    - 配置bean

      - 手动配置

        ```java
        @Bean
        public User user(){
            return  new User();
        }
        ```

      - 注解方式``@EnableConfigurationProperties(Class<T>)``这种方式只能使用Class类型的方式去获取User类

        ```java
        @EnableAutoConfiguration
        @EnableConfigurationProperties(User.class)
        public class ConfigurationPropertiesStap {
            public static void main(String[] args) {
                ConfigurableApplicationContext context = new SpringApplicationBuilder(ConfigurationPropertiesStap.class)
                        .web(WebApplicationType.NONE).run(args);
                System.err.println(System.getProperty("user.name"));
                User user = context.getBean( User.class);
                System.err.println("user对象：" + user);
            }
        }
        ```

  - 作用于方法上，通常在配置第三方的类时使用，jar包中的类无法修改，所以在通过方法构建时使用注解。

    - ```java
      @Bean
      @ConfigurationProperties(prefix = "user")
      public User user(){
          return  new User();
      }
      ```

  > 同时支持 @Validated 校验

  - ```java
    @Validated
    public class User {
      //检验规则
       @NotNull
      private String name;
    }
    ```

- @ConditionalOnProperty 判断

  - ```java
    @Bean
    @ConfigurationProperties(prefix = "user")
    //单独配置某个属性，name属性名称，如果配置了prefix那么带和不带前缀都可以，
    //matchIfMissing=false时，如果没有配置该字段会报错（默认为false）
    //该配置只有等于0571时，才会通过验证
    @ConditionalOnProperty(name = "name",matchIfMissing = false,havingValue = "0571")
    public User user(){
        return  new User();
    }
    ```

#### 配置来源优先级

1. Java System Properties
2. 环境变量
3. application.properties

> 查看当前上下文中的配置来源，通过environment类查看

```java
ConfigurableApplicationContext context =
        new SpringApplicationBuilder(ExtendPropertyStart.class)
        .web(WebApplicationType.NONE).run(args);
ConfigurableEnvironment environment = context.getEnvironment();

environment.getPropertySources().forEach(propertySource -> {
    System.out.printf("propertySource[名称：%s]: %s\n",propertySource.getName(),propertySource);
});
```

#### 拓展外部化配置

- 基于SpringApplicationRunListener#environment拓展（会发送 一个事件**ApplicationEnvironmentPreparedEvent**）

  > 利用工厂机制实现一个自己的 SpringApplicationRunListener 实现类，**参考spring boot的事件处理机制**

  - META-INF/spring.factories下

    ```properties
    org.springframework.boot.SpringApplicationRunListener=\
    com.example.demo.listener.ExtendPropertySourceRunListener
    ```

  - 实现接口 SpringApplicationRunListener 以及Ordered 接口（保证配置涞源的优先级），**从springboot2.0.x开始springboot拥有18种配置来源**

    ```java
    public class ExtendPropertySourceRunListener implements SpringApplicationRunListener, Ordered {
    
        private SpringApplication springApplication;
        private String[] args;
    
        public ExtendPropertySourceRunListener(SpringApplication springApplication, String[] args) {
            this.springApplication = springApplication;
            this.args = args;
        }
    
        @Override
        public void starting() {
    
        }
    
        @Override
        public void environmentPrepared(ConfigurableEnvironment environment) {
            MutablePropertySources propertySources = environment.getPropertySources();
    
    				//此处实现自己的扩展配置
            HashMap<String, Object> prepared = new HashMap<>();
            prepared.put("user.id",999);
    
            MapPropertySource mapPropertySource = new MapPropertySource("from-environmentPrepared", prepared);
    
            //添加配置源到最前面，保证优先级
            propertySources.addFirst(mapPropertySource);
        }
      
       //保证当前类的加载顺序一定在 框架 EventPublishingRunListener 类 的后面
        @Override
        public int getOrder() {
            return new EventPublishingRunListener(springApplication, args).getOrder() + 1;
        }
    
        @Override
        public void contextPrepared(ConfigurableApplicationContext context) {
    
        }
    
        @Override
        public void contextLoaded(ConfigurableApplicationContext context) {
    
        }
    
        @Override
        public void started(ConfigurableApplicationContext context) {
    
        }
    
        @Override
        public void running(ConfigurableApplicationContext context) {
    
        }
    
        @Override
        public void failed(ConfigurableApplicationContext context, Throwable exception) {
    
        }
    
    }
    ```

- 基于 EnvironmentPostProcessor 拓展

- 基于 ApplicationContextInitialized 拓展 

- 基于 SpringApplicationRunListener#contextPrepared 拓展（会发送一个事件 ApplicationPreparedEvent事件）



#### Profile

> 根据不同的环境加载不同的配置

#### 配置属性

- PropertySource

### Spring Boot Starter

#### Starter开发

#### 最佳实践

## Spring 技术栈

### 工厂加载机制

- spring framework有一种工厂加载机制，即将实现类根据接口-实现类的关系放在配置文件中，然后一次获取指定接口的多个实例

- 使用时多个实例同时使用

- 工厂实现类：SpringFactoriesLoader

  - ```java
    public static <T> List<T> loadFactories(Class<T> factoryClass, @Nullable ClassLoader classLoader) {
       Assert.notNull(factoryClass, "'factoryClass' must not be null");
       ClassLoader classLoaderToUse = classLoader;
       if (classLoaderToUse == null) {
          classLoaderToUse = SpringFactoriesLoader.class.getClassLoader();
       }
       List<String> factoryNames = loadFactoryNames(factoryClass, classLoaderToUse);
       if (logger.isTraceEnabled()) {
          logger.trace("Loaded [" + factoryClass.getName() + "] names: " + factoryNames);
       }
       List<T> result = new ArrayList<>(factoryNames.size());
       for (String factoryName : factoryNames) {
          result.add(instantiateFactory(factoryName, factoryClass, classLoaderToUse));
       }
       AnnotationAwareOrderComparator.sort(result);
       return result;
    }
    ```

- spring.factories

  - 在spring boot的源码目录下有这样一份文件：spring-boot-source\spring-boot-project\spring-boot-autoconfigure\src\main\resources\META-INF\spring.factories，可以看到这份文件有两类内容：

    1.一对多键值对的方式记录了一些接口/抽象类与实现类的关系

### IOC控制反转

所有的类的创建、销毁都由`spring`来控制，也就是说控制对象生存周期的不再是引用它的对象，而是`spring`，

对于某个具体的对象而言，以前是它控制其他对象，现在是所有对象都被`spring`控制，所以这叫控制反转。

### 依赖注入

这一点是通过`DI`（`Dependency Injection`，依赖注入）来实现的。比如`对象A`需要操作数据库，以前我们总是要在`A`中自己编写代码来获得一个`Connection`对象，有了 `spring`我们就只需要告诉`spring`，`A`中需要一个`Connection`，至于这个`Connection`怎么构造，何时构造，`A`不需要知道。在系统运行时，`spring`会在适当的时候制造一个`Connection`，然后像打针一样，注射到`A`当中，这样就完成了对各个对象之间关系的控制。`A`需要依赖 `Connection`才能正常运行，而这个`Connection`是由`spring`注入到`A`中的，依赖注入的名字就这么来的。

#### BeanFactory和ApplicationContext

> 两者的关系图，`ApplicationContext`是`BeanFactory`的子类，所以，`ApplicationContext`可以看做更强大的`BeanFactory`，他们两个之间的区别如下

![image-20191023092426204](/Users/luohengyi/Library/Application Support/typora-user-images/image-20191023092426204.png)

- `BeanFactory`。基础类型`IoC容器`，提供完整的`IoC`服务支持。如果没有特殊指定，**<u>默认采用延迟初始化策略</u>**（`lazy-load`）。只有当客户端对象需要访问容器中的某个受管对象的时候，才对该受管对象进行初始化以及依赖注入操作。所以，相对来说，容器启动初期速度较快，所需要的资源有限。对于资源有限，并且功能要求不是很严格的场景，`BeanFactory`是比较合适的`IoC容器`选择。

- `ApplicationContext`。`ApplicationContext`在`BeanFactory`的基础上构建，是相对比较高级的容器实现，除了拥有`BeanFactory`的所有支持，`ApplicationContext`还提供了其他高级特性，比如<u>**事件发布、国际化信息支持**等</u>，`ApplicationContext`所管理的对象，<u>**在该类型容器启动之后，默认全部初始化并绑定完成**</u>。所以，相对于`BeanFactory`来说，`ApplicationContext`要求更多的系统资源，同时，因为在启动时就完成所有初始化，容器启动时间较之`BeanFactory`也会长一些。在那些系统资源充足，并且要求更多功能的场景中，`ApplicationContext`类型的容器是比较合适的选择。

#### 一个接口多个实现

通过``@Autowired``是通过类型来判断的，这时可以加上``@Qualifier(name)``同时满足名称相同,``@Component``上可以标记名称，所以由其衍生出来的注解也阔以指定bean的名称