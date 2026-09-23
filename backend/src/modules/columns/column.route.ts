import { Router } from "express";
import {
  createColumnController,
  getColumnsController,
  updateColumnController,
  deleteColumnController
} from "./column.controller.js";

const router = Router();

router.get("/:userId", getColumnsController);

router.post("/:userId", createColumnController);

router.patch("/:id", updateColumnController);

router.delete("/:id", deleteColumnController);

export default router;