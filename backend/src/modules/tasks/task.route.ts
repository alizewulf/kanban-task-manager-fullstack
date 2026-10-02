import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getTasksController,
  moveTaskController,
  updateTaskDetailsController,
} from "./task.controller.js";
import { authenticateToken } from "../auth/auth.middleware.js";
import { requireOwnedResource } from "../auth/ownership.middleware.js";

const router = Router();

router.use(authenticateToken);

router.get("/categories/:categoryId/tasks", requireOwnedResource("category", "categoryId"), getTasksController);

router.post("/categories/:categoryId/tasks", requireOwnedResource("category", "categoryId"), createTaskController);

router.put("/tasks/:taskId", requireOwnedResource("task", "taskId"), updateTaskDetailsController);

router.delete("/tasks/:taskId", requireOwnedResource("task", "taskId"), deleteTaskController);

router.patch("/tasks/:taskId/move", requireOwnedResource("task", "taskId"), moveTaskController);

export default router;