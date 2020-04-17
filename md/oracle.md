# Oracle

创建用户 create  user username identified by password;

创建的用户无法登陆：grant create session to $user;

```sql
grant connect ,resource,dba to laolu;
-``-``connect  是链接数据库权限，可以对数据库进行增删改查
-``-``resource 资源使用权限，用来创建表格
-``-``dba 是数据库管理员权限
```

导入数据库：@/Users/luohengyi/Downloads/export.sql

删除用户DROP USER gis CASCADE

删除当前所得的表：select 'drop table '||table_name||';' from cat where table_type='TABLE'

#### 登录

1. su - oracle //切换到自己的oracle账户
2. sqlplus /nolog //登录oracle
   1. sqlplus / as sysdba
   2. sqlplus username/password
3. startup //启动oracle
4. conn /as sysdba //连接服务
5. lsnrctl start //启动oracle监听 命令行命令不在sqlplus中

#### 导出exp/导入imp

exp username/password file=url/sql.dmp owner=username

Imp username/password file=url/sql.dump  full=y ignore=y;

- full=y 是导入文件中全部内容
- ignore=y相当于，如果没有的表，创建并倒入数据，如果已经有的表，忽略创建的，但不忽略倒入