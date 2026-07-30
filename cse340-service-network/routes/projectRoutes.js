import express from "express";
import projectController from "../controllers/projectController.js";


const router = express.Router();


router.get(
    "/project/:id",
    projectController.buildProjectDetail
);


export default router;