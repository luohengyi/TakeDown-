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

