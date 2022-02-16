

//关于用户的路由/user


const Router = require('koa-router')
const router = new Router({ prefix: '/api/user' })

//引入控制层里写的中间件
const {
    getUserInfo,
    register,
    login,
    modUserInfo,
    changePassWord,
    resetPassWord,
    getFetchInfo, deleteUser, addMany } = require('../controller/user.controller')
//引入其他中间件
const { islogin } = require('../middleware/auth.middleware')
const { pwCrypt } = require('../middleware/user.middleware')
const { qiniuToken } = require('../middleware/qiniu.middleware')



//登录
router.post('/login', login) //不判断是否登录
//获取全部用户信息（只有管理员和老师能用）
router.get('/', islogin, getUserInfo)
//获取用户信息，根据token返回信息
router.get('/fetch', islogin, getFetchInfo)
//获取上传token
router.get('/fetchtoken', islogin, qiniuToken)
//添加用户
router.post('/register', islogin, pwCrypt, register)
//修改指定用户信息（除密码）
router.patch('/moduserinfo', islogin, modUserInfo)
//修改密码
router.patch('/changepassword', islogin, pwCrypt, changePassWord)
//重置密码
router.get('/resetpassword', islogin, resetPassWord)
//删除用户
router.delete('/deluser', islogin, deleteUser)
//上传excel，批量添加用户
router.post('/addmany', islogin, addMany)


module.exports = router

