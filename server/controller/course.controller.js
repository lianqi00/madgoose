

const Course = require('../model/course.model')


class CourseController {
    //添加课程
    async addCourse(ctx, next) {
        // console.log(ctx.request.body);
        // console.log('添加课程');
        try {
            const result = await Course.create(ctx.request.body)
            ctx.body = {
                code: 0,
                message: '课程创建成功',
                result
            }
        } catch (error) {
            ctx.status = 500
            ctx.body = {
                code: 10211,
                message: '创建课程失败', error
            }
            // console.log(result);
        }
    }
    //作业挂靠课程
    async courseAddHowk(ctx, next) {
        const { course_id, course_howk } = ctx.request.body

        // console.log(ctx.request.body);
        try {
            const result = await Course.findOneAndUpdate({ _id: course_id }, { $addToSet: { course_howk } }, { lean: true, new: true })
            // console.log(result);
            if (result) {
                ctx.body = {
                    code: 0,
                    message: '作业挂靠课程成功',
                    result
                }
            } else {
                ctx.status = 500,
                    ctx.body = {
                        code: 10221,
                        message: '作业挂靠失败，可能是数据库中不存在当前课程',
                        result: ''
                    }
            }
        } catch (error) {
            ctx.status = 500,
                ctx.body = {
                    code: 10222,
                    message: '作业挂靠失败',
                    result: error
                }
        }

    }
    //查询课程作业
    async getHowk(ctx, next) {
        // const { _id, id } = ctx.query || {}
        // console.log(id);
        const result = await Course.find({}).populate({
            path: "course_howk", populate: {
                path: 'howk_done', populate: {
                    path: 'hk_done_sid'
                }
            }
        })
        ctx.body = {
            code: 0,
            message: '课程获取成功',
            result
        }
    }
    //查询课程作业公开
    async gethowkpublic(ctx, next) {
        const { _id, id } = ctx.query
        const result = await Course.find({ _id }).populate('course_howk', '-howk_done -howk_feedback')
        var data = {}
        for (let i = 0; i < result.length; i++) {
            const e = result[i];
            for (let ii = 0; ii < e.course_howk.length; ii++) {
                const ee = e.course_howk[ii];
                if (id === ee._id.toString()) {
                    data = ee.toObject()
                    data.coursename = e.course_name
                }
            }
        }
        ctx.body = {
            code: 0,
            message: '获取作业成功',
            result: data
        }
    }




    //删除课程
    async deleCourse(ctx, next) {
        // console.log(1);
        // console.log(ctx.query);
        const { _id } = ctx.query
        const result = await Course.deleteOne({ _id })
        ctx.body = {
            code: 0,
            message: '删除成功',
            result
        }
    }
}
module.exports = new CourseController()