# jsoup

## String 转化

1. `Document doc = Jsoup.parse(html);`
   例如：

```java
String html = "<html><head><title>First parse</title></head>"
                + "<body><p>Parsed HTML into a doc.</p></body></html>";
        Document doc = Jsoup.parse(html);
```

## 常用api

1. 获取节点文本：Document.text();