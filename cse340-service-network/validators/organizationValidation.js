import { body } from "express-validator";


const organizationValidation = [

    body("organization_name")
        .trim()
        .notEmpty()
        .withMessage("Organization name is required.")
        .isLength({ min: 3, max: 150 })
        .withMessage("Organization name must be between 3 and 150 characters."),


    body("logo")
        .trim()
        .notEmpty()
        .withMessage("Logo path is required."),


    body("contact_email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please enter a valid email address."),


    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required.")
        .isLength({ min: 10 })
        .withMessage("Description must be at least 10 characters.")

];


export default organizationValidation;