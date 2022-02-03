<template>
  <div class="student">
    <el-container>
      <el-header>
        <span style="font-size: 20px">大鹅作业上传反馈工具</span>
        <el-dropdown
          @command="handleCommand"
          style="right: 10px; position: absolute"
        >
          <span class="el-dropdown-link">
            刘永强<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">修改密码</el-dropdown-item>
            <el-dropdown-item command="b">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-container>
          <el-main style="padding: 0px">
            <el-table
              :data="
                tableData.filter(
                  (data) =>
                    !search ||
                    data.howk_name.toLowerCase().includes(search.toLowerCase())
                )
              "
              style="width: 100%"
            >
              <el-table-column label="作业名称" prop="howk_name">
              </el-table-column>
              <el-table-column label="创建时间" prop="createdAt">
              </el-table-column>
              <el-table-column label="截止时间" prop="howk_deadline">
              </el-table-column>
              <el-table-column label="是否完成" prop="howk_done">
              </el-table-column>
              <el-table-column label="分数" prop=""> </el-table-column>
              <el-table-column align="right" min-width="150">
                <template #header>
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入作业名称关键字搜索"
                  />
                </template>
                <template #default="scope">
                  <el-button
                    size="mini"
                    @click="handleLook(scope.$index, scope.row)"
                  >
                    查看
                  </el-button>
                  <el-button
                    size="mini"
                    @click="handleFeedback(scope.$index, scope.row)"
                  >
                    反馈
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleUpload(scope.$index, scope.row)"
                  >
                    上传
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer>
            <span style="font-size: 10px"
              >Copyright © 2022 lianqi All Rights Reserved. 连亓 版权所有</span
            >
            <span style="font-size: 10px"> ｜备案号：xxxxxxxxxx</span>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'student',
  components: {},
  data() {
    return {
      hkcontent: '',
      dialogVisible: true,
      tableData: [],
      search: '',
    }
  },
  created() {
    // console.log(this)
    this.$http
      .get('/howk/')
      .then((res) => {
        // console.log(res.data.result)
        let result = res.data.result
        for (let i = 0; i < result.length; i++) {
          const element = result[i]
          element.createdAt = moment(element.createdAt).format('MM月DD日 HH:mm')
          element.howk_deadline = moment(element.howk_deadline).format(
            'MM月DD日 HH:mm'
          )
          // console.log(element.howk_done)
          element.howk_done = element.howk_done.length === 0 ? '未完成' : '完成'
        }
        this.tableData = result
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    handleLook(index, row) {
      console.log(index, row)
      this.hkcontent = row.howk_content
      this.dialogVisible = true
    },
    handleUpload(index, row) {
      console.log(index, row)
    },
    handleCommand(command) {
      this.$message('click on item ' + command)
    },
    handleFeedback(index, row) {
      console.log(index, row)
    },
  },
}
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  line-height: 60px;
}
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
  /* height: 60px; */
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
}

.el-main {
  /* background-color: #e9eef3; */
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}
/* 
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
</style>
