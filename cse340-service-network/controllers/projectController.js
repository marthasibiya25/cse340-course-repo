import projectsModel from "../models/projects.js";
import organizationsModel from "../models/organizations.js";
import { validationResult } from "express-validator";
import volunteerModel from "../models/volunteer.js";


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


    const categories =
        await projectsModel.getCategoriesByProjectId(id);


    let isVolunteer = false;


    const accountData = req.session.accountData;


    if (accountData) {

        const volunteerProjects =
            await volunteerModel.getVolunteerProjects(
                accountData.account_id
            );


        isVolunteer = volunteerProjects.some(
            volunteerProject =>
                volunteerProject.project_id == id
        );

    }


    res.render("project-detail", {

        title: project.project_name,

        project,

        categories,

        accountData,

        isVolunteer

    });

};



// Display create project form
const buildNewProject = async (req, res) => {

    const organizations =
        await organizationsModel.getAllOrganizations();


    res.render("new-project", {

        title: "Create Project",

        organizations,

        error: null

    });

};



// Create project
const createProject = async (req, res) => {

    const errors = validationResult(req);


    if (!errors.isEmpty()) {

        const organizations =
            await organizationsModel.getAllOrganizations();


        return res.render("new-project", {

            title: "Create Project",

            organizations,

            error: errors.array()[0].msg

        });

    }


    const {
        project_name,
        description,
        location,
        date,
        organization_id

    } = req.body;


    try {

        await projectsModel.createProject(
            project_name,
            description,
            location,
            date,
            organization_id
        );


        req.flash(
            "success",
            "Project created successfully!"
        );


        res.redirect("/projects");


    } catch (error) {

        console.error(error);


        const organizations =
            await organizationsModel.getAllOrganizations();


        res.render("new-project", {

            title: "Create Project",

            organizations,

            error: "Unable to create project."

        });

    }

};



// Display edit project form
const buildEditProject = async (req, res) => {

    const id = req.params.id;


    const project =
        await projectsModel.getProjectById(id);


    const organizations =
        await organizationsModel.getAllOrganizations();


    res.render("edit-project", {

        title: "Edit Project",

        project,

        organizations,

        error: null

    });

};



// Update project
const updateProject = async (req, res) => {

    const errors = validationResult(req);


    const id = req.params.id;


    if (!errors.isEmpty()) {

        const project =
            await projectsModel.getProjectById(id);


        const organizations =
            await organizationsModel.getAllOrganizations();


        return res.render("edit-project", {

            title: "Edit Project",

            project,

            organizations,

            error: errors.array()[0].msg

        });

    }


    const {
        project_name,
        description,
        location,
        date,
        organization_id

    } = req.body;


    try {

        await projectsModel.updateProject(
            id,
            project_name,
            description,
            location,
            date,
            organization_id
        );


        req.flash(
            "success",
            "Project updated successfully!"
        );


        res.redirect(`/project/${id}`);


    } catch (error) {

        console.error(error);


        const project =
            await projectsModel.getProjectById(id);


        const organizations =
            await organizationsModel.getAllOrganizations();


        res.render("edit-project", {

            title: "Edit Project",

            project,

            organizations,

            error: "Unable to update project."

        });

    }

};



// Display assign categories page
const buildAssignCategories = async (req, res) => {

    const id = req.params.id;


    const project =
        await projectsModel.getProjectById(id);


    const allCategories =
        await projectsModel.getAllCategories();


    const projectCategories =
        await projectsModel.getCategoriesByProjectId(id);


    const assignedCategoryIds =
        projectCategories.map(
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



// Volunteer for project
const volunteerProject = async (req, res) => {

    const account_id =
        req.session.accountData.account_id;


    const project_id = req.params.id;


    await volunteerModel.addVolunteer(
        account_id,
        project_id
    );


    res.redirect(`/project/${project_id}`);

};



// Remove volunteer
const removeVolunteer = async (req, res) => {

    const account_id =
        req.session.accountData.account_id;


    const project_id = req.params.id;


    await volunteerModel.removeVolunteer(
        account_id,
        project_id
    );


    res.redirect(`/project/${project_id}`);

};



export default {

    buildProjects,
    buildProjectDetail,
    buildNewProject,
    createProject,
    buildEditProject,
    updateProject,
    buildAssignCategories,
    updateProjectCategories,
    volunteerProject,
    removeVolunteer

};