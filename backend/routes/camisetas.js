import express from 'express';
import { db } from '../db.js';

const router = express.Router();

router.get("/detalle/:id", async (req, res) => {
    try {
        const id = req.params.id;
        // Seleccionamos la camiseta por su ID
        const [camiseta] = await db.query(
            `SELECT * FROM camisetas WHERE id = ?`,
            [id]
        );
        
        // Si no se encuentra, devolvemos 404
        if (camiseta.length === 0) {
            return res.status(404).json({ error: 'Camiseta no encontrada' });
        }

        // Devolvemos solo el primer objeto (ya que el ID es único)
        res.json(camiseta[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error obteniendo la camiseta' });
    }
});


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