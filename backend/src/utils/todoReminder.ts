import cron from "node-cron";
import Todo from "../models/todo.model";
import { io } from "./socket";

cron.schedule("*/5 * * * *", async () => {
  try {
    const now = new Date();
    const nextHour = new Date(now.getTime() + 60 * 60 * 1000);

    const todos = await Todo.find({
      due_date: { $gte: now, $lte: nextHour },
      completed: false,
      notified: false,
    });

    for (const todo of todos) {
      io.to(todo.user_id.toString()).emit("due_soon", {
        todoId: todo._id,
        title: todo.title,
        due_date: todo.due_date,
        priority: todo.priority,
      });

      todo.notified = true;
      await todo.save();
    }
  } catch (error) {
    console.error("Cron job error:", error);
  }
});
