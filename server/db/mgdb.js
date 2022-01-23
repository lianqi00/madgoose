const mongoose = require('mongoose')

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL + 'madgoose').then(() => {
    console.log('数据库连接成功')
}).catch((err) => {
    console.log('mongo数据库连接失败，======================', err)
})
