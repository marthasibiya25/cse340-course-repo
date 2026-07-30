import pool from "../database/index.js";


const getAllOrganizations = async () => {

    const result = await pool.query(
        "SELECT * FROM organizations ORDER BY organization_name"
    );

    return result.rows;

};


const getOrganizationById = async (id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM organizations
        WHERE organization_id = $1
        `,
        [id]
    );

    return result.rows[0];

};


const getProjectsByOrganizationId = async (id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM projects
        WHERE organization_id = $1
        ORDER BY date
        `,
        [id]
    );

    return result.rows;

};


export default {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganizationId
};