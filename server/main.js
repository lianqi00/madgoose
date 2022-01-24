
//入口文件

//引入环境变量中的端口
const { APP_PORT } = require('./config/config.default')
//引入一些库
const Koa = require("koa")
const koaBody = require('koa-body')
//引入一些路由
const userRouter = require('./router/user.routes')
const courseRouter = require('./router/course.routes')
const howkRouter = require('./router/howk.routes')
//实例化app
const app = new Koa()
//连接数据库
require('./db/mgdb')

//注册一些中间件
app.use(koaBody())
app.use(userRouter.routes())
app.use(courseRouter.routes())
app.use(howkRouter.routes())

//监听服务器
app.listen(APP_PORT, () => {
  console.log("服务器已启动，地址为：http://localhost:" + APP_PORT);
})
