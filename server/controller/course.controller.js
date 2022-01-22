

const Course = require('../model/course.model')


class CourseController {
    async addCourse(ctx, next) {
        const res = ctx.request.body
        const result = await Course.create(res)
        console.log(result);
        ctx.body = '添加课程'
    }
}
module.exports = new CourseController