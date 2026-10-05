import pg from "pg";

const { Pool } = pg;

const hasDatabaseConfig =
    Boolean(process.env.DATABASE_URL) ||
    Boolean(
        process.env.DB_HOST &&
        process.env.DB_NAME &&
        process.env.DB_USER &&
        process.env.DB_PASSWORD,
    );

if (!hasDatabaseConfig) {
    throw new Error(
        "Database configuration is missing. Set DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD or DATABASE_URL.",
    );
}

const neonSsl =
    process.env.DATABASE_URL || process.env.DB_HOST?.includes("neon.tech")
        ? { rejectUnauthorized: false }
        : undefined;

export const pool = new Pool(
    process.env.DATABASE_URL
        ? {
              connectionString: process.env.DATABASE_URL,
              ssl: neonSsl,
          }
        : {
              host: process.env.DB_HOST,
              port: Number(process.env.DB_PORT ?? 5432),
              database: process.env.DB_NAME,
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              ssl: neonSsl,
          },
);