import { apiClient } from "@/shared/config/api/apiClient";
import type { Subtask } from "./subtask.types";
import { api } from "@/shared/config/api/api.config";

export async function getSubtasks(taskId:number): Promise<Subtask[]> {
    const response = await apiClient.get(api.subtasks.list(taskId));
    return response.data;
}
