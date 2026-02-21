import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  updatePassword
} from "../controller/user.controller";

import { protect } from "../middleware/auth.middleware";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/update-password", protect,updatePassword);
export default router;