# SpringBoot

## 常用组件

### 定时任务

#### 自带组件实现	

1. 式例

   1. ```java
      @Component
      @Configuration      //1.主要用于标记配置类，兼备Component的效果。
      @EnableScheduling   // 2.开启定时任务
      public class SaticScheduleTask {
          //3.添加定时任务
          @Scheduled(cron = "0/5 * * * * ?")
          //或直接指定时间间隔，例如：5秒
          //@Scheduled(fixedRate=5000)
          private void configureTasks() {
              System.err.println("执行静态定时任务时间: " + LocalDateTime.now());
          }
      }
      ```

   2. Cron表达式参数分别表示：

      - 秒（0~59） 例如0/5表示每5秒
      - 分（0~59）
      - 时（0~23）
      - 日（0~31）的某天，需计算
      - 月（0~11）
      - 周几（ 可填1-7 或 SUN/MON/TUE/WED/THU/FRI/SAT