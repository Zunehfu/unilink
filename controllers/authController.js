const user = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.verifySignin = async (req, res, next) => {

    const user_ = await user.findOne({username: req.body.username})

    if(!user_) return res.render('signin.hbs', {errmsg: "There's no account associated with this username"})
    if(user_.pass != req.body.pass) return res.render('signin.hbs', {errmsg: "Incorrect password"})

    const token = jwt.sign({id: user_._id}, process.env.SECRET_STR, { expiresIn: process.env.LOGIN_EXPIRES })

    res.cookie('unilinkJWT', token, { 
        expires: new Date(Date.now() + parseInt(process.env.LOGIN_EXPIRES)), 
        secure: false,
        httpOnly: true
    })

    res.redirect('/posts')
}

exports.verifySignup = async (req, res, next) => {
    try {
        const user_ = await user.create(req.body)
        res.json(user_)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getSigninPage = (req, res, next) => {
    res.render('signin.hbs')
}

exports.protectRoute= async(req, res, next) => {
    try {
        let token = req.cookies.unilinkJWT
        
        if(!token) { return res.redirect('/signin') }
        
        const decodedToken = jwt.verify(token, process.env.SECRET_STR)

        const user_ = await user.findById(decodedToken.id)

        if(!user_) { return res.redirect('/signin') }
      
        req.user = user_
        next()
    } catch (error) {
        console.log(error.message)
    }
}
