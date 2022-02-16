

const Hk_done = require('../model/hk_done.model')
const Howk = require('../model/howk.model')



class Hk_doneController {
    //添加完成作业（作业上传）
    async addHkDone(ctx, next) {
        // console.log(ctx.request.body);
        const { key, hk_done_wk } = ctx.request.body
        const doc = ctx.request.body
        const queryres = await Hk_done.findOne({ key })
        if (!queryres) {
            const hdsuccess = await Hk_done.create(doc)
            // console.log(hk_done_wk);
            const hdloadhowk = await Howk
                .findByIdAndUpdate({ _id: hk_done_wk }, { $addToSet: { howk_done: hdsuccess._id } })
                .setOptions({ new: true })
            ctx.body = {
                code: 0,
                message: '作业上传成功',
                result: {
                    hdloadhowk, hdsuccess
                }
            }
            return
        }
        // console.log(queryres);


        const { _id } = queryres
        // console.log(doc);
        const hdupdate = await Hk_done
            .findOneAndUpdate({ _id }, doc)
            .setOptions({ new: true })
        const hdloadhowk = await Howk
            .findByIdAndUpdate({ _id: hk_done_wk }, { $addToSet: { howk_done: hdupdate._id } })
        // console.log(hdloadhowk, hdupdate);
        ctx.body = {
            code: 0,
            message: '上传成功',
            result: {
                hdloadhowk, hdupdate
            }
        }

    }
    //根据作业id查找全部提交的作业
    async gethkdonebyid(ctx, next) {
        // console.log(ctx.query);
        const { _id } = ctx.query
        const result = await Howk.find({ _id }).populate({ path: 'howk_done' })
        // console.log(result);
        ctx.body = {
            code: 0,
            message: '获取作业成功',
            result: result[0].howk_done
        }
    }
    //给作业打分
    async hkrate(ctx, next) {
        // console.log(ctx.request.body);
        const { _id, hk_done_score } = ctx.request.body
        const result = await Hk_done.findByIdAndUpdate({ _id }, { hk_done_score }, { new: true })
        // console.log(result);
        ctx.body = {
            code: 0,
            message: '打分成功',
            result
        }


    }
}
module.exports = new Hk_doneController()