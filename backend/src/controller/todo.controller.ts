import { Request, Response } from "express";
import Todo from "../models/todo.model";

// CREATE TODO
export const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, title, description, due_date, priority, status, image, category } = req.body;

    if (!user_id || !title || !image) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const todo = await Todo.create({
      user_id,
      title,
      description,
      due_date,
      priority,
      status,
      image,
      category,
    });

    res.status(201).json({
      message: "Todo created successfully",
      todo,
    });

  } catch (error) {
    console.error("Create Todo Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET TODOS BY USER
export const getTodosByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const todos = await Todo.find({ user_id: userId }).sort({ createdAt: -1 });

    res.status(200).json(todos);
  } catch (error) {
    console.error("Get Todos Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET TODO BY ID
export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json(todo);
  } catch (error) {
    console.error("Get Todo By ID Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET TODAY TODOS BY USER
export const getTodoByNowDatebyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const todos = await Todo.find({
      user_id: id,
      due_date: { $gte: start, $lte: end },
    });

    res.status(200).json(todos);
  } catch (error) {
    console.error("Get Today Todos Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE TODO STATUS
export const updateTodoStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { todoId } = req.params;
    const { status } = req.body;

    const updated = await Todo.findByIdAndUpdate(
      todoId,
      { status },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json({
      message: "Status updated",
      todo: updated,
    });

  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// MARK TODO COMPLETED
export const setTodoIsCompleted = async (req: Request, res: Response): Promise<void> => {
  try {
    const { todoId } = req.params;

    const updated = await Todo.findByIdAndUpdate(
      todoId,
      { completed: true, status: "Completed" },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json({
      message: "Todo marked as completed",
      todo: updated,
    });

  } catch (error) {
    console.error("Set Completed Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
