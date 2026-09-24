import { Router } from "express";
import { createTaskController, getTasksController } from "./task.controller.js";

const router = Router();

router.get("/categories/:categoryId/tasks", getTasksController);

router.post("/categories/:categoryId/tasks", createTaskController);

export default router;