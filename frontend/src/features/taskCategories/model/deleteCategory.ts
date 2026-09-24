import axios from "axios"

import { api } from "@/shared/config/api/api.config"

export default async function deleteCategory(
  columnId: number,
  categoryId: number
): Promise<void> {
  await axios.delete(
    api.categories.delete(columnId, categoryId)
  )
}
