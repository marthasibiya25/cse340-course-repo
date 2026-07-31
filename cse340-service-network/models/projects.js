import pool from "../database/index.js";


// Get all projects
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



// Get one project by ID
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



// Get all categories assigned to a project
const getCategoriesByProjectId = async (id) => {

    const result = await pool.query(
        `
        SELECT
            category.*

        FROM category

        JOIN project_category
        ON category.category_id = project_category.category_id

        WHERE project_category.project_id = $1

        ORDER BY category.category_name
        `,
        [id]
    );

    return result.rows;

};



// Get all categories
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



// Update categories assigned to a project
const updateProjectCategories = async (project_id, category_ids) => {


    // Remove existing category assignments
    await pool.query(
        `
        DELETE FROM project_category
        WHERE project_id = $1
        `,
        [project_id]
    );



    // Add new category assignments
    for (const category_id of category_ids) {

        await pool.query(
            `
            INSERT INTO project_category
            (
                project_id,
                category_id
            )

            VALUES
            (
                $1,
                $2
            )
            `,
            [
                project_id,
                category_id
            ]
        );

    }

};



export default {
    getAllProjects,
    getProjectById,
    getCategoriesByProjectId,
    getAllCategories,
    updateProjectCategories
};