import projectsModel from "../models/projects.js";


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


export default {
    buildProjectDetail
};