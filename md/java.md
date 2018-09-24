# Java

## 开始

1. 主方法：如果需要解释器来直接执行一个java类必须要有一个main，并且必须使用<u>**public static**</u>来修饰man，且必须使用 void 来申明返回值，该方法的形产必须是一个<u>**字符串数组**</u>

#### 语法

#####  常量 final

1. 使用 final定义常量 类型可是是数组和8个基本类型
2. 常量不能修改通常是大写用于区别普通变量和常量

##### 变量

###### 数据类型

1. 浮点型
   1. float 32位 无限制    （精度不高可能失真，末尾需要用f修饰且注意float是8位有效数字，第7位数字将会产生四舍五入,一般不用这个）**float** c =12.123f  
   2. double 32位 无限制   （双精度）可以处理16位有效数,超过16位，考虑使用BigDecimal类
   3. BigDecimal 不能使用传统的+、-、*、/等算术运算符直接对其对象进行数学运算,而必须调用其相对应的方法
      1. public BigDecimal add(BigDecimal value);//加法
      2. public BigDecimal subtract(BigDecimal value);//减法 
      3. public BigDecimal multiply(BigDecimal value);//乘法
      4. public BigDecimal divide(BigDecimal value);//除法
   4. 科学计数法：**double** c =5.12e2;  实际是：5.12*10^2 该方法只能浮点类型使用
2. 整数类型
   1. byte 8位 -128 127
   2. short 16位 -32768 32767
   3. int  32位  -2147483648  2147483647
   4. long 64位 无限制
3. 字符类型
   1. char 64位 0～65535
   2. String
4. 布尔类型
   1. boolean
5. 引用类型
   1. 类类型
   2. 接口类型
   3. 数组类型

###### 类型转换

1. 强制转换：只能同类型之间转化，不能 string=》int。
2. 字符转int：Integer.*parseInt*(bString)
3. 转字符：String.valueOf(Object);

##### 逻辑运算符

1.  ++a
   1. ++i是想把i自增1然后拿来用
2. a++
   1. 是先把a的值拿来用,然后在自增1
3. equals()
   1. 比较2个字符是否相同，该方法属于 String类

##### 字符串 String

1. 初始化字符串：String aString = "asdfg";
2. 索引：aString.charAt(3)  //获取第4个字符
3. 追加字符串：aString = aString.concat("qqqq");  一般使用+=
4. 比较字符：
   1.  aString.equals(bString)   区别大小写
   2. aString.equalsIgnoreCase(bString)     不区别大小写
5. 替换字符串： aString = aString.replace("a", "世界你好");   //将所有的a替换成世界你好
6. 截取字符串：aString = aString.substring(0, 2);  //截取前2个字符
7. 分割字符串：String cs[] = aString.split(".");  //以.分割字符，返回一个数组
8. 大小写转化：
   1. 大写：aString = aString.toUpperCase();
   2. 小写：aString = aString.toLowerCase();
9. StringBuffer类：
   1. 提供了一些字符串的复杂操作例如：字符反转,等等

##### 数组 Arrays

1. 定义数组
   1. int[] a= {1,2};
   2. int a[]= {1,2};
   3. 多维数组：**int**[][] pStrings = {{1},{2}};
2. 复制数组：System.*arraycopy*(src, srcPos, dest, destPos, length);
   1. src:来源数组
   2. 来源数组起始位置
   3. 目标数组
   4. 目标数组起始位置
   5. 复制来源数组的元素个数
3. 数组比较：Arrays.equals(a, b);
4. 数组排序：Arrays.*toString*(a)。//只能对数字类型的数组排序,无返回值
5. 查找数组：Arrays.binarySearch(cString, "b");   //数字类型的数组查找需要先排序否者可能不不准确
6. 数组填充
   1. Arrays.*fill*(a, 12); 一次只能填充一个值
   2. a[0]=11;

###### 泛型 ArrayList

1. 初始化：ArrayList arrayList = **new** ArrayList(); 不指定类型，什么都可以装
2. ArrayList<Integer> arrayList = **new** ArrayList<Integer>(); //指定类型，值只能是这个类型
3. 添加元素
   1. arrayList.add(12);