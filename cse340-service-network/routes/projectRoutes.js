import express from "express";
import projectController from "../controllers/projectController.js";
import projectValidation from "../validators/projectValidation.js";
import utilities from "../utilities/index.js";

const router = express.Router();


// Projects list page (Public)
router.get(
    "/projects",
    projectController.buildProjects
);


// Project details page (Public)
router.get(
    "/project/:id",
    projectController.buildProjectDetail
);


// Create project page (Admin only)
router.get(
    "/new-project",
    utilities.requireLogin,
    utilities.requireRole("Admin"),
    projectController.buildNewProject
);


// Create project submission (Admin only)
router.post(
    "/new-project",
    utilities.requireLogin,
    utilities.requireRole("Admin"),
    projectValidation,
    projectController.createProject
);


// Edit project page (Admin only)
router.get(
    "/edit-project/:id",
    utilities.requireLogin,
    utilities.requireRole("Admin"),
    projectController.buildEditProject
);


// Edit project submission (Admin only)
router.post(
    "/edit-project/:id",
    utilities.requireLogin,
    utilities.requireRole("Admin"),
    projectValidation,
    projectController.updateProject
);


export default router;