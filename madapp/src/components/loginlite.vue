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
        this.$message({
          type: 'success',
          message: res.data.message,
        })
        sessionStorage.token = res.data.result.token
        console.log(res.data.result.userInfo)
        this.bus.$emit('toHeader', res.data.result.userInfo)
        this.$emit('toWkpage', res.data)
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