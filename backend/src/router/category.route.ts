import express from "express";
import {
  createCategory,
  getAllCategoriesByUser,
  deleteCategory
} from "../controller/category.controller";

import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protect, createCategory);
router.get("/:id", protect, getAllCategoriesByUser);
router.delete("/:id", protect, deleteCategory);

export default router;
