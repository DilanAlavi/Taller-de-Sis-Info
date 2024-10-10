import { pool } from "../db.js";

export const agregarPerrito = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { raza, color, genero, nombre, id } = req.body;

        // Validar los campos requeridos
        if (!id || !nombre || !raza || !color || !genero  === undefined) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Inserción en la tabla productos
        const [perritoResult] = await connection.query(
            'INSERT INTO perrito (nombre, raza, color, genero) VALUES (?, ?, ?, ?)',
            [nombre, raza, color, genero]
        );

        const id_perrito= perritoResult.insertId;

        await connection.commit();
        res.status(201).json({ message: 'Perrito agregado correctamente', id_producto });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al agregar perrito', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const actualizarPerrito = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { raza, color, genero, nombre, id } = req.body;

        // Validar los campos requeridos
        if (!id || !nombre || !raza || !color || !genero  === undefined) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        await connection.query(
            'UPDATE perrito SET raza = ?, color = ?, genero = ?, nombre = ? WHERE id = ?',
            [raza, color, genero, nombre, id]
        );



        await connection.commit();
        res.status(200).json({ message: 'Perrito actualizado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al actualizar perrito', error: error.message });
        }
    } finally {
        connection.release();
    }
};

export const eliminarPerrito = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { id } = req.params;
        console.log(id);

        // Eliminar de la tabla bebida
        await connection.query(
            'DELETE FROM perrito WHERE id= ?',
            [id]
        );

        await connection.commit();
        res.status(200).json({ message: 'Perrito eliminado correctamente' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al eliminar perrito', error: error.message });
        }
    } finally {
        connection.release();
    }
};


export const getPerrito = async (req, res) => {
    const result = await pool.query(
        `SELECT * FROM perrito`
    )
    console.log(result[0])
    res.send(result[0])
};