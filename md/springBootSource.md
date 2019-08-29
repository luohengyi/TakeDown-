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
- 外部化配置（借鉴与 spring for）