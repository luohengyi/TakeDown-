#  Java

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


# 开始

1. 主方法：如果需要解释器来直接执行一个java类必须要有一个main，并且必须使用<u>**public static**</u>来修饰man，且必须使用 void 来申明返回值，该方法的形产必须是一个<u>**字符串数组**</u>

## 语法

### 关键字

1. new：开辟内存空间，将内存空间指向对象，完成对象属性初始化

### 修饰符

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
      6. 总结:被序列化的类必须**<u>实现serializable</u>**接口， transien修饰的字段在写入时会被忽略，<u>**这个序列机制是否是可以像php一样做一些配置功能呢？**</u>
8. volatile:（只能修饰变量）当有多个线程在调用这个变量时，某一个线程更新数据后，确保每个线程数据同步
9. abstract: 抽象方法，和抽象类的定义
   1. 一个类只能继承1个抽象类
   2. 抽象类拥挤所有的基础类型和成员
10. synchronized:（只能修饰方法）
   1. 某个对象实例内，synchronized aMethod(){}可以防止多个线程同时访问这个对象的synchronized方法（如果一个对象有多个synchronized方法，只要一个线 程访问了其中的一个synchronized方法，其它线程不能同时访问这个对象中任何一个synchronized方法）。这时，不同的对象实例的 synchronized方法是不相干扰的。也就是说，其它线程照样可以同时访问相同类的另一个对象实例中的synchronized方法；
   2. 某个类的范围，synchronized static aStaticMethod{}防止多个线程同时访问这个类中的synchronized static 方法。它可以对类的所有对象实例起作用。

###  常量 final

1. 使用 final定义常量 类型可是是数组和8个基本类型
2. 常量不能修改通常是大写用于区别普通变量和常量
3. 修饰类，方法，变量不可改变
4. 方法参数中修饰参数，再该方法中不能修改该方法的引用



### 数据类型

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

#### 类型转换

1. 强制转换：只能同类型之间转化，不能 string=》int。
   1. char可以强转int，ascall对照表
2. 字符转int：Integer.*parseInt*(bString)
3. 转字符：String.valueOf(Object);

#### 逻辑运算符

1. ++a，a++

   1.  Int i =1;System.**err**.println(++i);  得到2
   2.  Int i =1;System.**err**.println(i++);  得到1
   3. 以上2种内存中i值都为2
   4. int y;int i =1;y=i++;此处y=1；

2. equals()

   1. 比较2个字符是否相同，该方法属于 String类

3. ==:

   1. obj1==obj2 判断是obj1,obj2这两个引用变量是否相等，即它们所指向的对象是否为同一个对象。言外之意就是要求两个变量**<u>所指内存地址相等的时候，才能返回true</u>**，每个对象都有自己的一块内存，因此必须指向同一个对象才返回ture。

4. 除发：/ 在java中整数相除得到商(**<u>只会保留整数部分</u>**)，会出现除不尽的，比如6/5得到1，**<u>浮点数相除会得到一个小数</u>**

5. a+=1

   1.  此处1为int，**<u>用+=不会做类型提升</u>**

6. instanceof  判断一个类是否重属于宁外一个类

   1. String name="";    //判断name是否是String类的实例对象

      **if** (name **instanceof** String) {​		

   ​		}

   2. instanceof运算符要么**<u>前面与后面的类型相同，要么与后面的类有父子关系</u>**，否则会引起编译错误

7. ^ ,a^b  a和b同时为false或者true时返回true；



#### 字符串 String

1. 初始化字符串：String aString = "asdfg";
2. 索引：aString.charAt(3)  //获取第4个字符
3. 追加字符串：aString = aString.concat("qqqq");  一般使用+=
4. 比较字符：
   1.  aString.equals(bString)   区别大小写
   2.  aString.equalsIgnoreCase(bString)     不区别大小写
   3.  aString.compareTo();  比较2个字符串，返回长度差值,分解为char逐个比较cos码，**<u>可用于字符串排序！</u>**
5. 返回字符最后一次出现的下标：aString.lastIndexOf('a') 
6. 替换字符串： aString = aString.replace("a", "世界你好");   //将所有的a替换成世界你好
7. 截取字符串：aString = aString.substring(0, 2);  //截取前2个字符
8. 分割字符串：String cs[] = aString.split(".");  //以.分割字符，返回一个数组
9. endsWith(String name); //该字符是否以name结尾
10. 大小写转化：
   1. 大写：aString = aString.toUpperCase();
   2. 小写：aString = aString.toLowerCase();
11. 返回常量池的地址引用：intern()

##### StringBuffer

1. 类**他是String的2000多倍的性能，**安全高于StringBuilder**
2. 提供了一些字符串的复杂操作例如：字符反转,等等
3. StringBuffer stringBuffer = **new** StringBuffer();
4. 字符拼接：stringBuffer.append("a"); /**/他是 stringBuffer+=“a”的2千多倍**
5. 删除指定位置的字符：deleteCharAt(index);
6. 删除下标s到e的字符：delete(start, end)；
7. 指定位置添加字符：insert(int,String);
8. 替换一段字符：replace(start, end, str)；
9. 字符反转：reverse();
10. indexOf(str);返回字符第一次出现的下标
11. lastIndexOf(str)；最后一个出现的位置
12. setLength(int);设置字符串长度，如果为0会清空字符串

##### StringBuilder类

1. 他是StringBuffer 2倍类型
2. 拼接：
   1. StringBuilder stringBuilder = **new** StringBuilder();
   2. stringBuilder.append("a");

##### 正则

1. 规则：

   1. \ \代表1个\

   2. \ n 换行

   3. \ r 回车

   4. [abc] ：abc中的一个

   5. [^abc] : 除了abc之外的字符

   6. [a-zA-z] : a到z A-Z

   7. [0-9] : 0到9

   8. [a-z_0-9] a到z 或者0到9

   9. . ：任何字符

   10. \d 数字 0-9

   11. \w  ：[a-zA-z_0-9]

   12. `*`   至少0位字符

   13. ?  一次，或者1次也没有

   14. `+` 至少1位

   15. {n} 恰好n次

   16. {n,}至少n次

   17. {n,m}至少n次，但不超过m次

   18. ?!非。 例如  [?!0-9]不是数字

   19. 特殊字符的转意

       ```java
       "192,168.23.4".split("\\.")  //根据.分割字符
       ```

2. String.matches(regex);   Boole 是否满足该正则表达式

3. String.split();根据规则拆分字符位数组

   1. ```java
      "123a".split("2")  //[1, 3a]
      ```

4. replaceAll(regex, replacement); 将regex匹配到的字符替换成replacement

5. 

​		

#### 数组 Arrays

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
4. 数组排序：Arrays.*sort*(a)。//只能对数字类型的数组排序,无返回值
5. 查找数组：Arrays.binarySearch(cString, "b");   //数字类型的数组查找需要先排序否者可能不不准确
6. 数组填充
   1. Arrays.*fill*(a, 12); 将所有值变更为12
   2. a[0]=11;

##### 泛型  List ,ArrayList ,LinkedList

1. 初始化：ArrayList arrayList = **new** ArrayList(); 不指定类型，什么都可以装

2. ArrayList<Integer> arrayList = **new** ArrayList<Integer>(); //指定类型，值只能是这个类型

3. 添加元素：
   1. arrayList.add(12);
   2. arrayList.add(1,12); //将新的元素放在第二个位置

4. 删除元素：arrayList.remove(2); 元素下标

5. 输出：

   1. ```java
       List<Integer> list = **new** ArrayList<>();
       ```

         	for (Integer integer : list) {

              System.out.println(integer);
       
          }	
      ```
   
      ```


#### 分支结构

1. swicth语句可选择的类型只有五种 byte，int ,char, short,String

### 系统类

1. java.util.Scanner;   //获取控制台输入
   1. Scanner scanner = **new** Scanner(System.**in**);   
   2. scanner.nextInt(); //获取输入
   3. scanner.next(); 如果有空格，那么空格后面的字符就不会获取
   4. scanner.nextLine(); 接受一行的输入
   5. scanner.hasNextXXX(); **判断用户有没有该类型的输入**
   6. scanner.close(); //关闭流，防止内存占用

2. 包装类
   1. Integer
      1. Integer.*toBinaryString*(15); 进制转换
      2. Integer.*parseInt*(bString);转化为int

3. 工具类
   1. Math
      1. cei();向上取整
      2. floor();向下取整
      3. round();四舍五入
      4. 获取2个数之间的随机数，包含起点和终点：(**int**)(Math.*random*()*(end-start+1))+start;
      5. max();获取2个数之间的较大数
      6. min();获取2个数之间的较小数
      7. pow(a, b);a的b次方。返回的是一个小数
      8. sqrt(int a); 开方
      9. 

4. 随机数

   1. Random类
      1. nextInt(int a); 返回一个0到a之间的随机数

5. 系统类

   1. system
      1. gc();提醒系统进行垃圾回收，但是系统不会立刻回收
      2. 复制数组：System.*arraycopy*(src, srcPos, dest, destPos, length);
         1. src:来源数组
         2. 来源数组起始位置
         3. 目标数组
         4. 目标数组起始位置
         5. 复制来源数组的元素个数
      3. currentTimeMillis():
         1. 返回以毫秒为单位的当前时间。
         2. 1秒=1000毫秒，即1s=1000ms
      4. System.*getProperty*("user.dir") ;获取项目目录

6. 超类

   1. object

      1. clone();可以实现对象的克隆，包括成员变量的数据复制，

   2. 对象名 instanceof 类名

      //表示：判断该对象名是否是该类名一个对象

7. String

#### Date(时间处理)

1. https://www.cnblogs.com/jxtx92/p/8005620.html

2. 初始化格式类： **new** SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

3. 获取格式化时间：simpleDateFormat.format(Date date);

4. String 和毫秒转化

   ```java
   SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");  //首先要定义这个格式时间的格式
   		
   Calendar calendar = Calendar.getInstance();
   
   calendar.setTime(simpleDateFormat.parse("2012-3-4"));  //设置日历类的时间
   
   calendar.getTimeInMillis()  //获取毫秒时间
   ```


#### BigInteger(大型数字处理)

1. 可以让超过Integer范围内的数据进行运算

#### Properties（读取配置文件）

1. load(inputStream);  从一个流中读取配置文件，从输入流中读取属性列表（键和元素对

2. getProperty(string); 读取指定的键

3. ```java
   //读取database数据库配置，将res文件夹添加到编译列表中
   static {
   		
   		InputStream inputStream =  Model.class.getClassLoader().getResourceAsStream("database.properties");
   	
   		//按简单的 XML 格式加载和存储属性
   		Properties properties = new Properties();
   		try {
   			properties.load(inputStream);
   			//获取参数
   			driver = properties.getProperty("driver");
   			url=properties.getProperty("url");
   			userName=properties.getProperty("userName");
   			password=properties.getProperty("password");
   		} catch (IOException e) {
   			// TODO Auto-generated catch block
   			e.printStackTrace();
   		}finally {
   			try {
   				inputStream.close();
   			} catch (IOException e) {
   				// TODO Auto-generated catch block
   				e.printStackTrace();
   			}
   		}
   		
   	
   	}
   ```



### Package和import机制

1. 每个类有自己的类package地址如果调用不同包中的类，需要使用**import**倒入该类的package地址
2. 如果不倒入，则需要new出完整地址如：**new** luohengyi.demo.Cs();



## 面向对象

#### 成员变量：

1. 静态成员变量
   1. 改变一个对象的静态成员变量，所有这一类的静态成员变量都会改变

#### 继承： extends

1. 关键字 extends 。在java中，只能继承1个父类
2. 使用super调用父类的方法和属性
3. super() 方法直接调用父类的构造方法
4. **<u>子类并不是继承父类的构造方法，只是在初始化子类时，子类自动调用了父类的构造方法</u>**
5. 一个类的构造器可以重载，可以拥有多个**，如果给构造器定义了参数，建议额外编写一个无参数的构造器**，在一个构造器中调用宁外一个构造器，需要用this调用来实现。
6. 方法的重写：子类包含父类同名的方法（方法名相同，形参相同）
7. 方法的重载：方法名相同，形参不同
8. 在构造方法中，可以**<u>通过this(String atring) ，的方式访问其他的构造器</u>**//也只有这种方式去访问其他构造器
   1. **每个构造器总只能调用一个this();**
   2. **并且在调用this(),方法之前不能有其他任何代码**
   3. 如果在默认构造器中调用了其他构造器，那么在执行之前会调用父类的构造方法
   4. 不管子类是否调用父类的构造器，系统都是自动的去调用父类的构造器，父类的构造器只能在子类的构造器中的第一行去调用,
   5. **在父类构造函数内部调用具有多态行为的函数将导致无法预测的结果**，因为此时子类对象还没初始化，此时调用子类方法不会得到我们想要的结果。因为此时子类对象还没有初始化，如果此时调用了子类的方法，此时调用子类方法不会得到我们想要的结果。
   6. 编写构造器的准则：**用尽可能的方法使对象进入正常状态，如果可以的话避免调用其他方法**，否者**尽可能地将这些方法定义为 private或final**，因为他们不能被重写

#### 接口：interface

1. 定义接口<u>**（定义[规范越苏]和实现的分离）**</u>

   1. public interface  Movement {}   //不能用class了
   2. 如果要定义访问级别只能是public
   3. **接口中的域默认时静态的并且时final的**，所以可以省略final和static关键字。
   4. 接口里面的方法都是抽象或公共的所以和以省略 public和abstract
   5. 接口的方法都必须在子类中实现
   6. **<u>接口不能定义静态方法</u>**
   7. 接口只能定义静态,常量属性
   8. **接口没有构造器**

#### 抽象：abstract:

1. 抽象方法，抽象类的定义：**public** **abstract**  （**<u>一类对象的模版</u>**）
2. 一个类只能继承1个抽象类
3. 抽象类拥挤所有的基础类型和成员
4. 抽象类可以有构造器，但不用于创建对象，是让子类调用这些构造器来完成属于抽象类的初始化操作
5. 抽象方法必须在子类中实现

#### 重写和重载：

1. **<u>重写</u>**：
   1. @Override  @Override
   2. 子类和父类同名的方法，排除父类private修饰，重写只针对可以被继承的方法.
   3. 在se5之前重写的方法返回值必须和父类的一样，**在se5中允许返回父方法返回类型的子类**
2. **<u>重载</u>**：同名方法，不同类型的形参数

#### 绑定（一个方法的调用和这个方法所在的类联系起来）

1. 静态绑定（final,static,private）在程序执行前就会绑定，也就是说程序编译过程中就已经知道这个方法属于那个类
2. 动态绑定：除了（final,static,private）的方法都是动态绑定，Java的编译器并不知道你调用的方法属于那个类，在调用数再去查找，查找的方式是：x的实际类型是d，他是c的子类，如果d定义了一个方法f(String),就直接调用它，否者就会去d的超类中寻找f(String)，以此类推
3. 每次调用法法都会去进行搜索。时间开销很大，所以虚拟机预先给每个类创建了一个方法表，其中列出了所有方法的签名和实际调用的方法，在调用方法时，就去查找这个表

#### 多态

1. 强制多态：类型的自动转换：(向上转)

   1. 例：public class Test extends A {

      ​		public static void main(String[] args) {

      ​			Test test = **new** Test();

      ​			test.force(test);

      ​		}

      ​		public **void** force(A a) {

      ​			System.**err**.println("我的参数是a类");

      ​		}

      ​	 }

   2. force方法接受A类，但是Test类继承了A类，所以在调用force	 时，可以被传入，但是这时，系统自动将 test类转换为A类

   3. 例：A a = new Test();  //向下转

2. **<u>重载的多态</u>**：类如 int类型和lang类型的加法，int和flot的加法，是利用重载实现的，相同的方法，传入了不同的数据类型

3. 参数的多态：列如泛型

#### 内部类

1. 内部类类型：
   1. 成员内部类：	在外部类中定义个类,内部类可以直接访问外部类所有的成员

   2. 局部内部类： 在外部类的方法中定义一个类,**不能有访问级别修饰符**，**不能访问外部类的成员**，**但是可以访问改方法的局部变量**

   3. 可**定义一个内部接口**！

   4. 例：

      1. public class Users {

         ```java
         class child{
         	
         }
         public static void main(String[] args) {
         
         		User user = new User();
         		//在外部实例化一个内部类，理解为在一个类中开辟一个内部类内存空间
         		User.child userChild = user.new child();
         
         }
         ```

         }

2. 静态内部类：在外部类中定义个静态类 

   1. 例：

      1. public class Users {

         ```java
         static class child{
         	
         }
         ```

         }

3. 匿名内部类：没有名字的内部类

   1. 应用场景：

      1. 只用到类的一个实例

      2. 定义后立即用到

      3. 类非常小，sun官方推荐4行代码以内

      4. 给类命名，并不会导致你的代码更容易理解

      5. 这个类不能定义任何静态的：类，方法，成员

      6. 不能有访问修饰符

      7. 只能创建匿名内部类的**一个**实例

      8. 一个匿名内部类一定在一个new后面，用其隐含实现一个接口或一个类

      9. 匿名内部类是一个局部内部类，所以局部内部类的所欲限制都对其生效

      10. 例如：

          1. ```java
             public abstract class Bird {
                 private String name;
             
                 public String getName() {
                     return name;
                 }
             
                 public void setName(String name) {
                     this.name = name;
                 }
                 
                 public abstract int fly();
             }
             
             public class Test {
                 
                 public void test(Bird bird){
                     System.out.println(bird.getName() + "能够飞 " + bird.fly() + "米");
                 }
                 
                 public static void main(String[] args) {
                     Test test = new Test();
                     test.test(new Bird() {  //这里new出来的就是一个匿名内部类，Bird是一个抽象方法，不能直接new出来，但是这里给了一个匿名的类实例。
                         
                         public int fly() {
                             return 10000;
                         }
                         
                         public String getName() {
                             return "大雁";
                         }
                     });
                 }
             }
             ```

4. 外部类不能访问内部类的细节

#### 内存回收： Object=null;

1. 将对象值空，提醒系统回收这个对象

## 集合

1. Set：无序，不可重复
2. list：有序，重复
3. Map：有映射关系的集合
4. Queue：jdk1.5后增加的一种集合体系

### Collection（接口）

 Collection<String> collection = **new** ArrayList<>();

1. 添加元素 ：  boolean add()  

2. 删除元素：   boolean remove()     //这里**接受的是要删除的值**，而不是下标

3. 返回当前集合中的元素个数：int size()

4. 判断集合中是否有元素：boolean isEmpty()    //如果此 collection 不包含元素，则返回 true

5. 是否含有某个对象：bollean contains().  //如果此 collection 包含指定的元素，则返回true

6. 获取迭代器：iterator()

7. 查询此集合是否包含宁外一个集合的所有元素：bollean containsAll() 接受一个集合参数

8. 将其他集合的元素全部添加到本元素：bollean addAll(). //接受一个集合参数

9. 删除本集合中的所有元素：boolean clear();                

10. 从集合中删除宁外一个集合包含的所有元素：bollean removeall();//接受一个集合参数

11. 从集合中删除宁外一个集合包**不含的**所有元素：bollean retainall();//接受一个集合参数

12. 返回一个object 数组：toArray();

13. 清除所有元素：clear();

14. forEach便利：

    1. ```java
       forEach(obj -> { //依次将元素传入后面的代码块中，或者方法
           System.out.println(obj.length());
       });
       ```

15. predicate方式批量删除符合条件的成员 removeIf(obj->(obj.getId()<10))

16. 静态成员方法

    1. sort(Liset list);根据元素的自然排序顺序，对指定的集合进行排序

    2. sort(Liset list,Comparator c);  更具比较器进行排序如图：

       1. ```java
          Collections.sort(new ArrayList<>(), new Comparator<Integer>() {
          
              @Override
              public int compare(Integer o1, Integer o2) {
                  // TODO Auto-generated method stub
                  return 0;
              }
          });
          ```

17. 迭代器(单向迭代器，只能下前移动)

    1. ```java
       for (Iterator iter = list.Iterator(1);iter.hasNext();) {
       
       		System.out.println(iter.next());
       
        }
       ```


#### set（接口，无序不可重复，善于比较和查询对象）

1. 一个不允许有相同元素的集合

##### hashset（无序,不可重复,线程不安全）

1. **无法直接单一查询，修改**但是可以通过迭代器去实现或者转化为其他集合类型，再转回来

##### LinkHashSet (保持插入顺序，不重复集合)

##### TreeSet（保持排序，不重复集合，comparable）

1. **无法直接单一查询，修改**但是可以通过迭代器去实现或者转化为其他集合类型，再转回来

2. first():返回有序集合中的第一个元素

3. last():返回最后一个元素

4. subSet(A a,Zz):返回a到z之间的原属

5. headSet(Aa):返回小于该元素的元素

6. tailSet(Zz):返回所有大于该元素的元素

7. 该集合的**元素必须实现comparator接口**用于自动排序

8. 如果该元素已经有comparator接口了但是又不想用这个类，**可以使用Comparable接口**来初始化该集合

   1. 例如一个string的集合自定义排序方式

      ```java
      public class Test  implements Comparator<String>{
      
      	@Override
      	public int compare(String o1, String o2) {
      		// TODO Auto-generated method stub
      		return -1;
      	}
      	
      	public static void main(String[] args) {
      		
      		 TreeSet<String> treeSet = new TreeSet(new Test());
      		 
      		 treeSet.add("a");
      		 treeSet.add("b");
      		 treeSet.add("c");
      		 
      		 System.out.println(treeSet);
      		 
      	}
      
      }
      ```


#### list（接口，有序可重复,删除元素后，下标会前移，善于随机访问）

1. add(index,value):在指定的位置添加元素。

2. addAll(index,List):将集合list的所有元素添加到指定位置

3. get(index):返回指定位置的元素

4. ndexOf(O o ):返回o第一次出现的位置

5. lastIndexOf(O o):返回o最后一次出现的位置

6. remove(index):删除指定位置上的元素

7. set(index,value):元素value替换指定位置index上的元素，并且返回旧的元素

8. contains(Object o );判断该元素是否存在于该集合内，返回一个boolean值

9. retainAll(Collection<?> c);保留2个集合重复的部分

10. 迭代器的实现：

   ```java
    
   //listIterator(1)支持初始化位置
   for (ListIterator iter = list.listIterator(1);iter.hasNext();) {
   
   		System.out.println(iter.next());
   
    }
   ```


##### ArrayList （读取数据）

##### Vector（读取数据，线程安全）

###### stack(先进后出)

1. 后进入的数据在最上面，出栈从最上面出栈
2. peek():返回第一个元素，最后进入的一个元素，但不会移除该元素
3. pop():返回第一个元素并且移除
4. push():将一个元素push进栈

##### linkList（添加或删除数据）

1. addFirst():将元素添加到首部
2. addLast():将元素添加到尾部
3. getFirst():获取第一个元素
4. list.getLast()：返回尾部元素
5. removeFirst():删除第一个
6. removeLast():删除最后一个

#### Map

1. put(k,v):添加元素 //如果后面的键名和前面的键名相同会覆盖之前的值

2. remove(k):删除key的映射

3. putAll(map);将宁外一个映射集合所有元素添加到本元素

4. clear();删除本集合所有映射

5. get(key);获取键名key映射的值

6. replace(arg0, arg1);修改值

7. containsKey(key);判断集合中键名是否存在

8. containsValue(v);判断值是否存在

9. size();返回当前映射大小

10. isEmpty();判断本集合是否为空

11. keySet();返回所有的key

12. values();返回所有value

13. entrySet();返回键值对的映射视图

    1. getKey();获取该对象的值
    2. getValue();获取该对象的值
    3. setValue();修改值,该方法会修改源集合

    ```java
    //迭代器的使用
    TreeMap<Integer, Integer> map = new TreeMap<>();
    
    map.put(2, 3);
    
    for (Entry<Integer, Integer> entry : map.entrySet()) {
    	System.out.println(entry);
    }
    
    ```


##### HashMap（无序唯一）

##### Hashtable (线程安全)



##### TreeMap（comparable）

1. Comparator();返回比较器
2. firstKey();返回此映射中当前第一个（最低）键。
3. lastKey();返回映射中当前最后一个（最高）键。
4. subMap(fromKey, toKey);返回此映射的部分视图，其键值的范围从 fromKey（包括）到 toKey（不包括）
5. headMap(toKey);返回一个视图其键值严格小于 toKey
6. tailMap(fromKey);返回一个视图其键值严格大于 toKey

#### BlockingQueue（队列契合完善）

## 泛型

1. 将方法参数的类型参数化，正价方法的使用性

   ```java
   public static void main(String[] args) {
   
   		Integer[] integers = { 1, 23, 4 };
   		String[] strings = { "asd", "asad", "aasdas" };
   		name(integers);
   		name(strings);
   	}
   
   	public static <E> void name(E[] name) {
   		for (E e : name) {
   			System.out.println(e);
   		}
   	}
   ```

2. 将类属性的类型参数化

   ```java
   public class Test<E> {
   
   	public E a;
   
   	public static void main(String[] args) {
   
   		Test<Integer> test = new Test<>();
   	}
   
   }
   ```


## 异常

1. 异常的处理	

   ```java
   	try {
   			
   		} catch (Exception e) {
   			// TODO: handle exception
   			e.printStackTrace(); //将异常信息输出
   			
   		}
   ```

2. 异常的抛出

   ```java
   	public static void add() throws Exception {
   	
   		//在方法里将异常抛出，交给调用成处理
   		
   		throw new Exception("ads");
   		
   		//主动抛出异常
   	}
   
   	try {
   			add();  //在调用层做统一处理
       } catch (Exception e) {
   			// TODO Auto-generated catch block
   			e.printStackTrace();
       }
   
   ```

3. 自定义异常类

   1. 异常类必须继承于Exception类

## I/O文件（文件读取单位最佳为4k或4k的倍数）



### File(文件操作)

1. File('pash');  构造参数必须传入一个文件位置
   1. 为了系统的可移植行，系统路径符号 ‘ : ’ 使用静态常量：**pathSeparator**
   2. 为了系统的可移植行，系统路**径符号 ‘ / ’ 使用静态**常量：**separator**
2. delete();  删除当前文件，如果是目录，该目录必须为空才能
3. createNewFile();  创建一个新的文件，当目前文件不存在时
4. exists();判断当前文件是否存在
5. isDirectory();判断当前文件是否是一个目录
6. isFile();是否是一个文件
7. length();返回当前文件的大小
8. list();返回目录下的内容，**只有名称是一个string数组**
9. listFiles();返回目录下的内容，所有内容**都有路径是一个file数组**
10. mkdir();创建一个目录
11. mkdirs();创建多个目录，多级目录的情况
12. renameTo();重新命名此抽象路径名表示的文件。
13. deleteOnExit(); 文件当时不会删除，但是程序退出时会自动删除，**用于创建临时文件**
14. lastModified();最后一次修改时间
15. setLastModified();设置最后修改时间
16. file.getPath(); 获取文件路径
17. getAbsolutePath(); 获取绝对路径
18. isHidden();是否是隐藏文件
19. getParentFile();获取上层路径
20. 查看权限
    1. canWrite();
    2. canExecute();
    3. canRead();
21. 修改选项
    1. setReadOnly();只读
    2. 



### FileInputStream(字节输入流)

1. **<u>以流的方式读取文件</u>**

2. available();返回剩余可读取的字节数

3. read();读取单个字符

   1. read(byte[] b)    从此输入流中将最多 `b.length` 个字节的数据读入一个 byte 数组中

   2. ```java
      byte[] b= new byte[10];
      fileInputStream.read(b);
      for (byte c : b) {
      	System.out.println((char)c);
      }
      ```

#### InputStreamReader(字符输入流,读取指定的字符集)

1. ready();判断是否能读取，如果其输入缓冲区不为空，或者可从底层字节流读取字节，则 InputStreamReader 已做好被读取准备。

2. read()；读取单个字符。

   ```java
   File file = new File("res/cs.txt");
   		
   FileInputStream fileInputStream = new FileInputStream(file);
   
   InputStreamReader reader = new InputStreamReader(fileInputStream);
   
   StringBuffer stringBuffer = new StringBuffer();
   
   while (reader.ready()) {
       stringBuffer.append((char)reader.read());  //因为是读取单个字符所以这里转化为char
   }
   
   		
   System.out.println(stringBuffer);
   ```

##### BufferedReader(缓冲字符流输入)

#### BufferedInputStream(缓冲输入字节流)

1. 该流争对字符输入流做了缓冲封装，性能跟高

### FileOutputStream（字节输出流，追加模式）

1. write(65); 将指定字节写入此文件输出流
2. write(**new** **byte**[] {64,64,65});将数组逐个写入
3. 如果文件不存在会创建一个文件

#### OutputStreamWriter(字符输出流，写入指定的字符集)

1. append("沙发上发呆的事");将字符添加到写入流

2. flush();执行写入

   ```java
   File file = new File("res/cs.txt");
   
   FileOutputStream fileOutputStream = new FileOutputStream(file);
   
   OutputStreamWriter outputStreamWriter = new OutputStreamWriter(fileOutputStream,"UTF-8");   //此处指定写入编码，如果不指定将使用系统默认的编码
   
   outputStreamWriter.append("沙发上发呆的事");
   
   outputStreamWriter.flush();
   ```

##### BufferedWriter (缓冲字符输出)

#### BufferedOutputStream(缓冲输出字节流)

1. 该流争对字符输出流做了缓冲封装，性能跟高

### 字符流（针对存文本文件的操作）

#### FileReader （输入）

1. read();可以直接读取字符（中文）

##### BufferedReader(缓冲字符流输入)

```java
初始化输入流，从控制台输入文字
BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
```

1. read();读取单个字符
2. readLine(); 读取一行字符
3. close();关闭输入流

##### LineNumberReader（行号装饰类）

1. readLine();读取文本行
2. getLineNumber();获取行号

#### FileWriter （输出,追加模式）

1. **new** FileWriter("res/zifu.txt",**true**); 构**造方法，第二个为true，为追加**数据
2. write("asdasd");  写入缓冲区
3. flush();写入文件
4. close();关闭流

##### BufferedWriter (缓冲字符输出)

1. append(String);
2. flush();将缓冲区写入文件
3. write(str);直接将字符写入文件

### 内存操作流

### 数据操作流

### 合并流（将2个文件内容合并）

### 压缩流

### 回退流（逆向读取）

### 对象流（将对象写入到文件）

### 新增i/o内存映射，快速，但是大文件耗内存

### 文件复制原理

```java
File file = new File("res/11541492177_.pic.jpg");
		
FileInputStream fileInputStream = new FileInputStream(file);

FileOutputStream fileOutputStream = new FileOutputStream("res/11pic.jpg");

byte [] bs=new byte[1024];  //一次读取1024字节，最好一次读4k，硬盘最低每次读取4k，少于4k的也会消耗4k的资源

while (fileInputStream.read(bs)!=-1) {
	fileOutputStream.write(bs);
}
```

## 文件上传/下载

### 上传

1. 

### 下载

## 反射

### class（类对象）

1. 类是一类对象的抽象，但是类也是一种事物，一种类，那么类也是一类对象。那么他也有自己的一个类就是java.lang.Class

#### 获取一个类对象：

1. Class.forname(string)

2. Object.class;

   1. 加载配置文件的方法：

      1. ```java
         Object.class.getClassLoader().getResourceAsStream("properties/mybatis.properties");
         ```

3. Object.getClass();

#### 通过反射类查看信息：

##### 构造器

1. getConstructor(Class class);  获取带指定参数的public构造器
2. getConstructors();获取所有的public构造器
3. getDeclaredConstructor(Class class));获取带指定参数的构造器
4. getDeclaredConstructors();获取所有的构造器

##### 方法：

1. getConstructor(**int**.**class**); 返回class类的带指定参数列表的public构造器
2. getConstructors();  获取所有public构造器
3. getDeclaredConstructor(**int**.**class**) ; 返回class类的带指定参数列表的构造器，与权限无关
4. getDeclaredConstructors() ; 获取所有构造器
5. getMethod("name",**int**.**class**);获取对应方法名的带制定参数的public方法名
6. getMethods();返回所有public方法
7. getDeclaredMethod(name, parameterTypes); 获取对应方法名的带制定参数的方法名
8. getDeclaredMethods();返回所有的方法

##### 属性：

1. getField(String name) ; 获取指定名称的public属性
2. getFields(); 获取所有public成员变量
3. getDeclaredField("name");  后去指定名称的成员变量，与权限无关
4. getDeclaredFields(). 获取所有的成员变量，与权限无关

##### 创建类

1. getConstructor().newInstance();  调用默认的构造器创建一个类

## 多线程

### 生命周期：

1. 新建。 使用 new关键字创建一个线程 后的状态
2. 就绪。 当线程对象调用start方法后，线程处于就绪状态，但是并没有运行，何时运行取决于jvm的调度
3. 运行     如果处于就绪状态的线程获取到了cpu那么开始执行run方法的执行体那么，则该线程处于运行状态,调用线程的**<u>yield();方法可以让线程从运行状态转入到就绪状态</u>**
4. 阻塞。  如线程发生了如下情况那么线程就会处于阻塞状态
   1. 线程调用了sleep方法
   2. 线程在调用了一个阻塞式的io方法，在该方法返回之前，线程会被阻塞
   3. 线程获取一个同步监视器
   4. 线程在等待某个通知（**notify,线程通讯**）
   5. 程序调用了线程的suspend方法，但是该方法容易造成死锁
5. 死亡。 线程会以如下3种方式结束
   1. run()或call()方法执行完
   2. 线程抛出一个为捕获的异常
   3. 直接调用线程的stop()方法结束该线程，但是该方法容易造成死锁
6. 判断线程是否死亡
   1. isAlive()   当线程处于就绪，运行，阻塞返回true

### Thread类

1. 通过继承thread来创建一个线程

2. run(); 该方法内是线程执行的任务 ( 通过重写该方法来实行自己的业务)

3. start(); 调用该方法来启动这个线程

   1. ```java
      public class Main extends Thread {
      
          private int i;
      
          //该线程要执行的实体
          @Override
          public void run() {
      
              for (int j = 0; j < 300; j++) {
                  System.out.println(getName() +"   "+ j);
                  try {
                      sleep(700);
                  } catch (InterruptedException e) {
                      e.printStackTrace();
                  }
              }
      
          }
      
          public static void main(String[] args) {
      
              for (int i = 0; i < 100; i++) {
                  System.out.println(Thread.currentThread().getName()+"  "+i);
                  if (i == 20) {
                      //通过调用start()方法来启动这个线程
                      new Main().start();
                      new Main().start();
                  }
              }
      
          }
      }
      ```

### Runnable接口

1. 通过实现Runnabale接口来创建一个线程

2. **通过Runnabale创建的多线程，在构建Thread时，如果传入同一个Runnabale那么这2个线程共享这个Runnabale的成员变量**

3. 将Runnabale接口传入 Thread (Runnabale runnabale,String name); //Runnabale,线程名

   1. ```java
      //实现自己Runnable类
      public class Runnabale implements Runnable {
          //多个线程之间的i是共享的
          private int i;
          @Override
          public void run() {
              for (; i < 300; i++) {
                  System.out.println(Thread.currentThread().getName()+"  "+i);
              }
          }
      }
      
      
      //将 Runnabale类传入Thread中，调用start开启线程
      public class Main extends Thread {
      
          public static void main(String[] args) {
              new Thread(new Runnabale(),"我自己的线程1").start();
              new Thread(new Runnabale(),"我自己的线程2").start();
          }
      }
      
      ```

### FutrueTask

1. ```java
   //. FutureTask 类实现了 Runnabale类 ，接受一个Callable接口，这里使用的是Lambda表达式
   FutureTask<Integer> futureTask = new FutureTask<Integer>((Callable<Integer>) () -> {
       int i = 0;
       for (; i < 100; i++) {
           System.out.println(Thread.currentThread().getName() + "  i的值是" + i);
       }
       return i;
   });
   // 正常方式
   FutureTask<Integer> futureTask = new FutureTask<Integer>(new Callable<Integer>() {
       @Override
       public Integer call() throws Exception {
           int i = 0;
           for (; i < 100; i++) {
               System.out.println(Thread.currentThread().getName() + "  i的值是" + i);
           }
           return i;
       }
   });
   
   
   
   Thread thread = new Thread(futureTask);
   thread.start();
   int back=0 ;
   try {
       //通过get方式获取返回值 ，返回值类型由Callable泛型定义
       back = futureTask.get();
   } catch (InterruptedException | ExecutionException e) {
       e.printStackTrace();
   }
   System.out.println(back);
   ```

### 控制线程

1. join()，在某个线程流流中调用其他线程的join方法，调用线程将被阻塞，直到被join方法加入的线程执行完毕
   1. join(long time); 等待被join线程最长时间

#### 后台线程

1. 有一种线程专门为其他线程提供服务，他们就是后台线程，所有前台线程死亡后，后台线程会自动死亡，调用Thread的setDaemon(true) 方法可以将一个线程设置为后台线程
2. isDaemon(); 判断线程是否子线程
3. 前台线程创建的子线程是前台线程，后台线程创建的子线程是后台线程

#### 线程睡眠

1. sleep(long time); 当前线程暂停多少毫米，并且进入阻塞状态
2. yield();让线程暂停，该线程不会被阻塞，该线程重新进入就绪状态，等待线程调度去的重新调度，可以能会出现当某个线程调用yield()暂停后，线程调度器又重新将其调度出来执行，yield方法暂停之后调度器只会调用优先级相同或者更高的线程执行

#### 改变程序的优先级

1. 每个线程执行时都具有一定的优先级，优先级高的线程执行的机会更多，**每个线程的优先级与创建他的父线程优先级相同**
2. setPriority(int type);  设置优先级
   1. Thread.MAX_PRIORITY.  10
   2. MIN_PRIORITY. 1
   3. NORM_PRIORITY. 5
3. getPriority();获取优先级

#### 线程同步

##### 同步代码块

1. 同步监视器：

   1. 为了避免多线程同时修改一个对象的属性

   2. ```java
      //线程开始执行代码块之前，必须获得对同步监视器的锁定，任何时刻只有1个线程能获取该同步监视器的锁定
      synchronized (Object object){
          //业务逻辑
      }
      ```

   3. java允许使用任何对象作为同步监视器，但推荐使用可能被并发访问的资源充当同步监视器

2. synchronized方法，使用synchronized修饰方法，**同步监视器就是当前对象本身**

###### 释放同步监视器的锁定

1. 代码执行完毕，break，retun,抛出异常，都会释放代码监视器
2. 线程执行同步代码块时，调用sleep,yield方法来暂停当前线程，**不会释放**
3. 其他线程调用了该线程的 suspend方法来暂停该线程，**不会释放**

  同步锁

1. 通过显示的定义一个同步锁对象来实现同步

   1. ```java
      private final ReentrantLock reentrantLock = new ReentrantLock();
      public void run(){
          reentrantLock.lock();
          //业务逻辑
          reentrantLock.unlock();
      }
      ```

#### 线程通信

1. wait();   导致当前线程的阻塞，知道其他线程调用该同步监视器的notifiable或notifiableAll方法，唤醒之后wait之后的代码会执行
2. notifiable(); 唤醒此同步监视器之上的某个线程
3. notifiableAll();  唤醒此同步监视器之上的所有线程

## Socket

### 协议

#### udp

1. 适合做直播，不需要链接就可以通讯
2. 一次性可以携带65507字节

##### Api

1. 接受数据包

   1. ```java
      //构建一个udp，绑定需要监听的端口
      DatagramSocket datagramSocket = new DatagramSocket(2000);
      
      //构建一个数据包用户接受数据
      byte[] data = new byte[512];
      DatagramPacket datagramPacket = new DatagramPacket(data, data.length);
      
      //开始监听需要绑定的端口，在收到消息之前回阻塞该线程,
      datagramSocket.receive(datagramPacket);
      
      String responseData = new String(datagramPacket.getData(),0,datagramPacket.getLength());
      
      /**
       * datagramPacket.getData() 获取接受数据
       * datagramPacket.getLength() 获取数据长度
       */
      String rs = new String(datagramPacket.getData(),0,datagramPacket.getLength());
      System.out.println("收到 ip"+datagramPacket.getSocketAddress().toString()+": "+rs);
      ```

2. 发送数据

   1. ```java
       //发送数据包，系统自动分配端口，所以不用指定端口
      DatagramSocket datagramSocket = new DatagramSocket();
      
      //构建数据发送包
      String data = "13qwe";
      byte[] bytes = data.getBytes();
      DatagramPacket datagramPacket = new DatagramPacket(bytes,bytes.length);
      //使用ip的方式发送数据，单播模式:想像指定ip的指定端口发送数据
      //        datagramPacket.setAddress(InetAddress.getLocalHost());
      //        datagramPacket.setPort(2000);
      //多播模式
      datagramPacket.setAddress(InetAddress.getByName("255.255.255.255"));
      datagramPacket.setPort(2000);
      
      //发送数据
      datagramSocket.send(datagramPacket);
      ```



#### tcp

1. 链接的可靠性，
   1. 三次握手，确保可以正常链接
   2. 四次挥手，确保数据可以完整的传输
2. 传输的可靠性：
   1. 将大的数据包拆分成小的数据发送，如果发送失败，只用重新发送一小部分数据
   2. 如果服务器在一定的时间内没有接收到客户端发送的验证信息，那么没有验证到的那部分数据将重新发送
3. 常用配置
   1. setSoTimeout(); 谁知超时时间
   2. setTcpNoDelay(true); 减少回送包的发送
   3. setKeepAlive(true).    当长时间为收到数据后自动发送心跳包，时间为2小时
   4. setSoLinger(true,20).  对于close关闭操作行为作怎么样的操作
      1. False,0  默认情况下关闭时立即返回，底层系统接管输出流，将缓冲区内的数据发送完成
      2. true,0 关闭时立即返回，缓冲区内的数据抛弃，直接发送rst结束命令到对方，并且无须对方确认等待
      3. True,200 关闭时阻塞200毫秒，随后按照第二情况处理
   5. setOOBInline(false);  **让紧急数据内敛，业务层不会收到紧急消息，紧急消息通过 socket.sendUrgentData(int i); 发送 ，可以利用这个来做心跳包**
   6. setSendBufferSize(). 设置发送数据缓冲大小，如果超过这个大小，数据将会被拆分发送
   7. setReceiveBufferSize();  **设置接受数据缓冲区，如果发送的数据大于这个数据那么，多余的数据会被抛弃**
   8. setPerformancePreferences(1,1,1);  设置性能比例
      1. 参数1 链接时间
      2. 参数2 延迟率
      3. 参数3 带宽
      4. 如果发送一个文件应该是：212
      5. 如果发送一个及时消息：110

## JDBC

1. 加载驱动：

   1. 5.0的jar包：Class.forName("com.mysql.jdbc.Driver");
   2. 8.0以后的jar包：Class.forName("com.mysql.cj.jdbc.Driver");或者不用加载jar驱动也可以，系统自动加载

2. Connection connection = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/test?serverTimezone=GMT", "root", "root"); 

   1.  //建立链接 url格式：JDBC:子协议:子名称//主机名:端口/数据库名？属性名=属性值&…

3. PreparedStatement pStatement = connection.prepareStatement("select * from cs where id>?");

   1.   //创建一个sql语句管理器
   2.   **获取插入数据的主键值**：PreparedStatement pStatement = connection.prepareStatement("sql",Statement.**RETURN_GENERATED_KEYS**);

4. ResultSet resultSet =pStatement.executeQuery(); 

   1. //执行一个查询

   2. executeUpdate();执行一个数据操作

   3. execute();执行一个sql;

   4. **获取返回的主键值**：pStatement.getGeneratedKeys()

   5. **批处理**

      1. 增加链接参数：rewriteBatchedStatements=true

      2. ```java
         for (int i = 0; i < 10000; i++) {
         				pStatement.setString(1, "23");
         				pStatement.setString(2, "2321s3");
         				pStatement.addBatch();
         				if (i % 100 == 0) {//一班不要超过几万，一般几千合适
         					pStatement.executeBatch(); //将sql存入
         				}
         			}
         pStatement.executeBatch();//一次性执行所有的sql
         ```

   6. 事物的处理

      1. 开启事物：connection.setAutoCommit(**false**);
      2. 提交事物：connection.commit();
      3. 回滚事物：connection.rollback();

   7. 获取列名

      1. ```java
         metaData = resultSet.getMetaData();
         for (int i = 0; i < metaData.getColumnCount(); i++) {
             //获取列名
             String columnName = metaData.getColumnName(i + 1);
             //获取列属性名
             int type = metaData.getColumnType(i + 1);
         }
         ```

5. 结果集

   ```java
   while (resultSet.next()) {
   	System.out.println(resultSet.getInt("id"));  //通过下标记获取
       System.out.println(resultSet.getInt(1));  //通过
       
    }
   ```

6. 关闭连接

7. ```java
    try {
           rSet.close();
       
       } catch (SQLException e) {
           // TODO Auto-generated catch block
           e.printStackTrace();
       }finally {
           try {
               pStatement.close();
           } catch (SQLException e) {
               // TODO Auto-generated catch block
               e.printStackTrace();
           }finally {
               try {
                   connection.close();
               } catch (SQLException e) {
                   // TODO Auto-generated catch block
                   e.printStackTrace();
               }
           }
       
       }
    ```
## Tomecat

### servlet

1. 生命周期

   1. init: servlet是一个单列，整个项目的servlet类只存在一个

      1. ```java
         public void init() throws ServletException {
         		//该servlt在创建时被调用
         		super.init();
         }
         ```

   2. service :每次请求都会被调用

      1. ```java
         @Override
         	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
         		//自动掉用doGet或者doPost方法
         		super.service(req, resp);
         	}
         ```

   3. destroy:对象在被销毁时调用：

      1. ```java
         @Override
         	public void destroy() {
         		// TODO Auto-generated method stub
         		super.destroy();
         	}
         ```

2. 初始化参数对象

   1. 获取初始化参数 getServletConfig().getInitParameter(name)

   2. 配置初始化参数

   3. ```xml
      <servlet>
       <!--name可以是任意的，但一般是类名-->
      <servlet-name>MyServlet</servlet>
       <!--class用于指定你的servlet存放的路径-->
      <servlet-class>com.web.MyServlet</servlet-class>
      <!--设置各自servlet的初始化参数-->
       <!--参数1-->
      <init-param>
      <param-name>driver</param-name>
      <param-value>com.mysql.jdbc.Driver</param-value>
      </init-param>
       <!--参数2-->
      <init-param>
      <param-name>url</param-name>
      <param-value>jdbc:mysql://localhost:3306/mysql</param-value>
      </init-param>
      </servlet>
      ```

3. 全局存储空间:    **生命周期作用于整个项目**

   ```java
   ServletContext context =  this.getServletContext(); //生命周期作用于整个项目
   
   context.setAttribute(name, object);  //设置:属性
   
   context.getAttribute(name);  //获取：属性
   
   context.getContextPath(); //获取上下文对象地址，在重定向时最好使用该路径，而不是写死，因为虚拟路径可能会被修改
   //例如：如下方式跳转
   response.sendRedirect(context.getContextPath()+url);
   
   context.getRealPath(Url) //获取当前url的真实地址，操作系统地址
   ```

4. HttpServletRequest对象：**生命周期当前请求**

   1. ```java
       request.getParameter("name")  //获取参数
       ```
      ```
   
      ```

5. 例如：

   1. ```java
      public class Login extends HttpServlet {
      	private static final long serialVersionUID = 1L;
      
      	/**
      	 * @see HttpServlet#HttpServlet()
      	 */
      	public Login() {
      		super();
      		// TODO Auto-generated constructor stub
      	}
      
      	/**
      	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
      	 *      response)
      	 */
      	protected void doGet(HttpServletRequest request, HttpServletResponse response)
      			throws ServletException, IOException {
      		
      		
      	}
      
      	/**
      	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
      	 *      response)
      	 */
      	protected void doPost(HttpServletRequest request, HttpServletResponse response)
      			throws ServletException, IOException {
      		
              
      	}
      
      }
      
      ```

### 请求转发	

1. 请求转发会隐藏实际资源链接

2. 请求转发只能在服务器内部

3. 请求转发后，后续的代码也会执行，相当于函数的调用

4. 请求转发不改变本身的属性，如请求方式

5. ```java
   //指定转发的地址，可以携带参数
   RequestDispatcher rDispatcher = request.getRequestDispatcher("hello.html?name=x");
   //设置传递属性，
   request.setAttribute(name, o);
   //以forward当时转发,当前页面的response响应操作无效
   rDispatcher.forward(request, response);
   //以include当时转发，当前的response和转发过去的response会合并
   rDispatcher.include(request, response);
   //获取转发过来的属性
   request.getAttribute(name)
   
   ```

### 重定向

1. 

2. ```java
   //重定向
   response.sendRedirect(String url);
   ```

## JSP

### 依赖包：

```xml
<!-- jsp 的三个包 jstl -->
<dependency>
    <groupId>javax.servlet.jsp.jstl</groupId>
    <artifactId>jstl</artifactId>
    <version>1.2</version>
</dependency>
<!-- jstl-api -->
<dependency>
    <groupId>javax.servlet.jsp.jstl</groupId>
    <artifactId>jstl-api</artifactId>
    <version>1.2</version>
</dependency>
<!-- jstl-impl -->
<dependency>
    <groupId>org.glassfish.web</groupId>
    <artifactId>jstl-impl</artifactId>
    <version>1.2</version>
</dependency>
```

### jsp表达式：

1. 过程：.jsp. =>  .java. => .class     ( 最终编译为一个servlet)

2. 注释：<%--  --%> 不会被编译

3. 输出：<%= "输出一个字符" %>，可以在其中调用方法，本质是在给print方法传递参数，不能；号结束,**<u>带缓冲</u>**

4. 申明：<%!    %>   内容为一段标准的java代码，可以定义方法，变量，最终这些方法，变量会编译为这个servlet的成员

   1. ```jsp
       <%!public String name() {
          		return null;
          	}%>
       ```

5. 指令：转译阶段提供jsp的配置信息例如编码格式等：

   1. page

      1. language=“java“   指定使用那个语言来编译，只支持java默认java

      2. extends=*"Obkect"*   指定jsp编译后的servlet继承那个类

      3. import=""  指定jsp页面需要用到的api类  例如：`import="java.util.Map"` 相当于导包

      4. session="true". 指定当前页面是否可以使用session，默认可以

      5. buffer="size".   指定页面是否开启缓冲区

      6. isThreadSafe="true"   决定servlet是否是单例，默认是true，单例，单列模式全局变量如果是可以修改的那么可能存在线程安全的问题，所以不要使用全局变量

      7. errorPage="url". 指定页面出错跳转的页面.  **优先级较高**

         1. 也可以在web.xml中配置跳转。优先级较低

         2. ```xml
            监听错误码
            <error-page>
                <error-code>
                    500
                </error-code>
                <location>url</location>
            </error-page>
            监听异常
            <error-page>
            		<exception-type>java.lang.Exceptin</exception-type>
            		<location>url</location>
            </error-page>
            ```

      8. isErrorPage="true".  是否开启错误处理对象可以在error页面去获取错误信息

      9. pageEncoding="UTF-8". 当前文件在文件系统中的存储编码

      10. contentType=*"text/html; charset=UTF-8"*   浏览器解析方式

      11. ```java
          <%@ page language="java" contentType="text/html; charset=UTF-8"
          	pageEncoding="UTF-8"%>
          ```

   2. **include**

      1. <%@ include file=*""* %>.引入一个html片段

   3. taglib

      1. 引入标签库：`<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>`

### 内置对象

1. servlet
   1. Page对象，当前servlet对象
   2. config 编译时的配置文件，通过指令配置 了一些编译时需要的配置
2. 输入输出对象
   1. request 输入对象，当中可以携带熟悉信息，利用servlet向jsp中传输数据
   2. response 输出对象
   3. out 输出对象 带缓冲区
3. 作用域通讯对象
   1. Session 当前回话有效
   2. application  servletContext对象,当前项目有效
   3. pageContext  可以访问页面作用域所有东西，页面作用域，当前页面有效，重新加载无效
4. 错误对象
   1. exception 可以获取错误信息，但是必须开启指令isErrorPage="true"

### 动作

1. `<jsp:forward page="url"><jsp:param value="k" name="k"/></jsp:forward>`。请求转发,可以传参，
2. `<jsp:include page="url"></jsp:include>`

### El表达式

1. 获取属性：${name} 表达式中可以进行运算，逻辑运算
   1. 优先级
      1. pageScope
      2. RequestScope
      3. sessionScope
      4. ApplicationScope
2. 获取参数：`${param.name}` 或者 `${param['name']}` 
3. 隐式对象：

### jstl标签库

#### 核心标签

1. set

   1. ```java
      <c:set var="name" value="1312" scope="session"></c:set>
      //参数名           //值,其中可以放el表达式  例如：value="${3+2}"			//作用域
      ```

2. out

   1. ```java
      <c:out value="${name }"></c:out>
      //jsp表达式用于输出
      ```

3. remove

   1. ```java
      <c:remove var="name" scope="session">  </c:remove>
      //销毁一个变量，默认作用域当前	
      ```

4. 分支

   1. 单分支

   2. ```jsp
      //test内不能有空格
      <c:if test="${name == '撒打算的' }" var="name">
        ${name }
      </c:if>
      ```

   3. 多分支

      1. ```jsp
         <c:choose  >
             <c:when test="${name==1 }">
         
             </c:when>
             <c:when test="${name==2 }">
         
             </c:when>
             <c:otherwise>
         
             </c:otherwise>
         
         </c:choose>
         ```

5. 循环

   1. for

      1. 123

   2. foreach

      1. ```jsp
         从1开始到101每次加10 
         <c:forEach begin="1" end="101" step="10" var="p">
             ${p }
         </c:forEach>
         
         <c:forEach items="${books }" var="book" varStatus="k">
             ${book.name }
         </c:forEach>
         ```

      2. varStatus携带的熟悉

         1. index 循环下标 0开始
         2. count 循环下标 1开始
         3. first是否是第一个
         4. 。。。。。待完善

#### 格式化标签

1. 格式化数字

   1. ```jsp
      <fmt:formatNumber value="0.123" type="percent"></fmt:formatNumber>
      //type="percent" 百分比
      //CURRENCY 货币
      //NUMBER 数字
      
      ```

2. 解析数字：

   1. ```jsp
      <fmt:parseNumber type="PERCENT" value="${money }"></fmt:parseNumber>
      ```

3. 格式化时间

   1. ```jsp
      <fmt:formatDate type="both"  value="${time }" /></p>
      //value 必须是一个Data类
      ```

## 会话

### cookie

1. 获取：

   ```java
   Cookie[] cookies = request.getCookies();
   		
   		if (null!=cookies) {
   			for (Cookie cookie : cookies) {
   					System.out.println(cookie.getName() + ":"+cookie.getValue());
   			}
   		}
   ```

2. 设置：

   1. ```java
      //cookie 不允许写入特殊字符
      Cookie cookie = new Cookie("name", "狗狗1");
      		
      //路由下级建立的上级不能访问，因此设置路由作用域，在同一个tomecat中可以跨项目
      cookie.setPath("/项目名/");
      //有效时间。设置为0相当于销毁这个cookie
      cookie.setMaxAge(1231);
      //将cookie重新放入response
      response.addCookie(cookie);
      ```

### session

1. 创建:

   1. ```java
      // 创建session，session基于cokie实现的
      HttpSession session = request.getSession();
      //session id
      session.getId();
      //创建时间
      session.getCreationTime();
      //上次访问时间
      session.getLastAccessedTime();
      ```

2. 使用

   1. ```java
      //设置
      session.setAttribute("name", "罗恒一");
      //获取
      session.getAttribute("name");
      //清空
      session.invalidate();
      ```


## 设计模式

### 装饰设计模式

1. 将已有对象传入，基于已有的方法对其增强

### 代理设计模式

1. 调用的方法其实由第三方的类的方法去执行，但是**客户端程序员不知道这个第三方的类的存在**，这是与装饰类的本质区别

### 工厂模式

1. 它是一个具体的类，非接口 抽象类。有一个重要的create()方法，利用if或者 switch创建产品并返回。
2. create()方法通常是静态的，所以也称之为静态工厂。
3. 扩展性差
4. 不同的产品需要不同额外参数的时候 不支持。
5. 作用场景
   1. 消费者不关心它所要创建对象的类(产品类)的时候。
   2. 消费者知道它所要创建对象的类(产品类)，但不关心如何创建的时候。
   3. 对象的创建过程/实例化准备工作很复杂，需要初始化很多参数、查询数据库等。
   4. 类本身有好多子类，这些类的创建过程在业务中容易发生改变，或者对类的调用容易发生改变。

### 策略模式

1. **意图：**定义一系列的算法,把它们一个个封装起来, 并且使它们可相互替换。

2. **主要解决：**在有多种算法相似的情况下，使用 if...else 所带来的复杂和难以维护。

3. **何时使用：**一个系统有许多许多类，而区分它们的只是他们直接的行为。

4. **如何解决：**将这些算法封装成一个一个的类，任意地替换。

5. **关键代码：**实现同一个接口。

6. **<u>缺点</u>**：你需要知道所有的车略类

7. 概括：将方法作用与类，这里接口的作用也是约束类被调用时的关系，<u>客户端程序员，只需要关注类的作用，而不再关注该类的方法</u>

8. **应用实例：** 1、诸葛亮的锦囊妙计，每一个锦囊就是一个策略。 2、旅行的出游方式，选择骑自行车、坐汽车，每一种旅行方式都是一个策略。 

9. ```java
   public interface Strategy {
      public int doOperation(int num1, int num2); //策略方法的定义
   }
   
   //策略1
   public class OperationAdd implements Strategy{
      @Override
      public int doOperation(int num1, int num2) {
         return num1 + num2;
      }
   }
   //策略2
   public class OperationSubstract implements Strategy{
      @Override
      public int doOperation(int num1, int num2) {
         return num1 - num2;
      }
   }
   //策略3
   public class OperationMultiply implements Strategy{
      @Override
      public int doOperation(int num1, int num2) {
         return num1 * num2;
      }
   }
   
   //应用场景
   public class Context {
      private Strategy strategy;   //该场景使用哪一种策略算法
    
      public Context(Strategy strategy){
         this.strategy = strategy;
      }
    
      public int executeStrategy(int num1, int num2){
         return strategy.doOperation(num1, num2);
      }
   }
   
    //根据不同的场景使用不同的策略
   public class StrategyPatternDemo {
      public static void main(String[] args) {
         Context context = new Context(new OperationAdd());    
         System.out.println("10 + 5 = " + context.executeStrategy(10, 5)); //场景1  new OperationAdd()
    
         context = new Context(new OperationSubstract());      
         System.out.println("10 - 5 = " + context.executeStrategy(10, 5));  //场景2  new OperationAdd()
    
         context = new Context(new OperationMultiply());    
         System.out.println("10 * 5 = " + context.executeStrategy(10, 5));  //场景3  new OperationAdd()
      }
   }
   
   
   ```

### 适配器模式

1. 类的适配器模式：当希望将一个类转换成满足另一个新接口的类时，可以使用类的适配器模式，创建一个新类，继承原有的类，实现新的接口即可。

2. 对象的适配器模式：当希望将一个对象转换成满足另一个新接口的对象时，可以创建一个包装类，持有原类的一个实例，在包装类的方法中，调用实例的方法就行。

3. **简单来说就是一个类有一个接口需要实现，恰好有一个类的功能与之相同，我们通过继承或者组合的方式获取到这个类中，然后在我们的接口方法中去调用这个类中的方法**

4. 代码：

   ```java
   //苹果手机有一个充电功能
   public class IPhoneCharger {
   	public void applePhoneCharge() {
   		System.out.println("The iPhone is charging ...");
   	}
   }
   
   //充电器接口
   public interface ChargeAdapter {
   	  public void phoneCharge();
   }
   //用户的手机实现一个充电接口
   public class UniversalCharger  extends IPhoneCharger implements ChargeAdapter{
   
   	@Override
   	public void phoneCharge() {
   	    System.out.println("The phone is charging, but which kind of phone it is, who cares");
   		//用苹果手机的充电方式来充电
   	    super.applePhoneCharge();
   		
   	}
   
   }
   
   ```

5. 应用：在为某学校开发教务管理系统时，开发人员发现需要对学生成绩进行排序和查找，该系统的设计人员已经开发了一个成绩操作接口ScoreOperation，在该接口中声明了排序方法Sort(int[]) 和查找方法Search(int[], int)，为了提高排序和查找的效率，开发人员决定重用现有算法库中的快速排序算法类QuickSortClass和二分查找算法类BinarySearchClass，其中QuickSortClass的QuickSort(int[])方法实现了快速排序，BinarySearchClass的BinarySearch (int[], int)方法实现了二分查找。

    

   由于某些原因，开发人员已经找不到该算法库的源代码，无法直接通过复制和粘贴操作来重用其中的代码；而且部分开发人员已经针对ScoreOperation接口编程，如果再要求对该接口进行修改或要求大家直接使用QuickSortClass类和BinarySearchClass类将导致大量代码需要修改。

    

   现使用适配器模式设计一个系统，在不修改已有代码的前提下将类QuickSortClass和类BinarySearchClass的相关方法适配到ScoreOperation接口中


## AWT

### Frame

1. setBounds();设置窗口大小位置

2. setVisible();设置可见性

3. setLayout();设置布局器。 //FlowLayout

   ```java
   setLayout(new BorderLayout());
   add(new TextField("1"),BorderLayout.CENTER); c
   add(new TextField("asdad"),BorderLayout.NORTH); n
   add(new TextField("asdad"),BorderLayout.SOUTH); s
   add(new TextField("asdad"),BorderLayout.WEST);w
   add(new TextField("asdad"),BorderLayout.EAST);e
   
   ```


#### Panel(容器)

1. 相当于一个div块
2. 可以使用add向里面添加组建

#### ScrollPane(带滚动条的容器)

1. 构造参数指定是否总是带滚动条

#### FlowLayout(布局)

1. 管理对齐方式

#### BorderLayout(上下左右中)

#### GridLayout(网格布局)

#### 







