<template>
  <div class="wkpage">
    <el-container style="height: 100vh">
      <el-header> <myheader @headertowkpage="getheaderdate" /> </el-header>
      <el-container style="felx: 1">
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
            <el-step
              title="步骤 4"
              icon="el-icon-chat-round"
              description="反馈"
            >
            </el-step>
          </el-steps>
          <div align="center">
            <el-button
              v-show="this.isbshow"
              style="margin: 20px 0 0 0"
              v-if="this.active >= 1 ? false : true"
              @click="next"
              >我要交作业
            </el-button>
          </div>

          <loginlite
            @toWkpage="getloginlited"
            v-if="this.active === 1 ? true : false"
          />
          <showcontent
            @toUp="toUp"
            @isbutshow="isbbshow"
            v-if="this.active === 0 ? true : false"
          />
          <uploadlite
            :touUpdata="toupdata"
            @upLoadtoWkpage="getUploadinfo"
            v-if="this.active === 2 ? true : false"
          />
          <feedbacklite
            :tofeedbackdata="userinfo"
            @fdbktowkpage="fdbktoWkpage"
            v-if="this.active === 3 ? true : false"
          />
        </el-main>
      </el-container>
      <el-footer>
        <myfooter></myfooter>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Feedbacklite from '../components/feedbacklite.vue'
import loginlite from '../components/loginlite.vue'
import Showcontent from '../components/showcontent.vue'
import uploadlite from '../components/uploadlite.vue'
import myheader from '../components/myheader.vue'
import Myfooter from '../components/myfooter.vue'
export default {
  components: {
    loginlite,
    Showcontent,
    uploadlite,
    Feedbacklite,
    myheader,
    Myfooter,
  },
  data() {
    return {
      userinfo: {},
      active: 0,
      user_name: '',
      isbshow: true,
      toupdata: {},
    }
  },
  created() {
    // console.log(this.$route.params)
  },
  methods: {
    fdbktoWkpage(d) {
      this.next()
    },
    getUploadinfo(d) {
      // console.log(d)
      this.next()
    },
    toUp(d) {
      // console.log(d)
      this.toupdata = d
    },
    getheaderdate(d) {
      // console.log(d)
      // this.active = d
      location.reload()
    },
    isbbshow(v) {
      // console.log(v)
      this.isbshow = v
    },
    getloginlited(data) {
      // console.log('@@@', data)
      this.userinfo = data.result.userInfo
      // console.log(this.userinfo)
      if (data.code === 0) {
        this.next()
      }
    },
    next() {
      if (this.active++ > 3) this.active = 1
      // console.log(this.$route.params)
      // console.log(this.active)

      if (this.active === 4) {
        const _id = this.userinfo._id
        this.$router.push('/student/' + _id)
      }
    },
  },
}
//
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  line-height: 60px;
}
/* .el-card {
  min-height: 400px;
  width: 90%;
  margin: 20px auto;
} */
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
  /* height: 60px; */
  width: 100%;
  /* position: absolute; */
  bottom: 0px;
  left: 0px;
}
</style>
