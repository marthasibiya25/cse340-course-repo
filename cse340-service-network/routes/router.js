import express from "express";

import organizationRoutes from "./organizationRoutes.js";
import projectRoutes from "./projectRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import accountRoutes from "./accountRoutes.js";

const router = express.Router();


// Home route
router.get("/", (req, res) => {

    res.render("index", {
        title: "Home"
    });

});


// Organization routes
router.use("/", organizationRoutes);


// Project routes
router.use("/", projectRoutes);


// Category routes
router.use("/", categoryRoutes);


router.use("/", accountRoutes);


export default router;