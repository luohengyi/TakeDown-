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
      6. 总结:被序列化的类必须实现**<u>serializable</u>**接口， transien修饰的字段在写入时会被忽略，<u>**这个序列机制是否是可以像php一样做一些配置功能呢？**</u>
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

### 变量

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

9. 大小写转化：
   1. 大写：aString = aString.toUpperCase();
   2. 小写：aString = aString.toLowerCase();

10. 返回常量池的地址引用：intern()

11. **<u>StringBuffer类：</u>**他是String的2000多倍的性能，**安全高于StringBuilder**

    1. 提供了一些字符串的复杂操作例如：字符反转,等等
    2. StringBuffer stringBuffer = **new** StringBuffer();
    3. 字符拼接：stringBuffer.append("a"); /**/他是 stringBuffer+=“a”的2千多倍**
    4. 删除指定位置的字符：deleteCharAt(index);
    5. 删除下标s到e的字符：delete(start, end)；
    6. 替换一段字符：replace(start, end, str)；
    7. 字符反转：reverse();
    8. indexOf(str);返回字符第一次出现的下标
    9. lastIndexOf(str)；最后一个出现的位置

12. **<u>：StringBuilder类</u>** 他是 **<u>StringBuffer 2倍类型</u>**

    1. 拼接：

       1. StringBuilder stringBuilder = **new** StringBuilder();

       2. stringBuilder.append("a");

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
      3.  currentTimeMillis():
         1. 返回以毫秒为单位的当前时间。
         2. 1秒=1000毫秒，即1s=1000ms

6. 超类

   1. object

      1. clone();可以实现对象的克隆，包括成员变量的数据复制，

   2. 对象名 instanceof 类名

      //表示：判断该对象名是否是该类名一个对象

7. String

8. Date

   1. https://www.cnblogs.com/jxtx92/p/8005620.html

9. BigInteger

   1. 可以让超过Integer范围内的数据进行运算


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

#### 接口：interface

1. 定义接口<u>**（定义[规范越苏]和实现的分离）**</u>

   1. public interface  Movement {}   //不能用class了
   2. 如果要定义访问级别只能是public
   3. **<u>只能定义静态常量，不能定义变量</u>**
   4. 在接口个中定义的常量，实现类中，可以直接通过常量名访问 不需要加接口名
   5. 接口里面的方法都是抽象或公共的所以和以省略 public和abstract
   6. 接口的方法都必须在子类中实现
   7. **<u>接口不能定义静态方法</u>**
   8. 接口只能定义静态,常量属性
   9. **接口没有构造器**

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
2. **<u>重载</u>**：同名方法，不同类型的形参数

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

   3. 例：

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

### Collection（接口） ：

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

#### set（接口，无序不可重复）

1. 一个不允许有相同元素的集合

##### hashset（无序不可重复）

1. **无法直接单一查询，修改**但是可以通过迭代器去实现或者转化为其他集合类型，再转回来

##### TreeSet（有序不重复集合）

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


#### list（接口，有序可重复）

1. add(index,value):在指定的位置添加元素。

2. addAll(index,List):将集合list的所有元素添加到指定位置

3. get(index):返回指定位置的元素

4. ndexOf(O o ):返回o第一次出现的位置

5. lastIndexOf(O o):返回o最后一次出现的位置

6. remove(index):删除指定位置上的元素

7. set(index,value):元素value替换指定位置index上的元素，并且返回旧的元素

8.  迭代器的实现：

   ```java
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

### Map

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


#### HashMap（无序唯一）

#### Hashtable (线程安全)



#### TreeMap

1. Comparator();返回比较器
2. firstKey();返回此映射中当前第一个（最低）键。
3. lastKey();返回映射中当前最后一个（最高）键。
4. subMap(fromKey, toKey);返回此映射的部分视图，其键值的范围从 fromKey（包括）到 toKey（不包括）
5. headMap(toKey);返回一个视图其键值严格小于 toKey
6. tailMap(fromKey);返回一个视图其键值严格大于 toKey

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

## I/O文件



### File(文件操作)

1. File('pash');  构造参数必须传入一个文件位置
   1. 为了系统的可移植行，系统路径符号 ‘ : ’ 使用静态常量：**pathSeparator**
   2. 为了系统的可移植行，系统路**径符号 ‘ / ’ 使用静态**常量：**separator**
2. delete();  删除当前文件
3. createNewFile();  创建一个新的文件，当目前文件不存在时
4. exists();判断当前文件是否存在
5. isDirectory();判断当前文件是否是一个目录
6. length();返回当前文件的大小
7. list();返回目录下的内容，**只有名称是一个string数组**
8. listFiles();返回目录下的内容，所有内容**都有路径是一个file数组**
9. mkdir();创建一个目录
10. renameTo();重新命名此抽象路径名表示的文件。

### BufferedReader(控制台读取数据)

```java
初始化输入流，从控制台输入文字
BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
```

1. read();读取单个字符
2. readLine(); 读取一行字符
3. close();关闭输入流

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

#### InputStreamReader(字符输入流)

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


### FileOutputStream（字节输出流）

1. write(65); 将指定字节写入此文件输出流
2. write(**new** **byte**[] {64,64,65});将数组逐个写入
3. 如果文件不存在会创建一个文件

#### OutputStreamWriter(字符输出流)

1. append("沙发上发呆的事");将字符添加到写入流

2. flush();执行写入

   ```java
   File file = new File("res/cs.txt");
   
   FileOutputStream fileOutputStream = new FileOutputStream(file);
   
   OutputStreamWriter outputStreamWriter = new OutputStreamWriter(fileOutputStream,"UTF-8");   //此处指定写入编码，如果不指定将使用系统默认的编码
   
   outputStreamWriter.append("沙发上发呆的事");
   
   outputStreamWriter.flush();
   ```

### 文件复制

```java
File file = new File("res/11541492177_.pic.jpg");
		
FileInputStream fileInputStream = new FileInputStream(file);

FileOutputStream fileOutputStream = new FileOutputStream("res/11pic.jpg");

byte [] bs=new byte[1024];  //一次读取1024字节

while (fileInputStream.read(bs)!=-1) {
	fileOutputStream.write(bs);
}
```



### RandomAccessFile(随机访问/速度较快)



## AWT





