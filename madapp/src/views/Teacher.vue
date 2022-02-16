<template>
  <div class="teacher">
    <el-container style="height: 100vh">
      <el-header>
        <myheader :cdate="userdata" />
      </el-header>
      <el-container style="flex: 1">
        <el-aside width="200px">
          <el-menu
            router
            class="el-menu-vertical"
            @open="handleOpen"
            @close="handleClose"
            @select="handlelect"
          >
            <el-menu-item index="/teacher/courseman">
              <i class="el-icon-setting"></i>
              <span slot="title">课程管理</span>
            </el-menu-item>
            <el-menu-item index="/teacher/studentman">
              <i class="el-icon-setting"></i>
              <span slot="title">学生管理</span>
            </el-menu-item>
            <el-menu-item index="/teacher/howkman">
              <i class="el-icon-setting"></i>
              <span slot="title">作业管理</span>
            </el-menu-item>
            <el-menu-item index="/teacher/feedbackman">
              <i class="el-icon-setting"></i>
              <span slot="title">反馈管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main style="padding: 0">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>
        <myfooter></myfooter>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import myheader from '../components/myheader.vue'
import myfooter from '../components/myfooter.vue'

export default {
  components: { myheader, myfooter },
  created() {
    this.fetch()
  },
  data() {
    return {
      userdata: {},
    }
  },
  methods: {
    fetch() {
      this.$http.get('/user/fetch').then((res) => {
        // console.log(res)
        this.userdata = res.data.result
      })
    },
    handlelect(key, keyPath) {
      // console.log(key, keyPath)
      // this.$router.push('/teacher/courseman')
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
  },
}
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  line-height: 60px;
}
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
  /* height: 60px; */
  width: 100%;
  /* position: absolute; */
  /* bottom: 0px;
  left: 0px; */
}
</style>
