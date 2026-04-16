import express from "express";
import { createPost, getPosts ,getPostById,showReleatedPosts,getPostsByUser, updatePost, deletePost} from "../controller/post.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/newpost").post(protect, createPost);
router.route("/getpost").get(getPosts);
router.route('/:id').get(getPostById)
router.route('/find/:category/:postId').get(showReleatedPosts);
router.route('/user/post').get(protect,getPostsByUser);
router.route('/update/:id').put(protect,updatePost);
router.route('/delete/:id').delete(protect,deletePost);
export default router;
