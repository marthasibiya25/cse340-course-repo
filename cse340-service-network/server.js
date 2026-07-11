import express from "express";
import dotenv from "dotenv";

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
app.get("/organizations", (req, res) => {
    res.render("organizations", {
        title: "Organizations"
    });
});


// Projects
app.get("/projects", (req, res) => {
    res.render("projects", {
        title: "Service Projects"
    });
});


// Categories
app.get("/categories", (req, res) => {
    res.render("categories", {
        title: "Service Project Categories"
    });
});


// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});