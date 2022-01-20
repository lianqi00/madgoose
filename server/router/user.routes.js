const Router = require('koa-router')
const router = new Router({ prefix: '/user' })
const { getUserInfo, register } = require('../controller/user.controller')

router.get('/', getUserInfo)
router.post('/register', register)

module.exports = router

