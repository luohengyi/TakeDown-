格式化时间

```js
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

let date = new Date()
let time =  dateFormat("YYYY-mm-dd HH:MM", date)
console.log(time)
```

### 本周开始时间

```js
//获得本周的开始日期
function getWeekStartDate() {
    var now = new Date(); //当前日期
    var nowDayOfWeek = now.getDay(); //今天本周的第几天
    var nowDay = now.getDate(); //当前日
    var nowMonth = now.getMonth(); //当前月
    var nowYear = now.getFullYear(); //当前年
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
    return (weekStartDate);
}
```

本月开始时间

```js
//获得某月的天数
function getMonthDays(){
    var now = new Date(); //当前日期
    var nowYear = now.getFullYear(); //当前年
    var myMonth = now.getMonth();
    return  new Date(nowYear, myMonth, 1);
}
```

