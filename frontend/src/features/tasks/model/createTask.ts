import { api } from "@/shared/config/api/api.config";
import type { Task } from "./task.types";
import axios from "axios";

interface CreateTaskData {
    title: string,
    description: string
}

export async function createTask(categoryId: number, data: CreateTaskData): Promise<Task> {
    const response = await axios.post(api.tasks.create(categoryId), data)
    return response.data
}