import { apiClient } from "@/shared/config/api/apiClient";

import { api } from "@/shared/config/api/api.config";
import type { TaskCategory } from "./category.types";

export async function getCategories(
  columnId: number
): Promise<TaskCategory[]> {
  const response = await apiClient.get(
    api.categories.list(columnId)
  );

  return response.data;
}