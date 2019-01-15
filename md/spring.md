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
       <!-- 放行静态资源 新版本中 mapping="/static/**" location="/static/"location中不需要带*  -->
       <mvc:resources mapping="/static/**" location="/static/*"/>
       <!-- 控制器的包名，services的包名，如果要 @Autowired 注解注入必须配置包的地址 -->
       <context:component-scan base-package="com.lhy.controller,com.lhy.services"/>
   </beans>
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

## spring 组建

### 文件上传

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

### 文件下载

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