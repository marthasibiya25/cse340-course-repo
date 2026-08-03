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


// Create organization
const createOrganization = async (
    organization_name,
    logo,
    contact_email,
    description
) => {

    const result = await pool.query(
        `
        INSERT INTO organizations
        (
            organization_name,
            logo,
            contact_email,
            description
        )

        VALUES
        (
            $1,
            $2,
            $3,
            $4
        )

        RETURNING *
        `,
        [
            organization_name,
            logo,
            contact_email,
            description
        ]
    );

    return result.rows[0];

};


// Update organization
const updateOrganization = async (
    id,
    organization_name,
    logo,
    contact_email,
    description
) => {

    const result = await pool.query(
        `
        UPDATE organizations

        SET
            organization_name = $1,
            logo = $2,
            contact_email = $3,
            description = $4

        WHERE organization_id = $5

        RETURNING *
        `,
        [
            organization_name,
            logo,
            contact_email,
            description,
            id
        ]
    );

    return result.rows[0];

};


export default {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganizationId,
    createOrganization,
    updateOrganization
};