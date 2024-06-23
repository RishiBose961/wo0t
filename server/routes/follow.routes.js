import express from "express";
import { FollowCreate } from "../controller/follow.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/follow/:id").post(protect, FollowCreate);

export default router;
