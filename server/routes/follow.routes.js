import express from "express";
import { FollowCreate, UnFollowCreate, getFollowing } from "../controller/follow.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/follow/:id").post(protect, FollowCreate);
router.route("/unfollow/:id").post(protect, UnFollowCreate);
router.route("/getfollowing/:userId").get(protect, getFollowing);
export default router;
