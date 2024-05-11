const post = require("../models/postModel");

exports.addPost = async (req, res, next) => {
    try {
        console.log(req.user);
        console.log(req.body);

        const post_ = await post.create({
            content: req.body.content,
            postedBy: req.user._id,
            timestamp: Date.now(),
            lastReplyTimestamp: Date.now(),
            isAnonymous: req.body.hideme,
            visibility: req.body.visibility,
        });

        res.json(post_);
    } catch (err) {
        next(err);
    }
};

exports.addPostErrorHandler = async (err, req, res, next) => {
    try {
        let post_ = await post.find().sort({ lastReplyTimestamp: -1 });

        res.json({
            data: post_,
            err,
        });
    } catch (error) {
        res.json(error);
    }
};

exports.getAllPosts = async (req, res, next) => {
    try {
        let post_ = await post.find().sort({ lastReplyTimestamp: -1 });

        res.json(post_);
    } catch (error) {
        res.json(error);
    }
};

exports.getPostPage = async (req, res, next) => {
    try {
        const id = req.params.id;
        const post_ = await post.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        );

        res.json(post_);
    } catch (error) {
        res.json(error);
    }
};

exports.addToPostPage = async (req, res, next) => {
    try {
        const id = req.params.id;

        let is_anon = false;
        if (req.body.hideme) is_anon = true;

        const post_ = await post.findByIdAndUpdate(
            id,
            {
                $push: {
                    replies: {
                        content: req.body.content,
                        postedBy: req.user._id,
                        isAnonymous: is_anon,
                        timestamp: Date.now(),
                    },
                },
                $set: { lastReplyTimestamp: Date.now() },
            },
            { runValidators: true }
        );

        res.redirect("/posts/" + id);
    } catch (err) {
        next(err);
    }
};

exports.addToPostPageErrorHandler = async (err, req, res, next) => {
    try {
        const id = req.params.id;

        const post_ = await post.findById(id);

        res.json({
            data: post_,
            err,
        });
    } catch (error) {
        res.json(error);
    }
};
