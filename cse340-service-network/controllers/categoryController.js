import categoriesModel from "../models/categories.js";
import { validationResult } from "express-validator";



// Display categories list page
const buildCategories = async (req, res) => {

    const categories = await categoriesModel.getAllCategories();


    res.render("categories", {

        title: "Service Project Categories",

        categories

    });

};



// Display category details page
const buildCategoryDetail = async (req, res) => {

    const id = req.params.id;


    const category = await categoriesModel.getCategoryById(id);


    const projects = await categoriesModel.getProjectsByCategoryId(id);


    res.render("category-detail", {

        title: category.category_name,

        category,

        projects

    });

};



// Display create category form
const buildNewCategory = async (req, res) => {

    res.render("new-category", {

        title: "Create New Category",

        error: null

    });

};



// Process create category form
const createCategory = async (req, res) => {

    const errors = validationResult(req);


    if (!errors.isEmpty()) {

        return res.render("new-category", {

            title: "Create New Category",

            error: errors.array()[0].msg

        });

    }


    const { category_name } = req.body;


    try {

        await categoriesModel.createCategory(category_name);


        req.flash(
            "success",
            "Category created successfully!"
        );


        res.redirect("/categories");


    } catch (error) {

        console.error(error);


        res.render("new-category", {

            title: "Create New Category",

            error: "This category already exists. Please choose another name."

        });

    }

};



// Display edit category form
const buildEditCategory = async (req, res) => {

    const id = req.params.id;


    const category = await categoriesModel.getCategoryById(id);


    res.render("edit-category", {

        title: "Edit Category",

        category,

        error: null

    });

};



// Process edit category form
const updateCategory = async (req, res) => {

    const id = req.params.id;


    const errors = validationResult(req);


    const category = await categoriesModel.getCategoryById(id);


    if (!errors.isEmpty()) {

        return res.render("edit-category", {

            title: "Edit Category",

            category,

            error: errors.array()[0].msg

        });

    }


    const { category_name } = req.body;


    try {

        await categoriesModel.updateCategory(
            id,
            category_name
        );


        req.flash(
            "success",
            "Category updated successfully!"
        );


        res.redirect("/categories");


    } catch (error) {

        console.error(error);


        res.render("edit-category", {

            title: "Edit Category",

            category,

            error: "This category already exists. Please choose another name."

        });

    }

};



export default {

    buildCategories,
    buildCategoryDetail,
    buildNewCategory,
    createCategory,
    buildEditCategory,
    updateCategory

};