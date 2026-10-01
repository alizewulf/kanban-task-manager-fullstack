import { api } from "@/shared/config/api/api.config";
import type { Task } from "./task.types";
import { apiClient } from "@/shared/config/api/apiClient";

interface CreateTaskData {
    title: string,
    description: string
}

export async function createTask(categoryId: number, data: CreateTaskData): Promise<Task> {
    const response = await apiClient.post(api.tasks.create(categoryId), data)
    return response.data
}