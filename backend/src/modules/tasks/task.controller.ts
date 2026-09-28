import type { Request, Response } from "express";
import { createTask, getTasks, InvalidSubtaskIdsError, updateTaskDetails } from "./task.service.js";

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

export async function updateTaskDetailsController(req: Request, res: Response) {
  try {
    const taskId = Number(req.params.taskId);
    const { title, description, subtasks } = req.body ?? {};

    if (!Number.isSafeInteger(taskId) || taskId < 1) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    if (typeof title !== "string" || !title.trim() || title.trim().length > 255) {
      return res.status(400).json({ message: "Invalid title" });
    }

    if (typeof description !== "string" || !Array.isArray(subtasks)) {
      return res.status(400).json({ message: "Invalid task details" });
    }

    const seenIds = new Set<number>();
    for (const subtask of subtasks) {
      if (
        !subtask ||
        typeof subtask !== "object" ||
        typeof subtask.title !== "string" ||
        !subtask.title.trim() ||
        subtask.title.trim().length > 255 ||
        typeof subtask.completed !== "boolean" ||
        (subtask.id !== undefined && (!Number.isSafeInteger(subtask.id) || subtask.id < 1)) ||
        (subtask.id !== undefined && seenIds.has(subtask.id))
      ) {
        return res.status(400).json({ message: "Invalid subtasks" });
      }

      if (subtask.id !== undefined) {
        seenIds.add(subtask.id);
      }
    }

    const updated = await updateTaskDetails(taskId, title.trim(), description, subtasks.map((subtask) => ({
      ...(subtask.id === undefined ? {} : { id: subtask.id }),
      title: subtask.title.trim(),
      completed: subtask.completed,
    })));

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    if (error instanceof InvalidSubtaskIdsError) {
      return res.status(400).json({ message: "A subtask does not belong to this task" });
    }

    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}