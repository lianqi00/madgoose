
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
            // console.log(ctx.state.user);
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
        const { user_number, user_name } = ctx.request.body
        // console.log(user_type)
        if (!user_number || !user_name) {
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
        const { user_number } = ctx.request.body
        const p = ctx.request.body.password
        if (!user_number || !p) {
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
            if (!bcrypt.compareSync(p, isUserExi.password)) {
                ctx.status = 401
                ctx.body = {
                    code: '10005',
                    message: '学号或密码错误',
                    result: ''
                }
                return
            }
            const { id, password, createdAt, updatedAt, ...userInfo } = isUserExi.dataValues
            const token = jwt.sign(userInfo, JWT_SECRET, { expiresIn: '1d' })
            ctx.body = {
                code: '0',
                message: '登录成功',
                result: {
                    token, userInfo
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
    //修改指定用户信息（除密码）
    async modUserInfo(ctx, next) {
        // console.log(ctx.state.user);
        const { uuid, ...res } = ctx.request.body
        const { user_number, user_name, user_type, user_class, user_course } = res
        const whereOpt = { uuid }
        const newUser = {}
        user_name && Object.assign(newUser, { user_name })
        user_number && Object.assign(newUser, { user_number })
        user_type && Object.assign(newUser, { user_type })
        user_class && Object.assign(newUser, { user_class })
        user_course && Object.assign(newUser, { user_course })
        try {
            const result = await User.update(newUser, { where: whereOpt })
            console.log(result);
            if (result > 0) {
                ctx.body = {
                    code: 0,
                    message: '用户信息修改成功',
                    result: whereOpt
                }
            } else {
                ctx.status = 500
                ctx.body = {
                    code: 10015,
                    message: '用户信息修改失败',
                    result: ''
                }
            }
        } catch (error) {
            ctx.status = 500
            ctx.body = {
                code: 10016,
                message: '用户信息修改失败',
                result: error
            }
            // console.log(error)
        }

    }
    //
    async changePassWord(ctx, next) {
        const password = ctx.request.body
        const { uuid } = ctx.state.user
        const nid = {}
        nid.uuid = uuid
        // console.log(nid, password)
        try {
            const result = await User.update(password, { where: nid })
            if (result > 0) {
                ctx.body = {
                    code: 0,
                    message: '密码修改成功',
                    result: ''
                }
            } else {
                ctx.status = 500
                ctx.body = {
                    code: 10022,
                    message: '密码修改失败',
                    result: ''
                }
            }
            // console.log(result);

        } catch (error) {
            ctx.status = 500
            ctx.body = {
                code: 10023,
                message: '密码修改失败',
                result: error
            }
            // console.log(error)
        }
    }
    //删除用户
}
module.exports = new UserController()