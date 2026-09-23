import { pool } from "../../database/database.js";
import { generateColor } from "../../utils/generateColor.js";

export async function getCategories(columnId: number) {
  const result = await pool.query(
    `
      SELECT *
      FROM task_categories
      WHERE column_id = $1
      ORDER BY position
    `,
    [columnId]
  );

  return result.rows;
}

export async function createCategory(
  columnId: number,
  title: string
) {
  const positionResult = await pool.query(
    `
      SELECT COALESCE(MAX(position), 0) + 1 AS position
      FROM task_categories
      WHERE column_id = $1
    `,
    [columnId]
  );

  const position = positionResult.rows[0].position;

  const color = generateColor();

  const result = await pool.query(
    `
      INSERT INTO task_categories (
        column_id,
        title,
        position,
        color
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
    [
      columnId,
      title,
      position,
      color
    ]
  );

  return result.rows[0];
}