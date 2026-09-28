import { Router } from "express";
import { createTaskController, getTasksController, moveTaskController, updateTaskDetailsController } from "./task.controller.js";

const router = Router();

router.get("/categories/:categoryId/tasks", getTasksController);

router.post("/categories/:categoryId/tasks", createTaskController);

router.put("/tasks/:taskId", updateTaskDetailsController);

router.patch("/tasks/:taskId/move", moveTaskController);

export default router;