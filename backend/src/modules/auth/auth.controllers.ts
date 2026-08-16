import type { Request, Response } from "express";
import { loginUser } from "./auth.services.js";

export async function loginController(req: Request, res: Response) {
  try {
    const { login, password } = req.body;
    const user = await loginUser(login, password);

    if (!user) {
      return res.status(401).json({
        message: "Invalid login or password",
      });
    }
    return res.status(200).json({
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Internal server error",
    });
  }
}
