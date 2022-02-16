const Router = require('koa-router')

const router = new Router({ prefix: '/api/feedback' })

const {
    addfeedback,
    getfeedback,
    getfeedbackbyhowkid,
    addfeedbackdone,
    getfeedbackbyid
} = require('../controller/feedback.controller')
const { islogin } = require('../middleware/auth.middleware')


//添加反馈
router.post('/addfeedback', islogin, addfeedback)

//获取全部反馈
router.get('/getfeedback', islogin, getfeedback)

//根据作业id获取反馈
router.get('/getfeedbackbyhowkid', islogin, getfeedbackbyhowkid)

//添加反馈完成
router.post('/addfeedbackdone', islogin, addfeedbackdone)

//根据反馈id获取反馈,并携带所有答案
router.post('/getfeedbackbyid', islogin, getfeedbackbyid)




module.exports = router