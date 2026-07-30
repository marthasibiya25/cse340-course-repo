import organizationsModel from "../models/organizations.js";


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
    buildOrganizationDetail
};