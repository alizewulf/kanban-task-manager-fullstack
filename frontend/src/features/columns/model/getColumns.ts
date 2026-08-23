import { COLUMN_LINK } from "../config/columns.config";
import type { Column } from "./column.types";

export default async function getColumns(userId: number): Promise<Column[]> {
    try {
        const response = await fetch(`${COLUMN_LINK}/${userId}`)
        if (!response) {
            throw new Error("Failed to fetch columns!")
        }
        const data = response.json()
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}