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
    name: {
        type: String,
        default: null,
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
        default: Date.now()
    },
    age: {
        type: Number,
        default: null
    },
    university: {
        type: String,
        required: [true, '`university` is a required field!']
    },
    major: {
        type: String,
        default: null
    },
    batch: {
        type: Number,
        default: null
    },
    relationshipStatus: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    contact: {
        type: String,
        default: null
    },
    relationship: {
        type: String,
        default: null
    },
    personalEmail: {
        type: String,
        default: null
    },
    website: {
        type: String,
        default: null
    },
    interestedIn: {
        type: String,
        default: null
    },
    dateOfBirth: {
        type: String,
        default: null
    },
    friends: [mongoose.Schema({
        friendId: {
            type: String,
            required: [true, '`friendId` is a required field!']
        }
    })],
    friendRequests: [mongoose.Schema({
        id: {
            type: String,
            required: [true, '`id` is a required field!']
        }
    })]
})

const User = mongoose.model('User', userSchema)

module.exports = User
