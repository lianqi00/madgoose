const mongoose = require('mongoose')

const { Schema, model } = mongoose

const courseSchema = new Schema({
    course_name: {
        type: String,
        required: true
    },
    course_howk: {
        type: Schema.Types.ObjectId,
        ref: 'howk'
    }
}, { timestamps: true })

module.exports = Course = model('course', courseSchema)