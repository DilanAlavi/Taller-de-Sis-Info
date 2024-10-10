import { pool } from "../db.js";


export const getUsuarios = async (req, res) => {
    const result = await pool.query(
        `SELECT * FROM usuario`
    )
    console.log(result[0])
    res.send(result[0])
};