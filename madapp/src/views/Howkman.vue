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
          <el-select
            v-model="addform.howk_uptype"
            multiple
            placeholder="请选择"
          >
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

    <div class="butayy" style="margin: 10px">
      <el-button round @click="addwork"> 添加作业</el-button>
      <el-select
        v-model="coursefiller"
        placeholder="请选择"
        @change="coursechange()"
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
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="howk_name" label="作业名称" width="180">
      </el-table-column>
      <el-table-column prop="howk_deadline" label="截止时间" width="180">
      </el-table-column>
      <el-table-column prop="howk_done" label="提交情况"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >看作业</el-button
          >
          <el-button type="text" size="small">看反馈</el-button>
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
export default {
  name: 'howkman',
  components: {
    quillEditor,
  },
  created() {
    this.fetch()
  },
  data() {
    return {
      tempdata: [],
      coursefiller: '',
      courseinfo: [],
      typeoptions: [
        {
          value: 'word文档',
          label: 'word文档',
        },
        {
          value: 'ppt幻灯片',
          label: 'ppt幻灯片',
        },
        {
          value: 'excel表格',
          label: 'excel表格',
        },
        {
          value: '图像',
          label: '图像',
        },
        {
          value: '压缩包',
          label: '压缩包',
        },
        {
          value: 'pdf文档',
          label: 'pdf文档',
        },
        {
          value: 'psd工程文件',
          label: 'psd工程文件',
        },
        {
          value: 'mp4视频',
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
    open(row) {
      this.$confirm('此操作将永久删除该作业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.handleDelete(row)
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!',
          // })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    coursechange() {
      // console.log(this.coursefiller)
      const d = this.tempdata
      d.forEach((e) => {
        if (e._id === this.coursefiller) {
          this.tableData = e.course_howk
          // console.log(e)
        }
      })

      for (let i = 0; i < this.tableData.length; i++) {
        const element = this.tableData[i]
        // console.log(element.howk_deadline)
        if (element.howk_deadline.indexOf('T') != -1) {
          element.howk_deadline = moment(element.howk_deadline).format(
            'MM月DD日 HH:mm'
          )
        }
      }
    },
    handleDelete(row) {
      console.log(row._id)
      console.log(this.coursefiller)
      this.$http
        .delete('/howk/deletehowk', {
          params: { _id: row._id, course_id: this.coursefiller },
        })
        .then((res) => {
          console.log(res)
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
    confirmaddform() {
      console.log(this.addform)
      //   const a = this.addform.howk_deadline.toGMTString()
      //   console.log(a)
      this.$http.post('/howk/add', this.addform).then((res) => {
        console.log(res)
        if (!res || !res.data.result) {
          return
        }
        this.$message({
          type: 'success',
          message: res.data.message,
        })
        this.centerDialogVisible = false
        // console.log(this.addform)
        this.coursefiller = this.addform.course_id
        this.fetch()
      })
    },
    fetch() {
      // this.$http.get('/howk/all').then((res) => {
      //   console.log(res)
      //   this.tableData = res.data.result
      //   for (let i = 0; i < this.tableData.length; i++) {
      //     const element = this.tableData[i]
      //     element.howk_deadline = moment(element.howk_deadline).format(
      //       'MM月DD日 HH:mm'
      //     )
      //   }
      // })
      this.$http.get('/course/gethowk').then((res) => {
        console.log(res)
        this.tempdata = res.data.result
        this.coursechange()
        let d = res.data.result
        let nd = []
        d.forEach((element) => {
          let obj = {}
          obj.value = element._id
          obj.label = element.course_name
          nd.push(obj)
          //   console.log(element)
        })
        // console.log(nd)
        this.courseinfo = nd
      })
    },
    handleClick(row) {
      console.log(row)
    },
    addwork() {
      this.centerDialogVisible = true
    },
  },
}
</script>

<style>
</style>