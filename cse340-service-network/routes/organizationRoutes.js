import express from "express";
import organizationController from "../controllers/organizationController.js";


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


export default router;