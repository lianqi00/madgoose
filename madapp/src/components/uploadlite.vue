<template>
  <div class="uploadlite">
    <el-card align="center">
      <el-result
        v-if="resultshow"
        :icon="resultip.icon"
        :title="resultip.title"
        :subTitle="resultip.subTitle"
      >
        <template slot="extra">
          <el-button
            @click="resbtn(resultip.or)"
            type="primary"
            size="medium"
            >{{ resultip.btntext }}</el-button
          >
        </template>
      </el-result>
      <div v-if="!resultshow">
        <el-descriptions title="上传信息">
          <el-descriptions-item label="姓名">{{
            userdata.user_name
          }}</el-descriptions-item>
          <el-descriptions-item label="学号">{{
            userdata.user_number
          }}</el-descriptions-item>
          <el-descriptions-item label="课程">{{
            touUpdata.coursename
          }}</el-descriptions-item>
          <el-descriptions-item label="作业">
            <el-tag size="small">{{ touUpdata.howk_name }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="文件类型限制">{{
            touUpdata.howk_uptypetext
          }}</el-descriptions-item>
          <el-descriptions-item label="文件大小限制">{{
            touUpdata.howk_size + 'MB'
          }}</el-descriptions-item>
        </el-descriptions>
        <div style="width: 300px">
          <el-upload
            action="#"
            ref="upload"
            :http-request="upqiniu"
            :before-upload="beforeUpload"
            :limit="1"
            :accept="touUpdata.howk_uptypetext"
            :on-exceed="handleExceed"
            :auto-upload="true"
            style="margin-top: 20px"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <!-- <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          > -->
            <div slot="tip" class="el-upload__tip">
              只能上传{{ touUpdata.howk_uptypetext }}，且不超过{{
                touUpdata.howk_size
              }}MB
              <!-- {{ touUpdata.howk_uptype.toString() }} -->
            </div>
          </el-upload>
        </div>
        <div style="margin-top: 20px; width: 300px">
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="percentage"
          ></el-progress>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js'
export default {
  name: 'uploadlite',
  props: ['touUpdata'],
  created() {
    // this.bus.$on('toUpLoad', (d) => {
    //   console.log('@@@@@@@@@' + d)
    // })
    this.fetch()
    // console.log(this.touUpdata)
    this.getuploadtoken()
  },
  data() {
    return {
      resultshow: false,
      resultip: {
        icon: 'error',
        title: '错误提示',
        subTitle: '请根据提示进行操作',
        btntext: '登录',
        or: '',
      },
      fileList: [],
      userdata: {},
      uploadtoken: '',
      filenamest: '',
      percentage: 0,
    }
  },
  methods: {
    resbtn(v) {
      // console.log(v)
      this.$emit('upLoadtoWkpage', v)
    },
    upqiniu(e) {
      var file = e.file //Blob 对象，上传的文件
      // console.log(file.name.replace(/.+\./, '.'))

      let config = {
        useCdnDomain: true, //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
        region: null, // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
      }

      let putExtra = {
        fname: file.name, //文件原文件名
        params: {}, //用来放置自定义变量
        mimeType: null, //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
      }

      const key = this.filenamest + file.name.replace(/.+\./, '.')

      // const token = this.getuploadtoken()
      // console.log(key)
      var observable = qiniu.upload(
        file,
        key,
        this.uploadtoken,
        putExtra,
        config
      )
      observable.subscribe({
        next: (result) => {
          // 主要用来展示进度
          // console.log(parseInt(result.total.percent))
          this.percentage = parseInt(result.total.percent)
        },
        error: (errResult) => {
          // 失败报错信息
          console.log(errResult)
          // this.$message.error(errResult.data.error)
        },
        complete: (result) => {
          // 接收成功后返回的信息
          // console.log(result)
          let d = result
          // console.log(this.touUpdata._id)
          d.hk_done_wk = this.touUpdata._id
          d.hk_done_sid = this.userdata._id
          // console.log(d)
          this.$http.post('/hk_done/add', d).then((res) => {
            // console.log(res)
            if (!res || !res.data.result) return
            this.resultshow = true
            this.resultip = {
              icon: 'success',
              title: '上传完成',
              subTitle: '点击下方按钮填写反馈',
              btntext: '反馈',
              or: res.data,
            }
            const course = this.touUpdata
            if (course.howk_done) {
              this.resultip.btntext = '关闭'
              this.resultip.subTitle = '点击下方按钮关闭弹窗'
            }
            this.$message.success(res.data.message)
          })
        },
      })
    },
    fetch() {
      this.$http.get('/user/fetch').then((res) => {
        // console.log(res)
        this.userdata = res.data.result
        // console.log(this.userdata)
        // console.log(this.touUpdata)
        const stri =
          this.touUpdata.coursename +
          '/' +
          this.touUpdata.howk_name +
          '/' +
          this.userdata.user_number +
          this.userdata.user_name
        this.filenamest = stri
        // console.log(this.filenamest)
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    // handleChange(e) {
    //   console.log(e)
    // },
    beforeUpload(e) {
      // console.log(e)
      const typepk = e.type === this.touUpdata.howk_uptype[0]
      // console.log(e.type, this.touUpdata.howk_uptype[0])
      const sizepk = e.size <= this.touUpdata.howk_size * 1024 * 1024
      // console.log(sizepk, e.size, this.touUpdata.howk_size * 1024 * 1024)
      if (!typepk) {
        this.$message.error(
          '上传失败！所选上传文件不是' +
            this.touUpdata.howk_uptypetext +
            '格式的！'
        )
        return false
      } else if (!sizepk) {
        this.$message.error(
          '上传失败！所选上传文件大小超过' + this.touUpdata.howk_size + 'MB了'
        )
        return false
      }
      // return false
    },
    async getuploadtoken() {
      const course = this.touUpdata
      if (course.howk_done) {
        // console.log('存在，需要重传')
        const res = await this.$http.get('/user/getOverWriteToken', {
          params: { key: course.howk_done.key },
        })
        this.uploadtoken = res.data.result
      } else {
        const res = await this.$http.get('/user/fetchtoken')
        this.uploadtoken = res.data.result
      }
      // console.log(this.uploadtoken)
    },
    handleExceed(files, fileList) {
      this.$message.warning('只能上传1个文件')
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
  },
}
</script>

<style>
</style>