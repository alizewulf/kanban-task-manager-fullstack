import type { Request, Response } from "express";
import { getTasks } from "./task.service.js";

export async function getTasksController(req: Request, res: Response) {
  try {
    const categoryId = Number(req.params.categoryId);

    if (isNaN(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const tasks = await getTasks(categoryId);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
