import axios from "axios"
import { COLUMN_LINK } from "../config/columns.config"

export default async function createColumn(
  userId: number,
  columnName: string
): Promise<void> {
  try {
    const response = await axios.post(
      `${COLUMN_LINK}/${userId}`,
      { title: columnName }
    )

    console.log("CREATE COLUMN:", response.data)
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