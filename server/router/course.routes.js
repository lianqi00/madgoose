const Router = require('koa-router')

const router = new Router({ prefix: '/api/course' })

const { islogin } = require('../middleware/auth.middleware')

const { addCourse, courseAddHowk, getHowk, deleCourse, gethowkpublic } = require('../controller/course.controller')



//查询全部课程
router.get('/gethowk', islogin, getHowk)
//公开查询课程
router.get('/gethowkpublic', gethowkpublic)//不判断是否登录

//添加课程
router.post('/add', islogin, addCourse)

//作业挂靠课程
router.post('/addhowk', islogin, courseAddHowk)

//删除课程
router.delete('/delecourse', islogin, deleCourse)


module.exports = router