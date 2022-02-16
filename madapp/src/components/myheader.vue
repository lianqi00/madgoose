<template>
  <div class="myheader">
    <el-dialog title="修改密码" :visible.sync="changepwshow" width="30%">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
      >
        <el-form-item label="新密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            :show-password="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            :show-password="true"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleForm)"
            >提交</el-button
          >
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-link @click="handleClick" style="font-size: 20px" :underline="false"
      >老鹅作业上传反馈工具</el-link
    >

    <el-dropdown
      trigger="click"
      @command="handleCommand"
      style="right: 10px; position: absolute"
    >
      <span class="el-dropdown-link">
        {{ this.userinfo.user_name || cdate.user_name }}
        <i
          class="el-icon-arrow-down el-icon--right"
          v-if="this.userinfo.user_name || cdate.user_name ? true : false"
        ></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">修改密码</el-dropdown-item>
        <el-dropdown-item command="b">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'myheader',
  created() {
    this.bus.$on('toHeader', (d) => {
      this.userinfo = d
    })
  },
  props: {
    cdate: {
      default: '',
    },
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
        ],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      },
      ruleForm: {},
      changepwshow: false,
      userinfo: {},
    }
  },
  methods: {
    handleClick() {
      this.$router.push('/')
    },
    open() {
      this.$alert('密码已经更改，请重新登录。', '密码修改成功', {
        confirmButtonText: '确定',
        showClose: false,
        callback: (action) => {
          // console.log(action)
          this.$router.push('/login')
        },
      })
    },
    submitForm(v) {
      // console.log(v)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // console.log(v)
          const { password } = v
          this.$http.patch('/user/changepassword', { password }).then((res) => {
            // console.log(res)
            if (!res || !res.data.result) return
            // this.$message.success(res.data.message)
            // this.$confirm('密码已经更改，请重新登录', res.data.message)
            sessionStorage.clear()
            this.open()
          })
        } else {
          return
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    handleCommand(command) {
      // console.log(this.props)
      // console.log(this.$route.name)
      // this.$message('click on item ' + command)
      if (command === 'b') {
        if (this.$route.name === 'Wkpage') {
          this.$emit('headertowkpage', 0)
          sessionStorage.clear()
          return
        }
        this.$router.push('/login')
        sessionStorage.clear()
      }
      if (command === 'a') {
        this.changepwshow = true
      }
    },
  },
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #000000;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>