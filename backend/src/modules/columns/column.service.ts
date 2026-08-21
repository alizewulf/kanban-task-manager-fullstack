import { pool } from "../../database/database.js";

export async function getColumns(userId:number) {
  const result = await pool.query(
    `SELECT * FROM columns WHERE user_id = $1 ORDER BY position`,[userId]
  );
  return result.rows;
}

export async function createColumn(userId:number, title:string, position:number) {
  const result = await pool.query(
    `
        INSERT INTO columns (user_id, title, position)
        VALUES ($1, $2, $3)
        RETURNING *
    `,
    [userId, title,position]);
    return result.rows[0]
}
