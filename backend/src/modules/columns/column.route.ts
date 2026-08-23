import { Router } from "express";
import {
  createColumnController,
  getColumnsController,
} from "./column.controller.js";

const router = Router();

router.get("/:userId", getColumnsController);

router.post("/:userId", createColumnController);

export default router;