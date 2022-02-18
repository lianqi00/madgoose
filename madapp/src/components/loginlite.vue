<template>
  <div class="loginlite">
    <el-card align="center">
      <el-result
        v-if="resultshow"
        :icon="resultip.icon"
        :title="resultip.title"
        :subTitle="resultip.subTitle"
      >
        <template slot="extra">
          <el-button
            @click="gotostudent(resultip.userid)"
            type="primary"
            size="medium"
            >{{ resultip.btntext }}</el-button
          >
        </template>
      </el-result>
      <div style="width: 300px" v-if="!resultshow">
        <el-form ref="form" :model="form">
          <el-form-item label="学号">
            <el-input v-model="form.user_number"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div align="center" v-if="!resultshow">
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
      resultshow: false,
      resultip: {
        icon: 'error',
        title: '错误提示',
        subTitle: '请根据提示进行操作',
        btntext: '登录',
        userid: '',
      },
    }
  },
  methods: {
    gotostudent(id) {
      // console.log(id)
      if (id) return this.$router.push('/student/' + id)
      this.$router.push('/login')
      sessionStorage.clear()
    },
    async login() {
      if (!this.form.user_number || !this.form.password) {
        return this.$message({
          message: '学号或密码不能为空！',
          type: 'error',
        })
      }
      const res = await this.$http.post('/user/login', this.form)
      // console.log(res)
      if (!res || !res.data.result) return
      //登录成功后的一些
      this.$message({
        type: 'success',
        message: res.data.message,
      })
      this.bus.$emit('toHeader', res.data.result.userInfo)
      sessionStorage.token = res.data.result.token

      //判断用户是否为本课程学生
      const user_course = res.data.result.userInfo.user_course
      const userid = res.data.result.userInfo._id
      const usertype = res.data.result.userInfo.user_type
      const cid = this.$route.params.cid
      // console.log(res.data.result.userInfo)
      if (usertype) {
        this.resultshow = true
        this.resultip = {
          icon: 'error',
          title: '错误提示',
          subTitle: '教师无法上传作业，请登录教师端后台。',
          btntext: '登录',
          userid: '',
        }
        return
      }
      if (user_course !== cid) {
        this.resultshow = true
        this.resultip = {
          icon: 'error',
          title: '错误提示',
          subTitle:
            '你并不是此课程学生，无法上传，点击下方按钮可登录后台查看你的全部作业。',
          btntext: '登录',
          userid,
        }
        return
      }
      //判断用户是否已经上传过作业
      const res2 = await this.$http.get('/hk_done/gethkdonebyid', {
        params: { _id: this.$route.params.id },
      })
      const result = res2.data.result
      let isex = false
      result.forEach((e) => {
        if (e.hk_done_sid === userid) {
          isex = true
        }
      })
      this.resultshow = true
      this.resultip = {
        icon: 'error',
        title: '错误提示',
        subTitle:
          '你已经上传过作业了，请勿重复上传，如果想要覆盖之前作业，请点击下方按钮进入后台。',
        btntext: '登录',
        userid,
      }
      if (isex) return

      this.$emit('toWkpage', res.data)
    },
  },
}
</script>

<style>
</style>