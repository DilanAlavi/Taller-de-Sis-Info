import { pool } from "../db.js";

export const getFoto = async (req, res) => {
    const result = await pool.query('SELECT * FROM foto')
    console.log(result[0])
    res.send(result[0])
}