import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { server_config } from "../../config/config.js";

export const authenticateToken: RequestHandler = (req, res, next) => {
  const authorization = req.header("authorization");
  const match = authorization?.match(/^Bearer\s+([^\s]+)$/i);

  if (!match) {
    return res.status(401).json({
      code: authorization ? "AUTH_TOKEN_INVALID" : "AUTH_REQUIRED",
      message: authorization ? "Invalid access token" : "Authentication required",
    });
  }

  try {
    const payload = jwt.verify(match[1]!, server_config.jwtSecret, {
      algorithms: ["HS256"],
    });

    if (typeof payload === "string" || typeof payload.sub !== "string") {
      return res.status(401).json({
        code: "AUTH_TOKEN_INVALID",
        message: "Invalid access token",
      });
    }

    const id = Number(payload.sub);
    if (!Number.isSafeInteger(id) || id < 1) {
      return res.status(401).json({
        code: "AUTH_TOKEN_INVALID",
        message: "Invalid access token",
      });
    }

    req.user = { id };
    return next();
  } catch {
    return res.status(401).json({
      code: "AUTH_TOKEN_INVALID",
      message: "Invalid or expired access token",
    });
  }
};
