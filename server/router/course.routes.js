const Router = require('koa-router')

const router = new Router({ prefix: '/course' })

const { addCourse } = require('../controller/course.controller')

//添加课程
router.post('/add', addCourse)


module.exports = router