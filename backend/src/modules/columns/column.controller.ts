import type { Request, Response } from "express";
import { getColumns, createColumn } from "./column.service.js";

export async function getColumnsController(req:Request, res:Response) {
    try {
        const userId = Number(req.params.userId)
        if (Number.isNaN(userId)) {
            return res.status(400).json({
                message: 'Invalid user ID'
            })
        }
        const columns = await getColumns(userId)
        res.status(200).json(columns)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Failed to get Columns'
        })
    }
}

export async function createColumnController(req:Request, res:Response) {
    try {
        const userId = Number(req.params.userId)
        if (Number.isNaN(userId)) {
            return res.status(400).json({
                message: 'Invalid user ID'
            })
        }
        const {title, position} = req.body
        const column = await createColumn(
            userId,
            title,
            position
        )
        res.status(201).json(column)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Failed to create column"
        })
    }
}