<template>
  <div class="wkpage">
    <el-container>
      <el-header
        ><span style="font-size: 20px">大鹅作业上传反馈工具</span>
        <el-dropdown
          @command="handleCommand"
          style="right: 10px; position: absolute"
        >
          <span class="el-dropdown-link">
            {{ this.user_name || ''
            }}<i
              class="el-icon-arrow-down el-icon--right"
              v-if="this.user_name ? true : false"
            ></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">修改密码</el-dropdown-item>
            <el-dropdown-item command="b">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown></el-header
      >
      <el-main>
        <el-steps :active="active" align-center finish-status="success">
          <el-step
            title="步骤 1"
            icon="el-icon-edit"
            description="作业内容"
          ></el-step>
          <el-step
            title="步骤 2"
            icon="el-icon-user"
            description="登录"
          ></el-step>
          <el-step
            title="步骤 3"
            icon="el-icon-upload2"
            description="上传"
          ></el-step>
          <el-step title="步骤 4" icon="el-icon-chat-round" description="反馈">
          </el-step>
        </el-steps>
        <loginlite v-if="this.active === 1 ? true : false" />
        <showcontent v-if="this.active === 0 ? true : false" />
        <uploadlite v-if="this.active === 2 ? true : false" />
        <feedbacklite v-if="this.active === 3 ? true : false" />
        <el-button style="margin-top: 12px" @click="next">下一步</el-button>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import Feedbacklite from '../components/feedbacklite.vue'
import loginlite from '../components/loginlite.vue'
import Showcontent from '../components/showcontent.vue'
import uploadlite from '../components/uploadlite.vue'
export default {
  components: { loginlite, Showcontent, uploadlite, Feedbacklite },
  data() {
    return {
      active: 0,
      user_name: '',
    }
  },
  methods: {
    next() {
      if (this.active++ > 3) this.active = 1
      console.log(this.$route.params)
      console.log(this.active)

      if (this.active === 4) {
        this.$router.push('/student')
      }
    },
    handleCommand(command) {
      this.$message('click on item ' + command)
    },
  },
}
</script>
<style>
.el-card {
  margin-top: 20px;
  min-height: 500px;
}
</style>
