<template>
  <div class="feedbacklite">
    <el-card>
      <el-result
        v-if="resultshow"
        :icon="resultip.icon"
        :title="resultip.title"
        :subTitle="resultip.subTitle"
      >
        <template slot="extra">
          <el-button
            @click="gotostudent(resultip.userid)"
            type="primary"
            size="medium"
            >{{ resultip.btntext }}</el-button
          >
        </template>
      </el-result>
      <div v-if="!resultshow" style="width: 500px; margin: 0 auto">
        <ol>
          <li v-for="(fdbkrow, i) in feedbackdata">
            <p>{{ fdbkrow.feedback_q }}</p>
            <el-radio-group v-model="fdbkrow.feedback_a">
              <el-radio
                v-for="item in fdbkrow.feedback_option"
                :key="item.key"
                :label="item.value"
              >
                {{ item.value }}
              </el-radio>
            </el-radio-group>
            <el-input
              v-if="!fdbkrow.feedback_option.length"
              v-model="fdbkrow.feedback_a"
              type="textarea"
            ></el-input>
          </li>
        </ol>

        <el-button type="primary" plain @click="submitfeedback">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'feedbacklite',
  props: ['tofeedbackdata'],
  created() {
    this.getfeedback()
  },
  data() {
    return {
      resultshow: false,
      resultip: {
        icon: 'error',
        title: '错误提示',
        subTitle: '请根据提示进行操作',
        btntext: '登录',
        userid: '',
      },
      feedbackdata: [],
    }
  },
  methods: {
    gotostudent(v) {
      this.$emit('fdbktowkpage', v)
    },
    submitfeedback() {
      // console.log(this.feedbackdata)
      // console.log(this.tofeedbackdata)
      const fd_done_sid = this.tofeedbackdata._id
      const newarr = []
      this.feedbackdata.forEach((e) => {
        const obj = {}
        obj.fd_done_sid = fd_done_sid
        obj.fd_done_fid = e._id
        obj.fd_done_a = e.feedback_a
        newarr.push(obj)
      })
      console.log(newarr)
      for (let i = 0; i < newarr.length; i++) {
        const e = newarr[i]
        if (!e.fd_done_a) {
          this.$message.error('答案不能为空')
          return
        }
      }
      // return
      this.$http.post('/feedback/addfeedbackdone', newarr).then((res) => {
        console.log(res)
        if (!res || !res.data.result) return
        this.$message.success(res.data.message)
        this.resultshow = true
        this.resultip = {
          icon: 'success',
          title: '提交完成',
          subTitle: '点击下方按钮进入后台查看所有作业',
          btntext: '登录',
          userid: res.data.result,
        }
      })
    },
    getfeedback() {
      const id = this.$route.params.id
      // console.log(id)
      this.$http
        .get('/feedback/getfeedbackbyhowkid', { params: { _id: id } })
        .then((res) => {
          this.feedbackdata = res.data.result
          console.log(this.feedbackdata)
        })
    },
  },
}
</script>

<style>
</style>