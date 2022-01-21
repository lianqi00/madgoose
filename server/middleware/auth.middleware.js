const User = require('../model/user.model')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

//验证是否登录，登录的话就像state.user中放入用户信息
class AuthMiddleware {
    async islogin(ctx, next) {
        const { authorization } = ctx.request.header
        if (!authorization || authorization === undefined) {
            ctx.status = 401
            ctx.body = {
                code: '10008',
                message: '未登录',
                result: ''
            }
            return
        }
        const token = authorization.replace('Bearer ', '')
        try {
            const user = jwt.verify(token, JWT_SECRET)
            ctx.state.user = user
            // if (user) {
            //     await next()
            // } else {
            //     ctx.status = 401
            //     ctx.body = {
            //         code: '10009',
            //         message: '未登录',
            //         result: ''
            //     }
            // }
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

    async isAdmin(ctx, next) {
        // const user = ctx.state.user
        // console.log(a);
        const { type } = ctx.state.user
        // console.log(typeof (type));
        // console.log(type < 2);
        if (type < 1) {
            ctx.status = 403
            ctx.body = {
                code: '10011',
                message: '无管理或老师权限',
                result: ''
            }
            return
        }
        await next()

    }
}
module.exports = new AuthMiddleware()