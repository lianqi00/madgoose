<template>
  <div class="studentman">
    <el-dialog :title="stutitle" :visible.sync="userdialog" width="60%">
      <el-form
        label-position="right"
        label-width="80px"
        :model="studata"
        :rules="rules"
      >
        <el-form-item label="学号" prop="user_number">
          <el-input v-model="studata.user_number"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="user_name">
          <el-input v-model="studata.user_name"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="user_class">
          <el-input v-model="studata.user_class"></el-input>
        </el-form-item>
        <el-form-item label="课程" prop="user_course">
          <el-select v-model="studata.user_course" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userdialog = false">取 消</el-button>
        <el-button type="primary" @click="confrim(studata)">确 定</el-button>
      </span>
    </el-dialog>
    <el-select
      v-model="value"
      placeholder="请选择"
      style="margin-top: 5px; margin-left: 5px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-button type="primary" style="margin-left: 10px" @click="newstu"
      >新建学生</el-button
    >
    <el-upload
      action="http://localhost:3002/api/user/addmany"
      :multiple="false"
      :show-file-list="false"
      accept=".xlsx"
      :on-success="onsuccess"
      :on-error="onerror"
      style="display: inline-block; margin-left: 10px"
    >
      <el-button type="primary">批量导入</el-button>
    </el-upload>
    <el-table
      :data="tableData.filter((c) => c.user_course._id.includes(value))"
      border
      style="width: 100%; margin-top: 10px"
    >
      <el-table-column prop="user_number" label="学号" width="100">
      </el-table-column>
      <el-table-column prop="user_name" label="姓名" width="70">
      </el-table-column>
      <el-table-column prop="user_class" label="班级" width="100">
      </el-table-column>
      <el-table-column prop="user_course.course_name" label="所属课程">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="handleDeleteUser(scope.row)"
            >删除</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="handleResetPassword(scope.row)"
            >重置密码</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'studentman',
  created() {
    this.fetch()
    this.getcourseinfo()
  },
  data() {
    return {
      stutitle: '',
      tableData: [],
      options: [],
      value: '',
      userdialog: false,
      studata: {},
      rules: {
        user_number: [
          { required: true, message: '请输入完整学号', trigger: 'blur' },
          { min: 9, max: 9, message: '长度为9个数字', trigger: 'blur' },
        ],
        user_name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
          },
        ],
        user_class: [
          {
            required: true,
            message: '请输入班级',
            trigger: 'blur',
          },
        ],
        user_course: [
          {
            required: true,
            message: '请选择课程',
            trigger: 'change',
          },
        ],
      },
    }
  },
  methods: {
    onsuccess(res) {
      console.log(res)
      this.$message.success(res.message)
      this.fetch()
    },
    onerror(res) {
      console.log(res)
      this.$message.error(res.message)
    },
    handleDeleteUser(row) {
      this.$confirm(
        '删除用户将会同时删除此用户的所有作业，确认继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          console.log(row.user_course._id)
          this.$http
            .delete('/user/deluser', {
              params: { _id: row._id, courseid: row.user_course._id },
            })
            .then((res) => {
              console.log(res)
              this.$message({
                type: 'success',
                message: res.data.message,
              })
              this.fetch()
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    manystu(file) {
      console.log(file)
    },
    confrim(val) {
      // console.log(val)
      if (!val._id) {
        val.password = val.user_number
        // console.log(val)
        this.$http.post('/user/register', val).then((res) => {
          console.log(res)
          if (!res) return
          this.$message.success(res.data.message)
          this.userdialog = false
          this.fetch()
        })
        return
      }
      console.log(val)
      this.$http.patch('/user/moduserinfo', val).then((res) => {
        console.log(res)
        if (!res) return
        this.$message.success(res.data.message)
        this.userdialog = false
        this.fetch()
      })
    },
    newstu() {
      this.studata = {}
      this.stutitle = '添加学生'
      this.userdialog = true
    },
    getcourseinfo() {
      this.$http.get('/course/gethowk').then((res) => {
        // console.log(res.data.result)
        let makeoption = res.data.result
        let newayy = []
        makeoption.forEach((e) => {
          let obj = {}
          obj.value = e._id
          obj.label = e.course_name
          newayy.push(obj)
        })
        this.options = newayy
        // this.bus.$emit('tostudentman', this.coursedata)
      })
    },
    handleResetPassword(row) {
      console.log(row._id)
      this.$http
        .get('/user/resetpassword', { params: { _id: row._id } })
        .then((res) => {
          if (!res || !res.data.result) {
            return
          }
          this.$message({
            type: 'success',
            message: res.data.message,
          })
        })
    },
    fetch() {
      this.$http.get('/user/').then((res) => {
        console.log(res)
        this.tableData = res.data.result
      })
    },

    handleClick(row) {
      this.stutitle = '修改学生信息'
      this.userdialog = true
      this.studata = row
      console.log(row)
    },
  },
}
</script>

<style>
</style>