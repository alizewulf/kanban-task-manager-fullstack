import { Router } from "express";
import {
  createColumnController,
  getColumnsController,
  updateColumnController,
  deleteColumnController
} from "./column.controller.js";
import { authenticateToken } from "../auth/auth.middleware.js";
import { requireAuthenticatedUserId, requireOwnedResource } from "../auth/ownership.middleware.js";

const router = Router();

router.use(authenticateToken);

router.get("/:userId", requireAuthenticatedUserId, getColumnsController);

router.post("/:userId", requireAuthenticatedUserId, createColumnController);

router.patch("/:id", requireOwnedResource("column", "id"), updateColumnController);

router.delete("/:id", requireOwnedResource("column", "id"), deleteColumnController);

export default router;