### 用户操作

1. **MySQL5.7 mysql.user表没有password字段改 authentication_string；**
2. 创建用户`CREATE USER 'username'@'host' IDENTIFIED BY 'password';`
3. 修改用户密码：`SET PASSWORD FOR 'username'@'host' = PASSWORD('newpassword');`
4. 删除用户：`DROP USER 'username'@'host';`
5. 刷新数据库：`flush privileges;`

#### 权限

1. ```mysql
   grant all privileges on *.* to 'chai'@'127.0.0.1';
   # 赋予新用户，从本地操作所有数据库.所有数据表的所有权限
    
   grant all privileges on *.* to 'chai'@'%';
   # 赋予新用户，从外部操作所有数据库.所有数据表的所有权限（没有外部客户端的IP限制，但本地有限制）
   ```

   

### 表结构操作：

1. 修改表名：ALTER TABLE 旧表名 RENAME 新表名;
     实例：alter table userinfo rename userinfomation;
2. 修改字段数据类型：格式：ALTER TABLE 表名 MODIFY 属性名 数据类型;
     实例：alter table news modify NewsTitle varchar(50);
3. 修改字段名称 格式：ALTER TABLE 表名 CHANGE  old属性名  new 属性名数据类型;
     实例：alter table news CHANGE  NewsId  NewNumber  int(10);
4. 增加字段：格式：ALTER TABLE 表名 ADD 属性名1 数据类型 [完整性约束条件][FIRST | AFTER 属性名2];
   ​    实例： alter table news add Newsfiled varchar(60) after newstitle;
   ​          alter table news add Newsa varchar(60) first;
5. 删除字段： 格式：ALTER TABLE 表名 DROP 属性名;
      实例： alter table news drop newsfiled;
6. 外键约束：foreign key(user_id) references user(user_id)
     将本表的user_id与主表user表的user_id关联

### 数据操作：

1. 清空数据库（包括自增顺序）：
2. 通配符：% 任意个数，_ 仅代表1个
3. 模糊查询，不包含 某个字符的：not like %a%
4. 数字区间：between 1 and 3；

#### mysql 函数

1. exists(子查询) 例如：select * from user where exists(select id from user where id=1);
2. 分组条件：having 例:select sum(number) from user group by name having sum(number) >200;
3. 备份文件：mysqldump -uroot -proot  database user > D:xx\xx\x\user.sql. #也可以不加表名，直接倒出数据库
4. **导入文件**：use database
   ​	  source D:/xx/xx/x/user.sql;
5. 复制一个表结构： create table t2 like t1 ;  建立t2表结构和t1相同

### 触发器：

1. 作用于数据表，在对应事件发生时，触发对应的事件

2. create trigger  触发器名 触发时间(before,after)  触发事件(insert,delete,update) on 表名 for each row  Begin

      //触发器执行的sql
      ​    new //新插入数据
      ​    Old //旧的数据
      ​    Set new.id=xx//可以通过set修改新插入的数据

       end

3. show TRIGGERS

4. 删除触发器：DROP TRIGGER name

5. 查看触发器 : show TRIGGERS

#### 关键字

new ：新插入的这一行，或者修改后的这一行，可以通过 . 获取这一行的某个字段，可以修改这一行里面数据来改变修改或者插入的数据，删除事件没有new数据

old: 修改或者删除之前的那一行数据可以通过 . 获取这一行的某个字段，old

### 存储过程(返回值的是过程)

1. 查看系统变量的值：select  @@变量名;  (select  @@autocommit;）

2. 修改系统变量：

   1. 当前链接有效：set 变量名 = 新值
   2. set  @@global.变量名=新值 （set  @@global.name=1)
      1. 全局修改只对**新开的链接有效，当前也不会有效！**

3. 会话变量（@定义）：

   1. 查看：select  @变量名;  (select  @autocommit;）
   2. 修改/创建：set  @变量名=新值 （set  @name=1)
      1. 当前连接有效

4. 运算符

   1.  =是判断运算符
   2.  :=是赋值运算符
      1. SELECT @hl:=id,@my:=name from cs limit 1;  //查询出来的值赋值给变量
      2. SELECT id,name from cs limit 1 into @hl,@my;  //同时赋值2个
      3. 返回值不同

5. 局部变量

   1. begin和end之间的变量类似 {} 之间

   2. 定义变量：

      ```mysql
      # DECLARE 变量名 类型 【属性】
      DECLARE nam int char(6);
      #赋值 只能通过set赋值
      set nam=123;
      ```

6. 流程控制

   1. if

      1. 在查询中使用if()函数：

         1. select if(scoer<60,'不及格','及格')  from cs;  //用于控制返回值

      2. ```mysql
         IF CONDITION THEN
         	//
         ELSE
         
         END IF
         #例如
         IF a>0 THEN
         	//逻辑体
         ELSE
         	//逻辑体
         END IF
         
         
         ```

      3. 123

   2. 循环

      1. 

      2. ```mysql
         while CONDITION do
         #逻辑体
         end while;
         
         #例：
         loopl: while a>0 do
             #逻辑体
             leave loopl; #leave 跳出循环
             ITERATE loopl; #跳过当前循环
         end while;
         ```

7. 函数（函数作用于库，不能跨库调用）

   1. 定义函数

      ```mysql
      CREATE FUNCTION 函数名(参数名 参数类型)  returns 返回类型
      begin
      	return 返回值;
      end
      
      //例如
      CREATE FUNCTION aa (a INT,b CHAR) RETURNS INT
      BEGIN
      	RETURN 1;
      END
      select name();
      
      ```

   2. 删除函数

      ```mysql
      DROP FUNCTION name
      ```

   3. 查看所有自定义函数  SHOW FUNCTION STATUS

   4. 函数内部的sql

      1. **必须使用 into赋值的方式来查询**: SELECT id,name from cs limit 1 into @hl,@my;

8. 过程

   1. 创建过程

      ```mysql
      CREATE PROCEDURE 创建名(参数名 参数类型(长度))
      begin
      	
      end
      #调用
      call name();
      ```

   2. 在过程里可以使用**所有增删改查**

9. 参数

   ```mysql
   CREATE PROCEDURE cs (in a int,out b int,INOUT c INT)
   BEGIN
   	SELECT a,b,c; #out修饰的参数在方法内部无法调用到传入的值，但修改后对全局的变量有影响
   				  #int修饰的参数可以在方法内部调用到传入的值，但修改后对全局的变量没有影响
   				  #INOUT修饰的参数可以在方法内部调用到传入的值,并且修改后对全局的变量有影响
   	set a=10;
   	set b=10;
   	set c=10;
   	
   END
   
   set @a=1;
   set @b=2;
   set @c=3;
   
   CALL cs(@a,@b,@c);
   SELECT @a,@b,@c;
   
   
   ```

### 环境搭建

1. 依赖：yum -y install ncurses-devel gcc gcc-c++

2. .tar下载下载地址https://dev.mysql.com/downloads/file/?id=467701

   1. https://dev.mysql.com/get/archives/mysql-5.5/mysql-5.5.54.tar.gz

3. cd 解压目录下

   1. 编译：

   2. cmake -DCMAKE_INSTALL_PREFIX=/usr/local/mysql \

      -DMYSQL_UNIX_ADDR=/tmp/mysql.sock  \

      -DMYSQL_USER=mysql  \

      -DDEFAULT_CHARSET=utf8  \

      -DDEFAULT_COLLATION=utf8_general_ci  \

      -DWITH_MYISAM_STORAGE_ENGINE=1  \

      -DWITH_INNOBASE_STORAGE_ENGINE=1 \

      -DWITH_DEBUG=0 \

      -DWITH_READLINE=1 \

      -DWITH_EMBEDDED_SERVER=1 \

      -DENABLED_LOCAL_INFILE=1

4. 安装：make && make install

5. 初始化数据库：cd scripts/

   1. ./mysql_install_db --datadir=/usr/local/mysql/data/ --basedir=/usr/local/mysql/ --user=mysql
   2. cp support-files/my-medium.cnf /etc/my.cnf   #复制配置文件 
   3. cp support-files/mysql.server /etc/init.d/mysql    #复制启动脚本
   4. chmod 755 /etc/init.d/mysql
   5. chkconfig --add mysql                              #添加系统服务 
   6. export PATH=$PATH:/usr/local/mysql/bin    #添加环境变量 

6. 开启 mysql 服务 /usr/local/mysql/support-files/mysql.server start

7. 命令mysql 的配置

   将 /usr/local/mysql/bin/mysql

   cp mysql /usr/bin/

8. 命令mysql 的配置

   将 /usr/local/mysql/bin/mysql

   cp mysql /usr/bin/

   或者将他配置到全局

9. 初始化账户密码，远程登陆

   cd /tar.gz源码里面

   cd /scripts

   ./mysql_secure_installation 定义初始化密码
   
10. mysql --verbose --help | grep my.cnf 查看配置文件地址