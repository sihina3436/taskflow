import cron from "node-cron";
import Todo from "../models/todo.model";
import { Server } from "socket.io";

export const startReminder = (io: Server) => {
  cron.schedule("*/1 * * * *", async () => {
    try {
      console.log("⏳ Cron running...");

      const now = Date.now();
      const oneHourLater = now + 60 * 60 * 1000;

      const todos = await Todo.find({
        due_date: { $exists: true },
        completed: false,
        notified: false,
      });

      console.log("📌 Checking todos:", todos.length);

      for (const todo of todos) {
        if (!todo.due_date) continue;

        const dueTime = new Date(todo.due_date).getTime();

        // 🔥 Compare timestamps (timezone safe)
        if (dueTime >= now && dueTime <= oneHourLater) {
          console.log("🔔 Sending reminder to:", todo.user_id.toString());

          io.to(todo.user_id.toString()).emit("due_soon", {
            todoId: todo._id,
            title: todo.title,
            due_date: todo.due_date,
            priority: todo.priority,
          });

          todo.notified = true;
          await todo.save();
        }
      }

    } catch (error) {
      console.error("❌ Cron error:", error);
    }
  });
};
