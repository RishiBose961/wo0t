import express from "express";
const router = express.Router();
import { loginUser, registerUser } from "../controller/user.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { signupSchema } from "../validator/auth.validator.js";

router.post("/register", validate(signupSchema), registerUser);
router.post("/login", loginUser);
export default router;
