import express from "express";
import categoryController from "../controllers/categoryController.js";
import categoryValidation from "../validators/categoryValidation.js";
import utilities from "../utilities/index.js";

const router = express.Router();


// Categories list page (Public)
router.get(
    "/categories",
    categoryController.buildCategories
);


// Category details page (Public)
router.get(
    "/category/:id",
    categoryController.buildCategoryDetail
);


// Create category page (Admin only)
router.get(
    "/new-category",
    utilities.requireLogin,
    utilities.requireRole("Admin"),
    categoryController.buildNewCategory
);


// Create category submission (Admin only)
router.post(
    "/new-category",
    utilities.requireLogin,
    utilities.requireRole("Admin"),
    categoryValidation,
    categoryController.createCategory
);


// Edit category page (Admin only)
router.get(
    "/edit-category/:id",
    utilities.requireLogin,
    utilities.requireRole("Admin"),
    categoryController.buildEditCategory
);


// Edit category submission (Admin only)
router.post(
    "/edit-category/:id",
    utilities.requireLogin,
    utilities.requireRole("Admin"),
    categoryValidation,
    categoryController.updateCategory
);


export default router;