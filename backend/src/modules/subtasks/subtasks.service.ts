import { pool } from "../../database/database.js"

export async function getSubtasks(taskId: number) {
    const result = await pool.query(
        `SELECT * FROM subtasks WHERE task_id = $1`,
        [taskId]
    )
    return result.rows
}