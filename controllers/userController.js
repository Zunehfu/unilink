const user = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.getAllUsers = async (req, res, next) => {

}

exports.getUserWithId = async (req, res, next) => {
    try {
        const user_ = await user.findById(req.user.id)
        res.render('profile.hbs', user_)
    } catch (error) {
        res.status(500).json(error.message)
    }
}