import { Router } from "express";
import {
	changeLoginController,
	changePasswordController,
	loginController,
} from "./auth.controllers.js";
const router = Router();

router.post("/login", loginController);
router.post("/change-login", changeLoginController);
router.post("/change-password", changePasswordController);

export default router;
