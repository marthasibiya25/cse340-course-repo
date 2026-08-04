import express from "express";

import accountController from "../controllers/accountController.js";
import utilities from "../utilities/index.js";


const router = express.Router();



// Register page
router.get(
    "/account/register",
    accountController.buildRegister
);



// Process registration
router.post(
    "/account/register",
    accountController.registerAccount
);



// Login page
router.get(
    "/account/login",
    accountController.buildLogin
);



// Process login
router.post(
    "/account/login",
    accountController.loginAccount
);



// Logout
router.get(
    "/account/logout",
    accountController.logoutAccount
);


// Dashboard page
router.get(
    "/account/dashboard",
    utilities.requireLogin,
    accountController.buildDashboard
);


// Admin users page
router.get(
    "/users",
    utilities.requireLogin,
    utilities.requireRole("Admin"),
    accountController.buildUsers
);



export default router;