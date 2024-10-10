import { pool } from "../db.js";

export const getEstadoPerro = async (req, res) => {
    const result = await pool.query('SELECT * FROM estado_perro')
    console.log(result[0])
    res.send(result[0])
}

