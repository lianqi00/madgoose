

const Howk = require('../model/howk.model')
const Course = require('../model/howk.model')
// const moment = require('moment')
// moment.locale('zh-cn')


class HowkController {
    // 添加作业
    async addHowk(ctx, next) {
        // console.log(ctx.request.body);
        const result = await Howk.create(ctx.request.body)
        console.log(result);
        ctx.body = result
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

    //获取作业
    async getHowk(ctx, next) {
        // console.log(ctx.state.user);
        const { user_course } = ctx.state.user
        console.log(user_course);
        let result = await Course.find({})
        // for (let i = 0; i < result.length; i++) {
        //     const element = result[i];
        //     // console.log(element);
        //     const a = moment(element.createdAt).format('MM月DD日 HH:mm')
        //     // console.log(a);
        //     element[i].createdAt = a

        // }
        console.log(result);
        ctx.body = {
            code: 0,
            message: '获取成功',
            result
        }
    }


}
module.exports = new HowkController()