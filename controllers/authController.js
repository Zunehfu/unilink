const user = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.protectRoute= async(req, res, next) => {
    try {
        let token = req.cookies.unilinkJWT
        
        if(!token) { return res.redirect('/signin') }
        
        const decodedToken = jwt.verify(token, process.env.SECRET_STR)

        const user_ = await user.findByIdAndUpdate(decodedToken.id, { lastOnline: Date.now() }, { new: true })

        if(!user_) { return res.redirect('/signin') }
      
        req.user = user_
        next()
    } catch (error) {
        res.json(error)
    }
}

exports.verifySignin = async (req, res, next) => {

    const user_ = await user.findOne({username: req.body.username})

    if(!user_) return res.json({err: "There's no account associated with this username"})
    if(user_.pass != req.body.pass) return res.json({err: "Incorrect password"})

    const token = jwt.sign({id: user_._id}, process.env.SECRET_STR, { expiresIn: process.env.LOGIN_EXPIRES })

    res.cookie('unilinkJWT', token, { 
        expires: new Date(Date.now() + parseInt(process.env.LOGIN_EXPIRES)), 
        secure: false,
        httpOnly: false
    })

    res.redirect('/posts')
}

exports.verifySignup = async (req, res, next) => {
    try {
        req.body.createdAt = Date.now()
        const user_ = await user.create(req.body)
        res.json(user_)
    } catch (error) {
        res.json(error)
    }
}