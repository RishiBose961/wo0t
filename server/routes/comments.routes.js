import express from "express";
import { createComments, getCommentsByPostId,getCountCommentPostId } from "../controller/comment.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/comments/:postId").post(protect, createComments);
router.route("/posts/:postId/comments").get(getCommentsByPostId);
router.route("/:postId/count").get(getCountCommentPostId);


export default router;