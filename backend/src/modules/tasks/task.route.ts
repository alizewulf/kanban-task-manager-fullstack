import { Router } from "express";
import { getTasksController } from "./task.controller.js";

const router = Router();

router.get("/categories/:categoryId/tasks", getTasksController);

export default router;