import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// Ruta GET /cajas -> Devuelve todas las cajas
router.get("/",async (req,res) => {
    try{
        const [cajas] = await db.query("SELECT * FROM cajas");
        res.json(cajas);
    }catch (err){
        console.error(err)
        res.status(500).json({ error: 'Error al obtener las cajas' });
    }
});

// GET una caja por ID (CON TALLAS)
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        
        // 1. Obtener datos de la caja
        const [rows] = await db.query('SELECT * FROM cajas WHERE id = ?', [id]);
        
        if (rows.length === 0) return res.status(404).json({ error: 'Caja no encontrada' });

        const caja = rows[0];

        // 2. Obtener tallas de esa caja
        const [tallasRows] = await db.query('SELECT talla FROM cajas_tallas WHERE id_caja = ?', [id]);
        
        // Convertimos el formato de la DB a un array simple: ['S', 'M', 'L']
        caja.tallas = tallasRows.map(row => row.talla);

        res.json(caja);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

export default router;