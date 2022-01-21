
//用户表的数据库模型

//引入数据类型对象和uuid对象
const { DataTypes, UUIDV4 } = require('sequelize')
//引入seq
const seq = require('../db/seq')


//user表
const User = seq.define('mg_user', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    user_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '学号，不可空，唯一'
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户名，不可空'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户密码，不可空'
    },
    user_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '0为学生，1为老师，2为学生。'
    },
    user_class: {
        type: DataTypes.STRING,
        comment: '用户班级'
    },
    user_course: {
        type: DataTypes.STRING,
        comment: '用户课程'
    }
})

//强制同步数据库（同步表）
// User.sync({ force: true })

module.exports = User