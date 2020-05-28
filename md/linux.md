## linux

####  系统命令	

1. 关机：init 0
   1. shutdown 时间 ，-h 关机 ，-r重启
   2. 例如：shutdown -h now 现在关机
   3. shutdown -h 8:00 8点关机
   4. shutdown -r now 立即重启
   5.   shutdown -r 8:00 8点重启
   
2. 重启：reboot

3. 查看系统位数 getconf LONG_BIT

4. 查看时间：date

5. nohup ./my-shell-script.sh &  让命令在后台启动，关闭远程窗口不会关闭服务

6. 设置日期 :   date -s 09/10/2018

   - 设置时间 date -s 10:46:30

7. ip配置目录： vi  /etc/sysconfig/network-scripts/ifcfg-eth0

   1. 配置静态ip

      ```shell
      DEVICE=eth0
      TYPE=Ethernet
      UUID=98f5e039-4115-44dd-9e75-3b480e0eb5f2
      ONBOOT=yes
      NM_CONTROLLED=yes
      BOOTPROTO=none
      HWADDR=00:0C:29:CF:D1:C6
      IPADDR=192.168.1.205
      PREFIX=24
      GATEWAY=192.168.1.1
      DEFROUTE=yes
      IPV4_FAILURE_FATAL=yes
      IPV6INIT=no
      NAME="System eth0"
      ```

8. 重启网卡：service network restart

9. 执行上一次命令： cd -

10. 查看当前目录：pwd

11. 查看ip：ifconfig

12. 清屏：clear

13. pwd 显示路径

14. 建立软连接：ln -s 地址。 //当前地址生成一个镜像地址

15. 查找安装包

    1. yum -y list java*

#### 服务器信息查询

1. 内存:free -m
2. 硬盘 df -h
3. 负载 w/top
4. Cpu信息 cat /proc/cpuinfo(通过查看配置文件获取信息)
5. 



#### 包管理类

1. 安装命令 yum install
2. 下载文件 wget +地址   (yum install wget安装wget命令)
3. 软件卸载 yum remove xxx
4. 软件模糊搜索：yum serach xxx
5. 列出已安装软件 yum list
6. 查找安装的软件 yum search +原件名
7. 软件包信息 yum info

##### 离线安装

1. ​	`yum -y install --downloadonly   --downloaddir=/data/down/  php `
   2. 更新安装所有rpm： rpm -Uvh  *.rpm

###### Yumdownloader 

1. 是一款简单，但是却十分有用的命令行工具，它可以一次性下载任何 RPM 软件包及其所有依赖包。

2. 以 root 身份运行如下命令安装 “Yumdownloader” 工具。

   yum install yum-utils

3. 一旦安装完成，运行如下命令去下载一个软件包，例如 httpd:

   ```shell
   `yumdownloader httpd`
   ```

4. 为了根据所有依赖性下载软件包，我们使用 --resolve 参数：

   ```shell
   yumdownloader --resolve httpd
   ```

5. 默认情况下，Yumdownloader 将会下载软件包到当前工作目录下。

   为了将软件下载到一个特定的目录下，我们使用 --destdir 参数：

   ```shell
   yumdownloader --resolve --destdir=/root/mypackages/ httpd
   ```

   或者：

   ```shell
   yumdownloader --resolve --destdir /root/mypackages/ httpd
   ```

6. rpm -ivh *.rpm --nodeps --force 强制安装

   1. --nodeps就是安装时不检查依赖关系，比如你这个rpm需要A，但是你没装A，这样你的包就装不上，用了--nodeps你就能装上了。--force就是强制安装，比如你装过这个rpm的版本1，如果你想装这个rpm的版本2，就需要用--force强制安装

##### 挂载镜像安装

```shell
#光盘镜像路径/tmp/CentOS-6.8-x86_64-bin-DVD1.iso
#挂载目录/tmp/cd
#1、挂载光盘
mount /tmp/CentOS-6.8-x86_64-bin-DVD1.iso -o loop /tmp/cd/
#2、修改yum源
/etc/yum.repos.d/CentOS-Base.repo#备份，将原文件内容清空后添加下面内容
[base]
name=CentOS
baseurl=file:///tmp/cd
enabled=1
gpgckeck=0
gpgkey=file:///tmp/cd/RPM-GPG-KEY-CentOS-6
#3、清理yum缓存
yum clean all
#4、安装rpm包
yum install compat-libstdc++*
```



#### 端口类

#####  开启端口

###### centos 6.8测试可用

1. 开启端口
   1. iptables -I INPUT -p tcp --dport 80 -j ACCEPT  
2. 保存配置
   1. service iptables save
3. 重启防火墙
   1. service iptables restart
4. 查看端口
   1.  /etc/init.d/iptables status
5. 关闭防火墙
   1. service iptables stop
   2. 停止 systemctl stop firewalld.service
   3. 关闭开启自启 systemctl disable firewalld.service 
   4. 查看状态 firewall-cmd --state

###### centos7

1. 查看已开启的端口

   1. 查看所有端口使用情况：netstat -ant  
   2. 查看某个端口的使用情况：firewall-cmd --query-port=666/tcp

2. 添加指定需要开放的端口：

   1. firewall-cmd --add-port=123/tcp --permanent
   2. 重载入添加的端口：firewall-cmd --reload
   3. 查询指定端口是否开启成功：firewall-cmd --query-port=123/tcp

   

#### 进程类

1. 查看进程：ps -ef|grep +程序名称   
2. 查看所有进程：ps -ef (ps -ef | grep nginx  查看nginx的进程
3. 杀死进程
   1. pkill nginx 杀死nginx进程
   2. kill 6000 杀死进程号

#### 文件类

1. 新建文件： touch +文件名
2. mkdir 新建文件夹  建立多层文件夹： mkaddr -p 1/2/3/4
3. rm 删除文件 删除目录 rm -r 强制删处一个目录 rm -fr
4. cp 复制  cp  -a ./a.text  ~/cs/a1.text(将本文件的a.text辅助到家目录的cs目录下并且命名为a1.text)  参数 -a 将权限复制过来，否者不同的用户之间出现权限丢失问题
5. 移动文件：mv  ./a.text  ~/cs/a.text
6. 查看文件：cat +文件名
   1.  cat -b 展示行号
   2.  tac 逆序展示
   3.  more 分页查看,空格键翻页
   4.  tail -f从文件尾部读
   5.  tail -n 10 cmore.java  取出末尾10行 more.java
   6.  head 从文件头部读
   7.  head -n 10 取出前10行 test.txt
   8.  less 可控分页
   9.  grep -n ‘搜索关键字’ +文件名 
7. find 查找文件
   1. 查找文件
      find ./ -type f
   2. 查找目录
      find ./ -type d
   3. 查找名字为test的文件或目录
      find ./ -name test
8. wc 统计个数
9. 查看文件列表：ls （ls -al查看文件的详细信息）
10. 清理缓存 yum clean packges

##### 压缩&解压

1. zg压缩文件 tar -czvf 文件名.tar.gz 文件名
2. 查看压缩包里的文件：tar -tf 文件名.tar (-tvf 显示文件的详细信息)
3. zg查看压缩包里的文件：tar -tzvf 文件名.tar.gz (-tvf 显示文件的详细信息)
4. 解压文件 tar -xf 文件名.tar
5. zg解压文件 tar -xzvf 文件名.tar.zg

##### vim

1. 光标到行尾巴 G
2. 光标到行首 gg
3. 删除光标所在的行 dd
4. 撤销删处的行 u
5. 复制行 yy
6. 黏贴内容 p
7. 替换  :%s+查找的内容+替换的内容+
8.  vim + name 光标在最后一行
9.  vim + /cs name 光标在第一个cs处



#### ssh远程连接

1. ssh root@192.168.1.4 ssh连接linux服务器
2. wget http://www.baidu.com/ 使用wget下载文件
3. curl -o baidu.com http://www.baidu.com 使用curl -o可以命名下
4. 上传文件到服务器 linux系统：scp cs.txt luohengyi@192.168.1.4:/tmp (使用scp命令通过luohengyi账户上传文件到服务器192.168.1.4的/tmp目录下)
5. 下载服务器文件 scp luohengyi@192.168.1.4:/tmp/cs.txt ./ (使用scp命令通过luohengyi账户下载文件到本地 /目录下)
6. Window下 
   1. 服务器安装yum install lrzsz
   2.  rz 上传文件
   3. sz 下载文件

#### 用户命令

##### 用户

1. useradd 添加用户   参数：-c 备注  -g分组  -u用户id
2. adduser 添加用户
3. userdel 删处用户(userdel -r彻底的删除用户包括用户的文件)
4. passwd 设置密码. Passwd ll 修改ll的密码
5. usermod -c student jack 修改jack的备注为学生  —修改备注
6. usermod -l  lh ll 修改ll的账户为lh    ——修改账号
7. usermod -g root ll 将ll修改来和root的分组一样。 ——修改分组
8. usermod -g 500 root 修改root的分组      ——修改分组
9. /etc/group 用户分组文件
10. /etc/passwd 用户信息文件
11. root:x:0:0:root:/root:/bin/bash
12. 账号：密码占位符：uid：分组id：备注：宿主目录（用户文件目录）：sheel信息
13. 查看当前用户：whoami

##### 用户组

1. groupadd name 添加用户 参数 -g 自定义id
2. groupdel name 删除用户
3. groupmod new old 修改用户

##### 权限

1.  dr-xr-xr-x       5          r oot  root；

    d123456789  连接数 用户   分组

   123:前3位：拥有者 读r，写w，执行x 权限

​      	456:3位：所属组分组 读r，写w，执行x 权限

​     	789:3位：其他人   读r，写w，执行x 权限

2. 修改文件所属组：chgrp -r 文件/目录。 参数-r 递归下面所有文件，目录
3. 修改文件所有者：chown user file 修改file的所有者为user

###### 提权

1. root 账户下vi sudo 
2. 此处添加账户
3. Sudo yum install vim (使用sudo去提升权限

### 环境搭建

#### Java

1. 下载jdk

2. 配置环境

   1. vim /etc/profile
   
   ```properties
   export JAVA_HOME=/usr/share/jdk1.6.0_14 
   export PATH=$JAVA_HOME/bin:$PATH 
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar 
   ```

修改默认版本

```properties
配置 vi /etc/profile

在最后加上

JAVA_HOME=/usr/local/jdk1.6.0_34

PATH=$PATH:$JAVA_HOME/bin

CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

export JAVA_HOME

export PATH

export CLASSPATH
#重载配置文件
resources /etc/profile
```



#### Tomcat

1. 启动 sudo sh startup.sh

#### mysql

1. 依赖：yum -y install ncurses-devel gcc gcc-c++ cmake

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

7. 初始化账户密码， /usr/local/mysql//bin/mysqladmin -u root password 'new-password'

   cd /tar.gz源码里面

   cd /scripts

   ./mysql_secure_installation 定义初始化密码

#### php

##### php源码安装

1.  检查依赖：yum -y  install curl curl-devel libjpeg libjpeg-devel libpng libpng-devel libjpeg-devel freetype freetype-devel libxml2   libxml2-devel MySQLpcre-devel gcc libxml2 libxml2-devel  openssl-devel libjpeg.x86_64 libpng.x86_64 freetype.x86_64 libjpeg-devel.x86_64 libpng-devel.x86_64 freetype-devel.x86_64 gd
  
2. 下载源码包：wget http://php.net/get/php-7.0.2.tar.gz/from/a/mirror

3. 进入解压目录，检查配置,并配置安装目录：./configure **--prefix=/usr/local/php564** --with-mysqli --with-pdo-mysql --with-iconv-dir --with-freetype-dir --with-jpeg-dir --with-png-dir --with-zlib --with-libxml-dir --enable-simplexml --enable-xml --disable-rpath --enable-bcmath --enable-soap --enable-zip --with-curl --enable-fpm --with-fpm-user=nobody --with-fpm-group=nobody --enable-mbstring --enable-sockets --with-gd --with-openssl --with-mhash --with-gettext --with-ldap --enable-opcache --disable-fileinfo **--with-config-file-path=/usr/local/php564/lib/**

4. 编译且安装：make &&  make install

5. 配置环境变量

6. vim /etc/profile

    //加上

    export PATH=$PATH:/usr/local/php/bin

    source /etc/profile

    php -v

    注：该配置对所有用户生

7. 设置配置文件（进入PHP安装目录/etc/）

    1.  cp php-fpm.conf.default php-fpm.conf
    2.  进入PHP安装目录/etc/php-fpm.d
        1.  cp www.conf.default www.conf


##### 升级安装

1. 默认版本太低（5.4） 升级php 到5.6
2. 检查当前安装的PHP包 ：yum list installed | grep php
3. 如果有安装的PHP包，先删除他们
   1.  yum remove php.x86_64 php-cli.x86_64 php-common.x86_64 php-gd.x86_64 php-ldap.x86_64
   2.  php-mbstring.x86_64 php-mcrypt.x86_64 php-mysql.x86_64 php-pdo.x86_64
4. 配置源 ：
   1. sudo rpm -Uvh http://mirror.webtatic.com/yum/el7/epel-release.rpm
   2.  sudo rpm -Uvh http://mirror.webtatic.com/yum/el7/webtatic-release.rpm
5. 如果想删除上面安装的包，重新安装
   1. rpm -qa | grep webstatic
   2. rpm -e  上面搜索到的包即可
6. pm 安装 和 基本操作
   1. sudo yum install php56w-fpm( 也可以php55w-fpm  php70w-fpm  )
   2. service php56w-fpm start/restart/stop
   3. systemctl restart php-fpm.service
   4. 安装PHP扩展 (注意拓展版本)
      1. sudo yum install php56w.x86_64 php56w-cli.x86_64 php56w-common.x86_64 php56w-gd.x86_64 php56w-mbstring.x86_64 php56w-mcrypt.x86_64 php56w-mysql.x86_64 php56w-pdo.x86_64

##### nginx

1. 检查依赖：yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
2. 下载源码：wget http://nginx.org/download/nginx-1.13.7.tar.gz
3. 解压文件夹下：./configure --prefix=/usr/local/bin/nginx
4. cd  编译配置安装目录
5. 安装：make && make install
6. 启动：/usr/local/bin/ningx/sbin/nginx
   1. 重启：nginx -s reload
7. 开启端口
   1. 开启端口
      1. iptables -I INPUT -p tcp --dport 80 -j ACCEPT  
   2. 保存配置
      1. service iptables save
   3. 重启防火墙
      1. service iptables restart

###### //php nginx 通用配置

 

```nginx
server {

        listen       80;

        server_name  www.jinlaravel.com;

        root    "D:\phpstudy\PHPTutorial\www\jinlaravel\public";

        location / {

            index  index.html index.htm index.php l.php;

          autoindex  off;

         try_files $uri $uri/ /index.php?$query_string;

       }

      error_page   500 502 503 504  /50x.html;

      location = /50x.html {

          root   html;

      }

      location ~ \.php(.*)$  {

          fastcgi_pass   127.0.0.1:9000;

           fastcgi_index  index.php;

           fastcgi_split_path_info  ^((?U).+\.php)(/?.+)$;

           fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;

          fastcgi_param  PATH_INFO  $fastcgi_path_info;

           fastcgi_param  PATH_TRANSLATED  $document_root$fastcgi_path_info;

           include        fastcgi_params;

       }

  }
```



###### 宝塔配置

```nginx
server {
        listen       8067;
        server_name  localhost;
        root /Users/luohengyi/web/0418/0418/public;
        index index.php index.html index.htm default.php default.htm default.html;

    #禁止访问的文件或目录
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md)
    {
        return 404;
    }

    #一键申请SSL证书验证目录相关设置
    location ~ \.well-known{
        allow all;
    }

    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
    {
        expires      30d;
        error_log off;
        access_log off;
    }

    location ~ .*\.(js|css)?$
    {
        expires      12h;
        error_log off;
        access_log off;
    }


    location / {

         if (!-e $request_filename) {

                rewrite ^(.*)$ /index.php?s=$1 last;  break;

         }

    }
      location ~ \.php$ {

              fastcgi_pass   127.0.0.1:9000;

              fastcgi_index  index.php;

   #            fastcgi_param  SCRIPT_FILENAME  /Users/luohengyi/cs;   #如/var/www$fastcgi_script_name

              fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;

              include        fastcgi_params;

               fastcgi_intercept_errors on;

         }


 }
```

###### 常见问题

1. 403
   1. `fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;`
   2. 父级也要有访问权限，nginx 启动用户不一致

 



​		

​		

#### 	