<template>
  <div class="notfount">
    <div
      id="page"
      style="border-style: dashed; border-color: #e4e4e4; line-height: 30px"
    >
      <h1>抱歉，找不到此页面~</h1>
      <font color="#666666"
        >你请求访问的页面，暂时找不到，我们建议你返回首页官网进行浏览，谢谢！</font
      ><br /><br />
      <el-link> <router-link to="/">返回首页</router-link> </el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notfount',
}
</script>

<style scoped>
div {
  margin-left: auto;
  margin-right: auto;
}

h1,
h2,
h3,
h4 {
  /*	display:block;*/
  margin: 0;
  font-weight: normal;
  font-family: '微软雅黑', Arial, 'Trebuchet MS', Helvetica, Verdana;
}
h1 {
  font-size: 44px;
  color: #0188de;
  padding: 20px 0px 10px 0px;
}
h2 {
  color: #0188de;
  font-size: 16px;
  padding: 10px 0px 40px 0px;
}

#page {
  width: 910px;
  padding: 20px 20px 40px 20px;
  margin-top: 80px;
}
</style>