import { apiClient } from "@/shared/config/api/apiClient"

import { api } from "@/shared/config/api/api.config"

export default async function deleteCategory(
  columnId: number,
  categoryId: number
): Promise<void> {
  await apiClient.delete(
    api.categories.delete(columnId, categoryId)
  )
}
