import express from "express";
import dotenv from "dotenv";

import categoryRoutes from "./routes/categoryRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import organizationRoutes from "./routes/organizationRoutes.js";
import organizationsModel from "./models/organizations.js";
import projectsModel from "./models/projects.js";
import categoriesModel from "./models/categories.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;


// EJS setup
app.set("view engine", "ejs");


// Static files
app.use(express.static("public"));


// Home
app.get("/", (req, res) => {
    res.render("index", {
        title: "Home"
    });
});


// Organizations
app.get("/organizations", async (req, res) => {

    const organizations = await organizationsModel.getAllOrganizations();

    res.render("organizations", {
        title: "Organizations",
        organizations
    });

});


// Projects
app.get("/projects", async (req, res) => {

    const projects = await projectsModel.getAllProjects();

    res.render("projects", {
        title: "Service Projects",
        projects
    });

});


// Categories
app.get("/categories", async (req, res) => {

    const categories = await categoriesModel.getAllCategories();

    res.render("categories", {
        title: "Service Project Categories",
        categories
    });

});


// Start server
app.use("/", organizationRoutes);
app.use("/", projectRoutes);
app.use("/", categoryRoutes);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});