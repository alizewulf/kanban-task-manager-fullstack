import { pool } from "../../database/database.js";
import bcrypt from "bcrypt";

export async function createUser(login: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 12);
    const result = await pool.query(
        "INSERT INTO users (login, password_hash) VALUES ($1, $2) RETURNING id, login",
        [login, passwordHash],
    );

    return result.rows[0];
}