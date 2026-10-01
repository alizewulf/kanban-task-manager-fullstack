import type { RequestHandler } from "express";
import { pool } from "../../database/database.js";

type OwnedResource = "column" | "category" | "task";

const ownershipQueries: Record<OwnedResource, string> = {
  column: `SELECT 1 FROM columns WHERE id = $1 AND user_id = $2`,
  category: `
    SELECT 1
    FROM task_categories tc
    JOIN columns c ON c.id = tc.column_id
    WHERE tc.id = $1 AND c.user_id = $2
  `,
  task: `
    SELECT 1
    FROM tasks t
    JOIN task_categories tc ON tc.id = t.category_id
    JOIN columns c ON c.id = tc.column_id
    WHERE t.id = $1 AND c.user_id = $2
  `,
};

export function requireOwnedResource(
  resource: OwnedResource,
  parameter: string,
): RequestHandler {
  return async (req, res, next) => {
    const resourceId = Number(req.params[parameter]);
    if (!Number.isSafeInteger(resourceId) || resourceId < 1) {
      return res.status(400).json({ message: "Invalid resource ID" });
    }

    try {
      const result = await pool.query(ownershipQueries[resource], [resourceId, req.user!.id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Resource not found" });
      }
      return next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unable to verify resource access" });
    }
  };
}

export const requireAuthenticatedUserId: RequestHandler = (req, res, next) => {
  const requestedUserId = Number(req.params.userId);
  if (!Number.isSafeInteger(requestedUserId) || requestedUserId !== req.user!.id) {
    return res.status(404).json({ message: "Resource not found" });
  }
  return next();
};