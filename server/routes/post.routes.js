import express from "express";
import { createPost, getPosts ,getPostById} from "../controller/post.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/newpost").post(protect, createPost);
router.route("/getpost").get(getPosts);
router.route('/:id').get(getPostById)
export default router;
