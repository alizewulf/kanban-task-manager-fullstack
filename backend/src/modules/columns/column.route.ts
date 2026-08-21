import { Router } from "express";
import { createColumnController, getColumnsController } from "./column.controller.js";

const router = Router()

router.get(
  '/users/:userId/columns',
  getColumnsController
)
router.post(
  '/users/:userId/columns',
  createColumnController
)

export default router