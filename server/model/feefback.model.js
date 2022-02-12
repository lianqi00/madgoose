const mongoose = require('mongoose')

const { Schema, model } = mongoose

const feedbackSchema = new Schema({
    feedback_q: {
        type: String,
        required: true
    },
    feedback_option: {
        type: []
    }
}, { timestamps: true })

module.exports = Feedback = model('feedback', feedbackSchema)