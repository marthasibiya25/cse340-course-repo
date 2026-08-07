import accountModel from "../models/account.js";
import bcrypt from "bcryptjs";
import volunteerModel from "../models/volunteer.js";

// Display users page (Admin only)
const buildUsers = async (req, res) => {

    const users = await accountModel.getAllAccounts();


    res.render("users", {

        title: "Registered Users",

        users

    });

};



// Display registration page
const buildRegister = async (req, res) => {

    res.render("register", {

        title: "Register",

        error: null

    });

};



// Register new user
const registerAccount = async (req, res) => {

    const {
        firstname,
        lastname,
        email,
        password
    } = req.body;


    const hashedPassword = await bcrypt.hash(
        password,
        10
    );


    await accountModel.registerAccount(
        firstname,
        lastname,
        email,
        hashedPassword
    );


    res.redirect("/account/login");

};



// Display login page
const buildLogin = async (req, res) => {

    res.render("login", {

        title: "Login",

        error: null

    });

};



// Login user
const loginAccount = async (req, res) => {

    const {
        email,
        password
    } = req.body;


    const account = await accountModel.getAccountByEmail(email);



    if (!account) {

        return res.render("login", {

            title: "Login",

            error: "Invalid email or password."

        });

    }



    const passwordMatch = await bcrypt.compare(
        password,
        account.account_password
    );



    if (!passwordMatch) {

        return res.render("login", {

            title: "Login",

            error: "Invalid email or password."

        });

    }



    req.session.accountData = {
        account_id: account.account_id,
        account_firstname: account.account_firstname,
        account_lastname: account.account_lastname,
        account_email: account.account_email,
        account_type: account.account_type
    };


    res.redirect("/account/dashboard");

};



// Logout user
const logoutAccount = async (req, res) => {

    req.session.destroy(() => {

        res.redirect("/");

    });

};


// Display dashboard
const buildDashboard = async (req, res) => {

    const accountData = req.session.accountData;


    const volunteerProjects =
        await volunteerModel.getVolunteerProjects(
            accountData.account_id
        );


    res.render("dashboard", {

        title: "Dashboard",

        accountData,

        volunteerProjects

    });

};

export default {

    buildUsers,
    buildRegister,
    registerAccount,
    buildLogin,
    loginAccount,
    logoutAccount,
    buildDashboard

};