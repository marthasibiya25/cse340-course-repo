import express from "express";
import projectController from "../controllers/projectController.js";

const router = express.Router();


// Projects list page
router.get(
    "/projects",
    projectController.buildProjects
);


// Project details page
router.get(
    "/project/:id",
    projectController.buildProjectDetail
);


// Assign categories page
router.get(
    "/assign-categories/:id",
    projectController.buildAssignCategories
);


// Save assigned categories
router.post(
    "/assign-categories/:id",
    projectController.updateProjectCategories
);


export default router;