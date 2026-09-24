import axios from "axios";
import { api } from "@/shared/config/api/api.config";
import type { Task } from "./task.types";

export async function getTasks(categoryId: number): Promise<Task[]> {
  const response = await axios.get(api.tasks.list(categoryId));

  return response.data;
}