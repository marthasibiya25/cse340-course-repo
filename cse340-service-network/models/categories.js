import pool from "../database/index.js";

async function getCategories() {
    try {
        const result = await pool.query(
            "SELECT * FROM category ORDER BY category_name"
        );

        return result.rows;

    } catch (error) {
        console.error("Error getting categories:", error);
        return [];
    }
}

export default {
    getCategories
};