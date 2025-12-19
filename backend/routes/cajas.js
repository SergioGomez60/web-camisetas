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

export default router;