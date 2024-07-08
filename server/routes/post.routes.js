import express from "express";
import { createPost, getPosts ,getPostById, miningTitle} from "../controller/post.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/newpost").post(protect, createPost);
router.route("/getpost").get(getPosts);
router.route('/:id').get(getPostById)
router.route('/generatetitle').post(protect, miningTitle);
export default router;
