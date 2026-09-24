import { pool } from '../../database/database.js'

export async function getTasks(categoryId: number) {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE category_id = $1',
    [categoryId]
  )
  return result.rows
}

export async function createTask(categoryId: number, title: string, description: string) {
    const positionResult = await pool.query(
      'SELECT MAX(position) AS max_position FROM tasks WHERE category_id = $1',
      [categoryId]
    )

    const position = positionResult.rows[0].position

    const result = await pool.query(
      'INSERT INTO tasks (category_id, title, description, position) VALUES ($1, $2, $3, $4) RETURNING *',
      [categoryId, title, description, position + 1]
    )
    return result.rows[0]
}