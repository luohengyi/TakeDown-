# hibernate腾讯课堂

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

