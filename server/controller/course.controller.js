

const Course = require('../model/course.model')


class CourseController {
    async addCourse(ctx, next) {
        const result = await Course.create(ctx.request.body)
        console.log(result);
        ctx.body = '添加课程'
    }
}
module.exports = new CourseController