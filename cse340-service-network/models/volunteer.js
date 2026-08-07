import pool from "../database/index.js";


const addVolunteer = async (account_id, project_id) => {

    const sql = `
        INSERT INTO project_volunteer
        (
            account_id,
            project_id
        )

        VALUES
        (
            $1,
            $2
        )

        ON CONFLICT (account_id, project_id)
        DO NOTHING
    `;


    return await pool.query(
        sql,
        [
            account_id,
            project_id
        ]
    );

};



const removeVolunteer = async (account_id, project_id) => {

    const sql = `
        DELETE FROM project_volunteer

        WHERE account_id = $1

        AND project_id = $2
    `;


    return await pool.query(
        sql,
        [
            account_id,
            project_id
        ]
    );

};



const getVolunteerProjects = async (account_id) => {

    const sql = `
        SELECT
            p.project_id,
            p.project_name,
            p.description,
            p.location,
            p.date,
            o.organization_name

        FROM project_volunteer pv

        JOIN projects p
        ON pv.project_id = p.project_id

        JOIN organizations o
        ON p.organization_id = o.organization_id

        WHERE pv.account_id = $1

        ORDER BY p.date
    `;


    const result = await pool.query(
        sql,
        [account_id]
    );


    return result.rows;

};



export default {
    addVolunteer,
    removeVolunteer,
    getVolunteerProjects
};