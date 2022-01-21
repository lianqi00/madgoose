
//控制层-关于用户的业务逻辑代码

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../model/user.model')


const { JWT_SECRET } = process.env

class UserController {

    //获取全部用户信息
    async getAllUserInfo(ctx, next) {
        try {
            const users = await User.findAll({ attributes: { exclude: ['password'] } })
            ctx.body = {
                code: '0',
                message: '查询成功',
                result: users
            }
            // console.log(users);
        } catch (error) {
            ctx.status = 400
            ctx.body = {
                code: '10003',
                message: '查询失败',
                result: error
            }
        }

    }

    //添加用户功能
    async register(ctx, next) {
        //验证获得的数据不为空，否则返回400
        const { user_number, user_name, password, user_type } = ctx.request.body
        // console.log(user_type)
        if (!user_number || !user_name || !password) {
            ctx.status = 400
            ctx.body = {
                code: '10001',
                message: '注册信息缺失',
                result: ''
            }
            return
        }
        //将数据写入User表，并返回信息
        try {
            const { password } = ctx.request.body
            // console.log(password)
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            // console.log(hash)
            ctx.request.body.password = hash
            const res = await User.create(ctx.request.body)
            ctx.body = {
                code: '0',
                message: '用户注册成功',
                result: {
                    id: res.uuid,
                    user_name: res.user_name,
                    user_number: res.user_number,
                    user_type: res.user_type,
                    user_class: res.user_class,
                    user_course: res.user_course
                }
            }
        } catch (error) {
            // console.log(error)
            ctx.status = 409
            ctx.body = {
                code: '10002',
                message: '用户已存在或其他问题',
                result: error

            }
        }


    }
    //用户登录功能
    async login(ctx, next) {
        //验证学号密码非空
        const { user_number, password } = ctx.request.body
        if (!user_number || !password) {
            ctx.status = 401
            ctx.body = {
                code: '10006',
                message: '学号或密码不能为空',
                result: ''
            }
            return
        }
        //查询用户名是否存在
        try {
            const isUserExi = await User.findOne({ where: { user_number } })
            if (!isUserExi) {
                ctx.status = 401
                ctx.body = {
                    code: '10004',
                    message: '学号或密码错误',
                    result: ''
                }
                return
            }
            //查询密码是否正确
            if (!bcrypt.compareSync(password, isUserExi.password)) {
                ctx.status = 401
                ctx.body = {
                    code: '10005',
                    message: '学号或密码错误',
                    result: ''
                }
                return
            }
            // isUserExi.password = null
            // const { password, ...res } = await isUserExi
            // console.log(isUserExi);
            const number = isUserExi.user_number
            const name = isUserExi.user_name
            const uuid = isUserExi.uuid
            const type = isUserExi.user_type
            const res = { number, name, uuid, type }
            const token = jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
            ctx.body = {
                code: '0',
                message: '登录成功',
                result: {
                    token
                }
            }
        } catch (error) {
            console.log(error);
            ctx.status = 500
            ctx.body = {
                code: '10007',
                message: '数据库错误',
                result: error
            }
        }
    }
    //修改用户信息

    //删除用户
}
module.exports = new UserController()