import { Router } from "express";
import {
	createCategoryController,
	deleteCategoryController,
	getCategoriesController,
	updateCategoryController,
} from "./category.controller.js";
import { authenticateToken } from "../auth/auth.middleware.js";
import { requireOwnedResource } from "../auth/ownership.middleware.js";


const router = Router()

router.use(authenticateToken);

router.get("/:columnId/categories", requireOwnedResource("column", "columnId"), getCategoriesController)

router.post("/:columnId/categories", requireOwnedResource("column", "columnId"), createCategoryController)

router.patch("/:columnId/categories/:categoryId", requireOwnedResource("column", "columnId"), updateCategoryController)

router.delete("/:columnId/categories/:categoryId", requireOwnedResource("column", "columnId"), deleteCategoryController)

export default router