import { Router } from "express";
import { getSubtasksController } from "./subtasks.controller.js";
import { authenticateToken } from "../auth/auth.middleware.js";
import { requireOwnedResource } from "../auth/ownership.middleware.js";

const router = Router()

router.get("/tasks/:taskId/subtasks", authenticateToken, requireOwnedResource("task", "taskId"), getSubtasksController)

export default router