import organizationsModel from "../models/organizations.js";


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


    const organization = await organizationsModel.getOrganizationById(id);


    const projects = await organizationsModel.getProjectsByOrganizationId(id);


    res.render("organization-detail", {
        title: organization.organization_name,
        organization,
        projects
    });

};



export default {
    buildOrganizations,
    buildOrganizationDetail
};