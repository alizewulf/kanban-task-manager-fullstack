import axios from "axios";

import type { Task } from "./task.types";
import { api } from "@/shared/config/api/api.config";

export interface MoveTaskInput {
    targetCategoryId: number;
    beforeTaskId: number | null;
}

export interface MoveTaskResult {
    sourceCategoryId: number;
    targetCategoryId: number;
    sourceTasks: Task[];
    targetTasks: Task[];
}

export async function moveTask(taskId: number, data: MoveTaskInput): Promise<MoveTaskResult> {
    const response = await axios.patch(api.tasks.move(taskId), data);
    return response.data;
}
