import express from "express";
import { createLiveChat,getLiveChatByPostId } from "../controller/livechat.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/live/:postId").post(protect, createLiveChat);
router.route("/posts/:postId/live").get(getLiveChatByPostId);

export default router;