import { Router } from "express";
import { getSubtasksController } from "./subtasks.controller.js";

const router = Router()

router.get("/tasks/:taskId/subtasks", getSubtasksController)

export default router