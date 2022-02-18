<template>
  <div class="showcontent">
    <el-card>
      <el-empty :description="emptyetxt" v-if="!empty"></el-empty>
      <el-descriptions title="作业信息" v-if="empty" border>
        <el-descriptions-item label="作业名称">{{
          this.data.howk_name
        }}</el-descriptions-item>
        <el-descriptions-item label="所属课程">{{
          this.data.coursename
        }}</el-descriptions-item>
        <el-descriptions-item label="提交类型">{{
          this.data.howk_uptypetext
        }}</el-descriptions-item>
        <el-descriptions-item label="大小限制">
          <el-tag size="small">{{ this.data.howk_size + 'MB' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="截止时间">
          <el-tag size="small">{{ this.data.howk_deadline }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="剩余时间"
          ><el-tag size="small" :type="tagtype">{{
            this.countdown(this.data.howk_deadline2)
          }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <!-- <p style="" v-if="empty" v-html="this.data.howk_content"></p> -->
      <div v-if="empty" v-html="this.data.howk_content"></div>
    </el-card>
  </div>
  <!-- this.tnow(this.data.howk_deadline) -->
</template>

<script>
// import MvCountDown from 'mv-count-down'
import moment from 'moment'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'showcontent',
  components: {
    quillEditor,
    // MvCountDown,
  },

  created() {
    this.fetch()
  },
  data() {
    return {
      now: '',
      data: '',
      utcdate: '',
      countdowntext: '',
      empty: false,
      emptyetxt: '',
      tagtype: '',
      lefttime: '',
      watchtest: '',
      // coursename: '',
    }
  },
  methods: {
    fetch() {
      const loading = this.$loading({
        lock: true,
        text: '正在加载...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.5)',
      })
      // console.log(this.$route.params.id)
      let id = this.$route.params.id
      let _id = this.$route.params.cid
      this.$http
        .get('/course/gethowkpublic', { params: { _id, id } })
        .then((res) => {
          if (!res || !res.data.result) {
            this.emptyetxt = '获取作业失败，请检查链接是否正确或完整。'
            this.$emit('isbutshow', false)
            return
          }
          this.data = res.data.result
          // console.log(this.data)
          this.$emit('toUp', this.data)
          this.empty = true
          this.data.howk_deadline2 = this.data.howk_deadline
          this.data.howk_deadline = moment(this.data.howk_deadline).format(
            'MM月DD日 HH:mm'
          )
          // console.log(this.data)
        })
      loading.close()
    },
    countdown(deadline) {
      // console.log(this.utcdate)
      const stamdate = Date.parse(deadline)
      // console.log(stamdate)
      // console.log(Date.now())
      const lim = stamdate - Date.now()
      // console.log(lim < 0)
      if (lim < 0) {
        this.empty = false
        this.emptyetxt = '已过截止时间，无法上传作业！'
        this.$emit('isbutshow', false)
        return
      }

      const a = lim / 1000
      const m = parseInt((a % 3600) / 60)
      const h = parseInt((a % 86400) / 3600)
      const d = parseInt(a / 86400)
      // const d = 4

      const text = d + '天' + h + '小时' + m + '分钟'
      if (d <= 1) {
        this.tagtype = 'danger'
      } else if (d <= 2) {
        this.tagtype = 'warning'
      } else {
        this.tagtype = 'success'
      }
      return text
    },
  },
}
</script>

<style >
.el-card {
  /* min-height: 500px; */
  width: 70%;
  margin: 20px auto;
}
</style>