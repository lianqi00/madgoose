const Router = require('koa-router')

const router = new Router({ prefix: '/course' })

const { addCourse, courseAddHowk } = require('../controller/course.controller')

//添加课程
router.post('/add', addCourse)

//作业挂靠课程
router.post('/addhowk', courseAddHowk)


module.exports = router