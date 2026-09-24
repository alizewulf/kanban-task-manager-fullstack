import axios from "axios"

import { CATEGORY_LINK } from "@/shared/config/api/category.config"
import type { TaskCategory } from "./category.types"

export default async function updateCategory(
  columnId: number,
  categoryId: number,
  title: string
): Promise<TaskCategory> {
  const response = await axios.patch(
    `${CATEGORY_LINK}/${columnId}/categories/${categoryId}`,
    { title }
  )

  return response.data
}
