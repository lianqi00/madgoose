const Router = require('koa-router')

const router = new Router({ prefix: '/api/feedback' })

const { addfeedback, getfeedback, getfeedbackbyhowkid, addfeedbackdone } = require('../controller/feedback.controller')

//添加反馈
router.post('/addfeedback', addfeedback)

//获取全部反馈
router.get('/getfeedback', getfeedback)

//根据作业id获取反馈
router.get('/getfeedbackbyhowkid', getfeedbackbyhowkid)

//添加反馈完成
router.post('/addfeedbackdone', addfeedbackdone)




module.exports = router