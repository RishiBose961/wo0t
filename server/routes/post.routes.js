import express from "express";
const router = express.Router();
import { createPost, getPosts } from "../controller/post.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/newpost").post(protect, createPost);
router.route("/getpost").get(getPosts);
export default router;
