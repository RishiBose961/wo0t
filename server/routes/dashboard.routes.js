import express from "express";
import {getPostsByUser, getPostsByUserLike} from "../controller/dashboard.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/postlike').get(protect,getPostsByUserLike);
router.route('/postuser').get(protect,getPostsByUser);
export default router;
