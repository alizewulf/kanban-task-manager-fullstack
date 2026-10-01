import { api } from "../../../shared/config/api/api.config";
import { apiClient } from "../../../shared/config/api/apiClient";
import type { Column } from "./column.types";

export default async function getColumns(userId: number): Promise<Column[]> {
    try {
        const response = await apiClient.get<Column[]>(api.columns.list(userId))
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}