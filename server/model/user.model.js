const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const User = seq.define('mg_user', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名，不可空，唯一'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '用户密码，不可空'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员，0为不是，1为是。'
    }
})

//强制同步数据库（同步表）
// User.sync({ force: true })

module.exports = User