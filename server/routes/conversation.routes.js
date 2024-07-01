import express from "express";
import { allChatUser, getConversation } from "../controller/conversation.controller.js";
const router = express.Router();


router.route("/conn/:userId").get(getConversation);
router.route("/search").get(allChatUser);
export default router;
