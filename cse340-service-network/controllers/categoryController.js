import categoriesModel from "../models/categories.js";


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


export default {
    buildCategoryDetail
};
