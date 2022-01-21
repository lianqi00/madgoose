
//数据库连接

const Sequelize = require('sequelize')

const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_BD } = process.env

const seq = new Sequelize(MYSQL_BD, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    dialect: 'mysql',
})

seq.authenticate().then(() => {
    console.log('数据库连接成功！')
}).catch((err) => {
    console.log('数据库连接失败' + err)
})

module.exports = seq