import pool from "../database/index.js";

async function getCategories() {
    const result = await pool.query(
        "SELECT * FROM category ORDER BY category_name"
    );

    return result.rows;
}

export default {
    getCategories
};