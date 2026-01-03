import express from 'express';
import { db } from '../db.js';

const router = express.Router();

router.get("/detalle/:id", async (req, res) => {
    try {
        const id = req.params.id;
        
        // 1. Datos de la camiseta
        const [rows] = await db.query('SELECT * FROM camisetas WHERE id = ?', [id]);
        
        if (rows.length === 0) return res.status(404).json({ error: 'No existe' });

        const camiseta = rows[0];

        // 2. Tallas disponibles (NUEVO)
        const [tallasRows] = await db.query(
            'SELECT talla FROM camisetas_tallas WHERE id_camiseta = ?', 
            [id]
        );

        // Convertimos [{talla: 'S'}, {talla: 'M'}] -> ['S', 'M']
        camiseta.tallas = tallasRows.map(row => row.talla);

        res.json(camiseta);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});


router.get("/categoria/:categoria", async (req,res) => {
    const categoria = req.params.categoria;

    try{
        const [rows] = await db.query('SELECT * FROM camisetas WHERE categoria = ?', [categoria])
    }catch (error){
        res.status(500).json({ error: error.message });
    }
})


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
});



export default router;