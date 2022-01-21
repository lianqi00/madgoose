

//关于用户的路由/user


const Router = require('koa-router')
const router = new Router({ prefix: '/user' })

//引入控制层里写的中间件
const { getAllUserInfo, register, login } = require('../controller/user.controller')
//引入其他中间件
const { islogin, isHighLeve } = require('../middleware/auth.middleware')

//获取全部用户信息（只有管理员和老师能用）
router.get('/', islogin, isHighLeve, getAllUserInfo)
//获取指定用户信息

//添加用户
router.post('/register', register)
//登录
router.post('/login', login)
//修改用户信息
router.put('/')
//修改密码

//删除用户

module.exports = router

