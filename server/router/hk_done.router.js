const Router = require('koa-router')

const router = new Router({ prefix: '/api/hk_done' })

const { islogin, isHighLeve } = require('../middleware/auth.middleware')
const { addHkDone } = require('../controller/hk_done.controller')
const { qiniuToken, getDownLoadUrl } = require('../middleware/qiniu.middleware')


//添加课程
router.post('/add', islogin, addHkDone)

//作业挂靠课程
// router.post('/addhowk', courseAddHowk)

//作业下载
router.get('/download', getDownLoadUrl)


module.exports = router