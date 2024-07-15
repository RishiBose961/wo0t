import express from "express";
import { createComments, getCommentsByPostId } from "../controller/comment.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/comments/:postId").post(protect, createComments);
router.route("/posts/:postId/comments").get(getCommentsByPostId);

export default router;