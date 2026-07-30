import express from "express";
import organizationController from "../controllers/organizationController.js";


const router = express.Router();


router.get(
    "/organization/:id",
    organizationController.buildOrganizationDetail
);


export default router;