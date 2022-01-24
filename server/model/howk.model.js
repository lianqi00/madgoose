const mongoose = require('mongoose')

const { Schema, model } = mongoose

const howkSchema = new Schema({
    howk_name: {
        type: String,
        required: true,
        unique: true
    },
    howk_content: {
        type: String,
        required: true
    },
    howk_uptype: {
        type: []
    },
    howk_deadline: {
        type: Date
    },
    howk_done: {
        type: [Schema.Types.ObjectId],
        ref: 'hk_done'
    },
    howk_feedback: {
        type: [Schema.Types.ObjectId],
        ref: 'feedback'
    }
}, { timestamps: true })

module.exports = Howk = model('howk', howkSchema)