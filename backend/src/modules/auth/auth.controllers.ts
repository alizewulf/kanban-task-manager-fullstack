import type { Request, Response } from "express";
import {
  changeUserLogin,
  changeUserPassword,
  loginUser,
} from "./auth.services.js";

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

export async function changeLoginController(req: Request, res: Response) {
  const { userId, oldLogin, newLogin, password } = req.body;

  if (
    !Number.isInteger(Number(userId)) ||
    typeof oldLogin !== "string" ||
    typeof newLogin !== "string" ||
    typeof password !== "string" ||
    !newLogin.trim() ||
    newLogin.length > 50
  ) {
    return res.status(400).json({ message: "Invalid login change details" });
  }

  try {
    const result = await changeUserLogin(
      Number(userId),
      oldLogin,
      newLogin.trim(),
      password,
    );

    if (result === "LOGIN_TAKEN") {
      return res.status(409).json({ message: "This login is already in use" });
    }

    if (!result) {
      return res.status(401).json({ message: "Current login or password is incorrect" });
    }

    return res.status(200).json({ message: "Login updated", data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to update login" });
  }
}

export async function changePasswordController(req: Request, res: Response) {
  const { userId, oldPassword, newPassword } = req.body;

  if (
    !Number.isInteger(Number(userId)) ||
    typeof oldPassword !== "string" ||
    typeof newPassword !== "string" ||
    newPassword.length < 6 ||
    newPassword.length > 255
  ) {
    return res.status(400).json({ message: "New password must be 6–255 characters" });
  }

  try {
    const updated = await changeUserPassword(
      Number(userId),
      oldPassword,
      newPassword,
    );

    if (!updated) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to update password" });
  }
}
