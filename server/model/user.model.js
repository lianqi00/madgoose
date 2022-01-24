//
//用户表的数据库模型
//

const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const userSchema = new Schema({
    user_number: {
        type: String,
        required: true,
        unique: true
    },
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    user_type: {
        type: Number,
        min: 0,
        max: 2,
        default: 0
    },
    user_class: { type: String },
    user_course: {
        type: Schema.Types.ObjectId,
        ref: 'course'
    },
}, { timestamps: true }
)

module.exports = User = model('User', userSchema)