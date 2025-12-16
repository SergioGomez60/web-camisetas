// backend/routes/carrito.js
import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// 1. OBTENER EL CARRITO (GET)
router.get("/:usuario_id", async (req, res) => {
    try {
        const usuarioId = req.params.usuario_id;
        
        // CORRECCIÓN: Añadimos 'car.talla' al SELECT
        const [items] = await db.query(
            `SELECT 
                car.id as carrito_id, 
                car.talla,  /* <--- ¡ESTO FALTABA! */
                c.* FROM carrito car
             JOIN camisetas c ON car.camiseta_id = c.id
             WHERE car.usuario_id = ?`,
            [usuarioId]
        );
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

// 2. AÑADIR AL CARRITO (POST)
router.post("/", async (req, res) => {
    try {
        // Ahora recibimos también la 'talla'
        const { usuario_id, camiseta_id, talla } = req.body;
        
        await db.query(
            `INSERT INTO carrito (usuario_id, camiseta_id, talla) VALUES (?, ?, ?)`,
            [usuario_id, camiseta_id, talla]
        );
        
        res.json({ message: 'Producto añadido con talla' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al añadir' });
    }
});

// 3. BORRAR DEL CARRITO (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const idCarrito = req.params.id;
        await db.query("DELETE FROM carrito WHERE id = ?", [idCarrito]);
        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al borrar' });
    }
});

export default router;