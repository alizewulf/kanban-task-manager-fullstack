import { apiClient } from "@/shared/config/api/apiClient"

import { api } from "@/shared/config/api/api.config"
import type { TaskCategory } from "./category.types"

export default async function updateCategory(
  columnId: number,
  categoryId: number,
  title: string
): Promise<TaskCategory> {
  const response = await apiClient.patch(
    api.categories.update(columnId, categoryId),
    { title }
  )

  return response.data
}
