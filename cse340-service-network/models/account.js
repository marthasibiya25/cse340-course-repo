import pool from "../database/index.js";


// Register a new user
const registerAccount = async (
    firstname,
    lastname,
    email,
    password
) => {

    const sql = `
        INSERT INTO account
        (
            account_firstname,
            account_lastname,
            account_email,
            account_password
        )

        VALUES
        (
            $1,
            $2,
            $3,
            $4
        )

        RETURNING *
    `;


    const result = await pool.query(
        sql,
        [
            firstname,
            lastname,
            email,
            password
        ]
    );


    return result.rows[0];

};



// Find user by email
const getAccountByEmail = async (email) => {

    const sql = `
        SELECT *
        FROM account
        WHERE account_email = $1
    `;


    const result = await pool.query(
        sql,
        [email]
    );


    return result.rows[0];

};



// Get all users for admin page
const getAllAccounts = async () => {

    const sql = `
        SELECT
            account_firstname,
            account_lastname,
            account_email,
            account_type

        FROM account

        ORDER BY account_lastname,
                 account_firstname
    `;


    const result = await pool.query(sql);


    return result.rows;

};



export default {
    registerAccount,
    getAccountByEmail,
    getAllAccounts
};