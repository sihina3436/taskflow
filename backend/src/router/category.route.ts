import express from "express";
import { createCategory, getAllCategories } from "../controller/category.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protect, createCategory); //☑️
router.get("/", protect, getAllCategories); // ☑️

export default router;
