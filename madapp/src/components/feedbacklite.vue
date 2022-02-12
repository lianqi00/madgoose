<template>
  <div class="feedbacklite">
    <el-card>
      <!-- <div>
       
        <p>1、对于景别的掌握程度。</p>
        <el-radio-group v-model="radio">
          <el-radio :label="1">1分</el-radio>
          <el-radio :label="2">2分</el-radio>
          <el-radio :label="3">3分</el-radio>
        </el-radio-group>
        <p>1、对于景别的掌握程度。</p>
        <el-radio-group v-model="radio">
          <el-radio :label="1">1分</el-radio>
          <el-radio :label="2">2分</el-radio>
          <el-radio :label="3">3分</el-radio>
        </el-radio-group>
      </div> -->
      <div style="width: 500px; margin: 0 auto">
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
      feedbackdata: [],
    }
  },
  methods: {
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
      this.$http.post('/feedback/addfeedbackdone', newarr).then((res) => {
        console.log(res)
        if (!res || !res.data.result) return
        this.$message.success(res.data.message)
        this.$emit('fdbktowkpage', res.data.result)
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