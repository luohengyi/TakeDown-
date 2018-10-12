# Mac

### Mac的坑

1. php访问目录：

   将项目目录添加到 根目录下的.user.ini中

​        例如：open_basedir=/var/web/w0895/:/tmp:/usr/lib/php:/Users/luohengyi/ltjy_he/

2. mysql无法启动的问题：

   - sudo chown -RL root:mysql /usr/local/mysql

   ​       sudo chown -RL mysql:mysql /usr/local/mysql/data

   ​       sudo /usr/local/mysql/support-files/mysql.server   start

3. 

- 

### 系统命令：

1. 修改文件权限： sudo chmod -R 777
2. 查看端口是否占用：netstat -ant | grep 9000
3. 结束进程： sudo kill -USR2 进程号
4. 解压文件：
   1. tar： tar zxvf manpages-zh-1.5.1.tar.gz
   2. zip:  zip manpages-zh-1.5.1.tar.gz

#### php

1. 安装：brew install php@7.0  //brw安装会自动管理依赖，所以不用你一个个先安装依赖。

2. 重启：

   1. 线程方式：fpm sudo pkill -INT -o php-fpm
   2. 安装的方法停止：brew services stop php@7.0
   3. 安装的方法启动：brew services start php@7.0

3. 拓展的安装：

   1. redis：

      1. 第一种方法：brew install php56-Redis

      2. 第二种方法：

         1. 下载php-redis，地址：https://nodeload.github.com/nicolasff/phpredis/zip/master

         2. 解压：tar -zxvf phpredis-master.zip

            　进入目录：cd phpredis-master

         3. 执行phpize：/usr/local/Cellar/php\@7.0/7.0.29_1/bin/phpize   **<u>// 注意这里是你要安装的php的phpize</u>**

         4. 编译：./configure --with-php-config=/usr/bin/php-config  // 如果只有一个php就直接./configure；**<u>如果有多个php版本就选需要安装扩展的那个php-config</u>**

         5. 　安装：make && make install

         6. 打开php的配置文件/etc/php.ini，增加代码 extension=redis.so （如果找不到php.ini文件执行php --ini找到php.ini）

            　　然后重启fpm就有redis扩展了。

#### nginx

1. 启动ngix：sudo ./nginx

2. 重启： **<u>sudo nginx -s reload</u>**

3. Ngingx server配置：

   server {

   ​        listen       8020  default_server;

   ​        server_name  localhost;    #域名，自定义

   ​        root   /Users/luohengyi/cs;    #自定义，如/var/www

   ​        index  index.html index.htm index.php;



   ​        \# pass the PHP scripts to FastCGI slinerver listening on 127.0.0.1:9000

   ​        \#

   ​        location ~ \.php$ {

   ​            fastcgi_pass   127.0.0.1:9000;

   ​            fastcgi_index  index.php;

   \#            fastcgi_param  SCRIPT_FILENAME  /Users/luohengyi/cs;   #如/var/www$fastcgi_script_name

   ​           fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;

   ​           include        fastcgi_params;

   ​            fastcgi_intercept_errors on;

   ​        }

   ​    }

4. 




