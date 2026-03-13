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
import { hasRole, protect } from "../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/getprofilesearch/:query").get(protect,hasRole('admin'),getUserProfileSearch);
router.route("/geminiupdate").put(protect,geminiApiKeyAdd);
router.post("/logout", logoutUser);
export default router;
