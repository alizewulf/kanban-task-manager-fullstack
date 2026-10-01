import { Router } from "express";
import {
	changeLoginController,
	changePasswordController,
	loginController,
	meController,
} from "./auth.controllers.js";
import { authenticateToken } from "./auth.middleware.js";
const router = Router();

router.post("/login", loginController);
router.get("/me", authenticateToken, meController);
router.post("/change-login", authenticateToken, changeLoginController);
router.post("/change-password", authenticateToken, changePasswordController);

export default router;
