import projectsModel from "../models/projects.js";



// Display projects list page
const buildProjects = async (req, res) => {

    const projects = await projectsModel.getAllProjects();


    res.render("projects", {

        title: "Service Projects",

        projects

    });

};



// Display project details page
const buildProjectDetail = async (req, res) => {

    const id = req.params.id;


    const project = await projectsModel.getProjectById(id);


    const categories = await projectsModel.getCategoriesByProjectId(id);


    res.render("project-detail", {

        title: project.project_name,

        project,

        categories

    });

};



// Display assign categories page
const buildAssignCategories = async (req, res) => {

    const id = req.params.id;


    const project = await projectsModel.getProjectById(id);


    const allCategories = await projectsModel.getAllCategories();


    const projectCategories = await projectsModel.getCategoriesByProjectId(id);


    const assignedCategoryIds = projectCategories.map(
        category => category.category_id
    );


    res.render("assign-categories", {

        title: "Assign Categories",

        project,

        allCategories,

        assignedCategoryIds,

        error: null

    });

};



// Process category assignments
const updateProjectCategories = async (req, res) => {

    const id = req.params.id;


    let { category_ids } = req.body;


    if (!Array.isArray(category_ids)) {

        category_ids = category_ids
            ? [category_ids]
            : [];

    }



    try {

        await projectsModel.updateProjectCategories(
            id,
            category_ids
        );


        req.flash(
            "success",
            "Project categories updated successfully!"
        );


        res.redirect(`/project/${id}`);


    } catch (error) {

        console.error(error);


        res.render("assign-categories", {

            title: "Assign Categories",

            error: "Unable to update project categories."

        });

    }

};



export default {
    buildProjects,
    buildProjectDetail,
    buildAssignCategories,
    updateProjectCategories
};