import axios from "axios"

import { CATEGORY_LINK } from "@/shared/config/api/category.config"
import type { TaskCategory } from "@/features/taskCategories/model/category.types"

export default async function createTaskCategory(
  columnId: number,
  title: string
): Promise<TaskCategory> {
  try {
    const response = await axios.post(
      `${CATEGORY_LINK}/${columnId}/categories`,
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