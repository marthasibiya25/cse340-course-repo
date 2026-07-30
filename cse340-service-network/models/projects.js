import pool from "../database/index.js";


const getAllProjects = async () => {

    const result = await pool.query(
        `
        SELECT
            projects.*,
            organizations.organization_name,
            STRING_AGG(category.category_name, ', ') AS category_name

        FROM projects

        JOIN organizations
        ON projects.organization_id = organizations.organization_id

        LEFT JOIN project_category
        ON projects.project_id = project_category.project_id

        LEFT JOIN category
        ON project_category.category_id = category.category_id

        GROUP BY 
            projects.project_id,
            organizations.organization_name

        ORDER BY projects.date
        `
    );

    return result.rows;
};


const getProjectById = async (id) => {

    const result = await pool.query(
        `
        SELECT
            projects.*,
            organizations.organization_name,
            STRING_AGG(category.category_name, ', ') AS category_name

        FROM projects

        JOIN organizations
        ON projects.organization_id = organizations.organization_id

        LEFT JOIN project_category
        ON projects.project_id = project_category.project_id

        LEFT JOIN category
        ON project_category.category_id = category.category_id

        WHERE projects.project_id = $1

        GROUP BY
            projects.project_id,
            organizations.organization_name
        `,
        [id]
    );

    return result.rows[0];
};


export default {
    getAllProjects,
    getProjectById
};