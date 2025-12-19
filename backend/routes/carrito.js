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
router.post('/', async (req, res) => {
    const { usuario_id, camiseta_id, caja_id, talla } = req.body; // <--- Añade caja_id

    try {
        if (camiseta_id) {
            // Lógica existente para camisetas
            await db.query(
                'INSERT INTO carrito (id_usuario, id_camiseta, talla, cantidad) VALUES (?, ?, ?, 1)',
                [usuario_id, camiseta_id, talla]
            );
        } else if (caja_id) {
            // NUEVA Lógica para cajas
            await db.query(
                'INSERT INTO carrito (id_usuario, id_caja, talla, cantidad) VALUES (?, ?, ?, 1)',
                [usuario_id, caja_id, talla]
            );
        }
        
        res.json({ message: 'Añadido al carrito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al añadir al carrito' });
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