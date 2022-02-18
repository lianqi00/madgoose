<template>
  <div class="student">
    <el-dialog title="查看" :visible.sync="islookshow" width="60%" center>
      <el-descriptions title="作业信息" :column="3">
        <el-descriptions-item label="作业名称">{{
          workinfo.howk_name
        }}</el-descriptions-item>
        <el-descriptions-item label="上传状态">{{
          workinfo.howk_done2
        }}</el-descriptions-item>
        <el-descriptions-item label="上传时间">{{
          formatdate(time)
        }}</el-descriptions-item>
      </el-descriptions>
      <div v-html="workinfo.howk_content"></div>
      <span slot="footer" class="dialog-footer">
        <el-button
          :disabled="workinfo.howk_done2 === '未完成'"
          type="warning"
          @click="download(workinfo)"
          >下载</el-button
        >
        <el-button type="primary" @click="islookshow = false">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="重新上传"
      :visible.sync="overuploadshow"
      width="70%"
      :destroy-on-close="true"
    >
      <uploadlite
        :touUpdata="toupdata"
        @upLoadtoWkpage="overuploadshow = false"
      ></uploadlite>
    </el-dialog>

    <el-container style="height: 100vh">
      <el-header>
        <myheader :cdate="userdata" />
      </el-header>
      <el-container style="flex: 1">
        <el-main style="padding: 0px">
          <div style="margin: 20px">
            <el-descriptions title="课程信息" :column="1" border>
              <el-descriptions-item label="课程名称">{{
                courseinfo.course_name
              }}</el-descriptions-item>
              <el-descriptions-item label="目前作业数量">{{
                tableData.length
              }}</el-descriptions-item>
            </el-descriptions>
          </div>
          <el-divider></el-divider>
          <el-table
            :data="
              tableData.filter(
                (data) =>
                  !search ||
                  data.howk_name.toLowerCase().includes(search.toLowerCase())
              )
            "
            style="width: 100%"
            v-loading="loading"
          >
            <el-table-column label="作业名称" min-width="120" prop="howk_name">
            </el-table-column>
            <el-table-column label="创建时间" min-width="100" prop="createdAt2">
            </el-table-column>
            <el-table-column
              label="截止时间"
              min-width="100"
              prop="howk_deadline2"
            >
            </el-table-column>
            <el-table-column label="剩余时间" min-width="110">
              <template slot-scope="scope">
                <el-tag
                  effect="dark"
                  :type="
                    countdown(scope.row.howk_deadline) === '已过截止日期'
                      ? 'danger'
                      : 'success'
                  "
                >
                  {{ countdown(scope.row.howk_deadline) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="是否完成">
              <template slot-scope="scope">
                <el-tag
                  effect="dark"
                  :type="
                    scope.row.howk_done2 === '未完成' ? 'warning' : 'success'
                  "
                  >{{ scope.row.howk_done2 }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column label="分数" width="170">
              <template slot-scope="scope">
                <el-rate
                  v-if="scope.row.howk_done.hk_done_score"
                  v-model="scope.row.howk_done.hk_done_score"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                ></el-rate>
                <p v-if="!scope.row.howk_done.hk_done_score">未打分</p>
              </template>
              <!-- <template #default="scope">
              </template> -->
            </el-table-column>
            <el-table-column align="right" min-width="150" fixed="right">
              <template #header>
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入作业名称关键字搜索"
                />
              </template>
              <template #default="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="查看作业要求,下载已上传作业"
                  placement="top-start"
                >
                  <el-button size="mini" @click="handleLook(scope.row)">
                    查看
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="
                    scope.row.howk_done2 === '未完成'
                      ? '自动跳转到交作业链接,需要重新登录'
                      : '覆盖之前作业'
                  "
                  placement="top-start"
                >
                  <el-button
                    size="mini"
                    :type="scope.row.howk_done2 === '未完成' ? 'danger' : ''"
                    @click="handleUpload(scope.row)"
                  >
                    {{ scope.row.howk_done2 === '未完成' ? '上传' : '重传' }}
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
      <el-footer>
        <myfooter></myfooter>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import moment from 'moment'
import myheader from '../components/myheader.vue'
import myfooter from '../components/myfooter.vue'
import Uploadlite from '../components/uploadlite.vue'
export default {
  name: 'student',
  components: { myheader, myfooter, Uploadlite },
  // props:[],
  data() {
    return {
      toupdata: {},
      overuploadshow: false,
      loading: true,
      userdata: '',
      courseinfo: '',
      workinfo: '',
      dialogVisible: true,
      tableData: [],
      search: '',
      sid: '',
      islookshow: false,
      time: '',
    }
  },
  created() {
    this.sid = this.$route.params.id
    // console.log(this.sid)
    this.fetch()
  },
  methods: {
    fetch() {
      this.$http.get('/user/').then((res) => {
        // console.log(res.data.result)
        const { user_course, ...other } = res.data.result[0]
        this.userdata = other
        // console.log(user_course.course_howk)
        this.courseinfo = user_course
        let oridata = user_course.course_howk
        for (let i = 0; i < oridata.length; i++) {
          const element = oridata[i]
          element.createdAt2 = this.formatdate(element.createdAt)
          element.howk_deadline2 = this.formatdate(element.howk_deadline)

          // console.log(element.howk_done)
          element.howk_done2 = this.workisdone(element.howk_done)
          element.howk_done = this.workself(element.howk_done)
        }
        this.tableData = oridata
        // console.log(oridata)
        // console.log(this.courseinfo.course_howk)
        this.loading = false
      })
    },
    //格式化时间
    formatdate(val) {
      if (!val) return '无'
      return moment(val).format('MM.DD.HH:mm')
    },
    // 确定作业是否完成
    workisdone(val) {
      let r = '未完成'
      val.forEach((e) => {
        if (e.hk_done_sid === this.sid) {
          // this.tableData.hk_done_score = e.hk_done_score
          r = '已完成'
          return
        }
      })
      return r
    },
    //只保留自己的作业
    workself(val) {
      let wk = {}
      val.forEach((e) => {
        if (e.hk_done_sid === this.sid) {
          wk = e
        }
      })
      return wk
    },
    handleLook(row) {
      // console.log(row)
      // console.log(this.userdata)

      this.workinfo = row
      this.time = row.howk_done.createdAt || ''
      this.islookshow = true
    },
    download(val) {
      // console.log(val.howk_done.key)
      const key = val.howk_done.key
      this.$http.get('/hk_done/download', { params: { key } }).then((res) => {
        // console.log(res)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = res.data.result
        // 获取文件名
        // download 属性定义了下载链接的地址而不是跳转路径
        const strfilename = this.userdata.user_number + this.userdata.user_name
        link.setAttribute('download', strfilename)
        document.body.appendChild(link)
        link.click()
        // window.open(res.data.result)
        // downloadjs(res.data.result, strfilename)
      })
    },
    handleUpload(row) {
      // console.log(row)
      // console.log(this.courseinfo)
      //先判断作业是否超出时间
      const { howk_deadline } = row
      const ispassdeadline = this.countdown(howk_deadline)
      if (ispassdeadline === '已过截止日期') {
        this.$message.error(ispassdeadline)
        return
      }
      //再判断是否完成
      if (row.howk_done2 === '已完成') {
        //完成就弹出重新上传对话框
        // console.log('走完成的代码了')
        this.overuploadshow = true
        // console.log(row, this.courseinfo)
        const newdata = row
        newdata.coursename = this.courseinfo.course_name
        // console.log(newdata)
        this.toupdata = newdata
        return
      }
      //未完成就跳转到wkpage
      const howkid = row._id
      const courseid = this.courseinfo._id
      this.$router.push('/wkpage/' + howkid + '/' + courseid)
    },
    handleFeedback(row) {
      // console.log(row)
    },
    countdown(deadline) {
      // console.log(this.utcdate)
      const stamdate = Date.parse(deadline)
      // console.log(stamdate)
      // console.log(Date.now())
      const lim = stamdate - Date.now()
      // console.log(lim < 0)
      if (lim < 0) return '已过截止日期'
      const a = lim / 1000
      const m = parseInt((a % 3600) / 60)
      const h = parseInt((a % 86400) / 3600)
      const d = parseInt(a / 86400)
      const text = d + '天' + h + '小时' + m + '分'
      // if (d <= 1) {
      //   this.tagtype = 'danger'
      // } else if (d <= 2) {
      //   this.tagtype = 'warning'
      // } else {
      //   this.tagtype = 'success'
      // }
      return text
    },
  },
}
</script>

<style scoped>
.el-divider {
  margin: 24px 0 0 0;
}
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
  height: 60px;
  /* width: 100%; */
  /* position: absolute; */
  /* bottom: 0px;
  left: 0px; */
}

.el-main {
  /* background-color: #e9eef3; */
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 100%;
  margin: 0 100px 0 100px;
}

body > .el-container {
  margin-bottom: 40px;
}
/* 
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
</style>
