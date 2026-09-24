import { pool } from '../../database/database.js'

export async function getTasks(categoryId: number) {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE category_id = $1',
    [categoryId]
  )
  return result.rows
}