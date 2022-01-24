const mongoose = require('mongoose')

const { MONGODB_URL } = process.env

// console.log(MONGODB_URL);
mongoose.connect(MONGODB_URL + 'madgoose')
    .then(() => {
        console.log('数据库连接成功')
    }).catch((err) => {
        console.log('mongo数据库连接失败，======================', err)
    })

