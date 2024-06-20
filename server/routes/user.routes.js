import express from "express";
const router = express.Router();
import {
  loginUser,
  logoutUser,
  registerUser,
  getUserProfileSearch,
  geminiApiKeyAdd
} from "../controller/user.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { signupSchema } from "../validator/auth.validator.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/register", validate(signupSchema), registerUser);
router.post("/login", loginUser);
router.route("/getprofilesearch/:query").get(getUserProfileSearch);
router.route("/geminiupdate").put(protect,geminiApiKeyAdd);
router.post("/logout", logoutUser);
export default router;
