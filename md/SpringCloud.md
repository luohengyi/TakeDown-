# SpringCloud

## 微服务设计

### 服务拆分

1. 纵向拆分
   1. 用界面层
   2. 应用层
   3. 领域层
   4. 基础设施层
2. 横向查分
3. 领域驱动设计

###  <a href="#服务注册/服务发现(Eureka)">服务注册\服务发现</a>

### 服务消费

#### 消费模式

1. 服务直连模式，通过url直接访问
   1. 简单明了
   2. 平台语言无关性
   3. 无法保证服务的可用性
   4. 生产环境使用较少
2. 客户端发现模式
   1. 运作流程
      1. 服务实例启动后，将自己的位置信息提交到服务注册表
      2. 客户端冲服务注册表进行查询，来获取可用的服务实例
      3. 客户端自行使用负载均衡算法从多个服务实例中选出一个
3. 服务端发现模式
   1. 他的运作模式和客户端发现模式发现一样，但是**<u>负载均衡是在注册表的服务端上实现的，客户端无序关心负载均衡</u>**

#### 消费者框架

##### Apache HttpClient

通过url请求获取返回值

依赖：

```xml
<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpclient</artifactId>
    <version>4.5.3</version>
</dependency>
```

注入RestTemplate类

```java
@Configuration
public class ConfigBean {
    @Autowired
    private RestTemplateBuilder restTemplateBuilder;

    @Bean
    public RestTemplate getRestTemplate(){
        return restTemplateBuilder.build();
    }
}
```

使用

```java
private void saveWeatherDate(String url) {
    ResponseEntity<String> restString = restTemplate.getForEntity(url, String.class);
    // . . .
}
```

##### Ribbon（后期重点研究负载均衡的实现原理）

**实现客户端复杂均衡的工具**

##### Feign

依赖

```xml
<!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-openfeign -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
    <version>2.0.0.RELEASE</version>
</dependency>
```

配置

```properties
#服务通信超时时间
feign.client.config.feignName.connectTimeout=100
feign.client.config.feignName.readtTimeout=100
```

Spring boot 中激活该模块 @EnableFeignClients

```java
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}
```

配置service层

```java
@FeignClient("city") //指定服务名称  多层次路由 @FeignClient(name="服务名",path="路径名")
public interface CityClient {

  	//指定服务中接口名
    @GetMapping("/citys")
    String cityList();

}
```

调用

```java
@Autowired
private CityClient cityClient;

@GetMapping("/index")
@ResponseBody
public String index(){
    return cityClient.cityList();
}
```

### 统一入口(API网关)

#### 意义

1. 聚合多个API
2. 统一api入口

#### 利弊

1. 避免将内部的信息暴露给外部，将内部的微服务api和外部的访问api区分开来
2. 为微服务提供单独的保护层，系统权限系统的实现
3. 支持混合通信协议
4. 降低构建服务的复杂性（api令牌，访问控制，网速限制，从代码层隔离这些功能）
5. 微服务模拟和虚拟化
6. 需要**额外的编排和管理**
7. 路由逻辑配置需要进行统一的管理
8. 引发单点故障，api网关的不可用会导致整个服务的不可用

#### 常见的实现方式

##### nginx

##### Kong(基于nginx)

##### zuul

**maven依赖**

```xml
<!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-netflix-zuul -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-zuul</artifactId>
    <version>2.1.2.RELEASE</version>
</dependency>
```

**配置（简单使用）**

```properties
# 设置请求转发 将hi路径下的请求转发到名为city的微服务下
zuul.routes.hi.path= /hi/**
zuul.routes.hi.service-id=city
```

**功能列表：**

1. 认证
2. 压力测试
3. 金丝雀测试
4. 动态路由
5. 负载消减
6. 安全
7. 静态响应处理
8. 主动/主动交还管理

### 配置管理

#### 集中化配置的意义

1. 微服务数量多，配置多
2. 手工管理配置繁琐

#### 配置分类

1. 配置来源划分：开发环境，测试环境，预发环境，生产环境
2. 配置的集成阶段划分：编译时，打包时，运行时
3. 配置的加载方式：启动加载，动态加载

#### 服务端实现

**依赖**

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
    <version>2.1.3.RELEASE</version>
</dependency>
```

**启用config-server**

通过注解启用spring-cloud-config-server: ``@EnableConfigServer``

**配置**

```properties
spring.application.name=config
server.port=8888
#服务中心地址
eureka.client.service-url.defaultZone= http://localhost:8761/eureka/

#仓库地址
spring.cloud.config.server.git.uri=https://github.com/luohengyi/springCloudConfig.git
#指定仓库中的文件夹
spring.cloud.config.server.git.search-paths=config-repo
```

**访问**

通过路径auther/dev（<u>该url框架自带！</u>） 来访问初始化页面``http://localhost:8888/auther/dev`` 

#### 客户端实现

**依赖**

```xml
<!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-config-server -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
    <version>2.1.3.RELEASE</version>
</dependency>
```

**配置**

```properties
spring.application.name=config-client
eureka.client.service-url.defaultZone= http://localhost:8761/eureka/

server.port=8889

#当前服务职会读取该服务名称+profile的配置文件
spring.cloud.config.profile=dev
#配置服务器的地址
spring.cloud.config.uri=http://localhost:8888
```

**启用**

无需单独使用注解启动，配置服务器后自动调用配置

### 熔断机制

**概述**

防止由于某一个服务的死亡导致整个系统的死亡，对该服务的调用执行熔断。对于后学请求，不在继续调用，该目标服务，而是直接返回。从而可以快速的释放资源，实现原理类似电路的断路器，调用超过负载的服务会通过断路器直接返回一个默认信息，断路器的状态分为：<u>1.打开、2.关闭(当服务正常时关闭，但是会做一些失败次数的统计，当失败次数达到阀值时，断路器会打开，将异常信息直接返回给调用者)、3.半打开（关闭一段时间后，断路器会放开一些请求，当这些请求都能正常执行时，断路器会认为，服务已经恢复正常，这时断路器会关闭），</u>

#### 功能

1. 异常处理
2. 日志记录
3. 测试失败的操作
4. 手动复位
5. 并发
6. 加速短路
7. 重试失败请求

#### 熔断框架hystrix

**依赖**

```xml
<!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-netflix-hystrix -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
    <version>2.1.0.RELEASE</version>
</dependency>
```

**启动**

1. 使用注解 ``@EnableCircuitBreaker``

2. ```java
   @GetMapping
   //配置默认方法，当该服务接口无法使用时候，调用defaults返回给调用者
   @HystrixCommand(fallbackMethod = "defaults")
   public List<City> cityList() throws Exception{
       return cityDateService.listCity();
   }
   
   public List<City> defaults(){
       return  null;
   }
   ```



### 制动扩展

## Cloud子项目

### 配置管理 config

### 服务注册/服务发现(Eureka)

#### 服务端

依赖

```xml
<!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-netflix-eureka-server  注意soring 和cloud的版本对应问题 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
    <version>1.4.7.RELEASE</version>
</dependency>
```

配置

```properties
server.port=8761
eureka.instance.hostname= localhost
#禁用客户端
eureka.client.registerWithEureka=false
eureka.client.fetchRegistry=false


#服务地址配置
eureka.client.service-url.defaultZone= http://${eureka.instance.hostname}:${server.port}/eureka/
```

注解方式 @EnableEurekaServer 注解启用Eureka server 可以通过访问localhost:8761查看 Eureka server信息

```java
@SpringBootApplication
@EnableEurekaServer
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}
```

#### 客户端

依赖

```xml
<!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-netflix-eureka-server -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    <version>2.0.0.RELEASE</version>
</dependency>
```

配置

```properties
#该客户端的名称，该服务注册到服务端后显示的名字
spring.application.name=myeurekaclien

#服务端地址配置，将该服务注册到该服务端上
eureka.client.service-url.defaultZone= http://localhost:8761/eureka/
```

注解方式启用客户端

```java
@SpringBootApplication
@EnableDiscoveryClient
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}
```

客户端服务可以启动多个来实现分布式

### 断路器

### 负载均衡

### 智能路由

### 服务间调用

### 一次性令牌

### 微代理

### 思维导图模版

### 全局锁

### 控制总线

### 领导选举

### 分布式会话

### 集群状态

### 分布式消息

