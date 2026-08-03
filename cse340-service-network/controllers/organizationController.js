import organizationsModel from "../models/organizations.js";
import { validationResult } from "express-validator";



// Build organizations list page
const buildOrganizations = async (req, res) => {

    const organizations = await organizationsModel.getAllOrganizations();


    res.render("organizations", {

        title: "Organizations",

        organizations

    });

};



// Build organization details page
const buildOrganizationDetail = async (req, res) => {

    const id = req.params.id;


    const organization =
        await organizationsModel.getOrganizationById(id);


    const projects =
        await organizationsModel.getProjectsByOrganizationId(id);


    res.render("organization-detail", {

        title: organization.organization_name,

        organization,

        projects

    });

};



// Display create organization form
const buildNewOrganization = async (req, res) => {

    res.render("new-organization", {

        title: "Create Organization",

        error: null

    });

};



// Create organization
const createOrganization = async (req, res) => {

    const errors = validationResult(req);


    if (!errors.isEmpty()) {

        return res.render("new-organization", {

            title: "Create Organization",

            error: errors.array()[0].msg

        });

    }


    const {
        organization_name,
        logo,
        contact_email,
        description

    } = req.body;



    try {

        await organizationsModel.createOrganization(

            organization_name,

            logo,

            contact_email,

            description

        );


        req.flash(

            "success",

            "Organization created successfully!"

        );


        res.redirect("/organizations");


    } catch (error) {

        console.error(error);


        res.render("new-organization", {

            title: "Create Organization",

            error: "Unable to create organization."

        });

    }

};



// Display edit organization form
const buildEditOrganization = async (req, res) => {

    const id = req.params.id;


    const organization =
        await organizationsModel.getOrganizationById(id);


    res.render("edit-organization", {

        title: "Edit Organization",

        organization,

        error: null

    });

};



// Update organization
const updateOrganization = async (req, res) => {

    const id = req.params.id;


    const errors = validationResult(req);



    if (!errors.isEmpty()) {


        const organization =
            await organizationsModel.getOrganizationById(id);



        return res.render("edit-organization", {

            title: "Edit Organization",

            organization,

            error: errors.array()[0].msg

        });

    }



    const {

        organization_name,

        logo,

        contact_email,

        description

    } = req.body;



    try {


        await organizationsModel.updateOrganization(

            id,

            organization_name,

            logo,

            contact_email,

            description

        );



        req.flash(

            "success",

            "Organization updated successfully!"

        );



        res.redirect(`/organization/${id}`);



    } catch (error) {


        console.error(error);



        const organization =
            await organizationsModel.getOrganizationById(id);



        res.render("edit-organization", {

            title: "Edit Organization",

            organization,

            error: "Unable to update organization."

        });

    }

};



export default {

    buildOrganizations,

    buildOrganizationDetail,

    buildNewOrganization,

    createOrganization,

    buildEditOrganization,

    updateOrganization

};