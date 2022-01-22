//
//课程的数据库模型
//
//引入数据类型对象和uuid对象
const { DataTypes, UUIDV4 } = require('sequelize')
//引入seq
const seq = require('../db/seq')

const Course = seq.define('mg_course', {
    course_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})
//强制同步数据库（同步表）
// Course.sync({ force: true })

module.exports = Course
