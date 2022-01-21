
//路由

const Router = require('koa-router')
const router = new Router({ prefix: '/user' })
//引入控制层里写的中间件
const { getAllUserInfo, register, login } = require('../controller/user.controller')
//引入其他中间件

//获取全部用户信息
router.get('/', getAllUserInfo)
//添加用户
router.post('/register', register)
//登录
router.post('/login', login)
//修改用户信息

//删除用户

module.exports = router

