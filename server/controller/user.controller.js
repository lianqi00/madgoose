
//控制层-关于用户的业务逻辑代码

const fs = require('fs')
const path = require('path')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const xlsx = require('node-xlsx');


const User = require('../model/user.model')
const Hk_done = require('../model/hk_done.model')
const Howk = require('../model/howk.model')
const Course = require('../model/course.model')


const { JWT_SECRET } = process.env

class UserController {

    //获取全部用户信息
    async getUserInfo(ctx, next) {
        // console.log(ctx.state.user);
        const { _id, user_type } = ctx.state.user

        const fil = {}
        if (user_type < 1) { fil._id = _id }
        // console.log(fil);

        try {
            const users = await User.find(fil)
                .populate(
                    {
                        path: 'user_course',
                        populate: {
                            path: 'course_howk',
                            populate: { path: 'howk_done' }
                        }
                    })
            let newayy = []
            users.forEach(e => {
                // console.log(e);
                if (e.user_type < 1) {
                    newayy.push(e)
                }
            })
            ctx.body = {
                code: 0,
                message: '查询成功',
                result: newayy
            }
            // console.log(ctx.state.user);
        } catch (error) {
            ctx.status = 500
            ctx.body = {
                code: 10003,
                message: '查询失败',
                result: error
            }
            // console.log(error);
        }

    }
    //根据token获取用户信息
    async getFetchInfo(ctx, next) {
        // console.log(ctx.query);
        // console.log(ctx.state.user);
        ctx.body = {
            code: 0,
            message: 'fetch成功',
            result: ctx.state.user
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
                code: 10001,
                message: '注册信息缺失',
                result: ''
            }
            return
        }
        //将数据写入User表，并返回信息
        // console.log(ctx.request.body);
        try {
            const res = await User.create(ctx.request.body)
            const { password, ...result } = res._doc
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result
            }
        } catch (error) {
            // console.log(error)
            ctx.status = 409
            ctx.body = {
                code: 10002,
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
            ctx.status = 422
            ctx.body = {
                code: 10006,
                message: '学号或密码不能为空',
                result: ''
            }
            return
        }
        //查询用户名是否存在
        try {
            const isUserExi = await User.findOne({ user_number }).select('+password').setOptions({ lean: true })
            if (!isUserExi) {
                ctx.status = 422
                ctx.body = {
                    code: 10004,
                    message: '学号或密码错误',
                    result: ''
                }
                return
            }
            //查询密码是否正确
            if (!bcrypt.compareSync(p, isUserExi.password)) {
                ctx.status = 422
                ctx.body = {
                    code: 10005,
                    message: '学号或密码错误',
                    result: ''
                }
                return
            }
            const { password, createdAt, updatedAt, ...userInfo } = isUserExi
            // console.log(isUserExi);
            const token = jwt.sign(userInfo, JWT_SECRET, { expiresIn: '1d' })
            ctx.body = {
                code: 0,
                message: '登录成功',
                result: {
                    token, userInfo
                }
            }
        } catch (error) {
            // console.log(error);
            ctx.status = 500
            ctx.body = {
                code: 10007,
                message: '数据库错误',
                result: error
            }
        }
    }

    //修改指定用户信息（除密码）
    async modUserInfo(ctx, next) {
        // console.log(ctx.state.user);
        const { _id, ...res } = ctx.request.body
        // console.log(res);
        const { user_number, user_name, user_type, user_class, user_course } = res
        // console.log(user_course);
        const newUser = {}
        user_name && Object.assign(newUser, { user_name })
        user_number && Object.assign(newUser, { user_number })
        user_type && Object.assign(newUser, { user_type })
        user_class && Object.assign(newUser, { user_class })
        user_course && Object.assign(newUser, { user_course })
        // console.log(newUser);
        try {
            const result = await User.findOneAndUpdate({ _id }, newUser, { lean: true, new: true })
            // console.log(result);
            ctx.body = {
                code: 0,
                message: '信息修改成功',
                result
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

    //修改密码
    async changePassWord(ctx, next) {
        // console.log(ctx.state.user);
        const password = ctx.request.body
        const { _id } = ctx.state.user
        // console.log(nid, password)
        try {
            const result = await User.findOneAndUpdate({ _id }, password)
            // console.log(result);
            ctx.body = {
                code: 0,
                message: '密码修改成功',
                result
            }

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
    async deleteUser(ctx, next) {
        // console.log(ctx.query);
        const { _id } = ctx.query
        //1、删除user表中的用户
        const deluserres = await User.deleteOne({ _id })
        // console.log(deluserres);
        //2、删掉课程表中的hk_done数组
        //2-1、查到所有此人的hk_done_id
        const hkdoneres = await Hk_done.find({ hk_done_sid: _id })
        hkdoneres.forEach(async (e) => {
            await Howk.findOneAndUpdate({ _id: e.hk_done_wk }, { $pull: { howk_done: e._id } })
        })
        // console.log(filte);
        // const delcouhkdoneres = await Howk.findByIdAndUpdate({ _id: courseid }, { $pullAll: { howk_done: filte } })
        // console.log(delcouhkdoneres);
        //3、删除hk_done中的所有此用户作业
        const delhkdoneres = await Hk_done.deleteMany({ hk_done_sid: _id })
        let str1 = '未删除用户,'
        if (deluserres.deletedCount === 1) str1 = '用户已删除,'
        let str2 = '并连带删除相连作业' + delhkdoneres.deletedCount + '项。'

        ctx.body = {
            code: 0,
            message: str1 + str2,
            result: { deluserres, delhkdoneres }
        }
    }
    //重置密码
    async resetPassWord(ctx, next) {
        // console.log(ctx.query._id)
        const { _id } = ctx.query
        if (!_id) {
            ctx.status = 403
            ctx.body = {
                code: 10027,
                message: '用户id不能为空'
            }
            return
        }
        try {
            const user = await User.findOne({ _id })
            if (!user) {
                ctx.status = 500
                ctx.body = {
                    code: 10028,
                    message: '查无此人',
                    result: ''
                }
                return
            }
            // console.log(user);
            // console.log(_id)
            const password = user.user_number
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const result = await User.findOneAndUpdate({ _id }, { password: hash })
            // console.log(result);
            ctx.body = {
                code: 0,
                message: '重置密码成功',
                result
            }
        } catch (error) {
            ctx.status = 500
            ctx.body = {
                code: 10029,
                message: '数据库错误',
                result: error
            }
        }

        // console.log(user.user_number);


    }
    //批量添加用户
    async addMany(ctx, next) {
        // console.log(ctx.request.files.file);
        const file = ctx.request.files.file
        let sheets = xlsx.parse(fs.readFileSync(file.path))
        // console.log(sheets[0].data);
        let data = sheets[0].data
        var sheetpase = []
        let keys = [];
        for (let rowId in data) {
            let obj = {};
            let row = data[rowId];
            if (rowId == 0) {
                keys = row;
            } else {
                for (let i = 0; i < row.length; i++) {
                    obj[keys[i]] = row[i];
                }
                // console.log(obj);
                sheetpase.push(obj)
            }
        }
        // console.log(sheetpase);
        let courseall = await Course.find({})
        // console.log(courseall);
        const salt = bcrypt.genSaltSync(10);
        // const hash = bcrypt.hashSync(password, salt);
        sheetpase.forEach((e, i) => {
            sheetpase[i].password = bcrypt.hashSync(e.password, salt);
            courseall.forEach((ee, ii) => {
                if (e.user_course === ee.course_name) {
                    sheetpase[i].user_course = courseall[ii]._id
                }
            })
        })
        console.log(sheetpase)
        try {
            const result = await User.insertMany(sheetpase)
            // console.log(result);
            ctx.body = {
                code: 0,
                message: '批量添加成功',
                result
            }
        } catch (error) {
            // console.log(error);
            ctx.body = {
                code: 10510,
                message: '批量添加失败',
                result: error
            }
        }

    }
}
module.exports = new UserController()