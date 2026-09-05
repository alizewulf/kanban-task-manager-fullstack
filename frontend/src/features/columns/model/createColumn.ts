import axios from "axios"
import { COLUMN_LINK } from "../config/columns.config"
import type { Column } from "./column.types"

export default async function createColumn(
  userId: number,
  columnName: string
): Promise<Column> {
  try {
    const response = await axios.post(
      `${COLUMN_LINK}/${userId}`,
      { title: columnName }
    )

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("STATUS:", error.response?.status)
      console.log("DATA:", error.response?.data)
      console.log("URL:", error.config?.url)
      console.log("REQUEST:", error.config?.data)
    }

    throw error
  }
}