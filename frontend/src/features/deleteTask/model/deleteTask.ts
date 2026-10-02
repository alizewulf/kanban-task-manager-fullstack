import { api } from "@/shared/config/api/api.config";
import { apiClient } from "@/shared/config/api/apiClient";

async function deleteTask(taskId: number): Promise<void> {
  await apiClient.delete(api.tasks.delete(taskId));
}

export default deleteTask;
