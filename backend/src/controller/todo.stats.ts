import { Request, Response } from "express";
import Todo from "../models/todo.model";


export const getTodoStatusPercentage = async (req: Request, res: Response): Promise<void> => {
    try{
        const userId = req.params.userId;
        const totalTodos = await Todo.countDocuments({ user_id: userId });
        const completedTodos =  await Todo.countDocuments({ user_id: userId, status: 'Completed'});
        const InProgressTodos = await Todo.countDocuments({ user_id: userId, status: 'In Progress'});
        const OverdueTodos = await Todo.countDocuments({ user_id: userId, status: 'Overdue'});
        const NotStartedTodos = await Todo.countDocuments({ user_id: userId, status: 'Not Started'});




const percentage = totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100 * 100) / 100;
const inProgressPercentage = totalTodos === 0 ? 0 : Math.round((InProgressTodos / totalTodos) * 100 * 100) / 100;
const overduePercentage = totalTodos === 0 ? 0 : Math.round((OverdueTodos / totalTodos) * 100 * 100) / 100;
const notStartedPercentage = totalTodos === 0 ? 0 : Math.round((NotStartedTodos / totalTodos) * 100 * 100) / 100;

        

        res.status(200).json({ percentage, inProgressPercentage, overduePercentage, notStartedPercentage });
    }catch(error){
        console.error("Error getting percentage of completed todos:", error);
        res.status(500).json({ message: "Server error" });
    }
}