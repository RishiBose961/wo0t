import express from "express";
import { createLikes, createunLikes,findLikesByUserController } from "../controller/likes.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/:postId/like").post(protect, createLikes);
router.route("/:postId/unlike").post(protect, createunLikes);
router.route("/getlikes").get(protect, findLikesByUserController);

export default router;
