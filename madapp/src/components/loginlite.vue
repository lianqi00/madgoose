<template>
  <div class="loginlite">
    <el-card align="center">
      <div style="width: 300px">
        <el-form ref="form" :model="form">
          <el-form-item label="学号">
            <el-input v-model="form.user_number"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div align="center">
        <el-button @click="login">登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'loginlite',
  // created() {
  //   this.bus.$on('toLoginlite', (d) => {
  //     console.log(d)
  //   })
  // },
  data() {
    return {
      form: {},
    }
  },
  methods: {
    login() {
      if (!this.form.user_number || !this.form.password) {
        return this.$message({
          message: '学号或密码不能为空！',
          type: 'error',
        })
      }
      this.$http.post('/user/login', this.form).then((res) => {
        // console.log(res)
        if (!res) {
          return
        }
        const user_course = res.data.result.userInfo.user_course
        const cid = this.$route.params.cid
        // console.log(user_course, cid)
        if (user_course !== cid) {
          this.$message({
            type: 'error',
            message: '你并不是此作业所在课程的学生，无法上传',
          })
          return
        }
        this.$message({
          type: 'success',
          message: res.data.message,
        })
        this.bus.$emit('toHeader', res.data.result.userInfo)
        // console.log(res.data.result.userInfo)
        this.$emit('toWkpage', res.data)
        sessionStorage.token = res.data.result.token
      })
      // .catch((err) => {
      //   //   console.log(err.response.data.message)
      //   this.$message({
      //     message: err.response.data.message,
      //     type: 'error',
      //   })
      // })
      //   console.log(this.form)
    },
  },
}
</script>

<style>
</style>