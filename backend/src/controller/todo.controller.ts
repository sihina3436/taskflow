import { Request, Response } from "express";
import Todo from "../models/todo.model";
import { AuthRequest } from "../middleware/auth.middleware";

// create Task

export const createTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, due_date, priority, status, category } = req.body;

    if (!title) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const user_id = (req.user as any).id;

    const todo = await Todo.create({
      user_id,
      title,
      description,
      due_date,
      priority,
      status,
      category
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


// get tasks by User
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

// get Task by Id
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


// get Task by Now Date
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

// update Task status

export const updateTodoStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { todoId } = req.params;
    const { status } = req.body;

    const updated = await Todo.findByIdAndUpdate(
      todoId,
      {
        status,
        completed: status === "Completed", 
      },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

   
    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// update Task isCompleted

export const setTodoIsCompleted = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { todoId } = req.params;
    const { completed } = req.body;

    const updated = await Todo.findByIdAndUpdate(
      todoId,
      {
        completed,
        status: completed ? "Completed" : "In Progress",
      },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// delete Task

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
