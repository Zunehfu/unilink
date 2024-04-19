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
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
