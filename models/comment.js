const mongoose = require('./connection')
const { Schema, model } = mongoose

const commentSchema = new Schema({

    parkCode: String, 
    note: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId, // single User
        ref: 'User' // string value from the model creation
    }
}, {
    timestamps: true
})

const Comment = model('comment', commentSchema)

module.exports = Comment