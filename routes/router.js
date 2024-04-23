const express = require('express')
const authController = require('../controllers/authController')
const postController = require('../controllers/postController')
const userController = require('../controllers/userController')

const router = express.Router()

router.route('/posts')
    .get(authController.protectRoute, postController.getAllPosts)
    .post(authController.protectRoute, postController.addPost, postController.addPostErrorHandler)

router.route('/posts/:id')
    .get(authController.protectRoute, postController.getPostPage)
    .post(authController.protectRoute, postController.addToPostPage, postController.addToPostPageErrorHandler)

router.route('/')
    .get((req, res) => { res.redirect('/signin') })

router.route('/signin')
    .post(authController.verifySignin)

router.route('/signup')
    .post(authController.verifySignup)

router.route('/users')
    .get(authController.protectRoute, userController.getAllUsers)

router.route('/users/:id')
    .post(authController.protectRoute, userController.updateUserWithId)
    .get(authController.protectRoute, userController.getUserWithId)

router.route('/users/:id/friends')
    .get(authController.protectRoute, userController.getFriendsWithId)
    .post(authController.protectRoute, userController.addFriend)

module.exports = router
