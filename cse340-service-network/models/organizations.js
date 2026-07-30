import pool from "../database/index.js";

const getAllOrganizations = async () => {
    const result = await pool.query(
        "SELECT * FROM organizations ORDER BY organization_name"
    );

    return result.rows;
};


const getOrganizationById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM organizations WHERE organization_id = $1",
        [id]
    );

    return result.rows[0];
};


export default {
    getAllOrganizations,
    getOrganizationById
};