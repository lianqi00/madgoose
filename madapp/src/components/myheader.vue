<template>
  <div class="myheader">
    <span style="font-size: 20px">大鹅作业上传反馈工具</span>
    <el-dropdown
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
      // console.log('@@@@@@@' + this.userinfo)
      console.log(d)
      this.userinfo = d
      // this.bus.$emit('toUpLoad', this.userinfo)
    })
  },
  props: {
    cdate: {
      default: '',
    },
  },
  data() {
    return {
      userinfo: {},
    }
  },
  methods: {
    handleCommand(command) {
      // console.log(this.props)
      // console.log(this.$route.name)

      // this.$message('click on item ' + command)
      if (command === 'b') {
        // sessionStorage.clear()
        if (this.$route.name === 'Wkpage') {
          // this.$router.go(0)
          this.$emit('headertowkpage', 0)
          sessionStorage.clear()
          return
        }
        this.$router.push('/login')
        sessionStorage.clear()
      }
    },
  },
}
</script>

<style>
</style>