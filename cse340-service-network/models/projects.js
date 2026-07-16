import pool from "../database/index.js";


async function getProjects() {
    const result = await pool.query(
        `
        SELECT 
            projects.*,
            organizations.organization_name,
            category.category_name
        FROM projects
        JOIN organizations
        ON projects.organization_id = organizations.organization_id
        JOIN category
        ON projects.category_id = category.category_id
        ORDER BY projects.date
        `
    );

    return result.rows;
}


async function getProjectById(id) {
    const result = await pool.query(
        `
        SELECT 
            projects.*,
            organizations.organization_name,
            category.category_name
        FROM projects
        JOIN organizations
        ON projects.organization_id = organizations.organization_id
        JOIN category
        ON projects.category_id = category.category_id
        WHERE projects.project_id = $1
        `,
        [id]
    );

    return result.rows[0];
}


export default {
    getProjects,
    getProjectById
};