<template>
  <div class="studentman">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="user_number" label="学号" width="100">
      </el-table-column>
      <el-table-column prop="user_name" label="姓名" width="70">
      </el-table-column>
      <el-table-column prop="user_class" label="班级" width="100">
      </el-table-column>
      <el-table-column prop="user_course.course_name" label="所属课程">
      </el-table-column>
      <el-table-column prop="wkdone" label="完成/全部作业"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >修改</el-button
          >
          <el-button type="text" size="small">删除</el-button>
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
  },
  data() {
    return {
      tableData: [],
    }
  },
  methods: {
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
      console.log(row)
    },
  },
}
</script>

<style>
</style>