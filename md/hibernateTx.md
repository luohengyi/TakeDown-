#  hibernate

## hibernate架构

### 重要对象

- Transaction Object 瞬时对象（与数据库无关对象）
- persistent Object 持久对象 （与数据库有关系的对象，保存到数据的对象）

- session 数据库会话对象

- sessionFactory 会话工程，进程级别的对象

- Transaction 事物

- TransactionFactory 事物工厂

- ConnectionProvider 数据源例如c3p0,dbcp（链接）

- JND：提供资源目录

- JDBC：操作数据库的api

- JTA：跨数据库的事物

### hibernate官网资源部解析

![image-20200525095909381](/Users/luohengyi/Library/Application Support/typora-user-images/image-20200525095909381.png)

### hibernate环境搭建

#### 倒入jar包

antlr-2.7.7.jar
c3p0-0.9.2.1.jar
dom4j-1.6.1.jar
ehcache-core-2.4.3.jar
hibernate-c3p0-4.3.11.Final.jar
hibernate-commons-annotations-4.0.5.Final.jar
hibernate-core-4.3.11.Final.jar
hibernate-ehcache-4.3.11.Final.jar
hibernate-jpa-2.1-api-1.0.0.Final.jar
jandex-1.1.0.Final.jar
javassist-3.18.1-GA.jar
jboss-logging-3.1.3.GA.jar
jboss-logging-annotations-1.2.0.Beta1.jar
jboss-transaction-api_1.2_spec-1.0.0.Final.jar
mchange-commons-java-0.2.3.4.jar
mysql-connector-java-5.0.8.jar
slf4j-api-1.6.1.jar

#### 配置factory

```xml
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>

    <session-factory>

        <!-- Database connection settings -->
        <property name="connection.driver_class">org.hsqldb.jdbcDriver</property>
        <property name="connection.url">jdbc:hsqldb:hsql://localhost</property>
        <property name="connection.username">sa</property>
        <property name="connection.password"></property>

        <!-- JDBC connection pool (use the built-in) -->
        <property name="connection.pool_size">1</property>

        <!-- SQL dialect -->
        <property name="dialect">org.hibernate.dialect.HSQLDialect</property>

        <!-- Enable Hibernate's automatic session context management -->
        <property name="current_session_context_class">thread</property>

        <!-- Disable the second-level cache  -->
        <property name="cache.provider_class">org.hibernate.cache.internal.NoCacheProvider</property>

        <!-- Echo all executed SQL to stdout -->
        <property name="show_sql">true</property>

        <!-- Drop and re-create the database schema on startup -->
        <property name="hbm2ddl.auto">update</property>

        <mapping resource="org/hibernate/tutorial/domain/Event.hbm.xml"/>

    </session-factory>

</hibernate-configuration>
```

#### 配置hibernate

```xml
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>

    <session-factory>

        <!-- Database connection settings -->
        <property name="connection.driver_class">com.mysql.jdbc.Driver</property>
        <property name="connection.url">jdbc:mysql://localhost:3306/hibTest</property>
        <property name="connection.username">root</property>
        <property name="connection.password">123123</property>

        <!-- JDBC connection pool (use the built-in) 设置数据库的初始化连接池数 -->
        <property name="connection.pool_size">1</property>

        <!-- SQL dialect 方言-->
        <property name="dialect">org.hibernate.dialect.MySQL5Dialect</property>

        <!-- Enable Hibernate's automatic session context management -->
<!--        <property name="current_session_context_class">thread</property>-->

        <!-- Disable the second-level cache  -->
<!--        <property name="cache.provider_class">org.hibernate.cache.internal.NoCacheProvider</property>-->

        <!-- Echo all executed SQL to stdout -->
<!--        <property name="show_sql">true</property>-->

        <!-- Drop and re-create the database schema on startup -->
<!--        <property name="hbm2ddl.auto">update</property>-->

        <mapping resource="com/yguard/bean/user.hbm.xml"/>

    </session-factory>

</hibernate-configuration>
```

### 通过配置文件生成数据库

```java
// 创建配置对象
Configuration configuration = new Configuration();
//指定 hibernate-config.xml 位置
configuration.configure("hibernate-config.xml");
//创建表的对象
SchemaExport schemaExport = new SchemaExport(configuration);

schemaExport.create(true,true);
```

### SessionFactory与Session的创建

```java
Configuration configuration = new Configuration();
//指定 hibernate-config.xml 位置 默认根目录
configuration.configure("hibernate-config.xml");

//注册配置信息
ServiceRegistry registry = new StandardServiceRegistryBuilder()
        .applySettings(configuration.getProperties()).build();

//创建 SessionFactory
SessionFactory factory = configuration.buildSessionFactory(registry);
//创建 session
Session session = factory.openSession();
```

##### 事务

```java
//创建 session
Session session = factory.openSession();
//开启事务
Transaction transaction=session.beginTransaction();
User user = new User("luohengyi",1,new Date());
session.save(user);

//提交事务
transaction.commit();
//销毁session
session.close();
```

### 基本配置

#### hibernate.cfg.xml剖析

> hibernate.cfg.xml是默认文件名称，可以随便起名

- 数据链接配置
- 可选配置
- 资源注册
- 二级缓存
- 查询缓存
- 注册 映射文件

##### 数据链接配置

```xml
<!-- Database connection settings -->
<property name="connection.driver_class">com.mysql.jdbc.Driver</property>
<property name="connection.url">jdbc:mysql://localhost:3306/hibTest</property>
<property name="connection.username">root</property>
<property name="connection.password">123123</property>
```

##### 可选配置

> 使用默认的数据库连接池，connection.pool_size 是链接池数量

```xml
<!-- JDBC connection pool (use the built-in) 设置数据库的初始化连接池数 -->
<property name="connection.pool_size">1</property>
```

> 数据库方言 不同的数据库的sql有差别，hibernate可以根据配置生成不同sql语句

```xml
<!-- SQL dialect 方言-->
<property name="dialect">org.hibernate.dialect.MySQL5Dialect</property>
```

> 是否输出sql  控制台输出sql

```
<!-- Echo all executed SQL to stdout -->
<property name="show_sql">true</property>
```

> 第三方数据库连接池配置 （配置后就开始使用c3p0）

```xml
<!--        最小连接数-->
<property name="c3p0.min_size">10</property>
<!--        最大连接数-->
<property name="c3p0.max_size">100</property>
<!--        连接超时时间(毫秒)-->
<property name="c3p0.timeout">3000</property>
```

> 建表策略

- None:不做任何事
- create：每次执行hibernate的操作都删表建表
- create-drop：每次执行hibernate的操作都删表建表，SessionFactory关闭就删表
- validate：每次执行hibernate的操作就验证数据库的表和mapping的关系是否正确
- update：实体名称变化，原来实体生成的表不删除，而是生成新的实体的表。类中添加新的字段，则生成新的数据表列，类中删除一个字段，则该字段在数据库中生成的列不会删除，对应的数据库属性也不会受到影响；

```xml
<!--        create自动建表（删除原来的表）create-drop SessionFactory 销毁时删除表( factory.close)  validate对比映射 更新 配置中有的字段到数据库中 -->
        <property name="hibernate.hbm2ddl.auto">validate</property>
```

##### 注册 映射文件

```xml
<mapping resource="com/yguard/bean/user.hbm.xml"/>
```

### 模型类的规范

使用包装类

### 映射文件配置

> 每一个model都有一个相当于的映射文件，命名规范：模型类.hbm.xml

```xml

<!--  package：指定映射文件的实体类model所在的包-->
<hibernate-mapping package="com.yguard.bean">
<!--
    class:映射类
        name:要映射的model的全路径
        table:model映射到数据库的表名
-->
    <class name="User" table="t_user">

        <id name="userId" column="user_id" >
            <!--   generator：主键生产策略
                        assigned 手动指定id
                        increment 查询最大的id+1，存在并发安全问题
                        identity 使用mysql的自增值类型，model类型必须是id
                        sequence oracle 数据的自增方式
                        native 智能的自增方式，识别数据库的类型来使用不用的策略
                        uuid 使用uuid的方式，要是id是字符类型
 												foreign 外键方式
            -->
            <generator class="uuid"></generator>
        </id>
        <!--
            property：属性类型的映射
                    name：属性名称
                    column:字段名
                    type：类型名称
                    length:字段长度
                    not-null:是否非空
                    unique-key:是否唯一
        -->
        <property name="uname" column="name" unique-key=""/>
        <property name="gender" column="gender"/>
        <property name="birthday" column="birthday"/>
    </class>
</hibernate-mapping>
```

### 环境初始化

- Configuration：创建hibernate对象读取配置信息（hibernate.cfg.xml）
- ServiceRegistry：注册配置对象
- SessionFactory：线程安全，负责创建session
- session：是一次和数据库的会话，不一定只是1次链接，操作对象，影响数据库
- Transaction：事务对象，控制sesson对数据库的事务影响

### Hibernate中实体类3种状态

- 瞬时对象 

  > 在数据库没有相应记录，没有被session管理，可以被jvm回收

- 持久化对象

  > 在数据库中有对应记录，被session管理

- 托管对象

  > 在数据库中有对应记录，没有被session管理，可以被jvm回收

<img src="/Users/luohengyi/Library/Application Support/typora-user-images/image-20200529104946273.png" alt="image-20200529104946273" style="zoom:50%;" />

<img src="/Users/luohengyi/Library/Application Support/typora-user-images/image-20200602225137786.png" alt="image-20200602225137786" style="zoom:50%;" />

### Session 的 flush 方法解析

#### 数据库隔离级别

- 脏读：单个事务之间可以并发读取数据,**允许读取到未提交的脏数据**。
- 不可重复读：一个事务先后读取同一条记录，而事务在两次读取之间该数据被其它事务所修改，则两次读取的数据不同，当事务启动时，就不允许进行“修改操作（Update）”了。
- 幻读：一个事务按相同的查询条件重新读取以前检索过的数据，却发现其他事务插入了满足其查询条件的新数据，这种现象就称为幻读。

> 一个事务未提交的业务结果是否对于其它事务可见  有4个 级别

|                            | 脏读 | 不可重复读 | 幻读 |
| :------------------------- | ---- | ---------- | ---- |
| Read uncommitted(读未提交) | Y    | Y          | Y    |
| Read committed             | N    | Y          | Y    |
| Repeatable read            | N    | N          | Y    |
| Serializable               | N    | N          | N    |

#### session的flush

主键为UUID方式：

- save方法：

  ​	把 user 对象存储在session的临时存储区，在session持久区把dirty变为true

- evict方法：

  ​	把user逐出session的管理，user就是脱管状态，此时调用flush方法不会执行sql

- flush方法：

  发出sql语句清理临时存储区，把dirty变成false（是否是脏数据）

- commit：

  如果调用了evict方法，将不会提交数据

主键为自增加方式：

- save方法：

  因为使用native方式生产主键，所以save的时候发出sql来产生主键，持久区有数据dirty变为true

- evict方法：

  把user逐出session的管理，session中没有数据在调用flush方法没有意义

- flush方法：

  把dirty变成false

- commit：

  如果调用了evict方法，依然会提交数据应为sql语句已经发出了

#### session.flush完成大量数据入库

> 在调用 commit 方法时会自动调用flush方法

```jade
Transaction transaction=session.beginTransaction();
for (int i = 0; i < 11; i++) {
    User user = new User("luohengyi",1,new Date());
    session.save(user);
    if (i%2==0){
        session.flush();
    }
}
transaction.commit();
```

### 关联映射(学习完后再次测试)

##### 多对一关联

```xml
<class name="Emp" table="t_emp">
    <id name="empNum" column="emp_num">
        <generator class="native"></generator>
    </id>
    <property name="ename" />
    <property name="birthday"/>
    <property name="gender" />
    <property name="address" />
    <!--  指定 多（emp）对一（tem） 的关系  -->
    <!--  name: 用来装 一端(tem) 的数据类属性名-->
    <!--  column:建表后一端（tem） 中的外键,emp类 中用来存对应关系的 属性名  -->
    <!--  cascade:delete  级联删除，多对一中才不要使用
                      save-update    级联保存，更新，使用级连更新 不需要单独保存一的一段了
                      all     delete+save-update
                      none     不使用
          -->
    <many-to-one name="team" column="t_id" cascade="save-update"/>
</class>
```

##### 一对一单向关联(副表)

```xml

    <class name="IDCart" table="t_id_cart">

        <id name="cartId" column="emp_no">
            <!--   generator：主键生产策略
                        foreign 外键方式
            -->
            <!--      在保存IDCart 的时候自动保存 emp 因为使用同一个id主键     -->
            <generator class="foreign">
                <!-- foreign  指定idCart这一端的Emp属性名-->
                <param name="property">emp</param>
            </generator>
        </id>
        <property name="carNo" column="car_no" unique-key=""/>
        <!--
        一对一关联
        name： Emp属性名
        constrained： 关联关系防止删除引用
        -->
        <one-to-one name="emp" constrained="true"/>

    </class>
</hibernate-mapping>
```

##### 一对一双向关联（主表）

```xml
<class name="Emp" table="t_emp">

    <id name="empNum" column="emp_num">
        <generator class="native"></generator>
    </id>

    <property name="ename"/>
    <property name="birthday"/>
    <property name="gender"/>
    <property name="address"/>
 
    <one-to-one name="cart"  ></one-to-one>
</class>
```

> 双向关联必须手动 set 两个表的应用，并且手动保存2个表

```java
Emp emp1 = new Emp();
emp1.setEname("罗恒一11");
emp1.setAddress("addr");
emp1.setGender(1);
emp1.setBirthday(new Date());

IDCart idCart = new IDCart();
idCart.setCarNo("11cccc");

idCart.setEmp(emp1);
emp1.setCart(idCart);

session.save(emp1);
session.save(idCart);
transaction.commit();
```

> 若是想自动保存副表数据  应配置 级联 cascade="save-update"

```xml
<class name="Emp" table="t_emp">
  <id name="empNum" column="emp_num">
      <generator class="native"></generator>
  </id>

  <property name="ename"/>
  <property name="birthday"/>
  <property name="gender"/>
  <property name="address"/>

  <one-to-one name="cart"  cascade="save-update"></one-to-one>
</class>
```

##### 一对多关联

```xml
<class name="Team" table="t_team">

    <id name="tId" column="t_id">
        <generator class="native"></generator>
    </id>

    <property name="tName" column="t_name"/>
    <property name="loc" />
    <!--  
					set 集合类型/可以是其他集合类型
          key column 外键名称
          one-to-many class 类名
					cascade="save-update" 级联 插入team时，自动插入team上的Emp数据
     -->
    <set name="set" cascade="save-update" >
        <key column="t_id"></key>
        <one-to-many class="Emp"></one-to-many>
    </set>

</class>
```

<u>***缺点**</u>

Hibernate: insert into t_team (t_name, loc) values (?, ?)
Hibernate: insert into t_emp (ename, birthday, gender, address) values (?, ?, ?, ?)
Hibernate: insert into t_emp (ename, birthday, gender, address) values (?, ?, ?, ?)
Hibernate: update t_emp set t_id=? where emp_num=?
Hibernate: update t_emp set t_id=? where emp_num=?

打印的sql中出现了 update 语句，这是对 插入时外键为空的 数据引用问题处理。<u>如果外键为空那么会插入失败</u>

##### 一对多关联双向关联

```xml
<class name="Emp" table="t_emp">
        <id name="empNum" column="emp_num">
            <generator class="native"></generator>
        </id>
        <property name="ename"/>
        <property name="birthday"/>
        <property name="gender"/>
        <property name="address"/>
        <!--
         column：一对多中 副表外键名
         -->
        <many-to-one name="team" cascade="save-update" inverse="true"/>
    </class>
```

```xml
<class name="Team" table="t_team">

    <id name="tId" column="t_id">
        <generator class="native"></generator>
    </id>

    <property name="tName" column="t_name"/>
    <property name="loc" />
				 <!--
         	column：一对多中 副表外键名
					inverse="true"  控制反转，此时外键关系不再由Team来维护，需要使 Emp多端来维护
         -->
    <set name="set" cascade="save-update" inverse="true">
        <key column="t_id"></key>
        <one-to-many class="Emp"></one-to-many>
    </set>

</class>
```

> 开启inverse="true"控制反转由保存 一 端来保存数据，由多端来维护外键关系

```java
Session session = HibernateUtil.getSession();
Transaction transaction = session.beginTransaction();
Team team = new Team();
team.settName("公牛");
team.setLoc("芝加哥");
Set<Emp> emps = new HashSet<>();

Emp emp = new Emp();
emp.setEname("乔丹");
emp.setGender(1);
emp.setBirthday(new Date());
emp.setAddress("芝加哥");
//多端来维护关系
emp.setTeam(team);
emps.add(emp);


emp = new Emp();
emp.setEname("乔丹1");
emp.setGender(1);
emp.setBirthday(new Date());
emp.setAddress("芝加哥1");
//多端来维护关系
emp.setTeam(team);
emps.add(emp);

team.setSet(emps);
//只需要保存 一 端
session.save(team);
transaction.commit();
```

##### 多对多关联

```xml
<class name="Emp" table="t_emp">

        <id name="empNum" column="emp_num">
            <generator class="native"></generator>
        </id>
 
        <property name="ename"/>
        <property name="birthday"/>
        <property name="gender"/>
        <property name="address"/>
        <!--
            多对多配置
            员工 <- 中间表 -> 角色
            name：员工的角色属性名
            table：中间表的名称
						cascade:保存时只需要保存 员工 表，中间表和角色表自动维护
         -->
        <set name="roles" table="emp_role" cascade="save-update">
            <!--
               key/column： 员工（emp）在中间表中的外键
            -->
            <key column="emp_num"></key>
            <!--
                class：角色的类名
                column：角色在中间表的外键
            -->
            <many-to-many column="role_id" class="Role"></many-to-many>
        </set>

    </class>
```

##### 多对多双向

双方一致只是在不通的角度来配置

##### 待研究问题 

- 非主键多对多
- 注解

### 注解驱动

#### @Entity

​	被标注的类指定为实体bean，并且使用默认的orm规则，**即class名即数据库表中表名**，**class字段名即表中的字段名**

#### @Table

> 改变class名与数据库中表名的映射规则

- name 

  属性用于指定数据库的表明

- UniqueConstraint []

  表示那些字段是 为唯一标识

  

#### @Id

> 属性标识为数据库表中的主键

####  @GeneratedValue

> 为主键的生成策略

- strategy 声明了主键生成器的名称

  **GenerationType.TABLE**

  使用一个特定的**数据库表格来保存主键**,该策略一般与另外一个注解一起使用@TableGenerator,**@TableGenerator注解指定了生成主键的表**

  **GenerationType.SEQUENCE**

  "序列(sequence)"的机制生成主键，主要用于 Oracle,PostgreSQL,DB2 

  **GenerationType.IDENTITY**

  主键自增长,数据库在插入数据时,会自动给主键赋值,比如MYSQL可以在创建表时声明"auto_increment" 来指定主键自增长

  **GenerationType.AUTO**

  根据数据库在以上三种主键生成策略中选择其中一种

- generator

  声明主键生成器的名称--暂时找不到其他资料

#### @Column

> 用来标识实体类中属性与数据表中字段的对应关系

- name

  定义了被标注字段在数据库表中所对应字段的名称；

- unique

  表示该字段是否为唯一标识，默认为false。如果表中有一个字段需要唯一标识，则既可以使用该标记，也可以使用@Table标记中的@UniqueConstraint。

- nullable

  表示该字段是否可以为null值，默认为true

- insertable

  表示在使用“INSERT”脚本插入数据时，是否需要插入该字段的值。

- updatable

  表示在使用“UPDATE”脚本插入数据时，是否需要更新该字段的值。**insertable和updatable属性一般多用于只读的属性，例如主键和外键等。这些字段的值通常是自动生成的**。

- columnDefinition（大多数情况，几乎不用）

  表示创建表时，该字段创建的SQL语句，一般用于通过Entity生成表定义时使用。（也就是说，如果DB中表已经建好，该属性没有必要使用。）

- table

  表示当映射多个表时，指定表的表中的字段。默认值为主表的表名。

- length

  表示字段的长度，当字段的类型为varchar时，该属性才有效，默认为255个字符。

- precision和scale

  precision属性和scale属性表示精度，当字段类型为double时，precision表示数值的总长度，scale表示小数点所占的位数。

#### 多对多关系

##### @ManyToMany

> manyToMany需要和**@JoinTable**表结合使用，ManyToMany总是使用中间关系连接表来存储关系。

#####  @JoinTable

> 通过表关联的方式来映射一对多或者多对多的关系时，要使用@JoinTable这个标记

-  name属性为连接两个表的表名称

- joinColumns 主表的外键

- inverseJoinColumns 关联表的外键

  ```java
  @ManyToMany
  @JoinTable(name = "user_role",joinColumns={@JoinColumn(name="user_id")},inverseJoinColumns={@JoinColumn(name = "role_id")})
  private List<SystemRole> systemRoles;
  ```

### 延迟加载

> 延迟加载的禁用：lazy="false"

- class的延迟加载

  Session.load()方法默认延迟加载，如果是指false。即使使用load方法也无法延迟加载

  ```xml
  <class name="User" table="t_user" lazy="true">
  </class>
  ```

  如果在session关闭过来再去访问类的成员，将抛出错误，不能调用代理去查询数据

- 集合的延迟加载（针对一对多，多对多）

  lazy默认延迟加载,当lazy=true时获取集合的大小时会查询出所有的数据然后获取总数，

  当值为extra时，会发出 count(*)  sql语句 获取数据大小,当再次获取具体数据时再发出select语句

  > *<u>类上的lazy=fasle 设置 不会影响集合上的lazy=true设置</u>*

  ```xml
  <set name="roles" table="emp_role" cascade="save-update" lazy="extra">
         
    <key column="emp_num"></key>
    <many-to-many column="role_id" class="Role"></many-to-many>
  </set>
  ```

- 单端的延迟加载（针对一对一，多对一）,默认 lazy="proxy" 启用延迟加载,<u>no-proxy:当get方法用类属性时才发sql，否则不发出sql</u>

  ```xml
  <one-to-one  name="emp" constrained="true" lazy="proxy" />
  ```

  > 在单端的延迟加载中，类上禁止了延迟加载lazy="proxy"则无效

### hibernate查询

#### HQL查询

##### 基本查询

```java
Session session = HibernateUtil.getSession();
// String hql ="select u from User u"; hql中没有*语法，查询所有字段
String hql ="from User";
//创建查询对象
Query query = session.createQuery(hql);
List<User> list = query.list();
for (User user : list) {
    System.out.println(user);
}
```

##### 单列查询（String类型list）

> 只查询一列返回的是一个string的list

```java
Session session = HibernateUtil.getSession();
String hql ="select u.uname from User u";
//创建查询对象
Query query = session.createQuery(hql);
List<String> list = query.list();
for (String name : list) {
    System.out.println(name);
}
```

##### 多列查询(Object数组)

```java
Session session = HibernateUtil.getSession();
String hql ="select u.uname,u.gender from User u";
//创建查询对象
Query query = session.createQuery(hql);
List<Object[]> list = query.list();
for (Object[] objects : list) {
    System.out.println(objects[0]);
    System.out.println(objects[1]);
}
```

##### 分页查询

```java
Session session = HibernateUtil.getSession();
String hql ="select u from User u";
//创建查询对象
Query query = session.createQuery(hql);
//开始行数,第一条从0开始 startNum = （pageNumber-1）* pageSize
query.setFirstResult(0);
//每页大小
query.setMaxResults(2);
List<User> list = query.list();
for (User name : list) {
    System.out.println(name);
}
```

##### 限定查询

```java
Session session = HibernateUtil.getSession();
String hql ="select u from User u where u.gender=?";
//创建查询对象
Query query = session.createQuery(hql);
query.setParameter(0,2);
List<User> list = query.list();
for (User name : list) {
    System.out.println(name);
}
//传值类型2
String hql ="select u from User u where u.gender=:gender";
//创建查询对象
Query query = session.createQuery(hql);
query.setParameter("gender",2);
List<User> list = query.list();
```

##### 统计查询(唯一单列查询)

> 统计查询

```java
Session session = HibernateUtil.getSession();
String hql ="select count(*) from User u";
//创建查询对象
Query query = session.createQuery(hql);
Object o = query.uniqueResult();
System.out.println(o);
```

> 统计查询查询

**<u>最大值</u>**

```java
String hql ="select max(u.userId) from User u";
```

**最小值**

```java
String hql ="select min(u.userId) from User u";
```

**平均值**

```java
String hql ="select avg(u.gender) from User u";
```

**求和**

```java
 String hql ="select sum(u.gender) from User u";
```

##### 分组统计查询

```java
Session session = HibernateUtil.getSession();
String hql ="select count(*),u.gender from User u group by u.gender";
//创建查询对象
Query query = session.createQuery(hql);
List<Object[]> objects = query.list();
for (Object[] object : objects) {
    System.out.println(object[0]);
    System.out.println(object[1]);
}
```

##### 排序

```java
String hql ="select u from User u order by u.gender desc";
```

##### 模糊查询

```java
String hql ="select u from User u  where u.gender like '%2%';
```

#### QBC查询

##### 基本查询

```java
Session session = HibernateUtil.getSession();

Criteria criteria = session.createCriteria(User.class);
List<User> list = criteria.list();
for (User user : list) {
    System.out.println(user);
}
```

##### 查询单列

> 列名为对象属性名

```java
Criteria criteria = session.createCriteria(User.class);
criteria.setProjection(Projections.property("uname"));
List<String> list = criteria.list();
for (String user : list) {
    System.out.println(user);
}
```

##### 查询多列

> projectionList 类的应用

```java
ProjectionList projectionList = Projections.projectionList();
PropertyProjection uname = Projections.property("uname");
PropertyProjection gender = Projections.property("gender");
projectionList.add(uname);
projectionList.add(gender);

criteria.setProjection(projectionList);
List<Object[]> list = criteria.list();
```

##### 统计查询

> 主要是 Projections 的静态方法

- 总行数

  ```java
  Criteria criteria = session.createCriteria(User.class);
  criteria.setProjection(Projections.rowCount());
  Object list = criteria.uniqueResult();
  ```

  

- 最大值

  ```java
  criteria.setProjection(Projections.max("gender"));
  Object list = criteria.uniqueResult();
  ```

- 分组统计

  ```java
  Criteria criteria = session.createCriteria(User.class);
  
  ProjectionList projectionList = Projections.projectionList();
  projectionList.add(Projections.rowCount());
  projectionList.add(Projections.groupProperty("gender"));
  
  criteria.setProjection(projectionList);
  
  List<Object[]>list = criteria.list();
  for (Object[] objects : list) {
      System.out.println(Arrays.toString(objects));
  }
  ```

##### 排序

```java
Criteria criteria = session.createCriteria(User.class);
criteria.addOrder(Order.asc("gender"));
List<User>list = criteria.list();
```

##### 分页

```java
Criteria criteria = session.createCriteria(User.class);
criteria.addOrder(Order.asc("gender"));
//从第几行开始
criteria.setFirstResult(0);
//没页多少条
criteria.setMaxResults(2);
```

##### 限定查询

> Restrictions 静态 限定api

```java
Criteria criteria = session.createCriteria(User.class);

Criterion gender = Restrictions.eq("gender", 2);
criteria.add(gender);
```

##### 逻辑语句and&&or

> Restrictions 的and 和 or api 将传入的 Criterion 条件 以 and / or 的方式链接

```java
Criteria criteria = session.createCriteria(User.class);

Criterion gender = Restrictions.eq("gender", 2);
SimpleExpression userId = Restrictions.gt("userId", 3);
Criterion and = Restrictions.and(userId,gender);
criteria.add(and);
```

#### SQL查询

```java
Session session = HibernateUtil.getSession();
SQLQuery sqlQuery = session.createSQLQuery("select * from t_user");
List<Object[]> list = sqlQuery.list();
for (Object[] objects : list) {
    System.out.println(Arrays.toString(objects));
}
```

### 继承映射

#### 单表继承映射

**继承映射不支持子类的load查询，但是可以get查询**

> 多个实体存在一张表中使用  使用某个字段区分 不同实体内存在不同的字段 

<img src="/Users/luohengyi/Library/Application Support/typora-user-images/image-20200707105627083.png" alt="image-20200707105627083" style="zoom:25%;" />

```xml
<class name="Animal" table="t_animal">

        <id name="anId" column="an_id">
            <generator class="native"></generator>
        </id>
        <!--   子类鉴别器 在单表中加入一列来区别子类 必须放前面 -->
        <discriminator column="type" type="string"/>
        <property name="anName" column="an_name"/>
        <property name="gender"/>
        
        <!--  子类配置
             name：子类的类名
             discriminator-value：区分子类的值
        -->
         <subclass name="Pig" discriminator-value="p">
            <property name="weight" column="weight"/>
         </subclass>
        <subclass name="Bird" discriminator-value="b">
            <property name="height" column="height"/>
        </subclass>
</class>
```

- 插入

  ```java
  Pig pig = new Pig();
  pig.setAnName("天蓬");
  pig.setWeight(200);
  pig.setGender(1);
  session.save(pig);
  
  Bird bird = new Bird();
  bird.setAnName("大鹏");
  bird.setGender(1);
  bird.setHeight(10000);
  session.save(bird);
  ```

- 查询

  ```java
  Pig o = (Pig) session.get(Pig.class, 1);
  System.out.println(o);
  ```

#### 父子继承映射

> 父类一张表，子类一张表 

**数据库存储方式：**共同的数据放入父表，独立的字段放入各自的表中

```xml
<class name="Animal" table="t_animal">

    <id name="anId" column="an_id">
        <generator class="native"></generator>
    </id>

    <property name="anName" column="an_name"/>
    <property name="gender"/>

    <!--
        子类映射配置
              name：子类名称
    -->
    <joined-subclass name="Pig" table="t_pig">
        <!-- key：字表 主键  -->
        <key column="pid"></key>
        <!-- 子类属性映射  -->
        <property name="weight"/>
    </joined-subclass>
    <joined-subclass name="Bird" table="t_bird">
        <key column="bid"></key>
        <property name="height"/>
    </joined-subclass>
</class>
```