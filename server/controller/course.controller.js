

const Course = require('../model/course.model')


class CourseController {
    //添加课程
    async addCourse(ctx, next) {
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
}
module.exports = new CourseController()