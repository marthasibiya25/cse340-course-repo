import express from "express";
import categoryController from "../controllers/categoryController.js";

const router = express.Router();


// Category detail page
router.get(
    "/category/:id",
    categoryController.buildCategoryDetail
);


// Create category page
router.get(
    "/new-category",
    categoryController.buildNewCategory
);


// Process create category form
router.post(
    "/new-category",
    categoryController.createCategory
);


export default router;