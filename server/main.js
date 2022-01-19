const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
    ctx.body = 'hello word111111'
})

app.use((ctx, next) => {

})

app.listen(3000, () => {
    console.log('服务器已启动，地址为：http://localhost:3000')
})