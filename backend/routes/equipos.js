import express from 'express';
import { db } from '../db.js';

const router = express.Router();

/**
 * Obtener todos los equipos de una liga
 */

router.get("/liga/:idLiga", async (req,res) => {
    try{
        const [rows] = await db.query(
            'SELECT * FROM equipos WHERE id_liga = ?',
            [req.params.idLiga]
        );
        res.json(rows);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Error obteniendo equipos' });
    }
})

/**
 * Buscar equipo por nombre (para Angular /equipo/:nombre)
 */

router.get("/equipo/:nombre",async (req,res) => {
    try{
        const [rows] = await db.query(
            "SELECT * FROM equipos WHERE nombre = ?",[req.params.nombre]
        );

        if (rows.length === 0) return res.status(404).json({ error: 'Equipo no encontrado' });

        res.json(rows[0]);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Error obteniendo equipo' });
    }
})

export default router;