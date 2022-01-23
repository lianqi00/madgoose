

//关于用户的路由/user


const Router = require('koa-router')
const router = new Router({ prefix: '/user' })

//引入控制层里写的中间件
const { getAllUserInfo, register, login, modUserInfo, changePassWord } = require('../controller/user.controller')
//引入其他中间件
const { islogin, isHighLeve } = require('../middleware/auth.middleware')
const { pwCrypt } = require('../middleware/user.middleware')

//获取全部用户信息（只有管理员和老师能用）
router.get('/', getAllUserInfo)
//获取指定用户信息

//添加用户
router.post('/register', pwCrypt, register)
//登录
router.post('/login', login)
//修改指定用户信息（除密码）
router.patch('/moduserinfo', isHighLeve, modUserInfo)
//修改密码
router.patch('/changepassword', pwCrypt, changePassWord)
//重置密码

//删除用户

module.exports = router

