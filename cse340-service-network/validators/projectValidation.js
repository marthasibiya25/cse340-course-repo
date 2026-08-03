import { body } from "express-validator";


const projectValidation = [

    body("project_name")
        .trim()
        .notEmpty()
        .withMessage("Project name is required.")
        .isLength({ min: 3, max: 150 })
        .withMessage("Project name must be between 3 and 150 characters."),


    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required.")
        .isLength({ min: 10 })
        .withMessage("Description must be at least 10 characters."),


    body("location")
        .trim()
        .notEmpty()
        .withMessage("Location is required.")
        .isLength({ min: 3, max: 150 })
        .withMessage("Location must be between 3 and 150 characters."),


    body("date")
        .trim()
        .notEmpty()
        .withMessage("Date is required."),


    body("organization_id")
        .notEmpty()
        .withMessage("Organization is required.")

];


export default projectValidation;