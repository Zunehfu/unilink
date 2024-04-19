const post = require('../models/postModel')
const stat = require('../models/statModel')
const user = require('../models/userModel')

function modifyPostObj(post_) {
    return post_.map((item) => {

        item.reps = item.replies.length
        item.date = item.timestamp.toDateString()
        item.time = item.timestamp.toTimeString().substring(0, 9)

        if(item.content.length < 50){
            item.title = item.content
        } else {
            item.title = item.content.substring(0, 49) + '...'
        }

        return item 
    })
}

exports.addPost = async (req, res, next) => {
    try {

        let is_anon = false
        if(req.body.hideme) is_anon = true
        
        await post.create({
            content: req.body.inputData,
            postedBy: req.user._id,
            timestamp: Date.now(),
            lastReplyTimestamp: Date.now(),
            isAnonymous: is_anon
        })

        console.log(Date.now())

        let stat_ = await stat.findOne({})
        let post_ = await post.find().sort({ lastReplyTimestamp: -1 })
        post_ = modifyPostObj(post_)
        
        res.render('posts.hbs', {
            data: post_,
            pviews: stat_.postsPageHits
        })

    } catch (err) {

        next(err)

    }
}

exports.addPostErrorHandler = async (err, req, res, next) => {
    try {

        const stat_ = await stat.findOne({})
        let post_ = await post.find().sort({ lastReplyTimestamp: -1 })
        post_ = modifyPostObj(post_)
        
        res.render('posts.hbs', {
            data: post_,
            pviews: stat_.postsPageHits,
            errorMsg: err.message
        })

    } catch (error) {

        res.status(500).json("Error: Internal Server Error!")
        console.log(error)

    }
}

exports.getAllPosts = async (req, res, next) => {
    try {
        const stat_ = await stat.findOneAndUpdate(
            {}, 
            { $inc: { postsPageHits: 1 } }, 
            { new: true, upsert: true } 
          )


        let post_ = await post.find().sort({ lastReplyTimestamp: -1 })
        
        post_ = modifyPostObj(post_)
        
        res.render('posts.hbs', {
            data: post_,
            pviews: stat_.postsPageHits
        })
        
    } catch (err) {
        res.status(500).json({
            Error: err.message
        })
        console.log(err)
    }
}

exports.getPostPage = async (req, res, next) => {
    try {
        const id = req.params.id
        const post_ = await post.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
        
        res.render('singlePost.hbs', {
            data: post_.replies,
            con: post_.content,
            by: post_.postedBy,
            _id: post_._id,
            is_anon: post_.isAnonymous
        })

    } catch (err) {
        res.status(500).json("Error: Internal Server Error!")
    }
}

exports.addToPostPage = async (req, res, next) => {
    try {
        const id = req.params.id

        let is_anon = false
        if(req.body.hideme) is_anon = true
        
        const post_ = await post.findByIdAndUpdate(id, {
                $push: {
                    replies: {
                        content: req.body.inputData,
                        postedBy: req.user._id,
                        isAnonymous: is_anon,
                        timestamp: Date.now()
                    }
                },
                $set: { lastReplyTimestamp: Date.now() }
            }, 
            { runValidators: true }
        )
          
        res.redirect('/posts/' + id)
    } catch (err) {
        next(err)
    }
}

exports.addToPostPageErrorHandler = async (err, req, res, next) => {
    try {
        const id = req.params.id

        const post_ = await post.findById(id)

        res.render('singlePost.hbs', {
            data: post_.replies,
            con: post_.content,
            by: post_.postedBy,
            _id: post_._id,
            errorMsg: err.message
        })
    } catch (error) {
        res.status(500).json("Error: Internal Server Error!")
        console.log(error)
    }
}

