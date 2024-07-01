import express  from "express";
import {sendMessage,getMessage} from '../controller/message.controller.js'
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/sendm/:id").post(protect,sendMessage);
router.route("/:conversationId").get(protect,getMessage);

export default router;

