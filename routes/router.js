const express = require('express')
const authController = require('../controllers/authController')
const postController = require('../controllers/postController')

const router = express.Router()

router.route('/posts')
    .get(authController.protect, postController.getAllPosts)
    .post(postController.addPost, postController.addPostErrorHandler)

router.route('/posts/:id')
    .get(postController.getPostPage)
    .post(postController.addToPostPage, postController.addToPostPageErrorHandler)

router.route('/signin')
    .get(authController.getSigninPage)
    .post(authController.verifySignin)

router.route('/')
    .get((req, res) => {res.redirect('/signin')})

router.route('/signup')
    .get((req, res) => {res.send('signup page')})
    .post(authController.verifySignup)

module.exports = router
