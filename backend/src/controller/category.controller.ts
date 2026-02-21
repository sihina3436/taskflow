import { Request, Response } from "express";
import Category from "../models/category.model";

// Create Category
export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { name, description } = req.body;

    if (!name) {
      res.status(400).json({ message: "Category name is required" });
      return;
    }

    // Prevent duplicate category per user
    const existing = await Category.findOne({
      name,
      user_id: req.user.id,
    });

    if (existing) {
      res.status(400).json({ message: "Category already exists" });
      return;
    }

    const category = await Category.create({
      name,
      description,
      user_id: req.user.id,
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });

  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Categories
export const getAllCategoriesByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const categories = await Category.find({
      user_id: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(categories);

  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Category
export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const { id } = req.params;

    const category = await Category.findOneAndDelete({
      _id: id,
      user_id: req.user.id,
    });

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Server error" });
  }
};
