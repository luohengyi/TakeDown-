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

### 系统命令：

1. sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
2. 修改文件权限： sudo chmod -R 777
3. 查看端口是否占用：netstat -ant | grep 9000
4. 结束进程： sudo kill -USR2 进程号
5. 解压文件：
   1. tar： tar zxvf manpages-zh-1.5.1.tar.gz
   2. zip:  zip manpages-zh-1.5.1.tar.gz
6. 网卡：
   1. ifconfig 看一下要启的网卡 一般以 en开头三位。
      sudo ifconfig en* down #停。
      sudo ifconfig en* up #启
7. 解压：
   1. 7z：7z x xxxx.7z
   2. unrar. x xx.rar
   3. unzip -n text.zip -d /tmp 
      1. 将文件解压至指定文件。
      2. -n 不要覆盖已存在的文件 
      3. -d 在指定文件下解压

#### php

1. 安装：

   1. brew tap exolnet/homebrew-deprecated 安装源
   2. brew install php@7.0  //brw安装会自动管理依赖，所以不用你一个个先安装依赖。

2. 重启：

   1. 线程方式：fpm sudo pkill -INT -o php-fpm
   2. 安装的方法停止：brew services stop php@7.0
   3. 安装的方法启动：brew services start php@7.0
   4. 重启：brew services restart php@7.0

3. **配置/拓展**：

   1. 在高版本的mac  brew版本中，**由于git上原homebrew/php已经停掉，新的均迁移到到brew/core上，因此之前的安装方法无法使用，请注意！！！！！**如果要使用brew安装拓展，要先配置命令：**brew tap kyslik/php** 
   2. 安装拓展：brew install php71-mongodb 
   3. 在 /usr/local/etc/php/ 对应的版本中添加相应的扩展
   4. php -i | grep php.ini 查找**php.ini** 文件位置

4. 拓展的安装：

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

   2.x-debug

   1. 进入网站 https://xdebug.org/wizard 

   2. 将 php -i 信息输入框中，更具页面提示下载相关文件

   3. 解压进入目录

      >指定要添加拓展的php版本 

      ​	/usr/local/Cellar/php@7.0/7.0.33/bin/phpize

      > 配置 使用php配置版本 

        ./configure --with-php-config=/usr/local/Cellar/php@7.0/7.0.33/bin/php-config

      > 编译

        make

      > 保存编译后的so文件

      cp modules/xdebug.so /usr/lib/php/extensions/no-debug-non-zts-20160303

      > 配置php.ini

      zend_extension=/usr/lib/php/extensions/no-debug-non-zts-20160303/xdebug.so

      xdebug.remote_enable = 1　　//是否运行远程终端，必须开启

      xdebug.remote_handler = "dbgp"

      xdebug.remote_host = "localhost"

      xdebug.remote_port = 9000 //这个端口号要和phpstorm中的保持一致，示例的端口是9001

      xdebug.idekey = PHPSTROM　　//调试器关键字

#### nginx

1. 启动ngix：sudo ./nginx

2. 重启： **<u>sudo nginx -s reload</u>**

3. Ngingx server配置：

   ```
 server {
   
          listen       8020  default_server;
   
          server_name  localhost;    #域名，自定义
   
          root   /Users/luohengyi/cs;    #自定义，如/var/www
   
             index  index.html index.htm index.php;
   
   
   
             \# pass the PHP scripts to FastCGI slinerver listening on 127.0.0.1:9000
   
             \#
   
             location ~ \.php$ {
   
                 fastcgi_pass   127.0.0.1:9000;
   
                 fastcgi_index  index.php;
   
      \#            fastcgi_param  SCRIPT_FILENAME  /Users/luohengyi/cs;   #如/var/www$fastcgi_script_name
   
                fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
   
                include        fastcgi_params;
   
                 fastcgi_intercept_errors on;
   
             }
   
        }
   ```
   
   

4. 




