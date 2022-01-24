const mongoose = require('mongoose')

const { Schema, model } = mongoose

const fd_doneSchema = new Schema({
    fd_done_sid: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    fd_done_fid: {
        type: Schema.Types.ObjectId,
        ref: 'howk',
        required: true
    },
    fd_done_sc: {
        type: Number
    },
    fd_done_text: {
        type: String
    }
}, { timestamps: true })

module.exports = Fd_done = model('fd_done', fd_doneSchema)