import { apiClient } from "@/shared/config/api/apiClient";
import { api } from "@/shared/config/api/api.config";
import type { Task } from "./task.types";

export async function getTasks(categoryId: number): Promise<Task[]> {
  const response = await apiClient.get(api.tasks.list(categoryId));

  return response.data;
}