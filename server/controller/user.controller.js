
//控制层-关于用户的业务逻辑代码

const User = require('../model/user.model')

class UserController {

    //获取全部用户信息
    async getUserInfo(ctx, next) {
        ctx.body = '用户信息11111'
    }

    //添加用户功能
    async register(ctx, next) {
        //验证获得的数据不为空，否则返回400
        const { user_number, user_name, password, user_type } = ctx.request.body
        if (!user_number || !user_name || !password || !user_type) {
            ctx.status = 400
            ctx.body = {
                code: '10001',
                message: '注册信息缺失',
                result: ''
            }
            return
        }
        //将数据写入User表，并返回信息
        const res = await User.create(ctx.request.body)
        ctx.body = {
            code: '0',
            message: '用户注册成功',
            result: {
                id: res.uuid,
                user_name: res.user_name,
                user_class: res.user_class,
                user_course: res.user_course
            }
        }

    }
    //用户登录功能

    //修改用户信息

    //删除用户
}
module.exports = new UserController()