

const Hk_done = require('../model/hk_done.model')


class Hk_doneController {
    //添加完成作业（作业上传）
    async addHkDone(ctx, next) {
        console.log(ctx.state.user);
        console.log(ctx.request.files);
        const hk = ctx.request.files.file.path
        ctx.body = {
            code: 0,
            message: '上传成功',
            result: {
                hk
            }
        }

    }
}
module.exports = new Hk_doneController()