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

1. 添加：lpush key  下标 value  /   lpush key  v1 v2 v3 vv4
   1. 例如：lpush user a b c d e
2. 修改：lset key 下标 值
   1. 例如修改user下第一个数据为ppp：lset user 0 ppp
3. 查询:lrange user 0 3  //从下标0到3
   1. lrange user -1 查看所有
4. 删除：del key 下标