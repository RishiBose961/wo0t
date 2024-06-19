import express from "express";
import { createPost, getPostIndividual, getPosts } from "../controller/post.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/newpost").post(protect, createPost);
router.route("/getpost").get(getPosts);
router.route("/:descriptions").get(getPostIndividual)
export default router;
