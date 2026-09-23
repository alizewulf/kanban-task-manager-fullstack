import { Router } from "express";
import { createCategoryController, getCategoriesController } from "./category.controller.js";


const router = Router()

router.get("/:columnId/categories", getCategoriesController)

router.post("/:columnId/categories", createCategoryController)

export default router