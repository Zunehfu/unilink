const user = require('../models/userModel')
const jwt = require('jsonwebtoken')
// const util = require('util')

exports.verifySignin = async (req, res, next) => {

    const user_ = await user.findOne({username: req.body.username})
    console.log(req.body)
    if(!user_) return res.json('no user')
    if(user_.pass != req.body.pass) return res.json('wrong pass')
    const token = jwt.sign({id: user_._id}, process.env.SECRET_STR, { expiresIn: process.env.LOGIN_EXPIRES })
    res.json(token)
}

exports.verifySignup = async (req, res, next) => {
    try {
        const user_ = await user.create(req.body)
        res.json(user_)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getSigninPage = async (req, res, next) => {
    try {
        res.render('signin.hbs')
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.protect= async(req, res, next) => {
    try {
        const testToken = req.headers.authorization
        let token;
        if(testToken && testToken.startsWith('bearer')) {
            token = testToken.split(' ')[1]
        }

        if(!token) { return res.json('Unauthorized') }

        console.log(token)
        const decodedToken = jwt.verify(token, process.env.SECRET_STR)
        console.log(decodedToken)
        const user_ = await user.findById(decodedToken.id)
        console.log(user_)
        if(!user_) { return res.json('Unauthorized') }
        next()
    } catch (error) {
        console.log(error.message)
        dwasdw
    }
}
