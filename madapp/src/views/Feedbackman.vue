<template>
  <div class="feedbackman">
    <el-dialog
      title="提示"
      :visible.sync="addfeedbackshow"
      :before-close="afbsclose"
      width="60%"
      center
    >
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="auto"
        class="demo-dynamic"
      >
        <el-form-item prop="feedback_courseandhowk" label="问题">
          <el-cascader
            v-model="dynamicValidateForm.feedback_courseandhowk"
            :options="chseleteoptions"
          ></el-cascader>
        </el-form-item>
        <el-form-item prop="feedback_q" label="问题">
          <el-input
            v-model="dynamicValidateForm.feedback_q"
            style="width: 60%"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(option, index) in dynamicValidateForm.feedback_option"
          :label="'选项' + (index + 1)"
          :key="option.key"
          :prop="'feedback_option.' + index + '.value'"
        >
          <el-input v-model="option.value" style="width: 60%"></el-input
          ><el-button
            style="display: iner"
            @click.prevent="removeDomain(option)"
            >删除</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')"
            >提交</el-button
          >
          <el-button @click="addDomain">新增选项</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div style="margin-left: 20px; margin-top: 20px">
      <el-button type="primary" @click="addfeedbackdialog">添加反馈</el-button>
      <el-cascader
        style="margin-left: 10px"
        v-model="coursehowkselete"
        :options="chseleteoptions"
      ></el-cascader>
    </div>
    <!-- :data="feedbacktable.filter((c) => c._id.includes(coursehowkselete[1]))" -->

    <el-table
      :data="
        feedbacktable.filter((c) => c.howk_id.includes(coursehowkselete[1]))
      "
      style="width: 100%"
    >
      <el-table-column prop="course_name" label="课程名称" width="180">
      </el-table-column>
      <el-table-column prop="howk_name" label="作业名称" width="180">
      </el-table-column>
      <el-table-column prop="feedback_q" label="问题"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'feedbackman',
  created() {
    this.fetch()
    this.getfeedback()
  },
  data() {
    return {
      feedbacktable: [],
      coursehowkselete: ['', ''],
      chseleteoptions: [],
      dynamicValidateForm: {
        feedback_option: [],
        feedback_q: '',
      },
      addfeedbackshow: false,
    }
  },
  methods: {
    handleClick(val) {
      // console.log(val)
    },
    getfeedback() {
      this.$http.get('/feedback/getfeedback').then((res) => {
        // console.log(res)
        //   feedbacktable
        const arr = res.data.result
        const newarr = []

        for (let i = 0; i < arr.length; i++) {
          const e = arr[i]
          const obj = {}
          obj.course_name = e.course_name
          for (let i = 0; i < e.course_howk.length; i++) {
            const ee = e.course_howk[i]
            const obj2 = {}
            obj2.howk_name = e.course_howk[i].howk_name
            obj2.howk_id = e.course_howk[i]._id
            const obj3 = Object.assign(obj, obj2)
            for (let i = 0; i < ee.howk_feedback.length; i++) {
              const eee = ee.howk_feedback[i]
              const obj4 = {}
              obj4.feedback_q = eee.feedback_q
              obj4._id = eee._id
              const obj5 = Object.assign(obj4, obj3)
              newarr.push(obj5)
              //   console.log(obj5)
            }
          }
        }
        this.feedbacktable = newarr
        // console.log(this.feedbacktable)
      })
    },
    fetch() {
      this.$http.get('/course/gethowk').then((res) => {
        // console.log(res)
        let arr = res.data.result
        let newarr = []
        arr.forEach((e) => {
          //   console.log(e)
          let obj = {}
          let children = []
          obj.value = e._id
          obj.label = e.course_name
          e.course_howk.forEach((ee) => {
            let obj2 = {}
            obj2.value = ee._id
            obj2.label = ee.howk_name
            children.push(obj2)
          })
          obj.children = children
          newarr.push(obj)
        })
        // console.log(newarr)
        this.chseleteoptions = newarr
      })
    },
    submitForm() {
      // console.log(this.dynamicValidateForm)
      const { feedback_q, feedback_option } = this.dynamicValidateForm
      if (!feedback_q || !feedback_option) {
        this.$message.warning('问题和选项不能为空')
        return
      }
      this.$http
        .post('/feedback/addfeedback', this.dynamicValidateForm)
        .then((res) => {
          // console.log(res)
          if (!res || !res.data.result) return
          this.$message.success(res.data.message)
          this.addfeedbackshow = false
        })
      this.dynamicValidateForm = {
        feedback_option: [],
        feedback_q: '',
      }
      this.getfeedback()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dynamicValidateForm = {
        feedback_option: [],
        feedback_q: '',
      }
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.feedback_option.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.feedback_option.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.feedback_option.push({
        value: '',
        key: Date.now(),
      })
    },
    addfeedbackdialog() {
      this.fetch()
      this.addfeedbackshow = true
    },
    afbsclose() {
      // console.log(11111)
      this.addfeedbackshow = false
      //   this.resetForm('dynamicValidateForm')
      this.dynamicValidateForm = {
        feedback_option: [],
        feedback_q: '',
      }
    },
  },
}
</script>

<style>
</style>