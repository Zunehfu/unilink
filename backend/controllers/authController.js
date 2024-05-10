const user = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.validate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token);

        if (!token) {
            return res.json({
                auth: false,
            });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_STR);

        const user_ = await user.findByIdAndUpdate(
            decodedToken.id,
            { lastOnline: Date.now() },
            { new: true }
        );

        if (!user_) {
            return res.json({
                auth: false,
            });
        }

        res.json({});
    } catch (error) {
        res.json(error);
    }
};

exports.protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token);

        if (!token) {
            return res.json({
                auth: false,
            });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_STR);

        const user_ = await user.findByIdAndUpdate(
            decodedToken.id,
            { lastOnline: Date.now() },
            { new: true }
        );

        if (!user_) {
            return res.json({
                auth: false,
            });
        }

        req.user = user_;
        next();
    } catch (error) {
        res.json(error);
    }
};

exports.verifySignin = async (req, res, next) => {
    const user_ = await user.findOne({ username: req.body.username });

    if (!user_)
        return res.json({
            err: "There's no account associated with this username",
        });
    if (user_.pass != req.body.pass)
        return res.json({ err: "Incorrect password" });

    const token = jwt.sign({ id: user_._id }, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXPIRES,
    });

    res.json({
        token,
        expires: parseInt(process.env.LOGIN_EXPIRES) / (1000 * 60 * 60 * 24),
    });
};

exports.verifySignup = async (req, res, next) => {
    try {
        req.body.createdAt = Date.now();
        const user_ = await user.create(req.body);
        res.json(user_);
    } catch (error) {
        res.json(error);
    }
};
