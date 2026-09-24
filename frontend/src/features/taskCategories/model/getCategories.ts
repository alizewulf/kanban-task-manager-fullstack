import axios from "axios";

import { api } from "@/shared/config/api/api.config";
import type { TaskCategory } from "./category.types";

export async function getCategories(
  columnId: number
): Promise<TaskCategory[]> {
  const response = await axios.get(
    api.categories.list(columnId)
  );

  return response.data;
}