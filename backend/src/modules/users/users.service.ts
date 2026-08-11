import { pool } from "../../database/database.js";

export async function getUsers() {
    const result = await pool.query("SELECT * FROM users");

    return result.rows;
}

export async function createUser(login: string, password: string) {
    const result = await pool.query(
        "INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *",
        [login, password],
    );

    return result.rows[0];
}