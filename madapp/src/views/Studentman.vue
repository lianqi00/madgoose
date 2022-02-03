<template>
  <div class="studentman">
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
    <el-button type="primary" style="margin-left: 10px">新建学生</el-button>
    <el-button type="primary">批量导入</el-button>
    <el-table :data="tableData" border style="width: 100%; margin-top: 10px">
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
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value: '',
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