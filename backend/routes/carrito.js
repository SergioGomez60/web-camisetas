// backend/routes/carrito.js
import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// 1. OBTENER EL CARRITO (GET)
router.get("/:usuario_id", async (req, res) => {
    try {
        const usuarioId = req.params.usuario_id;
        
        // Usamos LEFT JOIN para traer datos de camisetas O de cajas
        const [items] = await db.query(
            `SELECT 
                car.id as carrito_id, 
                car.talla,
                car.camiseta_id,
                car.caja_id,
                -- Datos Camiseta
                c.descripcion as desc_camiseta, 
                c.precio as precio_camiseta, 
                c.imagen_principal as img_camiseta,
                -- Datos Caja
                k.nombre as nombre_caja,
                k.precio as precio_caja,
                k.imagen as img_caja
             FROM carrito car
             LEFT JOIN camisetas c ON car.camiseta_id = c.id
             LEFT JOIN cajas k ON car.caja_id = k.id
             WHERE car.usuario_id = ?`,
            [usuarioId]
        );

        // Unificamos los datos para que el frontend no se vuelva loco
        const itemsProcesados = items.map(item => {
            if (item.caja_id) {
                return {
                    carrito_id: item.carrito_id,
                    talla: item.talla,
                    // Hacemos pasar la caja por una camiseta para reutilizar tu diseño de carrito
                    descripcion: item.nombre_caja, 
                    precio: item.precio_caja,
                    imagen_principal: item.img_caja,
                    es_caja: true
                };
            } else {
                return {
                    carrito_id: item.carrito_id,
                    talla: item.talla,
                    descripcion: item.desc_camiseta,
                    precio: item.precio_camiseta,
                    imagen_principal: item.img_camiseta,
                    es_caja: false
                };
            }
        });

        res.json(itemsProcesados);
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