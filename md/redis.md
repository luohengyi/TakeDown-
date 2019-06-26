# redis

## 数据类型

1. 字符串
2. Hash   适合存储对象
3. list 
4. set  无需
5. zset 有序

## 安装

### linux平台

1. 下载安装包，并解压进入目录 http://www.redis.cn/download.html
2. 编译：make   //编译后启动等命令存放在src目录中
3. 启动：src目录下：./redis-server
4. 停止：redis-cli shutdown
5. 链接命令：./redis-cli
6. 修改配置
   1. **如果需要带配置文件启动** ：./redis-server /path/to/redis.conf
   2. 安装目录下 redis.conf
      1. 指定允许访问的ip：bind 0.0.0.0
      2. 密码
         1.  开启配置：requirepass foobared  （foobared为你的登陆密码,可以修改为其他任意字符）
         2. 

## 应用方面

1. 项目中加入redis提高缓存效率
2. 分布式登陆信息存储。session同步
3. token的存储

## 数据操作

## 通用命令

1. 获取所有的建名 ：keys *

### string类型

1. 添加：set key value
2. 删除: del key
3. 获取所有key：keys *

### hash

1. 添加：hset key  k1 v1 k2 v2 k3 v3 …..
   1. 例如存储一个用户信息： hset user name lhy age 18 addrss 乐山
2. 获取：hget key k
   1. 例如偶去用户的name信息： hget user name
   2. 获取用户的所有信息：hgetall user
   3. 获取用户的所有字段名： hkeys user
   4.  获取用户所有的信息值：hvals user
3. 删除：del key

### List

1. 添加：  lpush key  v1 v2 v3 vv4
   1. 例如：lpush user a b c d e
2. 修改：lset key 下标 值
   1. 例如修改user下第一个数据为ppp：lset user 0 ppp
3. 查询:lrange user 0 3  //从下标0到3
   1. lrange user 0 -1 查看所有
4. 删除：del key 下标
5. 队列：
   1. BLPOP key1 [key2 ] timeout  从列表的左侧移除一个元素，**如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。** 
   2. BRPOP key1 [key2 ] timeout  从列表的右侧移除一个元素，**如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。**

### set

1. 添加：sadd key v1 v2 v3 
   1. 例如  sadd user zhangsan lisi wangwu
2. 查询 SRANDMEMBER key  count（要查看几个值）
   1. 例如查看1个值：SRANDMEMBER user 1
   2. 查看所有的值 ：SMEMBERS key

### zset

1. 添加元素（zset 要指定一个分数来用于排序）
   1. zadd key numbner|value  numbner|value
   2. 例如： zadd user 1 zhangshan 2 lisi
2. 查询数据: zrange user 0 3  //从下标0到3
   1. zrange user 0 -1 查看所有

## Clients-java-jedis

1. 依赖

   1. ```xml
      <!-- https://mvnrepository.com/artifact/redis.clients/jedis -->
      <dependency>
          <groupId>redis.clients</groupId>
          <artifactId>jedis</artifactId>
          <version>3.0.1</version>
      </dependency>
      
      ```

### 链接

1. ```java
   //链接服务
   Jedis jedis = new Jedis("47.105.88.34");
   //验证密码 如果redis服务配置了密码那么需要验证
   jedis.auth("123");
   ```

### 操作api

####  String

1. 添加 ：set(key,value);
2. 查询：get(String key);
3. 删除：del(String key);

#### Hash

1. 添加
   1. 添加一条数据：hset("user", "name", "罗恒一");
   2. 使用map的方式添加：jedis.hset(String key, map<?,?> value);
2. 查询 ：
   1. 获取所有的值hvals(String key);
   2. 获取所有的建名hkeys(String key);

#### List

1. 添加：

   1. ```java
      lpush(String key, String... strings)
      ```

2. 查询：

   1. ```java
      lrange(String key, long start, long stop)
      ```

#### set

1. 添加： 原子性，要么都成功，要么都失败

   1. ```java
      sadd(String key, String... members)
      ```

2. 查询

   1. 获取所有的值

      1. ```java
         Set<String> smembers(String key)
         ```

   2. 获取其中一个值

      1. ```java
         srandmember(String key)
         ```

### 连接池

1. ```java
   JedisPool jedisPool = new JedisPool("47.105.88.34");
   //获取一个链接并验证
   Jedis jedis = jedisPool.getResource();
   jedis.auth("123");
   ```

### 存储java对象

1. ```java
   
    public static void main(String[] args) {
   //        //链接服务
           Jedis jedis = new Jedis("47.105.88.34");
   //        //验证密码
           jedis.auth("123");
   
           User luohengui = new User(1, "luohengui");
           //将对象转化为字节并存入
           jedis.set("10".getBytes(), objectByte(luohengui));
           //读取字节对象
           byte[] bytes = jedis.get("10".getBytes());
           User o = (User)byteObject(bytes);
        	
           System.out.println(o.toString());
   
   
       }
   
   //将对象写入输入流中
   private static byte[] objectByte(Object object) {
       ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
       try {
           ObjectOutputStream objectOutputStream = new ObjectOutputStream(byteArrayOutputStream);
           //将对象存储到输出流中
           objectOutputStream.writeObject(object);
           //字节数组输出流
           return byteArrayOutputStream.toByteArray();
       } catch (IOException e) {
           e.printStackTrace();
       }
       return null;
   }
   //从输入流中读取对象
   
   private static Object byteObject(byte[] data) {
       ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(data);
       try {
           ObjectInputStream objectInputStream = new ObjectInputStream(byteArrayInputStream);
           return objectInputStream.readObject();
       } catch (IOException | ClassNotFoundException e) {
           e.printStackTrace();
       }
       return null;
   
   }
   
   
   ```

## Clients-java-spring-data-redis

1. 依赖：

```xml
 <!-- 注意redis.clients和 org.springframework.data 之间的版本关系问题-->
<dependency>
     <groupId>redis.clients</groupId>
     <artifactId>jedis</artifactId>
     <version>2.9.0</version>
</dependency>


<dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-redis</artifactId>
    <version>2.1.5.RELEASE</version>
</dependency>

```

### 配置

1. ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
       <bean id="jedisPoolConfig" class="redis.clients.jedis.JedisPoolConfig">
           <!--链接总数-->
           <property name="maxTotal" value="10"/>
           <!-- 最大链接数 -->
           <property name="maxIdle" value="10"/>
        </bean>
       <!--链接工厂-->
       <bean id="factory"  class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory">
           <property name="poolConfig" ref="jedisPoolConfig"/>
           <property name="hostName" value="47.105.88.34"/>
           <property name="password" value="123"/>
       </bean>
       <!--模版类-->
       <bean id="redisTemplate" class="org.springframework.data.redis.core.RedisTemplate">
          <!--指定链接工厂-->
           <property name="connectionFactory" ref="factory"/>
       </bean>
   </beans>
   ```

### 使用

1. ```java
   public static void main(String[] args) {
       ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("spring-data-redis.xml");
       //通过泛型来指定将来要存储的建的类型以及值的类型，例如下面指定名为String，值为user那么将来存储到redis中的类型将有基本数据类型变为User类型
       RedisTemplate<String, User> redisTemplate = context.getBean("redisTemplate", RedisTemplate.class);
       User user = new User(10, "罗恒一");
       //通过异常的监听来判断时候成功！
       try {
           //添加 所有的添加方法通过opsFor前缀查找
           redisTemplate.opsForValue().set("userLhy",user);
           //查询
           User user1 = redisTemplate.opsForValue().get("userLhy");
           System.out.println(user1);
       }catch (Exception e){
           e.printStackTrace();
       }
   
   }
   ```

### StringRedisTemplate