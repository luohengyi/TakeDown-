# myBatis

## 配置

1. **依赖包：mybatis-3.4.6.jar**
2. sql包：mysql-connector-java-5.1.47.jar

### 基础配置：mybatis-config.xml

1. ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE configuration
           PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
           "http://mybatis.org/dtd/mybatis-3-config.dtd">
   <configuration>
       <settings>
           <!--执行sql时将sql语句输出到控制台-->
           <setting name="logImpl" value="STDOUT_LOGGING"/>
           <!-- 开启二级缓存 -->
           <setting name="cacheEnabled" value="true"/>
           <!-- 开启懒加载 -->
           <setting name="lazyLoadingEnabled" value="true"></setting>
           <setting name="aggressiveLazyLoading" value="false"></setting>
           
       </settings>
       <!--指定bean目录-->
       <typeAliases>
           <package name="com.lhy.bean"></package>
       </typeAliases>
   
       <environments default="development">
           <environment id="development">
               <!--使用jdbc管理事物-->
               <transactionManager type="JDBC"/>
               <!--配置数据的链接信息 -->
               <dataSource type="POOLED">  <!--POOLED 使用了链接池 -->
                       <property name="driver" value="${driver}"/>
                       <property name="url" value="${url}"/>
                       <property name="username" value="${username}"/>
                       <property name="password" value="${password}"/>
   
               </dataSource>
   
   
           </environment>
       </environments>
       <mappers>
           <package name="com.lhy.mapper"></package>
       </mappers>
   </configuration>
   ```

### mapper.xml （映射器）

1. ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE mapper
           PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
           "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
   <mapper namespace="com.lhy.mapper.UserMapper">
       <!-- 启用缓存 -->
        <cache/>
       <!--id对应dao接口名，接口方法不能重载-->
       <!-- resultType 返回的类型 ,如果定义了字段映射那么将使用 resultMap="rm" 的方式来设置返回类型  此处如果不写User的报名需要在mybatis-config.xml中配置bean目录-->
        <!--  #{id}来预编译，${} 将拼接里面的sql可能会被sql注入 -->
       <select id="getUserByid" resultType="User">
         select * from users where id = #{id}
       </select>
   
   	<!-- 修改插入类型的sql返回值自动根据dao接口的返回类型自动匹配返回，必须使用sqlsession手动提交事物 -->
       <insert id="saveUser" >
           insert into users value (#{id},#{password},#{username},#{role_id})
       </insert>
   
       <!--如果字段名和bean类名不同，通过映射解决，旧版本的mybatis需要将所有的字段全部映射-->
       <!--<resultMap id="rm" type="User">-->
           <!--<result property="beanName" column="sqlName"></result>-->
       <!--</resultMap>-->
   </mapper>
   ```

### Dao（接口层，mapper）：

1. mapper层的处理（相当于dao层）

   1. ```java
        /**
           * 通过注解方式构建sql，有利于简单的slq构建,否者通过xml的方式构建sql
           * @return
           */
          @Results({  //配置字段映射解决数据库字段和bean对象字段名不同的问题
                @Result(property = "beanName",column = "sqlName"),
                @Result(property = "beanName",column = "sqlName")
           })
          @Select("select * from users")
          List<User> getUserAll();
        ```
      ```
   
      ```

2. 获取sqlSession

3. ```java
   //获取基础配置文件mybatis-config.xml的输入流
   InputStream resourceAsStream = Resources.getResourceAsStream(filePath);
   //通过SqlSessionFactoryBuilder获取SqlSessionFactory
   SqlSessionFactory sqlSessionFactory = 
      					 new SqlSessionFactoryBuilder().build(resourceAsStream);
   /*
   传入一个 properties 用来配置数据库链接，用户名等基础配置
   SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream, properties);
   */
   //通过sqlsession工厂打开一个sqlSession
   SqlSession sqlSession = sqlSessionFactory.openSession();	
   ```


### 调用mapper（相当于daoimpl）：

1. 调用方式1

   1. ```java
      //使用sqlSession.getMapper通过反射传入接口地址来获取一个mapper实现类（dao实现类）
      UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
      //调用具体的方法获取或者修改数据
      User user1 = userMapper.getUserByid(1);
      System.out.println(user1);
      ```

2. 调用方式2

   1. ```java
       //  通过手动传入mapper接口地址加参数的方式调用接口
          User user = 
          sqlSession.selectOne("com.lhy.mapper.UserMapper.getUserByid", 1);
       ```


## 映射文件

#### 更新（update，delete，insert）：

##### insert：

1. 获取主键

   ```xml
   <!-- useGeneratedKeys="true" 开去获取主键，默认关闭 -->
   <!-- keyProperty="id" 将主键封入传入的bean对象中 -->
   <insert id="insertAuthor" useGeneratedKeys="true"
       keyProperty="id">
     insert into Author (username,password,email,bio)
     values (#{username},#{password},#{email},#{bio})
   </insert>
   ```

   ```java
   bean.getId //mybatis 自动将封入传入的bean对象中，使用get方法获取id
   ```

2. 1

##### update

1. `<set></set`

   1. ```xml
      <update id="updateUser" parameterType="User">
              update users
          <!-- 在适当的时候自动去除逗号-->
              <set>  
                  <if test="username != null"> username=#{username},</if>
                  <if test="password != null">  password=#{password},</if>
              </set>
              where id=#{id}
      </update>
      ```

##### where

1. ```xml
   <select id="getUser" resultMap="rm">
         select * from users
       <!-- 适当的时候去除and -->
         <where>
             <if test="id >0">
                 and id=#{id}
             </if>
             <if test="username != null">
                 and username=#{username}
             </if>
         </where>
   
       </select>
   ```




#### `<sql>`标签

1. 定义

   1. ```xml
      <!-- 在sql定义展位符，在使用时传入  -->
      <sql id="userColumns"> ${alias}.id,${alias}.username,${alias}.password </sql>
      
      <!-- 直接使用bean对象的数据  -->
      <sql id="whereId">where id=#{id} </sql>
      ```

2. 使用

   1. ```xml
      <!-- 调用标签并且传入参数  -->
      <include refid="userColumns">
                 <property name="alias" value="users"></property>
      </include>
       <!-- 直接调用 -->
       <include refid="whereId"></include>
      
      ```


#### Choose

1. ```xml
   <select id="getUser" resultMap="rm">
         select * from users
         <!-- 类似switch 进入一个后不会再进入其他分支-->
         <where>
           <choose>
               <when test="id >0">
                   and id=#{id}
               </when>
               <when test="username != null">
                   and username=#{username}
               </when>
               <!-- 如果都不满足会进入默认分支 -->
                <otherwise>
                   
               </otherwise>
           </choose>
         </where>
   
       </select>
   ```

#### foreach

1. ```xml
    <select id="getUser" resultMap="rm">
         select * from users where id in 
        <!-- 循环的变量 开始open（ 中间separator，分割 结束close）下标index 便利的值value  -->
         <foreach collection="list" open="(" separator="," close=")"  index="index" item="value">
             #{value}
         </foreach>
       
       </select>
    ```

## 缓存

### 一级缓存 不同的mapper级别的缓存，自动开启

### 二级缓存 不同的sqlSession级别缓存，需要手动开启

1. 在mybatis-config.xml中配置：<setting name="cacheEnabled" value="true"/>
2. 在mapper.xml中启用：<cache/>
3. 可以在方法中控制缓存的清空以及该方法是否启用缓存
   1. flushCache	将其设置为 true，任何时候只要语句被调用，都会导致本地缓存和二级缓存都会被清空，默认值：false
   2. useCache	将其设置为 true，将会导致本条语句的结果被二级缓存，默认值：对 select 元素为 true。

## 复杂关系映射

### 一对一

1. ben对象结构目录

   ```java
   	Class User{
           private int id;
           private String username;
           private String password;
           private int role_id;
           private Role role;  //用户的权限对象
       }
   ```

2. mapper.xml配置

   1. ```xml
      <!-- join联合查询方式的配置。无论是否使用到role对象的属性都会去查询到role的数据 -->
      <resultMap id="user" type="User">
              <id property="id" column="id"></id>
              <result property="username" column="username"></result>
              <result property="password" column="password"></result>
              <result property="role_id" column="role_id"></result>
          	<!-- 配置对应关系   Role的bean对象     user类用来装ruole类的属性名  -->
              <association javaType="Role" property="role"  >  
                  <id property="role_id" column="role_id"></id>
                  <result property="name" column="name"></result>
                  <result property="ruleconten" column="ruleconten"></result>
              </association>
          </resultMap>
      
      <!-- 懒加载方式 -->
      <!--开启懒加载需要在 mybatis-config.xml 中申明2个配置-->
      <setting name="lazyLoadingEnabled" value="true"></setting>
      <setting name="aggressiveLazyLoading" value="false"></setting>
      
      <resultMap id="user" type="User">
              <id property="id" column="id"></id>
              <result property="username" column="username"></result>
              <result property="password" column="password"></result>
          <!--使用其他包里面查询  Role对应Role对象 对应关系 user类用来装ruole类的属性名 -->
              <association  select="com.lhy.mapper.RoleMapper.getRoleByid" javaType="Role" column="role_id" property="role">
                  <id property="role_id" column="role_id"></id>
                  <result property="name" column="name"></result>
                  <result property="ruleconten" column="ruleconten"></result>
              </association>
          </resultMap>
      ```

3. mapper.xm sql语句

   1. ```xml
       <!-- join联合查询方式的配置。无论是否使用到role对象的属性都会去查询到role的数据 -->
       <select id="getUserByid" resultType="com.lhy.bean.User" resultMap="user">
          
            select * from users,role where users.role_id=role.role_id and users.id=#{id}
          
        </select>
          <!-- 懒加载的方式去查询数据但是如果查询列表会导致多次查询 -->
       ```


      ```
   
      ```

### 一对多

1. ben对象结构目录

   1. ```java
      Class Role{
          private int role_id;
          private String name;
          private String ruleconten;
          private List<User> users;
      }
      ```

2. mapper.xml配置

   1. ```xml
      <resultMap id="role" type="Role">
              <id property="role_id" column="role_id"></id>
              <result property="name" column="name"></result>
              <result property="ruleconten" column="ruleconten"></result>
              <collection select="com.lhy.mapper.UserMapper.getUserByRoleId" property="users" column="role_id" javaType="List" ofType="User">
                  <id property="id" column="id"></id>
                  <result property="username" column="username"></result>
                  <result property="password" column="password"></result>
              </collection>
          </resultMap>
      
      
      
       <select id="getRoleByid" resultMap="role" >
              select * from role where role_id=#{id}
          <select>
      ```

## 逆向工程 

1. **依赖包：mybatis-generator-core-1.3.7.jar**

### mybatis-generator-config.xml 配置：

1. ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE generatorConfiguration
           PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
           "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
   
   <generatorConfiguration>
       <classPathEntry location="/Users/luohengyi/IdeaProjects/DemoMybatis/lib/mysql-connector-java-5.1.47.jar" />
   
       <context id="DB2Tables"  targetRuntime="MyBatis3">
           <!--bean生成toString方法-->
           <plugin type="org.mybatis.generator.plugins.ToStringPlugin" />
   
           <commentGenerator>
               <property name="suppressDate" value="true"/>
               <property name="suppressAllComments" value="true" />
           </commentGenerator>
           <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                           connectionURL="jdbc:mysql://127.0.0.1/JavaLibrary"
                           userId="root"
                           password="123123">
               <!-- 禁止查询复杂信息 -->
               <property name="nullCatalogMeansCurrent" value="true" />
           </jdbcConnection>
   
           <!-- 不要将数据转化为BigDecimals -->
           <javaTypeResolver >
               <property name="forceBigDecimals" value="false" />
           </javaTypeResolver>
   
           <!--bean对象地址配置-->
           <javaModelGenerator targetPackage="com.lhy.bean" targetProject="src">
               <!--同意添加包前缀-->
               <property name="enableSubPackages" value="false" />
               <!--去除空格-->
               <property name="trimStrings" value="true" />
           </javaModelGenerator>
   
           <!--关系映射文件-->
           <sqlMapGenerator targetPackage="com.lhy.mapper"  targetProject="src">
               <property name="enableSubPackages" value="false" />
           </sqlMapGenerator>
   
           <!--map接口-->
           <javaClientGenerator type="XMLMAPPER" targetPackage="com.lhy.mapper"  targetProject="src">
               <property name="enableSubPackages" value="false" />
           </javaClientGenerator>
   
           <!--具体生成哪张表-->
           <table schema="DB2ADMIN" tableName="users" domainObjectName="Users"   />
           <!--<table schema="DB2ADMIN" tableName="role" domainObjectName="Role"  />-->
           <!--<table schema="DB2ADMIN" tableName="role" domainObjectName="Role" >-->
               <!--&lt;!&ndash;&lt;!&ndash;是否生成主键&ndash;&gt;&ndash;&gt;-->
               <!--<property name="useActualColumnNames" value="true"/>-->
               <!--&lt;!&ndash;主键字段名&ndash;&gt;-->
               <!--<generatedKey column="ID" sqlStatement="DB2" identity="true" />-->
               <!--<columnOverride column="DATE_FIELD" property="startDate" />-->
               <!--&lt;!&ndash;忽略的列&ndash;&gt;-->
               <!--<ignoreColumn column="FRED" />-->
               <!--&lt;!&ndash;字段的重写 制定数据类型&ndash;&gt;-->
               <!--<columnOverride column="LONG_VARCHAR_FIELD" jdbcType="VARCHAR" />-->
   
       </context>
   </generatorConfiguration>
   ```


### 执行生成：

1. ```java
    InputStream inputStream = Demo.class.getClassLoader().getResourceAsStream("mybatis-generator-config.xml");
           List<String> warnings = new ArrayList<String>();
   
           ShellCallback callback = new DefaultShellCallback(true);
           Configuration config = new ConfigurationParser(warnings).parseConfiguration(inputStream);
           MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
           myBatisGenerator.generate(null);
   
           for (String warning : warnings) {
               System.out.println(warning);
           }
   ```

## 分页插件

1. 依赖包 注**意版本否者出现找不到类**

   1. jsqlparser-1.3.jar
   2. pagehelper-5.1.8.jar

2. mybatis-config.xml插件拦截配置

   1. ```xml
        <plugin interceptor="com.github.pagehelper.PageInterceptor">
                  <!--链接类型-->
                  <property name="helperDialect" value="mysql"></property>
                  <!--合理化分页-->
                  <property name="reasonable" value="true"></property>
              </plugin>
      ```

3. 调用分页

   1. ```java
      PageHelper.startPage(1,4);
      //必须紧挨着查询，如果这次没有使用，那么可能会照成下次查询其他内容时使用分页
      UsersMapper mapper = sqlSession.getMapper(UsersMapper.class);
      //如果要使用 Page 类 那么需要强转，否者正常返回一个list，但是Page类中携带了分页信息
      Page<Users> users = (Page<Users>)mapper.selectByExample(null);
      for (Users user : users.getResult()) {
      	System.out.println(user);
      }
      ```
