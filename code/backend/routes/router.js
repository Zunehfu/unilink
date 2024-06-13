import express from "express";
import authController from "../controllers/authController.js";
import postController from "../controllers/postController.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.route("/signin").post(authController.verifySignin);
router.route("/signup").post(authController.verifySignup);

router
    .route("/search")
    .get(authController.protectRoute, userController.getLikeUsers);

router
    .route("/posts")
    .get(authController.protectRoute, postController.getPosts)
    .post(authController.protectRoute, postController.addPost);

router
    .route("/shouts")
    .get(authController.protectRoute, postController.getPostsByUserId);

router
    .route("/posts/:post_id/comments")
    .post(authController.protectRoute, postController.addComment)
    .get(authController.protectRoute, postController.getComments);

router
    .route("/posts/:post_id/likes")
    .post(authController.protectRoute, postController.addLike)
    .delete(authController.protectRoute, postController.removeLike);

router
    .route("/users")
    .get(authController.protectRoute, userController.getUserWithId);

router
    .route("/palproposals")
    .post(authController.protectRoute, userController.sendPalProposal)
    .delete(authController.protectRoute, userController.removePalProposal);

router
    .route("/mypalproposals")
    .delete(authController.protectRoute, userController.removeMyPalProposal)
    .get(authController.protectRoute, userController.getMyPalProposals);

router
    .route("/pals")
    // .get(authController.protectRoute, userController.getPals) //handle seeing getting all my pals or others pals
    .delete(authController.protectRoute, userController.removePal); //handle deleting one of my pals

router.route("/validate").get(authController.validate);

router
    .route("/betaresponse")
    .post(authController.protectRoute, userController.betaresponse);

export default router;
