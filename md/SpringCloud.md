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

### 服务注册\服务发现

1. 参考Cloud子项目 <服务注册\服务发现>

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
@FeignClient("city") //指定服务名称
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

##### zuul

##### Kong(基于nginx)

### 配置管理

### 熔断机制（当某一个服务无法支撑时，防止服务崩溃）

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

