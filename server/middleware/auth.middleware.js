// const User = require('../model/user.model')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

class AuthMiddleware {

    //验证是否登录，登录的话就像state.user中放入用户信息
    async islogin(ctx, next) {
        const { authorization } = ctx.request.header
        const token = String(authorization || '').split(' ').pop()
        // console.log(authorization);
        // if (!authorization || authorization === undefined) {
        //     ctx.status = 401
        //     ctx.body = {
        //         code: '10008',
        //         message: '未登录',
        //         result: ''
        //     }
        //     return
        // }
        // const token = authorization.replace('Bearer ', '')
        // console.log(token);
        try {
            const user = jwt.verify(token, JWT_SECRET)
            ctx.state.user = user
        } catch (error) {
            ctx.status = 401
            ctx.body = {
                code: '10010',
                message: '未登录',
                result: error
            }
            return
            // console.log(error);
        }
        await next()
    }

    //验证是否是管理员或老师
    async isHighLeve(ctx, next) {
        // const user = ctx.state.user
        // console.log(a);
        const { user_type } = ctx.state.user
        // console.log(user_type);
        // console.log(user_type < 1);
        if (user_type < 1) {
            ctx.status = 403
            ctx.body = {
                code: '10011',
                message: '需要管理或教师权限',
                result: ''
            }
            return
        }
        await next()

    }

    //验证是否是管理员
    async isTeacher(ctx, next) {
        const { user_type } = ctx.state.user
        if (user_type === 2) {
            return await next()
        }
        ctx.status = 403
        ctx.body = {
            code: '10012',
            message: '需要管理权限',
            result: ''
        }
    }
}
module.exports = new AuthMiddleware()