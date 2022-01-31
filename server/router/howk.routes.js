const Router = require('koa-router')

const router = new Router({ prefix: '/api/howk' })

const { addHowk, getHowk } = require('../controller/howk.controller')
const { islogin, isHighLeve } = require('../middleware/auth.middleware')


//添加作业
router.post('/add', addHowk)

//获取作业
router.get('/', islogin, getHowk)


module.exports = router