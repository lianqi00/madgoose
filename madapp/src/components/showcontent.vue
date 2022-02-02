<template>
  <div class="showcontent">
    <el-card>
      <el-empty :description="emptyetxt" v-if="!empty"></el-empty>
      <el-descriptions title="作业信息" v-if="empty">
        <el-descriptions-item label="作业名称">{{
          this.data.howk_name
        }}</el-descriptions-item>
        <el-descriptions-item label="所属课程"
          >18100000000</el-descriptions-item
        >
        <el-descriptions-item label="提交类型">{{
          this.data.howk_uptype
        }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">
          <el-tag size="small">{{ this.data.createdAt }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="截止时间">
          <el-tag size="small">{{ this.data.howk_deadline }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="剩余时间">{{
          this.countdowntext
        }}</el-descriptions-item>
      </el-descriptions>
      <!-- <p style="" v-if="empty" v-html="this.data.howk_content"></p> -->
      <div v-html="this.data.howk_content"></div>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'showcontent',
  components: {
    quillEditor,
  },
  created() {
    this.fetch()
  },
  data() {
    return {
      data: '',
      countdowntext: '',
      empty: false,
      emptyetxt: '',
    }
  },
  methods: {
    fetch() {
      // console.log(this.$route.params.id)
      let _id = this.$route.params.id
      this.$http.get('/howk/getHowkInfo', { params: { _id } }).then((res) => {
        // console.log(res)
        // console.log(!res)
        // console.log(res)

        if (!res || !res.data.result) {
          this.emptyetxt = '获取作业失败，请检查链接是否正确或完整。'
          this.$emit('isbutshow', false)
          return
        }
        this.empty = true
        this.countdowntext = this.countdown(res.data.result.howk_deadline)
        this.data = res.data.result || ''
        this.data.createdAt = moment(this.data.createdAt).format(
          'MM月DD日 HH:mm'
        )
        this.data.howk_deadline = moment(this.data.howk_deadline).format(
          'MM月DD日 HH:mm'
        )
      })
    },
    countdown(dd) {
      console.log(dd)
      let newdate = Date.parse(dd)
      console.log(newdate)
      console.log(Date.now())
      // setInterval()
      return moment(newdate - Date.now()).format('DD天HH小时mm分钟ss秒')
    },
  },
}
</script>

<style>
.el-card {
  min-height: 300px;
  width: 90%;
  margin: 20px auto;
}
</style>