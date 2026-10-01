import axios from "axios"
import { apiClient } from "@/shared/config/api/apiClient"

import { api } from "@/shared/config/api/api.config"
import type { TaskCategory } from "@/features/taskCategories/model/category.types"

export default async function createTaskCategory(
  columnId: number,
  title: string
): Promise<TaskCategory> {
  try {
    const response = await apiClient.post(
      api.categories.create(columnId),
      { title }
    )

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("STATUS:", error.response?.status)
      console.log("DATA:", error.response?.data)
      console.log("URL:", error.config?.url)
      console.log("REQUEST:", error.config?.data)
    }

    throw error
  }
}