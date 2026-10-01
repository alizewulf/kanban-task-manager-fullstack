import {pool} from "../../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { server_config } from "../../config/config.js";

const BCRYPT_ROUNDS = 12;
const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$/;

export interface PublicUser {
  id: number;
  login: string;
}

export function createAccessToken(user: PublicUser) {
  return jwt.sign({}, server_config.jwtSecret, {
    algorithm: "HS256",
    subject: String(user.id),
    expiresIn: "15m",
  });
}

export async function getUserById(userId: number): Promise<PublicUser | null> {
  const result = await pool.query(
    "SELECT id, login FROM users WHERE id = $1",
    [userId],
  );
  return result.rows[0] ?? null;
}

export async function loginUser(login: string, password: string): Promise<PublicUser | null> {
  const result = await pool.query(
    "SELECT id, login, password_hash FROM users WHERE LOWER(BTRIM(login)) = LOWER($1)",
    [login.trim()],
  );
  const user = result.rows[0] as (PublicUser & { password_hash: string }) | undefined;

  if (!user) {
    return null;
  }

  const isBcryptHash = BCRYPT_HASH_PATTERN.test(user.password_hash);
  const passwordMatches = isBcryptHash
    ? await bcrypt.compare(password, user.password_hash)
    : user.password_hash === password;

  if (!passwordMatches) {
    return null;
  }

  if (!isBcryptHash) {
    const upgradedHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    await pool.query(
      "UPDATE users SET password_hash = $1 WHERE id = $2 AND password_hash = $3",
      [upgradedHash, user.id, user.password_hash],
    );
  }

  return { id: user.id, login: user.login };
}

export async function changeUserLogin(
  userId: number,
  newLogin: string,
  password: string,
) {
  const currentUser = await pool.query(
    "SELECT password_hash FROM users WHERE id = $1",
    [userId],
  );

  const passwordHash = currentUser.rows[0]?.password_hash as string | undefined;
  if (!passwordHash || !(await bcrypt.compare(password, passwordHash))) {
    return null;
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
  const currentUser = await pool.query(
    "SELECT password_hash FROM users WHERE id = $1",
    [userId],
  );
  const passwordHash = currentUser.rows[0]?.password_hash as string | undefined;

  if (!passwordHash || !(await bcrypt.compare(oldPassword, passwordHash))) {
    return false;
  }

  const newPasswordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
  const result = await pool.query(
    "UPDATE users SET password_hash = $1 WHERE id = $2 RETURNING id",
    [newPasswordHash, userId],
  );

  return result.rowCount !== 0;
}
