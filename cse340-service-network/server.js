import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import flash from "connect-flash";

import categoryRoutes from "./routes/categoryRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import organizationRoutes from "./routes/organizationRoutes.js";


dotenv.config();


const app = express();

const port = process.env.PORT || 3000;


// EJS setup
app.set("view engine", "ejs");


// Static files
app.use(express.static("public"));


// Form data parser
app.use(express.urlencoded({ extended: true }));


// Session and flash messages
app.use(
    session({
        secret: "service-network-secret",
        resave: false,
        saveUninitialized: true
    })
);


app.use(flash());


// Make flash messages available to EJS
app.use((req, res, next) => {

    res.locals.messages = req.flash();

    next();

});


// Home
app.get("/", (req, res) => {

    res.render("index", {
        title: "Home"
    });

});


// Routes
app.use("/", organizationRoutes);
app.use("/", projectRoutes);
app.use("/", categoryRoutes);


// Start server
app.listen(port, () => {

    console.log(`Server running on port ${port}`);

});