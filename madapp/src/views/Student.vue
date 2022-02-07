<template>
  <div class="student">
    <el-dialog title="提示" :visible.sync="islookshow" width="60%" center>
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
        <el-button type="warning" @click="download(workinfo)">下载</el-button>
        <el-button type="primary" @click="islookshow = false">关闭</el-button>
      </span>
    </el-dialog>
    <el-container>
      <el-header>
        <myheader :cdate="userdata" />
      </el-header>
      <el-container>
        <el-container>
          <el-main style="padding: 0px">
            <div style="margin: 20px">
              <el-descriptions title="课程信息" :column="4">
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
            >
              <el-table-column label="作业名称" prop="howk_name">
              </el-table-column>
              <el-table-column label="创建时间" prop="createdAt">
              </el-table-column>
              <el-table-column label="截止时间" prop="howk_deadline">
              </el-table-column>
              <el-table-column label="是否完成" prop="howk_done2">
              </el-table-column>
              <el-table-column label="分数" prop=""> </el-table-column>
              <el-table-column align="right" min-width="150">
                <template #header>
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入作业名称关键字搜索"
                  />
                </template>
                <template #default="scope">
                  <el-button
                    size="mini"
                    @click="handleLook(scope.row)"
                    :disabled="scope.row.howk_done2 === '未完成'"
                  >
                    查看
                  </el-button>
                  <el-button
                    size="mini"
                    @click="handleFeedback(scope.row)"
                    :disabled="scope.row.howk_done2 === '未完成'"
                  >
                    反馈
                  </el-button>
                  <el-button
                    size="mini"
                    :type="scope.row.howk_done2 === '未完成' ? 'danger' : ''"
                    @click="handleUpload(scope.row)"
                  >
                    {{ scope.row.howk_done2 === '未完成' ? '上传' : '重传' }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer>
            <span style="font-size: 10px"
              >Copyright © 2022 lianqi All Rights Reserved. 连亓 版权所有</span
            >
            <span style="font-size: 10px"> ｜备案号：xxxxxxxxxx</span>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import moment from 'moment'
import downloadjs from 'downloadjs'
import myheader from '../components/myheader.vue'
export default {
  name: 'student',
  components: { myheader },
  // props:[],
  data() {
    return {
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

    // this.$http
    //   .get('/howk/')
    //   .then((res) => {
    //     // console.log(res.data.result)
    //     let result = res.data.result
    //     for (let i = 0; i < result.length; i++) {
    //       const element = result[i]
    //       element.createdAt = moment(element.createdAt).format('MM月DD日 HH:mm')
    //       element.howk_deadline = moment(element.howk_deadline).format(
    //         'MM月DD日 HH:mm'
    //       )
    //       // console.log(element.howk_done)
    //       element.howk_done = element.howk_done.length === 0 ? '未完成' : '完成'
    //     }
    //     this.tableData = result
    //     console.log(result)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  },
  methods: {
    fetch() {
      this.$http.get('/user/').then((res) => {
        // console.log(res.data.result[0])
        const { user_course, ...other } = res.data.result[0]
        this.userdata = other
        // console.log(user_course.course_howk)
        this.courseinfo = user_course
        let oridata = user_course.course_howk
        for (let i = 0; i < oridata.length; i++) {
          const element = oridata[i]
          element.createdAt = this.formatdate(element.createdAt)
          element.howk_deadline = this.formatdate(element.howk_deadline)

          // console.log(element.howk_done)
          element.howk_done2 = this.workisdone(element.howk_done)
          element.howk_done = this.workself(element.howk_done)
        }
        this.tableData = oridata
        console.log(oridata)
        console.log(this.courseinfo.course_howk)
      })
    },
    //格式化时间
    formatdate(val) {
      return moment(val).format('MM月DD日 HH:mm')
    },
    // 确定作业是否完成
    workisdone(val) {
      let r = '未完成'
      val.forEach((e) => {
        if (e.hk_done_sid === this.sid) {
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
      console.log(row)
      // console.log(this.userdata)

      this.workinfo = row
      this.time = row.howk_done.createdAt || ''
      this.islookshow = true
    },
    download(val) {
      console.log(val.howk_done.key)
      const key = val.howk_done.key
      this.$http.get('/hk_done/download', { params: { key } }).then((res) => {
        console.log(res)
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
      console.log(row)
    },
    handleFeedback(row) {
      console.log(row)
    },
    // handleClose() {
    //   this.time = ''
    // },
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
  /* height: 60px; */
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
}

.el-main {
  /* background-color: #e9eef3; */
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 100%;
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
