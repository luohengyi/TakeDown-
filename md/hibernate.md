# hibernate

## 依赖

```xml
<!-- Springboot中自jpa接口的实现就是hibernate所以只需要加入 data-jpa的依赖即可-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
    <version>1.5.1.RELEASE</version>
</dependency>
```

## Bean

```java
@Entity //映射实体类
@Table(name = "user") //对应表名
public class User {
    public User() {
    }
    @Id  //注建
    @Column(name = "user_id")  //数据库对应字段
    private int userId;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "user_sex")
    private String userSex;


}
```

## Dao

```java
// 接口的实现类框架会自动生成，只需要在service层自动生成，此处需要传入bean层泛型
public interface UserDao extends JpaRepository<User,Integer> {
    //按照规则生成对应的查询条件
    public List<User> getUsersByUserId(int id);
}
```

## Service

```java
@Resource  //使用Resource注入即可
UserDao userDao;
```

## 查询方式

## 映射关系

