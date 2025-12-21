// backend/routes/carrito.js
import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// 1. OBTENER EL CARRITO (MEJORADO PARA VER CAJAS Y CAMISETAS)
router.get("/:usuario_id", async (req, res) => {
    try {
        const usuarioId = req.params.usuario_id;
        
        // Usamos LEFT JOIN para buscar en las dos tablas (camisetas y cajas)
        // Si es una caja, la fila tendrá datos en las columnas de 'k', si es camiseta en 'c'
        const [items] = await db.query(
            `SELECT 
                car.id as carrito_id, 
                car.talla,
                car.camiseta_id,
                car.id_caja,
                -- Datos de Camisetas (alias c)
                c.descripcion as desc_camiseta, 
                c.precio as precio_camiseta, 
                c.imagen_principal as img_camiseta,
                -- Datos de Cajas (alias k)
                k.nombre as nombre_caja,
                k.precio as precio_caja,
                k.imagen as img_caja
             FROM carrito car
             LEFT JOIN camisetas c ON car.camiseta_id = c.id
             LEFT JOIN cajas k ON car.id_caja = k.id
             WHERE car.usuario_id = ?`,
            [usuarioId]
        );

        // Procesamos los datos para unificar nombres
        // El frontend espera: descripcion, precio, imagen_principal
        const itemsProcesados = items.map(item => {
            if (item.id_caja) {
                // ES UNA CAJA: Usamos sus datos pero les ponemos los nombres que espera el HTML
                return {
                    carrito_id: item.carrito_id,
                    talla: item.talla,
                    descripcion: item.nombre_caja, // Usamos el nombre como descripción
                    precio: item.precio_caja,
                    imagen_principal: item.img_caja, // Usamos la imagen de la caja
                    es_caja: true // Marcador por si lo necesitas luego
                };
            } else {
                // ES UNA CAMISETA: Usamos los datos normales
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

// 2. AÑADIR AL CARRITO (Soporta ambos)
router.post('/', async (req, res) => {
    const { usuario_id, camiseta_id, id_caja, talla } = req.body;

    try {
        if (camiseta_id) {
            await db.query(
                'INSERT INTO carrito (usuario_id, camiseta_id, talla, cantidad) VALUES (?, ?, ?, 1)',
                [usuario_id, camiseta_id, talla]
            );
        } else if (id_caja) {
            await db.query(
                'INSERT INTO carrito (usuario_id, id_caja, talla, cantidad) VALUES (?, ?, ?, 1)',
                [usuario_id, id_caja, talla]
            );
        }
        res.json({ message: 'Añadido al carrito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al añadir al carrito' });
    }
});

// 3. BORRAR DEL CARRITO
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