import axios from "axios";
import type { Subtask } from "./subtask.types";
import { api } from "@/shared/config/api/api.config";

export async function getSubtasks(taskId:number): Promise<Subtask[]> {
    const response = await axios.get(api.subtasks.list(taskId));
    return response.data;
}
