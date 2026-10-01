import type { Request, Response } from "express";
import {
  changeUserLogin,
  changeUserPassword,
  createAccessToken,
  getUserById,
  loginUser,
} from "./auth.services.js";

function isUniqueViolation(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "23505";
}

export async function loginController(req: Request, res: Response) {
  const { login, password } = req.body ?? {};
  if (
    typeof login !== "string" ||
    !login.trim() ||
    login.trim().length > 50 ||
    typeof password !== "string" ||
    !password ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    return res.status(400).json({ message: "Invalid login or password" });
  }

  try {
    const user = await loginUser(login.trim(), password);

    if (!user) {
      return res.status(401).json({ message: "Invalid login or password" });
    }
    return res.status(200).json({
      message: "Login successful",
      data: user,
      accessToken: createAccessToken(user),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to log in" });
  }
}

export async function meController(req: Request, res: Response) {
  try {
    const user = await getUserById(req.user!.id);
    if (!user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to load user profile" });
  }
}

export async function changeLoginController(req: Request, res: Response) {
  const { newLogin, password } = req.body ?? {};

  if (
    typeof newLogin !== "string" ||
    typeof password !== "string" ||
    !newLogin.trim() ||
    newLogin.trim().length < 3 ||
    newLogin.trim().length > 50 ||
    !password ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    return res.status(400).json({ message: "Invalid login change details" });
  }

  try {
    const result = await changeUserLogin(
      req.user!.id,
      newLogin.trim(),
      password,
    );

    if (!result) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    return res.status(200).json({ message: "Login updated", data: result });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return res.status(409).json({ message: "This login is already in use" });
    }
    console.error(error);
    return res.status(500).json({ message: "Unable to update login" });
  }
}

export async function changePasswordController(req: Request, res: Response) {
  const { oldPassword, newPassword } = req.body ?? {};

  if (
    typeof oldPassword !== "string" ||
    typeof newPassword !== "string" ||
    !oldPassword ||
    Buffer.byteLength(oldPassword, "utf8") > 72 ||
    newPassword.length < 8 ||
    Buffer.byteLength(newPassword, "utf8") > 72
  ) {
    return res.status(400).json({ message: "New password must be 8–72 UTF-8 bytes" });
  }

  try {
    const updated = await changeUserPassword(
      req.user!.id,
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
