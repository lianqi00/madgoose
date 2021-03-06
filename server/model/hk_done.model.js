const mongoose = require('mongoose')

const { Schema, model } = mongoose

const hk_doneSchema = new Schema({
    hk_done_sid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hk_done_wk: {
        type: Schema.Types.ObjectId,
        ref: 'howk',
        required: true
    },
    bucket: { type: String },
    fsize: { type: Number },
    hash: { type: String },
    key: { type: String, required: true, unique: true },
    hk_done_score: {
        type: Number
    }
}, { timestamps: true })

module.exports = Hk_done = model('hk_done', hk_doneSchema)