<template>
  <div class="howkman">
    <el-dialog
      title="添加作业"
      :visible.sync="centerDialogVisible"
      width="70%"
      center
    >
      <!-- <span>需要注意的是内容是默认不居中的</span> -->
      <el-form :model="addform" :inline="true" label-width="120px">
        <el-form-item label="作业名称">
          <el-input v-model="addform.howk_name"></el-input>
        </el-form-item>
        <el-form-item label="截止时间">
          <!-- <el-input v-model="addform.howk_deadline"></el-input> -->
          <div class="block">
            <el-date-picker
              v-model="addform.howk_deadline"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="提交类型">
          <el-select v-model="addform.howk_uptypetext" placeholder="请选择">
            <el-option
              v-for="item in typeoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="大小限制">
          <el-select v-model="addform.howk_size" placeholder="请选择">
            <el-option
              v-for="item in sizeoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属课程">
          <el-select v-model="addform.course_id" placeholder="请选择">
            <el-option
              v-for="item in courseinfo"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <!-- <el-input v-model="addform.howk_content"></el-input> -->
          <quillEditor v-model="addform.howk_content"></quillEditor>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmaddform">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="复制作业链接"
      :visible.sync="copydialog"
      width="30%"
      center
    >
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="copytextarea"
      >
      </el-input>
      <el-link :href="copytextarea" target="_blank" type="success"
        >点击跳转</el-link
      >
    </el-dialog>

    <el-dialog :visible.sync="seeworkshow" fullscreen :destroy-on-close="true">
      <!-- text-align: center -->
      <div style="width: 1000px; margin: 0 auto">
        <el-carousel
          ref="carousel"
          indicator-position="outside"
          height="80px"
          :autoplay="false"
          arrow="never"
          :indicator-position="'none'"
          :loop="false"
          @change="carouselchange"
        >
          <el-carousel-item v-for="(item, i) in howk_done" :key="i">
            <el-descriptions title="学生信息">
              <el-descriptions-item label="学号">{{
                item.hk_done_sid.user_number
              }}</el-descriptions-item>
              <el-descriptions-item label="姓名">{{
                item.hk_done_sid.user_name
              }}</el-descriptions-item>
              <el-descriptions-item label="上传时间">{{
                formatdate(item.updatedAt)
              }}</el-descriptions-item>
            </el-descriptions>
          </el-carousel-item>
        </el-carousel>
        <div class="player-container" style="width: 700px; margin: 0 auto">
          <vue-core-video-player :src="videosrc"></vue-core-video-player>
        </div>
        <div style="width: 300px; margin: 0 auto">
          <p>
            {{ '当前第' + nowdex + '个作业，共' + totaldex + '个作业' }}
          </p>
          <p>
            <el-rate
              :allow-half="true"
              :show-score="true"
              v-model="rate"
              @change="ratechange"
            ></el-rate>
          </p>
          <span>
            <el-button @click="carprev()">上一个</el-button>
            <el-button @click="carnext()">下一个</el-button>
            <el-button type="primary" @click="seeworkshow = false"
              >关闭</el-button
            >
          </span>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="lookfeedbackshow" fullscreen>
      <div style="width: 500px; margin: 0 auto">
        <ol>
          <li v-for="(item, i) in feedbackdate" :key="item._id">
            <p>{{ item.feedback_q }}</p>
            <pure-vue-chart
              v-if="item.feedback_option.length"
              :points="
                getpoints(item.feedback_option, item.feedback_anser) || []
              "
              :width="400"
              :height="200"
              :show-x-axis="true"
              :show-y-axis="true"
            />
            <!-- :show-values="true" -->

            <el-table
              v-if="!item.feedback_option.length"
              :data="item.feedback_anser"
            >
              <el-table-column
                prop="fd_done_sid.user_name"
                label="姓名"
                width="70"
              >
              </el-table-column>
              <el-table-column prop="fd_done_a" label="回答"> </el-table-column>
            </el-table>
          </li>
        </ol>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="lookfeedbackshow = false">取 消</el-button>
        <el-button type="primary" @click="lookfeedbackshow = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <div class="butayy" style="margin: 10px">
      <el-button round @click="addwork"> 添加作业</el-button>
      <el-select
        v-model="coursefiller"
        placeholder="请选择"
        @change="coursechange"
        style="margin-left: 20px"
      >
        <el-option
          v-for="item in courseinfo"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span style="margin-left: 20px; font-size: 15px"
        >课程人数：{{ totalcount }} 人
      </span>
    </div>
    <el-table
      :data="tableData.filter((c) => c.course_id.includes(coursefiller))"
      style="width: 100%"
    >
      <el-table-column prop="howk_name" label="作业名称" width="180">
      </el-table-column>
      <el-table-column prop="howk_deadline2" label="截止时间" width="180">
      </el-table-column>
      <el-table-column prop="course_name" label="所属课程" width="180">
      </el-table-column>
      <el-table-column prop="howk_done.length" label="提交情况">
      </el-table-column>
      <el-table-column prop="howk_done.length" label="剩余时间">
        <template slot-scope="scope">
          {{ countdown(scope.row.howk_deadline) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.howk_done.length === 0"
            @click="handleClick(scope.row)"
            type="text"
            size="small"
            >看作业</el-button
          >
          <el-button
            :disabled="!scope.row.howk_feedback.length"
            @click="handleLookFeedback(scope.row)"
            type="text"
            size="small"
            >看反馈</el-button
          >

          <el-button
            :disabled="countdown(scope.row.howk_deadline) === '已过'"
            type="text"
            size="small"
            @click="handleCopy(scope.row)"
            >复制链接</el-button
          >
          <el-button type="text" size="small" @click="open(scope.row)"
            >删除</el-button
          >
          <el-button type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import PureVueChart from 'pure-vue-chart'
export default {
  name: 'howkman',

  components: {
    quillEditor,
    PureVueChart,
  },
  created() {
    this.fetch()
  },
  data() {
    return {
      lookfeedbackshow: false,
      feedbackdate: [],
      rate: 0,
      videosrc: '#',
      nowdex: 1,
      totaldex: 10,
      howk_donelooking: {},
      howk_done: [],
      seeworkshow: false,
      usercount: '',
      copytextarea: '',
      copydialog: false,
      totalcount: '',
      coursefiller: '',
      courseinfo: [],
      types: {
        '.doc,.docx': [
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/msword',
        ],
        '.ppt,.pptx': [
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'application/vnd.ms-powerpoint',
        ],
        '.xls,.xlsx': [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
        ],
        '.jpg,.jpeg': ['image/jpeg'],
        '.rar,.zip': ['application/x-rar-compressed', 'application/zip'],
        '.pdf': ['application/pdf'],
        '.psd': ['image/vnd.adobe.photoshop'],
        '.mp4': ['video/mp4'],
      },
      typeoptions: [
        {
          value: '.doc,.docx',
          label: 'word文档',
        },
        {
          value: '.ppt,.pptx',
          label: 'ppt幻灯片',
        },
        {
          value: '.xls,.xlsx',
          label: 'excel表格',
        },
        {
          value: '.jpg,.jpeg',
          label: '图像',
        },
        {
          value: '.rar,.zip',
          label: '压缩包',
        },
        {
          value: '.pdf',
          label: 'pdf文档',
        },
        {
          value: '.psd',
          label: 'psd工程文件',
        },
        {
          value: '.mp4',
          label: 'mp4视频',
        },
      ],
      sizeoptions: [
        { value: '5', label: '5MB' },
        { value: '10', label: '10MB' },
        { value: '20', label: '20MB' },
        { value: '30', label: '30MB' },
        { value: '50', label: '50MB' },
        { value: '100', label: '100MB' },
        { value: '200', label: '200MB' },
        { value: '500', label: '500MB' },
        { value: '0', label: '无限制' },
      ],
      addform: {},
      centerDialogVisible: false,
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '明天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周后',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
    }
  },
  methods: {
    //处理反馈答案
    getpoints(v, vv) {
      // console.log(v)
      // fd_done_a
      let points = []
      v.forEach((e) => {
        let point = {}
        point.label = e.value
        point.value = 0
        vv.forEach((ee) => {
          if (e.value === ee.fd_done_a) {
            point.value++
          }
        })
        points.push(point)
      })
      // console.log(points)
      let count = 0
      for (let index = 0; index < points.length; index++) {
        const element = points[index]
        if (element.value === 0) count++
        // console.log(count)
        if (count === points.length) points = []
      }

      // console.log(points)
      return points
    },
    //点击查看反馈
    async handleLookFeedback(v) {
      const { howk_feedback } = v
      const res = await this.$http.post('/feedback/getfeedbackbyid', {
        howk_feedback,
      })
      // console.log(res)
      const { fbres, fdonres } = res.data.result
      // console.log(fbres, fdonres)

      const newayy = []
      fbres.forEach((e) => {
        let fbanddone = e
        fbanddone.feedback_anser = []
        fdonres.forEach((ee) => {
          if (e._id === ee.fd_done_fid) {
            fbanddone.feedback_anser.push(ee)
          }
        })
        newayy.push(fbanddone)
      })

      this.feedbackdate = newayy
      this.lookfeedbackshow = true
      // console.log(this.feedbackdate)
    },
    //计算倒计时
    countdown(deadline) {
      // console.log(this.utcdate)
      const stamdate = Date.parse(deadline)
      // console.log(stamdate)
      // console.log(Date.now())
      const lim = stamdate - Date.now()
      let text = ''
      // console.log(lim < 0)
      if (lim < 0) {
        return (text = '已过')
      }

      const a = lim / 1000
      const m = parseInt((a % 3600) / 60)
      const h = parseInt((a % 86400) / 3600)
      const d = parseInt(a / 86400)
      // const d = 4

      text = d + '天' + h + '小时' + m + '分钟'
      if (d <= 1) {
        this.tagtype = 'danger'
      } else if (d <= 2) {
        this.tagtype = 'warning'
      } else {
        this.tagtype = 'success'
      }
      return text
    },
    //作业评分
    async ratechange(r) {
      // console.log(r)
      // console.log(this.howk_donelooking)
      const info = {}
      info.hk_done_score = r
      info._id = this.howk_donelooking._id
      const res = await this.$http.post('/hk_done/rate', info)
      if (!res || !res.data.result) return
      // console.log(res)
      this.$message.success(res.data.message)
      this.fetch()
    },
    //获取作业链接
    async getvideosrc(key) {
      const res = await this.$http.get('/hk_done/download', { params: { key } })
      if (!res || !res.data.result) return
      this.videosrc = res.data.result + ''
      // console.log(this.videosrc)
    },
    //格式化日期
    formatdate(v) {
      return moment(v).format('MM月DD日 HH:mm')
    },
    //跳转作业
    carouselchange(i, _) {
      this.howk_donelooking = this.howk_done[i]
      this.getvideosrc(this.howk_done[i].key)
      this.nowdex = i + 1
      // console.log(this.howk_donelooking)
      console.log(this.howk_donelooking.hk_done_score)
      this.rate = 0
      if (this.howk_donelooking.hk_done_score) {
        this.rate = this.howk_donelooking.hk_done_score
      }
    },
    carnext() {
      // console.log(1111)
      this.$refs.carousel.next()

      // console.log(this.$refs.carousel)
    },
    carprev() {
      this.$refs.carousel.prev()
    },
    //统计课程用户数量
    async getusertotal(val) {
      // const cou = this.courseinfo
      const res = await this.$http.get('/user/')
      if (!res || !res.data.result) return
      let userdata = res.data.result
      let count = 0
      for (let ii = 0; ii < userdata.length; ii++) {
        const e = userdata[ii]
        if (e.user_course._id === val) {
          count++
        }
      }
      this.totalcount = count
    },
    //复制按钮
    handleCopy(row) {
      // console.log(row)
      // console.log(cc)

      // 开发使用
      this.copydialog = true
      // const copylink =
      //   'http://localhost:8080/wkpage/' + row._id + '/' + row.course_id

      // 上线使用
      const copylink =
        window.location.origin + '/wkpage/' + row._id + '/' + row.course_id
      this.copytextarea = copylink
    },
    //删除弹窗
    open(row) {
      this.$confirm('此操作将永久删除该作业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.handleDelete(row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    //课程选择器
    coursechange(v) {
      // console.log(v)
      this.getusertotal(v)
    },
    //删除
    handleDelete(row) {
      // console.log(row)
      // console.log(this.coursefiller)

      this.$http
        .delete('/howk/deletehowk', {
          params: { _id: row._id, course_id: row.course_id },
        })
        .then((res) => {
          // console.log(res)
          if (!res || !res.data.result) {
            return
          }
          this.$message({
            type: 'success',
            message: res.data.message,
          })
          this.fetch()
        })
    },
    //添加作业
    confirmaddform() {
      const q = this.addform.howk_uptypetext
      for (const key in this.types) {
        if (key === q) {
          // console.log(this.types[key])
          this.addform.howk_uptype = this.types[key]
        }
      }
      // console.log(this.addform)
      // const a = this.addform.howk_deadline.toGMTString()
      // console.log(a)
      this.$http.post('/howk/add', this.addform).then((res) => {
        // console.log(res)
        if (!res || !res.data.result) {
          return
        }
        this.$message({
          type: 'success',
          message: res.data.message,
        })
        this.centerDialogVisible = false
        // console.log(this.addform)
        this.fetch()
        this.coursefiller = this.addform.course_id
        this.addform = {}
      })
    },
    //获取作业数据
    fetch() {
      this.$http.get('/course/gethowk').then((res) => {
        // console.log(res)
        let d = res.data.result
        //整理选择器选项
        let nd = []
        d.forEach((element) => {
          let obj = {}
          obj.value = element._id
          obj.label = element.course_name
          nd.push(obj)
        })
        this.courseinfo = nd
        // this.getusertotal()
        //整理表格数据
        // const count = this.totalcount
        // console.log(this.totalcount)

        let newayy = []
        d.forEach((e) => {
          e.course_howk.forEach((ee) => {
            ee.course_id = e._id
            ee.course_name = e.course_name
            ee.howk_deadline2 = moment(ee.howk_deadline).format(
              'MM月DD日 HH:mm'
            )
            newayy.push(ee)
          })
        })
        this.tableData = newayy
        // console.log(this.tableData)
      })
    },
    //点击查看作业
    handleClick(row) {
      this.howk_done = row.howk_done
      this.nowdex = 1
      this.totaldex = row.howk_done.length
      this.howk_donelooking = this.howk_done[0]
      // console.log(this.howk_donelooking.hk_done_score)
      this.rate = 0
      if (this.howk_donelooking.hk_done_score) {
        this.rate = this.howk_donelooking.hk_done_score
      }
      this.getvideosrc(this.howk_done[0].key)
      this.seeworkshow = true
    },
    //点击添加作业按钮
    addwork() {
      this.centerDialogVisible = true
    },
  },
}
</script>

<style scoped>
</style>