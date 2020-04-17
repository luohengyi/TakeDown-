# vue

### 路由

1. 安装：
2. 路由跳转携带参数：
   1. this.$router.push({ path:'/productEdit',query:{id:row.id} });
   2. ``<router-link :to="{path:'/classifyDetail',query: {name: id}}"></router-link>``
   3. 
3. 解析路由参数：
   1. this.$route.params.id 
   2. this.$route.query.id

### axios

- 文件发送

  ```js
  //使用 create方法创建一个 axios 实例 绕过拦截器，否者无法发送 formData格式的数据
  let url = this.$store.state.apiUrl;
  let token = this.$store.getters.getToken;
  var instance = this.$http.create({
      baseURL: url,
      timeout: 1000,
      headers: {
                  'Content-Type': 'multipart/form-data',
                   token:token
              },
  });
  instance.post("Message_board/upload",formData).then(res=>{
  
  })
  ```

### 自组件监听父组件的变换

```vue
watch: {
    // 监听 查询条件的 改变
    table :  {
        handler(newVal, oldVal) {
            console.info('value changed 2', newVal)
        },
        deep: true
    }

}
```