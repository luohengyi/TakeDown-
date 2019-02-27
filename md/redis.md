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
4. 链接命令：./redis-cli

## 应用方面

1. 项目中加入redis提高缓存效率
2. 分布式登陆信息存储。session同步
3. token的存储

## 数据操作

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



