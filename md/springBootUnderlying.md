# SpringBoot

## 三大特性

### 组件自动配装

1. 激活自动装配：@EnableAutoConfiguration
2. 配置：/META-INF/spring.factories
3. 实现：XXXAutoConfiguration

#### 获取IOC中的Bean

```java
//实现ApplicationContextAware接口，通过setApplicationContext实现ApplicationContext的注入，通过ApplicationContextAware获取ioc中的bean
@Component
public class Application implements ApplicationContextAware {

    private static ApplicationContext applicationContext;
    //通过setApplicationContext方法注入 ApplicationContext类
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        if(Application.applicationContext == null) {
            Application.applicationContext = applicationContext;
        }
    }

    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    public static Object getBean(String name){
        return getApplicationContext().getBean(name);
    }

    public static <T> T getBean(Class<T> clazz){
        return getApplicationContext().getBean(clazz);
    }

    public static <T> T getBean(String name,Class<T> clazz){
        return getApplicationContext().getBean(name, clazz);
    }


}
```

#### 走向自动化装配

##### @Enable 模块化装配

##### 基于注解驱动方式

```java
//注解
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Repository
@Import(Config.class)
public @interface FirstLevelRepository {

    String value() default "";
}

//配置类
public class Config {

    @Bean
    public String Name(){
        return "cs";
    }
}

//使用@FirstLevelRepository时Config下的配置bean会被自动加载进来，这也是
@Configuration
@FirstLevelRepository
public class AuthConfiguration {

}


```

##### 基于接口方式实现

```java
//注解
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Repository
@Import(ConfigSelector.class)
public @interface FirstLevelRepository {

    String value() default "";
}

//配置类，这里不在需要@Configuration了
public class Config {

    @Bean
    public String Name(){
        return "cs";
    }
}

//接口实现方式
import org.springframework.context.annotation.ImportSelector;
public class ConfigSelector implements ImportSelector {
    @Override
    public String[] selectImports(AnnotationMetadata annotationMetadata) {
        return new String[]{HelloBean.class.getName()};
    }
}

```



##### 条件装配

```java
@Service
@Profile("java8")
public class IndexService {
}

@Service
@Profile("8")
public class IndexService {
}
//通过配置 spring.profiles.active属性决定自动注入那个一类型
spring.profiles.active=java8
```

##### 基于编程方式实现条件装配

1. 申明自定义注解

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

2. 编程方式实现条件判断

3. ```java
   import org.springframework.context.annotation.Condition;
   public class MyCondition implements Condition {
       @Override
       public boolean matches(ConditionContext conditionContext, AnnotatedTypeMetadata annotatedTypeMetadata) {
           Map<String, Object> annotationAttributes = annotatedTypeMetadata.getAnnotationAttributes(ConditionSystem.class.getName());
           String name = (String)annotationAttributes.get("name");
           Object value = annotationAttributes.get("value");
           return name.equals("我");
       }
   }
   ```

   

##### 自动装配（没太明白）

1. 定义实现类

   ```java
   @Configuration
   @EnableAutoConfiguration  //自动装配
   @FirstLevelRepository  //通过模块化（接口方式）装配bean
   @ConditionSystem(name = "我",value = "asdad") //条件话装配这个类
   public class AuthConfiguration {
   
   }
   ```

2. 配置文件

   1. META-INFO/spring.factories

   2. ```properties
      org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
      com.imooc.diveinspringboot.config.AuthConfiguration
      
      ```

3. 理解使用@EnableAutoConfiguration注解后，spring会去META-INFO/spring.factories查找配置文件中`org.springframework.boot.autoconfigure.EnableAutoConfiguration`对应的配置项加载进来

### 嵌入式web容器

#### 切换容器

1. jetty

2. ```xml
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
           </dependency> 
   ```

3. webflux：如果要使用webflux容器那么需要注视所有传统容器的依赖，并且servelet相关的内容无法使用了

   1. ```xml
      <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-webflux</artifactId>
      </dependency>
      ```

#### 嵌入式容器限制

| Servlet特性                 | 兼容性   | 解决方案                  |
| --------------------------- | -------- | ------------------------- |
| web.xml                     | 不支持   | RegistrationBean或@bean   |
| servletContainerInitializer | 不支持   | servletContextInitializer |
| @webServlet等               | 有限支持 | 依赖@servletComponentScan |

1. servletContextInitializer:

   1. ```java
      @Bean
          public ServletContextInitializer servletContextInitializer(){
      
              return servletContext -> {
                  CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
                  FilterRegistration.Dynamic filter = servletContext.addFilter("filter", characterEncodingFilter);
      //            filter.addMappingForUrlPatterns(); //此处去动态的添加servlet组件
              };
          }
      
      ```

      

### 生产准备特性（指标，健康检查，外部化配置）

###  

## Spring生命周期

### Spring Boot 启动阶段

#### 推断 web应用类型和主引导类

#### 自定义SpringBootApplication

1. ```java
   SpringApplication springApplication = new SpringApplication(DiveInSpringBootApplication.class);
          //关闭在启动时控制台显示的spring字符
          springApplication.setBannerMode(Banner.Mode.OFF);
          //设置条件装配类型
          springApplication.setAdditionalProfiles("prod");
          //设置是否是web类型
          springApplication.setWebApplicationType(WebApplicationType.NONE);
     
          springApplication.run();
   ```

   

#### 配置 spring Bean 来源

1. 通过注解类加载
2. 通过xml配置文件

#### 加载 应用上下文初时器 和 应用事件监听器

### Spring Mvc运行阶段

#### DispatcherServlet

##### handlemapping

1. 根据配置以及请求参数查找对应的handle并返回

##### handleAdapter

1. 执行查找到的handle并且返回ModelAndview

##### viewResolver

1. 解析之心handle并且返回ModelAndview返回的view，最后放入响应中

##### handleExceptionResolver

1. 解析异常

## spring mvc 常用注解

1. `@ModelAttribute` 会在请求方法之前调用，应用：提前绑定数据到 Model 域中，如果后续方法使用同样的参数名，将会覆盖@ModelAttribute注解方法中添加到Model域中的数据

   1. ```java
           //在视图中直接访问pojo  方式1
       		@ModelAttribute
           public void initpojo(Model mode)
           {
               PojoTest pojo=new PojoTest(null, "小明", "男");
               mode.addAttribute("pojo", pojo);
           }
       
       		//在视图中直接访问pojo  方式2
       		@ModelAttribute("pojo")
           public void initpojo()
           {
               PojoTest pojo=new PojoTest(null, "小明", "男");
               mode.addAttribute("pojo", pojo);
           }
      ```

2. `@RequestHeader` 获取请求头信息

   1. ```java
      public String hello(@RequestHeader(value="User-Agent") String userAgent)
      
      	//..
      }
      
      ```

3. `@CookieValue` 获取Cookie信息

   1. ```java
      public String hello(@CookieValue(value="User-Agent") String userAgent)
      
      	//..
      }
      
      ```

4. `@ExceptionHandler` 捕获Handler中的异常

   ```java
   @ExceptionHandler(Exception.class) //需要捕获的异常类型
   @ResponseBody //直接输出
   public String exceptionHandler(Exception e){
     return e.getMessage();
   }
   //方式2
   @ExceptionHandler(Exception.class)
   public ResponseEntity exceptionHandler(Exception e){
     return ResponseEntity.ok(e.getMessage());
   }
   
   ```

   

5. @ControllerAdvice` 控制器增强器，可以用于定义@ExceptionHandler、@InitBinder、@ModelAttribute，并应用到所有@RequestMapping中

   1. ```java
      package com.sam.demo.controller;
      
      import org.springframework.ui.Model;
      import org.springframework.web.bind.WebDataBinder;
      import org.springframework.web.bind.annotation.*;
      import java.util.HashMap;
      import java.util.Map;
      
      /**
       * controller 增强器
       * @author sam
       * @since 2017/7/17
       * ControllerAdvice有作用域范围的定义例如：
       * @ControllerAdvice(basePackages = "com.websocket.controller") 该包中的所有控制器，
       		注解中包含多个设置方式：
          @AliasFor("basePackages")
          String[] value() default {};
      
          @AliasFor("value")
          String[] basePackages() default {};
      
          Class<?>[] basePackageClasses() default {};
      
          Class<?>[] assignableTypes() default {};
      
          Class<? extends Annotation>[] annotations() default {};
       */
      @ControllerAdvice
      public class MyControllerAdvice {
      
          /**
           * 应用到所有@RequestMapping注解方法，在其执行之前初始化数据绑定器
           * @param binder
           */
          @InitBinder
          public void initBinder(WebDataBinder binder) {}
      
          /**
           * 把值绑定到Model中，使全局@RequestMapping可以获取到该值
           * @param model
           */
          @ModelAttribute
          public void addAttributes(Model model) {
              model.addAttribute("author", "Magical Sam");
          }
      
          /**
           * 全局异常捕捉处理
           * @param ex
           * @return
           */
          @ResponseBody
          @ExceptionHandler(value = Exception.class)
          public Map errorHandler(Exception ex) {
              Map map = new HashMap();
              map.put("code", 100);
              map.put("msg", ex.getMessage());
              return map;
          }
      
      }
      
      ```

6. `@RestController = @Controller + @ResponseBody `

7. 

## Spring mvc 自动装配

1. 是现实原理：servlet中的servletContainerInitializer 接口中的startUp方法会被回调，其中有一个参数为ServletContext 改接口可以实现动态的添加web组件：例如servlet ， filter，listenter	

2. spring 实现Spring mvc 自动装配

   1. 配置 dispatcherServlet

   ![image-20190513221434563](/Users/luohengyi/web/TakeDown-/md/image-20190513221434563.png)

3. 配置扫描地址

   ![image-20190513221747639](/Users/luohengyi/web/TakeDown-/md/image-20190513221747639.png)

## Spring MVC REST 流程

1. 

## servlet

### servlet 简介

#### servlet核心API

| 核心组件API                               | 说明                         | 起始版本 | Spring Framework 代表实现         |
| ----------------------------------------- | ---------------------------- | -------- | --------------------------------- |
| Javax.servlet.Servlet                     | 动态内容组件                 | 1.0      | DispatcherServlet                 |
| Javax.servlet.Filter                      | 过滤器                       | 2.3      | CharacterEncodingFilter           |
| Javax.servlet.ServletContext              | Servlet 应用上下文           |          |                                   |
| Javax.servlet.AsyncContext                | 异步上下文                   | 3.0      | 无                                |
| Javax.servlet.ServletContextListener      | ServletContext生命周期监听器 | 2.3      | ContextLoaderListener             |
| Javax.servlet.ServletRequestListener      | ServletRequest生命周期监听器 | 2.3      | RequestContextListener            |
| Javax.servlet.http.HttpSessionListener    | HttpSession 生命周期监听     | 2.3      | HttpSessionMutextListener         |
| Javax.servlet.AsyncListener               | 异步上下文监听器             | 3.0      | StandarServletAsyncWebRequest     |
| Javax.servlet.ServletContainerInitializer | Servlet 容器初始化器         | 3.0      | SpringServletContainerInitializer |

#### 异步servlet

```java
@WebServlet(
        asyncSupported = true, //开启异步支持
        name = "asyncServlet",
        urlPatterns = "/asyncServlet"
)
public class AsyncServlet extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.isAsyncStarted()){ //判断是否支持异步
            //创建异步上下文
            AsyncContext asyncContext = req.startAsync();
            //动态添加监听器
            asyncContext.addListener(new AsyncListener() {
                @Override
                public void onComplete(AsyncEvent asyncEvent) throws IOException {
                    printIn("执行完成");
                }

                @Override
                public void onTimeout(AsyncEvent asyncEvent) throws IOException {
                    printIn("执行超时");
                }

                @Override
                public void onError(AsyncEvent asyncEvent) throws IOException {
                    printIn("执行错误！ ");
                }

                @Override
                public void onStartAsync(AsyncEvent asyncEvent) throws IOException {
                    printIn("开始执行 ");
                }
            });
            ServletResponse response = asyncContext.getResponse();
            response.setContentType("text/plain;charset-UTF-8");
            PrintWriter writer = response.getWriter();
            writer.println("hello word");
            writer.flush();

        }else {
            System.out.println("不支持异步");
        }
    }

    static void printIn(Object object){
        String name = Thread.currentThread().getName();
        System.out.println("AsyncServlet  ["+name+"]:"+object);
    }
}

```



#### spring对servlet 异步支持

1. 应用场景

   1. 对于有的请求业务处理流程可能比较耗时，比如长查询，远程调用等，主线程会被一直占用，而tomcat线程池线程有限，处理量就会下降
   2. servlet3.0以后提供了对异步处理的支持，springmvc封装了异步处理，满足用户请求后，主线程很快结束，并开启其它线程处理任务，并将处理结果响应用户，而主线程就可以接收更多请求。

2. 配置

   ```xml
   <!--mvc配置-->
   <servlet>
   <servlet-name>springMVC</servlet-name>
   <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
   <init-param>
   <param-name>contextConfigLocation</param-name>
   <param-value>classpath:spring/spring-mvc.xml</param-value>
   </init-param>
   <load-on-startup>1</load-on-startup>
   <!--在此处增加异步支持 spring boot 默认开启-->
   <async-supported>true</async-supported>
   </servlet>
   
   ```

3. BlockingQueue 队列方式

   ```
    @EnableScheduling
    public class IndexController {
    private final BlockingQueue<DeferredResult<String>>  queue = new ArrayBlockingQueue<>(5);
    	//异步处理
    @Scheduled(fixedRate = 5000)
    public void process() throws InterruptedException {
        DeferredResult<String> deferredResult = null;
        do {
            deferredResult = queue.take();
            long timeOut = new Random().nextInt(100);
            //模拟调用相关接口的等待时间
            Thread.sleep(timeOut);
    
            deferredResult.setResult("hello.word");
            printIn("异步调用消耗："+timeOut);
        }while (null != deferredResult);
    
    }
    
    @GetMapping("/async")
    public DeferredResult<String> async(){
        //谁知超时时间
        DeferredResult<String> deferredResult = new DeferredResult<>(50L);
        queue.offer(deferredResult);
        printIn("普通业务");
        deferredResult.onCompletion(()->{
            printIn("执行结束");
        });
    
        deferredResult.onTimeout(()->{
            printIn("执行超时了");
        });
        return deferredResult;
    }
    
    static void printIn(Object object){
        String name = Thread.currentThread().getName();
        System.out.println("Controller["+name+"]:"+object);
    }
   
   ```

4. completableFuture 方式

   1. ```java
      @GetMapping("/completableFuture")
      public CompletionStage<String> completableFuture(){
          printIn("请求业务");
          return CompletableFuture.supplyAsync(()->{
              printIn( "hello word");
              return "hello word";
          });
      }
      
      ```

5. Callable方式

```java
 @GetMapping("/callable")
public Callable<String> callable() throws InterruptedException {
  printIn("请求业务");
  return ()->{
    //此处的业务将交给副线程去处理，Callable返回结果，SpringMVC将请求front/test重新派发给容器(再重新请求一次front/test)，恢复之前的处理；DispatcherServlet重新被调用，将结果返回给用户
    printIn( "hello word");
    return "hello word";
  };
}

```







### Spring servlet web

### Spring Boot servlet web

## WebFlux

### Reactive

1. 异步非阻塞
2. 提升程序性能
3. 解决传统模式遇到的问题
4. **Reactive编程是一种事件驱动 异步化 弹性扩展的新型编程方式**

#### RxJava

#### Reactor

#### Flow Api (java 9)