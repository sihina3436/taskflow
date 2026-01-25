import express from "express";
import {
  createTodo,
  getTodosByUser,
  getTodoById,
  getTodoByNowDatebyUser,
  updateTodoStatus,
  setTodoIsCompleted
} from "../controller/todo.controller";

import { getTodoStatusPercentage } from "../controller/todo.stats";

const router = express.Router();

router.post("/create", createTodo); // ☑️
router.get("/user/:userId", getTodosByUser);// ☑️
router.get("/date/:id", getTodoByNowDatebyUser);// ☑️
router.get("/status-percentage/:userId", getTodoStatusPercentage);// ☑️
router.get("/:id", getTodoById); // ☑️
router.put("/status/:todoId", updateTodoStatus);// ☑️
router.put("/complete/:todoId", setTodoIsCompleted);// ☑️

export default router;
