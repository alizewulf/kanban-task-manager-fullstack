import type { Request, Response } from "express";
import { createTask, getTasks } from "./task.service.js";

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

export async function createTaskController(req: Request, res: Response) {
    try {
        const categoryId = Number(req.params.categoryId);

        if (Number.isNaN(categoryId)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const {title, description} = req.body;
        
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({ message: "Invalid title" });
        }

        if (typeof description !== "string" || !description.trim()) {
            return res.status(400).json({ message: "Invalid description" });
        }

        const task = await createTask(categoryId, title, description);
        res.status(201).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}