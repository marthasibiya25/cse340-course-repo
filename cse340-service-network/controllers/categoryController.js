import categoriesModel from "../models/categories.js";


// Category detail page
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


// Show create category form
const buildNewCategory = async (req, res) => {

    res.render("new-category", {
        title: "Create New Category",
        error: null
    });

};


// Process create category form
const createCategory = async (req, res) => {

    const { category_name } = req.body;


    if (
        !category_name ||
        category_name.length < 3 ||
        category_name.length > 100
    ) {

        return res.render("new-category", {
            title: "Create New Category",
            error: "Category name must be between 3 and 100 characters."
        });

    }


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


export default {
    buildCategoryDetail,
    buildNewCategory,
    createCategory
};
