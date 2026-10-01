import type { Request, Response } from "express";
import { createAccessToken } from "../auth/auth.services.js";
import { createUser } from "./users.service.js";

function isUniqueViolation(error: unknown) {
    return typeof error === "object" && error !== null && "code" in error && error.code === "23505";
}

export async function createUserController(
    req: Request,
    res: Response,
) {
    const { login, password } = req.body ?? {};

    if (
        typeof login !== "string" ||
        login.trim().length < 3 ||
        login.trim().length > 50 ||
        typeof password !== "string" ||
        password.length < 8 ||
        Buffer.byteLength(password, "utf8") > 72
    ) {
        return res.status(400).json({
            message: "Login must be 3–50 characters and password must be 8–72 UTF-8 bytes",
        });
    }

    try {
        const user = await createUser(login.trim(), password);

        return res.status(201).json({
            message: "User created successfully",
            data: user,
            accessToken: createAccessToken(user),
        });
    } catch (error) {
        if (isUniqueViolation(error)) {
            return res.status(409).json({ message: "This login is already in use" });
        }

        console.error(error);
        return res.status(500).json({ message: "Unable to create user" });
    }
}