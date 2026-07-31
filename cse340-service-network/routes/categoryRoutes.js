import express from "express";
import categoryController from "../controllers/categoryController.js";

const router = express.Router();


// Categories list page
router.get(
    "/categories",
    categoryController.buildCategories
);


// Category details page
router.get(
    "/category/:id",
    categoryController.buildCategoryDetail
);


// Create category page
router.get(
    "/new-category",
    categoryController.buildNewCategory
);


// Create category submission
router.post(
    "/new-category",
    categoryController.createCategory
);


// Edit category page
router.get(
    "/edit-category/:id",
    categoryController.buildEditCategory
);


// Edit category submission
router.post(
    "/edit-category/:id",
    categoryController.updateCategory
);


export default router;