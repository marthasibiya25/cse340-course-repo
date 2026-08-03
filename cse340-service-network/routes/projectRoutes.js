import express from "express";
import projectController from "../controllers/projectController.js";
import projectValidation from "../validators/projectValidation.js";

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


// Create project page
router.get(
    "/new-project",
    projectController.buildNewProject
);


// Create project submission
router.post(
    "/new-project",
    projectValidation,
    projectController.createProject
);


// Edit project page
router.get(
    "/edit-project/:id",
    projectController.buildEditProject
);


// Edit project submission
router.post(
    "/edit-project/:id",
    projectValidation,
    projectController.updateProject
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