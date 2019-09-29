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

### 组件自动装配

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

- 创建：应用上下文、EnvironMent（**抽象环境对象***）、其他（不重要）
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