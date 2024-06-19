import express from "express";
const router = express.Router();
import {
  loginUser,
  logoutUser,
  registerUser,
  getUserProfileSearch
} from "../controller/user.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { signupSchema } from "../validator/auth.validator.js";

router.post("/register", validate(signupSchema), registerUser);
router.post("/login", loginUser);
router.route("/getprofilesearch/:query").get(getUserProfileSearch);
router.post("/logout", logoutUser);
export default router;
