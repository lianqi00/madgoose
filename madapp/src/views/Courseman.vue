<template>
  <div class="courseman">
    <el-table :data="coursedata">
      <el-table-column label="课程名称" prop="course_name"></el-table-column>
      <el-table-column
        label="发布数量"
        prop="course_howk.length"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <span>添加课程</span>
    <el-form :model="formdata">
      <el-form-item label="课程名称">
        <el-input v-model="formdata.course_name"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="submit">提交</el-button>
  </div>
</template>

<script>
export default {
  name: 'courseman',
  created() {
    this.fetch()
  },
  data() {
    return {
      formdata: {
        course_name: '',
      },
      coursedata: [],
    }
  },

  methods: {
    fetch() {
      this.$http.get('/course/gethowk').then((res) => {
        // console.log(res)
        this.coursedata = res.data.result
        // this.bus.$emit('tostudentman', this.coursedata)
      })
    },
    submit() {
      // console.log(this.formdata)
      this.$http.post('/course/add', this.formdata).then((res) => {
        // console.log(res)
        this.$message({
          type: 'success',
          message: res.data.message,
        })
        this.formdata = {}
        this.fetch()
      })
    },
    handleClick(row) {
      // console.log(row)
      this.$http
        .delete('/course/delecourse', {
          params: {
            _id: row._id,
          },
        })
        .then((res) => {
          // console.log(res)
          this.$message({
            type: 'success',
            message: res.data.message,
          })
          this.fetch()
        })
    },
  },
}
</script>

<style>
</style>