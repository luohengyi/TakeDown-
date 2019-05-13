# Spring 

## ioc容器

### 配置文件 

1. xxx.xml

   1. ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <beans xmlns="http://www.springframework.org/schema/beans"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
      
      	<!--  配置需要托管的对象 -->
          <!-- 默认单利模式   scope="prototype"设置为不是单利 -->
          <bean id="u" class="com.lhy.bean.User"></bean>
      
      
      </beans>
      ```

### 使用ioc容器



#### 控制反转

1. ioc的历史

   1. ```java
      //方式1 需要传入绝对路径然后通过工厂去创建bean对象
      Resource resource = new FileSystemResource("/Users/luohengyi/IdeaProjects/springDemo/target/classes/mybatis.xml");
      XmlBeanFactory xmlBeanFactory = new XmlBeanFactory(resource);
      UserService userService = (UserService) 
          
       //方式2 只需要传入配置文件名，但是还是要通过工厂去创建bean
              ClassPathResource classPathResource = new ClassPathResource("mybatis.xml");
              XmlBeanFactory xmlBeanFactory =new XmlBeanFactory(classPathResource);
              UserService userService = (UserService) xmlBeanFactory.getBean("userService");
              List<User> userList = userService.getUserList();
              for (User user : userList) {
                  System.out.println(user);
              }
      //方式3 传入配置对象，直接通过 ClassPathXmlApplicationContext 获取bean对象
             ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("mybatis.xml");
              UserService userService = (UserService) context.getBean("userService");
              List<User> userList = userService.getUserList();
              for (User user : userList) {
                  System.out.println(user);
              }
      ```

      

1. 将对象的创建交给spring叫控制反转

1. ```java
   <!-- 加载配置文件， -->
    ClassPathXmlApplicationContext context =
    new ClassPathXmlApplicationContext("applicationContext.xml");
   <!-- 使用该类生成对象 ,默认是单例对象，这里的u是配置中bean标签的id -->
   <!-- 无参方法构建 -->
    User user = (User) context.getBean("u");
   <!-- 在获取对象时，指定对象类型，从而不再强转对象类型 -->
    User user = context.getBean("u",User.class);
   
   ```

#### 依赖注入

1. xml配置： 

   1. 外一种方法是使用一个或多个的`<import/>`元素来从另外一个或多个文件加载bean定义。所有的`<import/>`元素必须放在`<bean/>`元素之前以完成bean定义的导入。 根据Spring XML配置文件的Schema(或DTD)，被导入文件必须是完全有效的XML bean定义文件，且根节点必须为`<beans/>` 元素。

   2. ```xml
      <!-- set方法注入 本质调用get，set方法--> 
      <bean id="u2" class="com.lhy.bean.User">
              <property name="id" value="2"></property>
              <property name="password" value="123"></property>
              <property name="username" value="123"></property>
        </bean>
      
      <!-- 构造注入类型必须匹配可以传入null -->
      <bean id="u3" class="com.lhy.bean.User">
              <constructor-arg value="10"></constructor-arg>
              <constructor-arg value="123"></constructor-arg>
              <constructor-arg value="sfsf"></constructor-arg>
      </bean>
      
      <!-- 静态代码块的依赖 -->
      <bean id="beanOne" class="ExampleBean" depends-on="manager,accountDao">
        <property name="manager" ref="manager" />
      </bean>
      
      ```

2. 使用注入方式创建对象

   1. `User user = (User) context.getBean("u2");`

3. 注解方式自动注入该对象

   1. ```java
      @Autowired
      private UserService userService;
      // 但是需要在 配置文件中声明 
         //<!-- 指定要加载类的包 -->
         //<context:component-scan base-package="com.rimi.controller,com.rimi.service"/>
      ```

#### 工厂方法创建对象

1. bean对象提供工厂方法 

   1. ```java
      //工厂方法是静态方法
      public static User init(){
              return new User();
      }
      ```

2. 配置：

   1. ```xml
      <!-- 要配置工厂方法，默认也是单例= -->
      <bean id="u4" class="com.lhy.bean.User" factory-method="init">
       </bean>
      ```

#### 通过工厂类创建对象

1. 通过一个工厂类创建需要创建的对象

   ```xml
   <!-- 通过BeanFactory创建 User-->
   <bean id="factory"  class="com.lhy.bean.BeanFactory" ></bean>
   <!-- 指定工厂类，这里的工厂需要使用bean配置的那个id 指定工厂方法，这个工厂方法是动态的 -->
   <bean id="u5" class="com.lhy.bean.User" factory-bean="factory" factory-method="getUser"></bean>
   ```

### IOC容器特性

1. 加载bean的加载方式：
   1. spring中默认所有的bean会在初始化spring时急切的加载
   2. 通过在bean标签上修改 lazy-init属性来确认是否延迟加载
   3. 通过注解的方式（注解默认true）：@Lazy

## jdbc

1. 使用ioc容器管理从service层到db层的依赖关系

   ```xml
    <!--配置数据源 链接池-->
       <bean id="dataSources" class="com.alibaba.druid.pool.DruidDataSource">
           <property name="driverClassName"  value="com.mysql.cj.jdbc.Driver"></property>
           <property name="url" value="jdbc:mysql://127.0.0.1/JavaLibrary"></property>
           <property name="username" value="root"></property>
           <property name="password" value="123123"></property>
       </bean>
       <!-- ,依赖于DruidDataSource类去获取链接 -->
       <bean id="jdbcTemplete" class="org.springframework.jdbc.core.JdbcTemplate">
           <property name="dataSource" ref="dataSources"></property>
       </bean>
   	<!-- 依赖于jdbctemplete类去执行sql语句 -->
   	<bean id="userDao" class="com.lhy.dao.UserDao">
           <property name="jdbcTemplate" ref="jdbcTemplete"></property>
       </bean>
   	<!-- 依赖于userDao类去获取数据库数据 -->
       <bean id="userService" class="com.lhy.Service.UserService">
           <property name="userDao"  ref="userDao"></property>
       </bean>
   
   ```

1. 使用

2. ```java
   public class UserDao {
       private JdbcTemplate jdbcTemplate;
   
       public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
           this.jdbcTemplate = jdbcTemplate;
       }
   
       public List<User> getUserlist(){
           //使用spring jdbc
           List<Map<String, Object>> userlist = jdbcTemplate.queryForList("select * from users");
           List<User> users = new ArrayList<>();
           for (Map<String, Object> stringObjectMap : userlist) {
               int id = (int) stringObjectMap.get("id");
               String username = (String) stringObjectMap.get("username");
               String password = (String) stringObjectMap.get("password");
               User user = new User(id,username,password);
               users.add(user);
           }
           return users;
       }
   }
   
   ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("mybatis.xml");
   //使用ioc控制反转直接获取service层
   UserService userService = (UserService) context.getBean("userService");
   List<User> userList = userService.getUserList();
   for (User user : userList) {
       System.out.println(user);
   }
   ```

## Sping整合mybatis

## SpringMvc   MMS（整合）

### 依赖包：

1. ```xml
    <!-- https://mvnrepository.com/artifact/org.springframework/spring-webmvc -->
           <dependency>
               <groupId>org.springframework</groupId>
               <artifactId>spring-webmvc</artifactId>
               <version>5.1.3.RELEASE</version>
           </dependency>
           <!-- https://mvnrepository.com/artifact/org.mybatis/mybatis-spring -->
           <dependency>
               <groupId>org.mybatis</groupId>
               <artifactId>mybatis-spring</artifactId>
               <version>1.3.2</version>
           </dependency>
       
           <!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
           <dependency>
               <groupId>org.mybatis</groupId>
               <artifactId>mybatis</artifactId>
               <version>3.4.6</version>
           </dependency>
           <!-- https://mvnrepository.com/artifact/com.alibaba/druid 数据库链接 -->
           <dependency>
               <groupId>com.alibaba</groupId>
               <artifactId>druid</artifactId>
               <version>1.1.12</version>
           </dependency>
       
           <!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java 数据库驱动s -->
           <dependency>
               <groupId>mysql</groupId>
               <artifactId>mysql-connector-java</artifactId>
               <version>5.1.47</version>
           </dependency>
       
           <!-- https://mvnrepository.com/artifact/org.springframework/spring-jdbc -->
           <dependency>
               <groupId>org.springframework</groupId>
               <artifactId>spring-jdbc</artifactId>
               <version>5.1.3.RELEASE</version>
           </dependency>
       
           <!-- https://mvnrepository.com/artifact/com.alibaba/fastjson -->
           <dependency>
               <groupId>com.alibaba</groupId>
               <artifactId>fastjson</artifactId>
               <version>1.2.54</version>
           </dependency>
       
           <!-- https://mvnrepository.com/artifact/org.mybatis.generator/mybatis-generator-core -->
           <dependency>
               <groupId>org.mybatis.generator</groupId>
               <artifactId>mybatis-generator-core</artifactId>
               <version>1.3.7</version>
           </dependency>
       
           <!-- 表达式 https://mvnrepository.com/artifact/javax.servlet.jsp.jstl/jstl -->
           <dependency>
               <groupId>javax.servlet.jsp.jstl</groupId>
               <artifactId>jstl</artifactId>
               <version>1.2</version>
           </dependency>
       
           <!-- https://mvnrepository.com/artifact/javax.servlet/javax.servlet-api -->
           <dependency>
               <groupId>javax.servlet</groupId>
               <artifactId>javax.servlet-api</artifactId>
               <version>4.0.1</version>
               <scope>provided</scope>
           </dependency>
           <!-- jsp 的三个包 jstl -->
           <dependency>
               <groupId>javax.servlet.jsp.jstl</groupId>
               <artifactId>jstl</artifactId>
               <version>1.2</version>
           </dependency>
           <!-- jstl-api -->
           <dependency>
               <groupId>javax.servlet.jsp.jstl</groupId>
               <artifactId>jstl-api</artifactId>
               <version>1.2</version>
           </dependency>
           <!-- jstl-impl -->
           <dependency>
               <groupId>org.glassfish.web</groupId>
               <artifactId>jstl-impl</artifactId>
               <version>1.2</version>
           </dependency>
    ```


### 配置：

#### web.xml   拦截器配置

1. ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
            version="4.0">
       <!-- 配置核心 servlet 分发器 -->
       <servlet>
           <servlet-name>springMvc</servlet-name>
           <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
           <!-- 初始化加载配置文件（springmvc和mybatis的配置）  内容有：控制器，services地址等 -->
           <init-param>
               <param-name>contextConfigLocation</param-name>
               <param-value>classpath:spring/spring-*.xml</param-value>
           </init-param>
           <!-- 启东时加载这个对象 -->
           <load-on-startup>1</load-on-startup>
       </servlet>
       <!-- 拦截所有的路径 -->
       <servlet-mapping>
           <servlet-name>springMvc</servlet-name>
           <url-pattern>/</url-pattern>
       </servlet-mapping>
   </web-app>
   ```

#### spring-mvc.xml配置

1. ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:mvc="http://www.springframework.org/schema/mvc"
          xmlns:context="http://www.springframework.org/schema/context"
          xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
       <mvc:annotation-driven>
   
           <mvc:message-converters>
               <!-- 消息转换器 同意处理json格式数据 -->
               <bean class="com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter">
                   <property name="defaultCharset" value="UTF-8"/>
                   <property name="supportedMediaTypes">
                       <list>
                           <value>text/html;charset=utf-8</value>
                           <value>application/json</value>
                       </list>
                   </property>
               </bean>
           </mvc:message-converters>
       </mvc:annotation-driven>
   
       <!-- 视图解析器  -->
       <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
           <!-- 前缀 -->
           <property name="prefix" value="/WEB-INF/"/>
           <!-- 后缀 -->
           <property name="suffix" value=".jsp"/>
       </bean>
        <!--  -->
       <!-- spring核心分发servlet拦截的静态资源放行 新版本中 mapping="/static/**" location="/static/"location中不需要带*  -->
       <mvc:resources mapping="/static/**" location="/static/*"/>
       <!-- 控制器的包名，services的包名，如果要 @Autowired 注解注入必须配置包的地址 -->
       <context:component-scan base-package="com.lhy.controller,com.lhy.services"/>
   </beans>
   ```

##### spring-mvc.java

//以bean的方式配置试图解析器，但是component-scan的xml配置也需要

```java
@Configuration
@EnableWebMvc
public class Cs {
    @Bean
    public ViewResolver getViewResolver(){
        ViewResolver viewResolver = new InternalResourceViewResolver();
        ((InternalResourceViewResolver) viewResolver).setPrefix("/WEB-INF/");
        ((InternalResourceViewResolver) viewResolver).setSuffix(".jsp");
        return viewResolver;
    }
}
```



#### spring-mybatis.xml 配置

1. ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:context="http://www.springframework.org/schema/context"
          xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
   
       <!-- 使用properties的方式加载jdbc配置 -->
       <context:property-placeholder location="classpath:jdbc.properties"/>
       <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
           <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
           <property name="url" value="${jdbc.url}"/>
           <property name="username" value="${jdbc.username}"/>
           <property name="password" value="${jdbc.password}"/>
       </bean>
   
       <!-- sqlSession工厂类 -->
       <bean id="sessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
           <!-- 数据源 -->
           <property name="dataSource" ref="dataSource"/>
           <!-- mapper.xml地址 -->
           <property name="mapperLocations" value="classpath:mapper/*.xml"/>
       </bean>
       <!-- 加载mapper接口 -->
       <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
           <property name="sqlSessionFactoryBeanName" value="sessionFactory"/>
           <property name="basePackage" value="com.lhy.mapper"/>
       </bean>
   
   </beans>
   ```

#### 控制器

1. ```java
   package com.lhy.controller;
   
   import com.lhy.bean.User;
   
   import com.lhy.services.UserService;
   
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.stereotype.Controller;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.ResponseBody;
   
   import java.util.List;
   
   /**
    * @author luohengyi
    */
   @Controller
   public class IndexController {
   
   	//通过注解的方式 自动注入，不需要在mapper中配置了，但是实现类中必须添加注解@Service
       @Autowired
       private UserService userService;
   
       @RequestMapping("/index")
       public String index() {
           List<User> userAll = userService.getUserAll();
           for (User user : userAll) {
               System.out.println(user);
           }
           return "index";
       }
   
       @RequestMapping("json")
       //返回一个json数据，返回类型object在springMvc.xml对象管理器中统一对json数据处理
       @ResponseBody
       public Object json(){
           List<User> userAll = userService.getUserAll();
           return userAll;
       }
   }
   
   ```

#### Services(业务层)

1. ```java
   package com.lhy.services;
   
   import com.lhy.bean.User;
   import com.lhy.mapper.UserMapper;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.stereotype.Service;
   
   import java.util.List;
   
   /**
    * @author luohengyi
    */
   @Service
   public class UserService {
   	
       //通过注解 依赖注入，这个因为底层是mybatis,交给mybatis-spring去处理的，所有不需要@Services实现类了
       @Autowired
       private UserMapper userMapper;
   
       public List<User> getUserAll(){
           return userMapper.getAllUser();
       }
   }
   ```

## 常用注解

1. @Controller 当前类是一个控制器

2. @ResponseBody 当前方法返回的是一个json数据格式而不是一个页面

3. @RestController  // 同时开启 @Controller 和@ResponseBody

4. 将类教给spring管理（标记为bean对象）
   1. @Component	最普通的组件，可以被注入到spring容器进行管理
      @Repository	        作用于持久层，接口类
      @Service	        作用于业务逻辑层
      @Controller	        作用于表现层（spring-mvc的注解）

5. @Autowired   一个类，俩个实现类，Autowired就不知道注入哪一个实现类

6. @Resource  而Resource有name属性，可以区分。

7. @bean

   1. 下面是@Configuration里的一个例子

      ```java
      @Configuration
      public class AppConfig {
      
          @Bean
          public TransferService transferService() {
              return new TransferServiceImpl();
          }
      
      }
      ```

      这个配置就等同于之前在xml里的配置

      ```java
      <beans>
          <bean id="transferService" class="com.acme.TransferServiceImpl"/>
      </beans>
      ```

## spring 组建

### 模版引擎：thymeleaf

#### 依赖

1. ```xml
   <!-- 模板引擎 -->
   <dependency>
     <groupId>org.thymeleaf</groupId>
     <artifactId>thymeleaf</artifactId>
       <version>3.0.11.RELEASE</version>
   </dependency>
   <!-- thymeleaf-spring的版本需要对应spring的版本信息 -->
   <dependency>
     <groupId>org.thymeleaf</groupId>
     <artifactId>thymeleaf-spring5</artifactId>
     <version>3.0.11.RELEASE</version>
   </dependency>
   ```

#### 配置 spring-mvc.xml:

1. ```xml
   <bean id="templateResolver" class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">
       <!-- 前缀 -->
       <property name="prefix" value="/WEB-INF/page/"/>
       <!-- 后缀 以html结尾 -->
       <property name="suffix" value=".html"/>
       <!-- 模板类型 -->
       <property name="templateMode" value="HTML"/>
       <!-- 关闭缓存 -->
       <property name="cacheable" value="false"/>
       <property name="characterEncoding" value="UTF-8"/>
   </bean>
   
   <!-- 引擎 -->
   <bean id="templateEngine" class="org.thymeleaf.spring5.SpringTemplateEngine">
       <!-- 制定模板解析器 -->
       <property name="templateResolver" ref="templateResolver"/>
   </bean>
   <!-- thymeleaf视图解析器 -->
   <bean class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
       <!-- 制定使用的引擎 -->
       <property name="templateEngine" ref="templateEngine"/>
       <property name="characterEncoding" value="UTF-8"/>
   </bean>
   ```

### 文件解析器

#### 配置 spring-mvc.xml:

1. ```xml
   <!-- 文件解析器 -->
   <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
       <!-- 最大文件上传大小 -->
       <property name="maxUploadSize" value="10240000"/>
       <!-- 编码 -->
       <property name="defaultEncoding" value="UTF-8"/>
   </bean>
   ```

#### 使用文件解析器

1. ```java
   @RequestMapping("/upload")
   //声明文件表单的名字
   public String upload(@RequestParam("fileName") CommonsMultipartFile file)  {
       try {
           file.transferTo(new File("d://"+file.getOriginalFilename()));
           //文件上传成功
       } catch (IOException e) {
           e.printStackTrace();
           //文件上传
       }
       return "";
   }
   ```

#### 文件下载

1. ```java
   @RequestMapping("/download")
   public ResponseEntity<byte[]> download(String fileName) throws IOException {
       HttpHeaders httpHeaders=new HttpHeaders();
       //告诉浏览器 以什么格式打开该文件
       httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
       //设置文件下载名称
       httpHeaders.setContentDispositionFormData("attachment",fileName);
       return new ResponseEntity<>(FileUtils.readFileToByteArray(new File("d://111.xls")),httpHeaders, HttpStatus.CREATED);
   }
   ```

### 拦截器：HandlerInterceptor

#### 配置 spring-mvc.xml	：

1. ```xml
   <!-- 拦截器 -->
   <mvc:interceptors>
       <mvc:interceptor>
           <!-- 拦截范围 -->
           <mvc:mapping path="/**"/>
           <!-- 放行登陆页面-->
           <mvc:exclude-mapping path="/login.html"/>
           <mvc:exclude-mapping path="/static/**"/>
           <mvc:exclude-mapping path="/code.jpg"/>
           <mvc:exclude-mapping path="/login"/>
           <!-- 制定拦截器类 将bean放在外层通过ref标签引入，获取直接将bean放在此处 -->
           <!--<ref bean="loginInter"/>-->
           <bean class="com.rimi.interceptor.LoginInterCeptor"/>
       </mvc:interceptor>
   
   </mvc:interceptors>
   ```

#### 实现一个拦截器

1. ```java
   package com.lhy.interceptor;
   
   import org.springframework.web.servlet.HandlerInterceptor;
   import org.springframework.web.servlet.ModelAndView;
   
   import javax.servlet.http.HttpServletRequest;
   import javax.servlet.http.HttpServletResponse;
   
   public class SessionInterceptor implements HandlerInterceptor {
   
       //进入控制器之前调用
       @Override
       public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        
          Object user = request.getSession().getAttribute("user");
   //        if (null == user) { 
   //            response.sendRedirect("/login/login");
   //            return false;
   //        }
           //返回值决定了servlet分发器是否分发
           return false;
       }
   
       //控制器之后调用
       @Override
       public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
   
       }
   
       //页面之后调用
       @Override
       public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
   
       }
   }
   ```

### 切面编程

#### 依赖

```xml
<!-- https://mvnrepository.com/artifact/org.aspectj/aspectjweaver -->
<dependency>
<groupId>org.aspectj</groupId>
<artifactId>aspectjweaver</artifactId>
<version>1.9.2</version>
</dependency>
```

#### 配置切入

1. ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
          xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
   	
       <!-- 将切面类放入ioc容器 -->
       <bean id="log" class="com.lhy.aop.Log"/>
       <bean class="com.lhy.Service" id="service"/>
       <aop:config>
           <aop:aspect ref="log">
               <!--切入点 表达式  com.lhy.aop下所有的方法,方法参数任意 -->
               <aop:pointcut id="poin" expression="execution(* com.lhy.Service.*(..))"/>
               <!--  前置通知 method方法定义通知切面类的那个方法 -->
               <!--<aop:before method="logs" pointcut-ref="poin"/>-->
               <!-- 后置通知 -->
               <!--<aop:after method="querylog" pointcut-ref="poin"/>-->
               <!-- 环绕通知  只有环绕通知可以接受参数-->
               <aop:around method="round" pointcut-ref="poin"/>
               <!-- 异常通知 -->
               <!-- return 通知 -->
               <!--<aop:after-returning method="returning" pointcut-ref="poin"/>-->
           </aop:aspect>
       </aop:config>
   </beans>
   ```

```java
package com.lhy.aop;

import org.aspectj.lang.ProceedingJoinPoint;

public class Log {
    public void logs(){
        System.out.println("我是记录--我的参数是");
    }
    public void querylog(){
        System.out.println("查询完成");
    }
	// 环绕通知 通过注入 ProceedingJoinPoint 类获取参数列表以及执行代理方法
    public void round(ProceedingJoinPoint proceedingJoinPoint ){
        System.out.println("查询之前");

        //获取参数列表
        Object[] args = proceedingJoinPoint.getArgs();
        for (Object arg : args) {
            System.out.println(arg);
        }
        try {
            //相当于此处调用环绕中的方法
            proceedingJoinPoint.proceed();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }

        System.out.println("查询之后");
    }

    public void returning(){
        System.out.println("方法return调用");
    }


}
```

### 事物管理

1. ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:tx="http://www.springframework.org/schema/tx" xmlns:aop="http://www.springframework.org/schema/aop"
          xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
   
       <!-- 初始化数据管理器 -->
       <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
           <!--指定数据源-->
           <property name="dataSource" ref="dataSource"/>
       </bean>
   
       <tx:advice id="advice" transaction-manager="transactionManager">
       <!-- 配置需要加入事物的方法 -->
           <tx:attributes>
               <!-- 事物的传播机制 ：当执行sql语句时 发现已经开启了事物，那么就将自己加入到该事物中。如果未开启事物， 那么就新开启事物，并将自己加入进去 -->
               <tx:method name="add*" propagation="REQUIRED"/>
               <tx:method name="update*"  propagation="REQUIRED"/>
               <!-- 查询 行级锁 -->
               <tx:method name="select*" read-only="true"/>
               <!-- 等等  -->
           </tx:attributes>
       </tx:advice>
   
       <!--使用aop方式 配置切入点-->
       <aop:config>
           <!-- 包下的所有类的所有的方法 切入进去 -->
           <aop:pointcut id="point" expression="execution(* com.lhy.services.*.*(..))"/>
   
           <aop:advisor advice-ref="advice" pointcut-ref="point"/>
   
       </aop:config>
   
   </beans>
   ```

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

##spring mvc 常用注解

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

      

## Spring mvc 自动装配

1. 是现实原理：servlet中的servletContainerInitializer 接口中的startUp方法会被回调，其中有一个参数为ServletContext 改接口可以实现动态的添加web组件：例如servlet ， filter，listenter	

2. spring 实现Spring mvc 自动装配

   1. 配置 dispatcherServlet

   ![image-20190513221434563](/Users/luohengyi/web/TakeDown-/md/image-20190513221434563.png)

3. 配置扫描地址

   ![image-20190513221747639](/Users/luohengyi/web/TakeDown-/md/image-20190513221747639.png)



## shiro整合

#### 配置

##### 核心配置

1. ```java
   package com.lhy.shiro;
   
   import org.apache.shiro.cache.MemoryConstrainedCacheManager;
   import org.apache.shiro.mgt.DefaultSecurityManager;
   import org.apache.shiro.mgt.SecurityManager;
   import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
   import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
   import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
   import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
   import org.springframework.beans.factory.annotation.Qualifier;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   
   import java.util.LinkedHashMap;
   
   //启动自定配置
   @Configuration
   public class ShiroConfiguration {
   
       //路由过滤器，验证是否符合权限，注入安全管理器
       @Bean("shiroFilter")
       public ShiroFilterFactoryBean filterFactoryBean(@Qualifier("securityManager") SecurityManager securityManager){
           ShiroFilterFactoryBean bean = new ShiroFilterFactoryBean();
           bean.setSecurityManager(securityManager);
           //设置登陆页面
           bean.setLoginUrl("/login");
           //登陆成功页面
           bean.setSuccessUrl("/index");
           //没有权限跳转
           bean.setUnauthorizedUrl("/unauthorized");
           //拦截定义     请求   拦截器
           LinkedHashMap<String,String>  filterchain = new LinkedHashMap<>();
           //  authc需要验证 anon放行
           filterchain.put("/index","authc");
           filterchain.put("/login","anon");
           filterchain.put("/loginUser","anon");
           filterchain.put("/admin","roles[admin]");
           //具有edit权限（permission）的人才拥有访问权
           filterchain.put("/edit","perms[edit]");
           filterchain.put("/**","user");
   
   
           bean.setFilterChainDefinitionMap(filterchain);
   
           return bean;
       }
   
       //安全管理器
       @Bean("securityManager")
       public SecurityManager securityManager(@Qualifier("authRealm") AuthRealm authRealm){
           DefaultSecurityManager manager = new DefaultWebSecurityManager();
           manager.setRealm(authRealm);
           return manager;
       }
   
       //  验证用户，验证权限，注入自己的密码校验器
       @Bean("authRealm")
       public AuthRealm authRealm(@Qualifier("credentialMatcher") CredentialMatcher credentialMatcher){
               AuthRealm authRealm = new AuthRealm();
               authRealm.setCredentialsMatcher(credentialMatcher);
               //开启缓存
               authRealm.setCacheManager(new MemoryConstrainedCacheManager());
               return authRealm;
       }
   
       // 密码校验器，定制自己的密码校验规则
       @Bean("credentialMatcher")
       public CredentialMatcher credentialMatcher(){
           return  new CredentialMatcher();
       }
   
       //spring - shiro 关联配置
       public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(@Qualifier("securityManager") SecurityManager securityManager){
           AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
           authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
           return authorizationAttributeSourceAdvisor;
       }
   
       public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator(){
           DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator = new DefaultAdvisorAutoProxyCreator();
           defaultAdvisorAutoProxyCreator.setProxyTargetClass(true);
           return  defaultAdvisorAutoProxyCreator;
       }
   
   }
   ```

##### 密码验证器

1. ```java
   package com.lhy.shiro;
   
   import org.apache.shiro.authc.AuthenticationInfo;
   import org.apache.shiro.authc.AuthenticationToken;
   import org.apache.shiro.authc.UsernamePasswordToken;
   import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;
   
   /**
    * 重写密码比较规则
    */
   public class CredentialMatcher extends SimpleCredentialsMatcher {
       @Override
       public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
           UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) token;
           String password = new String(usernamePasswordToken.getPassword());
           String dbPassword = (String) info.getCredentials();
           return this.equals(password, dbPassword);
       }
   }
   ```

##### 验证授权

1. ```java
   package com.lhy.shiro;
   
   import com.lhy.shiro.model.Permission;
   import com.lhy.shiro.model.Role;
   import com.lhy.shiro.model.User;
   import com.lhy.shiro.service.UserService;
   import org.apache.commons.collections.CollectionUtils;
   import org.apache.shiro.authc.*;
   import org.apache.shiro.authz.AuthorizationInfo;
   import org.apache.shiro.authz.SimpleAuthorizationInfo;
   import org.apache.shiro.realm.AuthorizingRealm;
   import org.apache.shiro.subject.PrincipalCollection;
   import org.springframework.beans.factory.annotation.Autowired;
   
   import java.util.ArrayList;
   import java.util.Collection;
   import java.util.List;
   import java.util.Set;
   
   public class AuthRealm extends AuthorizingRealm {
   
       @Autowired
       private UserService userService;
   
       //授权
       @Override
       protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
           //类似从session中获取用户，然后通过用户获取角色，通过角色获取权限列表，应为权限是第不可重复的故此使用 set！！
           User user = (User) principalCollection.fromRealm(this.getClass().getName()).iterator().next();
           //权限列表
           List<String> permissionList = new ArrayList<>();
           //角色列表
           List<String> roleNameList=new ArrayList<>();
           Set<Role> roleSet = user.getRoles();
           if (CollectionUtils.isNotEmpty(roleSet)) {
               for (Role role : roleSet) {
                   roleNameList.add(role.getRname());
                   Set<Permission> permissions = role.getPermissions();
                   if (CollectionUtils.isNotEmpty(permissions)){
                       for (Permission permission : permissions) {
                           permissionList.add(permission.getName());
                       }
                   }
               }
           }
   
           SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
           //将权限名放入  SimpleAuthorizationInfo 的  StringPermissions
           simpleAuthorizationInfo.addStringPermissions(permissionList);
           //将角色放入
           simpleAuthorizationInfo.addRoles(roleNameList);
           return simpleAuthorizationInfo;
       }
   
       //认证登陆
       @Override
       protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
           UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) authenticationToken;
           String username = usernamePasswordToken.getUsername();
           User user = userService.findByUsername(username);
           return new SimpleAuthenticationInfo(user, user.getPassword(), this.getClass().getName());
       }
   }
   ```