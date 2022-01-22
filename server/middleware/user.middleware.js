const bcrypt = require('bcryptjs')

class UserMiddleWare {
    async pwCrypt(ctx, next) {
        //验证获得的数据不为空，否则返回400
        const { password } = ctx.request.body
        // console.log(user_type)
        if (!password) {
            ctx.status = 400
            ctx.body = {
                code: '10013',
                message: '密码不能为空',
                result: ''
            }
            return
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        ctx.request.body.password = hash
        await next()
    }
}
module.exports = new UserMiddleWare()