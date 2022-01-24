const Router = require('koa-router')

const router = new Router({ prefix: '/howk' })

const { addHowk } = require('../controller/howk.controller')

//添加作业
router.post('/add', addHowk)


module.exports = router