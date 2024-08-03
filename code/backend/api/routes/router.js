import express from "express";
import authController from "../controllers/authController.js";
import postController from "../controllers/postController.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.route("/signin").post(authController.verifySignin);
router.route("/signup").post(authController.verifySignup);

router
    .route("/sendemailverificationtoken")
    .post(authController.sendEmailVerificationToken);
router
    .route("/verifyemailverificationtoken")
    .post(authController.verifyEmailVerificationToken);

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

router.route("/checkusername").get(userController.checkUsername);

export default router;

// A more restful API. This will be implemented in the future
/*import express from "express";
import authController from "../controllers/authController.js";
import postController from "../controllers/postController.js";
import userController from "../controllers/userController.js";

const router = express.Router();

// Authentication routes
router.route("/api/auth/signin").post(authController.verifySignin);
router.route("/api/auth/signup").post(authController.verifySignup);
router.route("/api/auth/email/verification-token").post(authController.sendEmailVerificationToken);
router.route("/api/auth/email/verify-token").post(authController.verifyEmailVerificationToken);

// User routes
router.route("/api/users/search").get(authController.protectRoute, userController.getLikeUsers);
router.route("/api/users/:userId").get(authController.protectRoute, userController.getUserWithId);
router.route("/api/users/:userId/pal-proposals")
    .post(authController.protectRoute, userController.sendPalProposal)
    .delete(authController.protectRoute, userController.removePalProposal);
router.route("/api/users/me/pal-proposals")
    .get(authController.protectRoute, userController.getMyPalProposals)
    .delete(authController.protectRoute, userController.removeMyPalProposal);
router.route("/api/users/me/pals/:palId").delete(authController.protectRoute, userController.removePal);
router.route("/api/users/me/beta-response").post(authController.protectRoute, userController.betaresponse);
router.route("/api/users/check-username").get(userController.checkUsername);

// Post routes
router.route("/api/posts")
    .get(authController.protectRoute, postController.getPosts)
    .post(authController.protectRoute, postController.addPost);
router.route("/api/users/:userId/posts").get(authController.protectRoute, postController.getPostsByUserId);
router.route("/api/posts/:postId/comments")
    .post(authController.protectRoute, postController.addComment)
    .get(authController.protectRoute, postController.getComments);
router.route("/api/posts/:postId/likes")
    .post(authController.protectRoute, postController.addLike)
    .delete(authController.protectRoute, postController.removeLike);

// Validation route
router.route("/api/auth/validate").get(authController.validate);

export default router;
*/
