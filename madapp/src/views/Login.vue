<template>
  <div id="login">
    <h1 style="text-align: center">大鹅作业上传反馈</h1>
    <div style="width: 300px; margin: 0 auto">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100"
        class="demo-ruleForm"
      >
        <el-form-item label="学号" prop="user_number">
          <el-input
            type="text"
            v-model="ruleForm.user_number"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data() {
    return {
      ruleForm: {
        user_number: '',
        password: '',
      },
      rules: {
        user_number: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 9, max: 9, message: '长度为9位数字', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          this.$http.post('/user/login', this.ruleForm).then((res) => {
            // console.log(res)
            if (!res || !res.data.result) {
              return
            }
            console.log(res)
            sessionStorage.token = res.data.result.token
            if (res.data.result.userInfo.user_type === 1) {
              this.$router.push('/teacher')
            } else if (res.data.result.userInfo.user_type === 0) {
              this.$router.push('/student/' + res.data.result.userInfo._id)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style>
</style>
