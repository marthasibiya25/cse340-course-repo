import pool from "../database/index.js";


async function getOrganizations() {
    const result = await pool.query(
        "SELECT * FROM organizations ORDER BY organization_name"
    );

    return result.rows;
}


async function getOrganizationById(id) {
    const result = await pool.query(
        "SELECT * FROM organizations WHERE organization_id = $1",
        [id]
    );

    return result.rows[0];
}


export default {
    getOrganizations,
    getOrganizationById
};

