import express from 'express';
import { db } from '../db.js';

const router = express.Router();

/**
 * Obtener todas las camisetas de un equipo por nombre
 * Ejemplo: /camisetas/equipo/Barcelona
 */

router.get("/:nombreEquipo", async (req,res) => {
    try{
        const nombre = req.params.nombreEquipo;

        const [camisetas] = await db.query(
            `SELECT c.*, e.nombre as nombre_equipo 
             FROM camisetas c
             JOIN equipos e ON c.id_equipo = e.id
             WHERE e.nombre = ?`,
            [nombre]
        );
        res.json(camisetas)
    }catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo camisetas' });
    }
})

export default router;