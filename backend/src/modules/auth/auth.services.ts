import {pool} from "../../database/database.js";

export async function loginUser(login: string, password: string) {
  const result = await pool.query(
    "SELECT id, login FROM users WHERE login = $1 AND password = $2",
    [login, password],
  );
  return result.rows[0] ?? null
}

export async function changeUserLogin(
  userId: number,
  oldLogin: string,
  newLogin: string,
  password: string,
) {
  const currentUser = await pool.query(
    "SELECT id FROM users WHERE id = $1 AND login = $2 AND password = $3",
    [userId, oldLogin, password],
  );

  if (currentUser.rowCount === 0) {
    return null;
  }

  const existingLogin = await pool.query(
    "SELECT id FROM users WHERE login = $1 AND id <> $2",
    [newLogin, userId],
  );

  if (existingLogin.rowCount !== 0) {
    return "LOGIN_TAKEN" as const;
  }

  const result = await pool.query(
    "UPDATE users SET login = $1 WHERE id = $2 RETURNING id, login",
    [newLogin, userId],
  );

  return result.rows[0] ?? null;
}

export async function changeUserPassword(
  userId: number,
  oldPassword: string,
  newPassword: string,
) {
  const result = await pool.query(
    "UPDATE users SET password = $1 WHERE id = $2 AND password = $3 RETURNING id",
    [newPassword, userId, oldPassword],
  );

  return result.rowCount !== 0;
}
