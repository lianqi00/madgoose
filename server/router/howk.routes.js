const Router = require('koa-router')

const router = new Router({ prefix: '/api/howk' })

const { addHowk, getHowk, getHowkInfo, getAllHowk, deleteHowk } = require('../controller/howk.controller')
const { islogin, isHighLeve } = require('../middleware/auth.middleware')


//添加作业
router.post('/add', addHowk)

//获取个人作业列表
router.get('/', islogin, getHowk)

//获取全部作业
router.get('/all', getAllHowk)

//获取作业信息
router.get('/getHowkInfo', getHowkInfo)

//删除作业
router.delete('/deletehowk', deleteHowk)


module.exports = router