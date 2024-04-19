const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, '`username` is a required field!'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, '`email` is a required field!'],
        unique: true,
        lowercase:true,
        trim: true
    },
    pass: {
        type: String,
        required: [true, '`pass` is a required field!'],
        minlength: 8
    },
    createdAt: {
        type: Date,
        required: [true, '`createdAt` is a required field!']
    },
    lastOnline: {
        type: Date,
        required: [true, '`lastOnline` is a required field!']
    },
    age: {
        type: Number,
        required: [true, '`age` is a required field!']
    },
    university: {
        type: String,
        required: [true, '`university` is a required field!'],
        minlength: 8
    },
    age: {
        type: String,
        required: [true, '`pass` is a required field!'],
        minlength: 8
    },
    intake: {
        type: Number,
        required: [true, '`age` is a required field!']
    },
    relationship: {
        type: String,
        required: [true, '`pass` is a required field!'],
        minlength: 8
    },
})

const User = mongoose.model('User', userSchema)

module.exports = User
