



const Feedback = require('../model/feefback.model')
const Howk = require('../model/howk.model')
const Course = require('../model/course.model')
const Fd_done = require('../model/fd_done.model')

class FeedbackController {
    //添加反馈
    async addfeedback(ctx, next) {
        // console.log(ctx.request.body);
        const { feedback_courseandhowk, ...res } = ctx.request.body
        // console.log(feedback_courseandhowk);
        const result = await Feedback.create(res)
        console.log(result);
        if (!result) {
            ctx.status = 500
            ctx.body = {
                code: 0,
                message: '添加反馈失败',
                result: ''
            }
            return
        }
        const { _id } = result
        const howkres = await Howk
            .findByIdAndUpdate({ _id: feedback_courseandhowk[1] }, { $addToSet: { howk_feedback: _id } }, { lean: true, new: true })
        ctx.body = {
            code: 0,
            message: '添加反馈成功',
            result: howkres
        }
    }
    //获取反馈
    async getfeedback(ctx, next) {
        const result = await Course
            .find({})
            .populate({
                path: 'course_howk',
                populate: {
                    path: 'howk_feedback'
                }
            })
        console.log(result);
        ctx.body = {
            code: 0,
            message: '获取反馈成功',
            result
        }
    }
    //根据作业id获取反馈
    async getfeedbackbyhowkid(ctx, next) {
        console.log(ctx.query);
        const { _id } = ctx.query
        const result = await Howk.findById({ _id }).populate({ path: 'howk_feedback' })
        console.log(result.howk_feedback);
        ctx.body = {
            code: 0,
            message: '获取反馈成功',
            result: result.howk_feedback
        }
    }
    //添加反馈完成
    async addfeedbackdone(ctx, next) {
        // console.log(ctx.request.body);
        const many = ctx.request.body
        const result = await Fd_done.insertMany(many)
        // console.log(result);
        ctx.body = {
            code: 0,
            message: '添加反馈完成成功',
            result
        }
    }
    //根据反馈id获取反馈并携带所有答案
    async getfeedbackbyid(ctx, next) {
        // console.log(ctx.query);
        const { howk_feedback } = ctx.request.body
        // console.log(howk_feedback);
        // console.log(h);
        const fbres = await Feedback.find({ _id: { $in: howk_feedback } })
        const fdonres = await Fd_done.find({ fd_done_fid: { $in: howk_feedback } }).populate({ path: 'fd_done_sid' })
        ctx.body = {
            code: 0,
            message: '获取反馈和答案成功',
            result: { fbres, fdonres }
        }

    }
}

module.exports = new FeedbackController()
