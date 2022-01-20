const { APP_PORT } = require('./config/config.default')
const Koa = require("koa")
const userRouter = require('./router/user.routes')
const koaBody = require('koa-body')
const app = new Koa()

app.use(koaBody())
app.use(userRouter.routes())

app.listen(APP_PORT, () => {
  console.log("服务器已启动，地址为：http://localhost:" + APP_PORT);
})
