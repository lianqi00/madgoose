const Router = require('koa-router')

const router = new Router({ prefix: '/api/course' })

const { islogin, isHighLeve } = require('../middleware/auth.middleware')

const { addCourse, courseAddHowk, getHowk, deleCourse } = require('../controller/course.controller')

//添加课程
router.post('/add', addCourse)

//作业挂靠课程
router.post('/addhowk', courseAddHowk)

//查询全部课程
router.get('/gethowk', getHowk)

//删除课程
router.delete('/delecourse', deleCourse)


module.exports = router