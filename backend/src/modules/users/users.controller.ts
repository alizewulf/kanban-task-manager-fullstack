import type { Request, Response } from "express";
import { createUser, getUsers } from "./users.service.js";

export async function getUsersController(
    _req: Request,
    res: Response,
) {
    try {
        const users = await getUsers();

        res.status(200).json(users);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database error",
        });
    }
}

export async function createUserController(
    req: Request,
    res: Response,
) {
    try {
        const { login, password } = req.body;

        const user = await createUser(login, password);

        res.status(201).json({
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database error",
        });
    }
}