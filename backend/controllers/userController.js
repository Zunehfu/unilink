const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
const moment = require("moment");

exports.getAllUsers = async (req, res, next) => {
    try {
        const user_ = await user.find();
        res.json(user_);
    } catch (error) {
        res.json(error);
    }
};

exports.getUserWithId = async (req, res, next) => {
    try {
        if (req.user._id == req.params.id) {
            if (req.query.edit === "true") {
                req.user.dateofcreation = moment(req.user.createdAt).format(
                    "YYYY-MM-DD"
                );
                req.user.lastonlinedate = moment(req.user.lastOnline).format(
                    "YYYY-MM-DD hh:mm A"
                );

                return res.json(req.user);
            } else {
                req.user.dateofcreation = moment(req.user.createdAt).format(
                    "YYYY-MM-DD"
                );
                req.user.lastonlinedate = moment(req.user.lastOnline).format(
                    "YYYY-MM-DD hh:mm A"
                );

                return res.json(req.user);
            }
        }

        const user_ = await user.findById(req.params.id);
        if (!user_) return res.json("Unable to find the user!");

        user_.createdAt_formatted = moment(user_.createdAt).format(
            "YYYY-MM-DD"
        );
        user_.lastOnline_formatted = moment(user_.lastOnline).format(
            "YYYY-MM-DD hh:mm A"
        );

        res.json(user_);
    } catch (error) {
        res.json(error);
    }
};

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
            dateOfBirth: req.body.dateOfBirth,
        });

        res.redirect("/users/" + req.user._id);
    } catch (error) {
        res.json(error);
    }
};

exports.getFriendsWithId = async (req, res, next) => {
    try {
        if (req.user._id == req.params.id) {
            console.log(req.user.friends);
            return res.json(req.user.friends);
        }

        const user_ = await user.findById(req.params.id);
        if (!user_) return res.json("Unable to find the user!");

        res.json(user_.friends);
    } catch (error) {
        res.json(error);
    }
};

exports.addFriend = async (req, res, next) => {
    try {
        if (req.user._id == req.params.id)
            return res.json("You are always your friend :D");

        await user.findByIdAndUpdate(
            req.user._id,
            { $push: { friends: { friendId: req.params.id } } },
            { runValidators: true }
        );
        const user_ = await user.findByIdAndUpdate(
            req.params.id,
            { $push: { friends: { friendId: req.user._id } } },
            { new: true, runValidators: true }
        );
        if (!user_) return res.json("Unable to find the user!");

        res.redirect("/users/" + req.params.id);
    } catch (error) {
        res.json(error);
    }
};
