

const Howk = require('../model/howk.model')


class HowkController {
    // 添加作业
    async addHowk(ctx, next) {
        console.log(ctx.request.body);
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


}
module.exports = new HowkController()