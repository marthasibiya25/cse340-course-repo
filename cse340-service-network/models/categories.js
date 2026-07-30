import pool from "../database/index.js";


const getAllCategories = async () => {

    const result = await pool.query(
        `
        SELECT *
        FROM category
        ORDER BY category_name
        `
    );

    return result.rows;

};


const getCategoryById = async (id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM category
        WHERE category_id = $1
        `,
        [id]
    );

    return result.rows[0];

};


const getProjectsByCategoryId = async (id) => {

    const result = await pool.query(
        `
        SELECT
            projects.project_id,
            projects.project_name,
            projects.description,
            projects.location,
            projects.date,
            organizations.organization_name

        FROM projects

        JOIN project_category
        ON projects.project_id = project_category.project_id

        JOIN organizations
        ON projects.organization_id = organizations.organization_id

        WHERE project_category.category_id = $1

        ORDER BY projects.date
        `,
        [id]
    );

    return result.rows;

};


export default {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId
};