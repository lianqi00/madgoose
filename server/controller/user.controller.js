const User = require('../model/user.model')
class UserController {
    async getUserInfo(ctx, next) {
        ctx.body = '用户信息11111'
    }
    async register(ctx, next) {
        const { user_name, password } = ctx.request.body
        const res = await User.create({ user_name, password })
        // console.log(res)
        ctx.body = {
            code: '0',
            message: '用户注册成功',
            result: {
                id: res.id,
                user_name: res.user_name
            }
        }

    }
}
module.exports = new UserController()