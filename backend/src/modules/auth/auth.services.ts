import {pool} from "../../database/database.js";

export async function loginUser(login: string, password: string) {
  const result = await pool.query(
    "SELECT id, login FROM users WHERE login = $1 AND password = $2",
    [login, password],
  );
  return result.rows[0] ?? null
}
