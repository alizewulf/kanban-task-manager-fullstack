import type { Column } from "./column.types"
import createColumn from "./createColumn"
import createTaskCategory from "@/features/createTaskColumn/model/createTaskCategory"

export default async function createBoardWithFields(
  userId: number,
  title: string,
  fields: string[]
): Promise<Column> {
  const column = await createColumn(userId, title.trim())

  await Promise.all(
    fields
      .filter((field) => field.trim())
      .map((field) => createTaskCategory(column.id, field.trim()))
  )

  return column
}
