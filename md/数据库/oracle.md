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

删除用户 DROP USER gis CASCADE

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

### 函数

##### merge into 

> 使用b表去更新a表的数据存在就更新不存在就插入

```sql
merge into a_merge a using (select b.aid,b.name,b.year from b_merge b) c on (a.id=c.aid)  
when matched then  
  update set a.year=c.year   
when not matched then  
  insert(a.id,a.name,a.year) values(c.aid,c.name,c.year);  
```

查询约束所在表

select constraint_name,constraint_type,table_name from all_constraints where CONSTRAINT_NAME='PK_ID';

##### to_date

```sql
to_date('2020-09-21 18:21:00','yyyy-mm-dd,hh24:mi:ss')
```

### 常见bug

##### Oracle启动监听报错：The listener supports no services解决

##### 关闭session连接

```sql
select  *  from v$session where OSUSER='luohengyi' and program='JDBC Thin Client'

 select 'alter system DISCONNECT session '''||sid||','||serial#||''' POST_TRANSACTION;'  
    from v$session  
    where  OSUSER='luohengyi' and program='JDBC Thin Client'
```

