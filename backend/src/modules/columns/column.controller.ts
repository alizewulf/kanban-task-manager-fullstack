import type { Request, Response } from "express"
import { getColumns, createColumn, updateColumn, deleteColumn } from "./column.service.js"

export async function getColumnsController(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId)

    if (Number.isNaN(userId)) {
      return res.status(400).json({
        message: "Invalid user ID"
      })
    }

    const columns = await getColumns(userId)

    res.status(200).json(columns)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to get Columns"
    })
  }
}

export async function createColumnController(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId)

    if (Number.isNaN(userId)) {
      return res.status(400).json({
        message: "Invalid user ID"
      })
    }

    const { title } = req.body

    const column = await createColumn(
      userId,
      title
    )

    res.status(201).json(column)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to create column"
    })
  }
}

export async function updateColumnController(
  req: Request,
  res: Response
) {
  try {
    const columnId = Number(req.params.id)

    if (Number.isNaN(columnId)) {
      return res.status(400).json({
        message: "Invalid column ID"
      })
    }

    const { title } = req.body

    const column = await updateColumn(
      columnId,
      title
    )

    res.status(200).json(column)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to update column"
    })
  }
}

export async function deleteColumnController(
  req: Request,
  res: Response
) {
  try {
    const columnId = Number(req.params.id)

    if (Number.isNaN(columnId)) {
      return res.status(400).json({
        message: "Invalid column ID"
      })
    }

    await deleteColumn(columnId)

    res.status(200).json({ message: "Column deleted successfully" })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to delete column"
    })
  }
}