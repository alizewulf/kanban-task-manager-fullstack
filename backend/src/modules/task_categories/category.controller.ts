import type { Request, Response } from "express";

import { getCategories, createCategory } from "./category.service.js";

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
