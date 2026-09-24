import { Router } from "express";
import {
	createCategoryController,
	deleteCategoryController,
	getCategoriesController,
	updateCategoryController,
} from "./category.controller.js";


const router = Router()

router.get("/:columnId/categories", getCategoriesController)

router.post("/:columnId/categories", createCategoryController)

router.patch("/:columnId/categories/:categoryId", updateCategoryController)

router.delete("/:columnId/categories/:categoryId", deleteCategoryController)

export default router