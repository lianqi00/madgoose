
//入口文件

//引入环境变量中的端口
const { APP_PORT } = require('./config/config.default')
//引入一些库
const Koa = require("koa")
const https = require('https')
const http = require('http')
const fs = require('fs')
const sslify = require('koa-sslify').default
const koaBody = require('koa-body')
const cors = require('koa2-cors');
const static = require('koa-static');
const { historyApiFallback } = require('koa2-connect-history-api-fallback');



//引入一些路由
const router = require('./router')
const path = require('path/posix')

//实例化app
const app = new Koa()

app.use(sslify())

//连接数据库
require('./db/mgdb')
//跨域
// app.use(cors());

//注册一些中间件
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, './upload'),
    keepExtensions: true
  }
}))
app.use(router.routes())
app.use(router.allowedMethods())



//使用historyapi
app.use(historyApiFallback({ whiteList: ['/api'] }))
//设置web服务器目录
app.use(static(path.join(__dirname, '../madapp/dist')));




// SSL options
var options = {
  key: fs.readFileSync(path.join(__dirname, './myssl/laogoose.com.key')),  //ssl文件路径 
  cert: fs.readFileSync(path.join(__dirname, './myssl/laogoose.com.crt'))  //ssl文件路径
}


//监听服务器
https.createServer(options, app.callback()).listen(APP_PORT, () => {
  console.log("服务器已启动,端口号为:" + APP_PORT)
});
// app.listen(APP_PORT, () => {
//   console.log("服务器已启动，地址为：https://localhost:" + APP_PORT);
// })
http.createServer((req, res) => {
  res.writeHead(301, { 'Location': 'https://laogoose.com' })
  res.end()
}).listen(80)
