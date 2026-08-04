import express from "express";
import organizationController from "../controllers/organizationController.js";
import organizationValidation from "../validators/organizationValidation.js";
import utilities from "../utilities/index.js";

const router = express.Router();


// Organizations list page
router.get(
    "/organizations",
    organizationController.buildOrganizations
);


// Organization details page
router.get(
    "/organization/:id",
    organizationController.buildOrganizationDetail
);


// Create organization page
router.get(
    "/new-organization",
    utilities.requireLogin,
    utilities.requireRole("Admin"),
    organizationController.buildNewOrganization
);


// Create organization submission
router.post(
    "/new-organization",
    utilities.requireLogin,
    utilities.requireRole("Admin"),
    organizationValidation,
    organizationController.createOrganization
);


// Edit organization page
router.get(
    "/edit-organization/:id",
    utilities.requireLogin,
    utilities.requireRole("Admin"),
    organizationController.buildEditOrganization
);

// Edit organization submission
router.post(
    "/edit-organization/:id",
    utilities.requireLogin,
    utilities.requireRole("Admin"),
    organizationValidation,
    organizationController.updateOrganization
);

export default router;