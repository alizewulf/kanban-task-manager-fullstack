import axios from "axios";

import type { Subtask } from "@/features/subtasks/model/subtask.types";
import type { Task } from "@/features/tasks/model/task.types";
import { api } from "@/shared/config/api/api.config";

export interface TaskDetailsSubtaskInput {
    id?: number;
    title: string;
    completed: boolean;
}

export interface UpdateTaskDetailsInput {
    title: string;
    description: string;
    subtasks: TaskDetailsSubtaskInput[];
}

export interface UpdatedTaskDetails {
    task: Task;
    subtasks: Subtask[];
}

export async function updateTaskDetails(
    taskId: number,
    data: UpdateTaskDetailsInput
): Promise<UpdatedTaskDetails> {
    const response = await axios.put(api.tasks.update(taskId), data);
    return response.data;
}
