const mongoose = require('mongoose')

const statSchema = new mongoose.Schema({
    postsPageHits: {
        type: Number,
        required: [true, '`content` is a required field!'],
        trim: true
    }
})

const stat = mongoose.model('Stat', statSchema)

module.exports = stat
