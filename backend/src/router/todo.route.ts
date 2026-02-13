import express from "express";
import mongoose from "mongoose";
import {
  createTodo,
  getTodosByUser,
  getTodoById,
  getTodoByNowDatebyUser,
  updateTodoStatus,
  setTodoIsCompleted,
  deleteTodo
} from "../controller/todo.controller";

import { getTodoStatusPercentage } from "../controller/todo.stats";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

/* ===== specific routes FIRST ===== */

router.post("/create", protect, createTodo);

router.get("/user/:userId", protect, getTodosByUser);

router.get("/date/:id", protect, getTodoByNowDatebyUser);

router.get("/status-percentage/:userId", protect, getTodoStatusPercentage);

router.put("/status/:todoId", protect, updateTodoStatus);

router.put("/complete/:todoId", protect, setTodoIsCompleted);

router.delete("/:id", protect, deleteTodo);


/* ===== catch-all LAST ===== */

router.get("/:id", protect, (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  next();
}, getTodoById);

export default router;
