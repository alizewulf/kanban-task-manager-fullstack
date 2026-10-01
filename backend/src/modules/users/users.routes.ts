import { Router } from "express";
import { createUserController } from "./users.controller.js";

const router = Router();

router.post("/", createUserController);

export default router;