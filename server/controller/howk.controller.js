

const Howk = require('../model/howk.model')
const Course = require('../model/course.model')
// const moment = require('moment')
// moment.locale('zh-cn')


class HowkController {
    // 添加作业
    async addHowk(ctx, next) {
        // console.log(ctx.request.body);
        const { course_id, ...res } = ctx.request.body

        try {
            const result = await Howk.create(res)
            // console.log(result);
            // console.log(result._id);
            const course_howk = result._id
            const finalres = await Course.findOneAndUpdate({ _id: course_id }, { $addToSet: { course_howk } }, { lean: true, new: true })
            // console.log(finalres);
            ctx.body = {
                code: 0,
                message: '作业创建成功',
                result: finalres
            }
        } catch (error) {
            ctx.status = 500
            ctx.body = {
                code: 10230,
                message: '创建作业失败',
                result: error
            }
            // console.log(error);
        }

        // ctx.body = result
        // try {
        //     const result = await Course.create(ctx.request.body)
        //     ctx.body = {
        //         code: 0,
        //         message: '课程创建成功',
        //         result
        //     }
        // } catch (error) {
        //     ctx.statu = 500
        //     ctx.body = {
        //         code: 10211,
        //         message: '创建课程失败', error
        //     }
        //     // console.log(result);

        // }


    }
    //上传作业

    //获取个人作业列表
    async getHowk(ctx, next) {
        // console.log(ctx.state.user);
        const { user_course } = ctx.state.user
        // console.log(user_course);
        let result = await Course.findById({ _id: user_course }).populate({ path: 'course_howk' })
        // console.log(result.course_howk);
        ctx.body = {
            code: 0,
            message: '获取成功',
            result: result.course_howk
        }
    }
    //获取作业信息
    async getHowkInfo(ctx, next) {
        // console.log(ctx.query._id);

        const { _id } = ctx.query || ''
        // console.log(_id);
        try {
            const result = await Howk.findById(_id)
            // console.log(result);
            ctx.body = {
                code: 0,
                message: '获取作业信息成功',
                result
            }
        } catch (error) {
            // console.log('@@@@@@@', error);
            ctx.status = 500
            ctx.body = {
                code: 10200,
                message: '作业信息获取失败！',
                result: error
            }
        }

    }
    //获取全部作业
    async getAllHowk(ctx, next) {
        const result = await Howk.find({}).populate({ path: 'howk_done' })
        // console.log(result);
        ctx.body = {
            code: 0,
            message: '获取全部作业成功！',
            result
        }
    }
    //删除作业
    async deleteHowk(ctx, next) {
        console.log(ctx.query);
        const { _id, course_id } = ctx.query
        try {
            const h = await Howk.deleteOne({ _id })
            // console.log(h);
            const c = await Course.findByIdAndUpdate({ _id: course_id }, { $pull: { course_howk: _id } }, { new: true })
            // const cresult = await Course.find({})
            // cresult.forEach(e => {
            //     console.log(e.course_howk);
            // })
            // console.log(c);
            ctx.body = {
                code: 0,
                message: '删除作业成功，并从课程中取消挂载',
                result: c
            }
        } catch (error) {
            ctx.status = 500
            ctx.body = {
                code: 10300,
                message: '删除作业失败！',
                result: error
            }
        }

    }
}
module.exports = new HowkController()