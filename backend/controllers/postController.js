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
        res.json(err);
    }
};

exports.getAllPosts = async (req, res, next) => {
    try {
        console.log("new request");
        const from = parseInt(req.query.from);
        let post_ = await post.find();
        const to = from + 5 > post_.length ? post_.length : from + 10;
        console.log([from, to]);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        res.json(post_.slice(from, to));
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
            { runValidators: true, new: true }
        );

        res.json(post_.replies);
    } catch (err) {
        res.json(err);
    }
};
