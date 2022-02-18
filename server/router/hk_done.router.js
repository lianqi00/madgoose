const Router = require('koa-router')

const router = new Router({ prefix: '/api/hk_done' })

const { islogin } = require('../middleware/auth.middleware')
const { addHkDone, gethkdonebyid, hkrate } = require('../controller/hk_done.controller')
const { getDownLoadUrl } = require('../middleware/qiniu.middleware')


//添加课程
router.post('/add', islogin, addHkDone)

//作业下载
router.get('/download', islogin, getDownLoadUrl)

//根据作业id查找所有提交的作业
router.get('/gethkdonebyid', islogin, gethkdonebyid)

//给作业打分
router.post("/rate", islogin, hkrate)

//


module.exports = router