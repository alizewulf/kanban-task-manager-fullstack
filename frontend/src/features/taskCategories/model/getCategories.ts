import axios from "axios";

import { CATEGORY_LINK } from "@/shared/config/api/category.config";
import type { TaskCategory } from "./category.types";

export async function getCategories(
  columnId: number
): Promise<TaskCategory[]> {
  const response = await axios.get(
    `${CATEGORY_LINK}/${columnId}/categories`
  );

  return response.data;
}