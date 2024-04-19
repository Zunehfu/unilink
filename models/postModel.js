const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, '`content` is a required field!'],
        trim: true
    },
    postedBy: {
        type: String,
        required: [true, '`postedBy` is a required field!'],
        trim: true
    },
    views: {
        type: Number,
        default: 0
    },
    timestamp: {
        type: Date,
        required: [true, '`timestamp` is a required field!']
    },
    lastReplyTimestamp: {
        type: Date,
        required: [true, '`lastReplyTimestamp` is a required field!']
    },
    replies: [mongoose.Schema({
        content: {
            type: String,
            required: [true, '`content` is a required field!'],
            trim: true
        },
        postedBy: {
            type: String,
            required: [true, '`postedBy` is a required field!'],
            trim: true
        },
        timestamp: {
            type: Date,
            required: [true, '`timestamp` is a required field!']
        }
    })]
})

const post = mongoose.model('Post', postSchema)

module.exports = post
