import { Router } from "express";
import {
  createColumnController,
  getColumnsController,
  updateColumnController,
} from "./column.controller.js";

const router = Router();

router.get("/:userId", getColumnsController);

router.post("/:userId", createColumnController);

router.patch("/:id", updateColumnController);
export default router;