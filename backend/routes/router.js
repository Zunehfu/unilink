const express = require("express");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");

const router = express.Router();

router
    .route("/posts")
    .get(authController.protectRoute, postController.getPosts)
    .post(authController.protectRoute, postController.addPost);

router
    .route("/posts/:post_id/comments")
    .post(authController.protectRoute, postController.addComment)
    .get(authController.protectRoute, postController.getComments);

router.route("/signin").post(authController.verifySignin);

router.route("/signup").post(authController.verifySignup);

router
    .route("/users")
    .get(authController.protectRoute, userController.getUserWithId);

router.route("/validate").get(authController.validate);

router
    .route("/betaresponse")
    .post(authController.protectRoute, userController.betaresponse);

module.exports = router;
