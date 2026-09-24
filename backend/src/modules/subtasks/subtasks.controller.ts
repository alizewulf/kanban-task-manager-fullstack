import type {Request, Response} from "express";
import { getSubtasks } from "./subtasks.service.js";

export async function getSubtasksController(req: Request, res: Response) {
    try {
        const taskId = Number(req.params.taskId);
        
        if (Number.isNaN(taskId)) {
            return res.status(400).json({
                message: "Invalid Task ID"
            })
        }

        const subtasks = await getSubtasks(taskId);
        return res.status(200).json(subtasks);
    } catch (error) {
        console.error(error)
        
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}