const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret || jwtSecret.length < 32) {
    throw new Error("JWT_SECRET must be set and contain at least 32 characters");
}

export const server_config = {
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || "localhost",
    jwtSecret,
};
