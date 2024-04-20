const user = require('../models/userModel')
const jwt = require('jsonwebtoken')

function dateFormatted(dateObj) {

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const date = String(dateObj.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${date}`;

    return formattedDate;
}

exports.getAllUsers = async (req, res, next) => {

}

exports.getUserWithId = async (req, res, next) => {
    try {
        console.log('called!')
        if(req.user.id == req.params.id) {
            if(req.query.edit === 'true') {
                req.user.dateofcreation = dateFormatted(req.user.createdAt)
                req.user.lastonlinedate = dateFormatted(req.user.lastOnline)

                return res.render('editprofile.hbs', req.user)
            }
            else {
                req.user.dateofcreation = dateFormatted(req.user.createdAt)
                req.user.lastonlinedate = dateFormatted(req.user.lastOnline)

                return res.render('myprofile.hbs', req.user)
            }
        }

        const user_ = await user.findById(req.params.id)
        if(!user_) return res.json('Unable to find the user!')

        user_.dateofcreation = dateFormatted(user_.createdAt)
        user_.lastonlinedate = dateFormatted(user_.lastOnline)

        res.render('profile.hbs', user_)
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.updateUserWithId = async (req, res, next) => {
    try {
        await user.findByIdAndUpdate(req.user._id, { 
                name: req.body.name,
                age: req.body.age,
                major: req.body.major,
                batch: req.body.batch,
                relationship: req.body.relationship,
                gender: req.body.gender,
                username: req.body.username,
                contact: req.body.contact,
                personalEmail: req.body.personalEmail,
                website: req.body.website,
                interestedIn: req.body.interestedIn,
                dateOfBirth: req.body.dateOfBirth
        })

        res.redirect('/users/' + req.user._id)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
