# JavaValidator

> 在bean中定义 验证 信息 使用 groups来定义不同的验证场景

```java

public class Users {
    @NotNull(message ="非法数据!",groups = Update.class)
    private Long id;

    @NotEmpty(message ="账号不能为空!",groups = {Create.class, Update.class})
    @CheckUserName(groups = Update.class)
    private String name;

    @NotEmpty(message ="密码不能为空!",groups = {Create.class, Update.class})
    private String password;

}
```

> 验证场景 使用@Validated 注解来开启验证  分组 Create.class 来设定不同的验证

```java
@Controller
@RequestMapping("/index")
public class IndexController {

    @RequestMapping("/index")
    @ResponseBody
    public String index(@Validated(Create.class) Users users){
        return "123";
    }

}
```

> 验证中靶响应 使用 控制起增强注解来 配置所有的异常处理

```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ResponseBody
    @ExceptionHandler(BindException.class)
    public String resp(BindException bindException) {
        StringBuilder errorMsg = new StringBuilder();
        bindException.getAllErrors().forEach(data -> errorMsg.append(data.getDefaultMessage()));
        return errorMsg.toString();
    }

}
```

> 自定义注解  使用该注解后自动调用 CheckUserNameIpml 类来验证是否通过

```java
@Documented
@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CheckUserNameIpml.class)
public @interface CheckUserName {
    //定制化的提示信息，主要是从ValidationMessages.properties里提取，也可以依据实际情况进行定制
    String message() default "用户已存在！";

    //这里主要进行将validator进行分类，不同的类group中会执行不同的validator操作
    Class<?>[] groups() default {};

    // 主要是针对bean的，使用不多。
    Class<? extends Payload>[] payload() default {};
}
```

> 实现自己的验证类

```java
public class CheckUserNameIpml implements ConstraintValidator<CheckUserName, Object> {

    /**
     * @param constraintAnnotation 注解信息
     */
    @Override
    public void initialize(CheckUserName constraintAnnotation) {
    }
    /**
     * @param o 需要验证的值
     * @param constraintValidatorContext 验证上下文
     * @return boolean 是否通过
     */
    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) 		{
        return false;
    }
}
```