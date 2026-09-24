import type { Request, Response } from "express";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./category.service.js";

export async function getCategoriesController(req: Request, res: Response) {
  try {
    const columnId = Number(req.params.columnId);

    if (Number.isNaN(columnId)) {
      return res.status(400).json({
        message: "Invalid columnId",
      });
    }

    const categories = await getCategories(columnId);

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function createCategoryController(req: Request, res: Response) {
  try {
    const columnId = Number(req.params.columnId);

    if (Number.isNaN(columnId)) {
      return res.status(400).json({
        message: "Invalid columnId",
      });
    }

    const { title } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Invalid title",
      });
    }

    const category = await createCategory(columnId, title.trim());

    res.status(201).json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function updateCategoryController(req: Request, res: Response) {
  try {
    const columnId = Number(req.params.columnId);
    const categoryId = Number(req.params.categoryId);

    if (Number.isNaN(columnId) || Number.isNaN(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const { title } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ message: "Invalid title" });
    }

    const category = await updateCategory(columnId, categoryId, title.trim());

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteCategoryController(req: Request, res: Response) {
  try {
    const columnId = Number(req.params.columnId);
    const categoryId = Number(req.params.categoryId);

    if (Number.isNaN(columnId) || Number.isNaN(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const category = await deleteCategory(columnId, categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
