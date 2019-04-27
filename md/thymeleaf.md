# thymeleaf

## 模版结构

1. th:fragment="key" 将这个标签标记为一个模块提供给其他页面使用
2. 引入其他模版中的某一个模块，如果想全部引入，那么不用写::以及后面的模块名
   1. th:include="top::commonNav" 

## 赋值

### js中赋值

1. [[${page.totNuml}]]