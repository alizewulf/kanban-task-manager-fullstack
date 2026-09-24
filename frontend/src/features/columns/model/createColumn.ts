import axios from "axios"
import { api } from "../../../shared/config/api/api.config"
import type { Column } from "./column.types"

export default async function createColumn(
  userId: number,
  columnName: string
): Promise<Column> {
  try {
    const response = await axios.post(
      api.columns.create(userId),
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