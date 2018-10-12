# Java

##### 概念

1. JRE---核心类库，运行环境
2. jdk—开发工具包
   1. 编译工具javac.exe
   2. 打包工具java.jar

##### 项目结构

1. src 源代码

   1. package 命名规则 com.公司名.项目名.模块名.……
2. lib  类库
3. res 静态资源

##### 计算机基础

1. 通过码值循环0-9，a-z


## 开始

1. 主方法：如果需要解释器来直接执行一个java类必须要有一个main，并且必须使用<u>**public static**</u>来修饰man，且必须使用 void 来申明返回值，该方法的形产必须是一个<u>**字符串数组**</u>

#### 语法

##### 修饰符

1. 默认修饰符：如果什么都不写那么方法只能在自己的类和同一个包中的类调用
2. final
   1. 字段：定义常量，该字符不能被修改了一半常量大写区别变量
   2. 修饰类: 用final修饰的类不能被继承，即不能拥有自己的子类。
   3. 修饰方法：此方法不能被重写.**重写的条件是子类继承这个方法，所以将父类的final方法用private修饰后子类可写一个一样的方法**
3. public
   1. 属性和方法：此方法或属性所在的类和以及子类，同一个包中的类，不同包中的类，都可以访问
4. private
   1. 属性和方法:只能**内部使用**；
5. protected
   1. 属性和方法:**内部和子类**使用,同一个**包中的其他类**；
6. Static：静态成员的定义
7. transien：（只能修饰变量）关键字表示制定属性不参与序列化
   1. 序列化和反序列化：将类输入到io流中，实际就是持久化这个类
      1. ObjectOutputStream outputStream = new ObjectOutputStream(**new**FileOutputStream("/Users/luohengyi/cs/cs.obj"));
      2. 写入类:	outputStream.writeObject(**new** Cs());
      3. 关闭流:    outputStream.close();
      4. ObjectInputStream in = **new** ObjectInputStream(**new** FileInputStream("/Users/luohengyi/cs/cs.obj"));​	
      5. 获取输入流：Cs cs =(Cs)in.readObject();
      6. 总结:被序列化的类必须实现**<u>serializable</u>**接口， transien修饰的字段在写入时会被忽略，<u>**这个序列机制是否是可以像php一样做一些配置功能呢？**</u>
8. volatile:（只能修饰变量）当有多个线程在调用这个变量时，某一个线程更新数据后，确保每个线程数据同步
9. abstract: 抽象方法，和抽象类的定义
   1. 一个类只能继承1个抽象类
   2. 抽象类拥挤所有的基础类型和成员
10. synchronized:（只能修饰方法）
   1. 某个对象实例内，synchronized aMethod(){}可以防止多个线程同时访问这个对象的synchronized方法（如果一个对象有多个synchronized方法，只要一个线 程访问了其中的一个synchronized方法，其它线程不能同时访问这个对象中任何一个synchronized方法）。这时，不同的对象实例的 synchronized方法是不相干扰的。也就是说，其它线程照样可以同时访问相同类的另一个对象实例中的synchronized方法；
   2. 某个类的范围，synchronized static aStaticMethod{}防止多个线程同时访问这个类中的synchronized static 方法。它可以对类的所有对象实例起作用。

#####  常量 final

1. 使用 final定义常量 类型可是是数组和8个基本类型
2. 常量不能修改通常是大写用于区别普通变量和常量

##### 变量

###### 数据类型

1. 浮点型，java中小数常量默认为double类型
   1. float 32位 无限制    （精度不高可能失真，末尾需要用f修饰且注意float是8位有效数字，第7位数字将会产生四舍五入,一般不用这个）**float** c =12.123f  
   2. double 32位 无限制   （双精度）可以处理16位有效数,超过16位，考虑使用BigDecimal类
   3. 解决精度丢失问题使用BigDecimal类，float或者double构造BigDecimal也会出现丢失，但是string构造BigDecimal不会出现丢失，BigDecimal 不能使用传统的+、-、*、/等算术运算符直接对其对象进行数学运算,而必须调用其相对应的方法
      1. public BigDecimal add(BigDecimal value);//加法
      2. public BigDecimal subtract(BigDecimal value);//减法 
      3. public BigDecimal multiply(BigDecimal value);//乘法
      4. public BigDecimal divide(BigDecimal value);//除法
   4. 科学计数法：**double** c =5.12e2;  实际是：5.12*10^2 该方法只能浮点类型使用
2. 整数类型 （这里的位数是二进制的位数）,java中整数常量默认为int类型
   1. byte 8位 -128 127
   2. short 16位 -32768 32767
   3. int  32位  -2147483648  2147483647
   4. long 64位 无限制，末尾带l标示改数字为long类型
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
   1. char可以强转int，ascall对照表
2. 字符转int：Integer.*parseInt*(bString)
3. 转字符：String.valueOf(Object);

##### 逻辑运算符

1. ++a，a++

   1.  Int i =1;System.**err**.println(++i);  得到2
   2.  Int i =1;System.**err**.println(i++);  得到1
   3. 以上2种内存中i值都为2
   4. int y;int i =1;y=i++;此处y=1；

2. equals()

   1. 比较2个字符是否相同，该方法属于 String类

3. 除发：/ 在java中整数相除得到商(**<u>只会保留整数部分</u>**)，会出现除不尽的，比如6/5得到1，**<u>浮点数相除会得到一个小数</u>**

4. a+=1

   1.  此处1为int，**<u>用+=不会做类型提升</u>**

5. instanceof  判断一个类是否重属于宁外一个类

   1. String name="";    //判断name是否是String类的实例对象

      **if** (name **instanceof** String) {​		

   ​		}

6.  ^ ,a^b  a和b同时为false或者true时返回true；



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

###### 泛型  List ,ArrayList ,LinkedList

1. 初始化：ArrayList arrayList = **new** ArrayList(); 不指定类型，什么都可以装
2. ArrayList<Integer> arrayList = **new** ArrayList<Integer>(); //指定类型，值只能是这个类型
3. 添加元素：
   1. arrayList.add(12);
   2. arrayList.add(1,12); //将新的元素放在第二个位置
4. 删除元素：arrayList.remove(2); 元素下标
5. 输出：List<Integer> list = **new** ArrayList<>();

​		for (Integer integer : list) {

​		System.**out**.println(integer);

​		}

##### 分支结构

1. swicth语句可选择的类型只有五种 byte，int ,char, short,String

#### 系统类

1. java.util.Scanner;   //获取控制台输入
   1. Scanner scanner = **new** Scanner(System.**in**);   
   2. scanner.nextInt(); //获取输入
   3. scanner.close(); //关闭流，防止内存占用

#### Package和import机制

1. 每个类有自己的类package地址如果调用不同包中的类，需要使用**import**倒入该类的package地址
2. 如果不倒入，则需要new出完整地址如：**new** luohengyi.demo.Cs();



#### 面向对象

###### 继承： extends

1. 关键字 extends 。在java中，只能继承1个父类
2. 使用super调用父类的方法和属性
3. super() 方法直接调用父类的构造方法
4. 方法的重写：子类包含父类同名的方法（方法名相同，形参相同）
5. 方法的重载：方法名相同，形参不同

###### 接口：interface

1. 定义接口<u>**（定义[规范越苏]和实现的分离）**</u>

   1. public interface  Movement {}   //不能用class了
   2. 如果要定义访问级别只能是public
   3. **<u>只能定义静态常量，不能定义变量</u>**
   4. 在接口个中定义的常量，实现类中，可以直接通过常量名访问 不需要加接口名
   5. 接口里面的方法都是抽象或公共的所以和以省略 public和abstract
   6. 接口的方法都必须在子类中实现
   7. **<u>接口不能定义静态方法</u>**
   8. 137页，引用接口

###### 抽象：abstract:

1. 抽象方法，抽象类的定义：**public** **abstract**  （**<u>一类对象的模版</u>**）
2. 一个类只能继承1个抽象类
3. 抽象类拥挤所有的基础类型和成员
4. 抽象类可以有构造器，但不用于创建对象，是让子类调用这些构造器来完成属于抽象类的初始化操作
5. 抽象方法必须在子类中实现

###### 重写和重载：

1. **<u>重写</u>**：子类和父类同名的方法，排除父类private修饰，重写只针对可以被继承的方法
2. **<u>重载</u>**：同名方法，不同类型的形参数
3. 142页