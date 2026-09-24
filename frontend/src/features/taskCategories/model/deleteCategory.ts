import axios from "axios"

import { CATEGORY_LINK } from "@/shared/config/api/category.config"

export default async function deleteCategory(
  columnId: number,
  categoryId: number
): Promise<void> {
  await axios.delete(
    `${CATEGORY_LINK}/${columnId}/categories/${categoryId}`
  )
}
