import axios from "axios"

import { api } from "@/shared/config/api/api.config"
import type { TaskCategory } from "./category.types"

export default async function updateCategory(
  columnId: number,
  categoryId: number,
  title: string
): Promise<TaskCategory> {
  const response = await axios.patch(
    api.categories.update(columnId, categoryId),
    { title }
  )

  return response.data
}
