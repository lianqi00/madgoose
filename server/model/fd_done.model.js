const mongoose = require('mongoose')

const { Schema, model } = mongoose

const fd_doneSchema = new Schema({
    fd_done_sid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fd_done_fid: {
        type: Schema.Types.ObjectId,
        ref: 'howk',
        required: true
    },
    fd_done_a: {
        type: String
    },
}, { timestamps: true })

module.exports = Fd_done = model('fd_done', fd_doneSchema)