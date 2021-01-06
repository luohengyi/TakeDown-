# thymeleaf

## springBoot整合

```xml
<!-- https://mvnrepository.com/artifact/org.thymeleaf/thymeleaf -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
<!-- https://mvnrepository.com/artifact/org.thymeleaf/thymeleaf -->
<dependency>
    <groupId>org.thymeleaf</groupId>
    <artifactId>thymeleaf</artifactId>
</dependency>
```

## 模版结构

1. th:fragment="key" 将这个标签标记为一个模块提供给其他页面使用
2. 引入其他模版中的某一个模块，如果想全部引入，那么不用写::以及后面的模块名
   1. th:include="top::commonNav" 

## 赋值

### 路径语法

```html
  <script th:src="@{/layui/layui.all.js}"></script>
```

### js中赋值

1. [[${page.totNuml}]]

### 内置对象

1. 获取请求路径：``${#ctx.#httpServletRequest.getRequestURI()``