import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// CREAR UN NUEVO PEDIDO
router.post('/', async (req, res) => {
    const { usuario_id, total, direccion, ciudad, codigo_postal, pais } = req.body;

    // Usamos una conexión para manejar transacciones (si falla algo, no se guarda nada)
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // 1. Crear el pedido en la tabla 'pedidos'
        const [resultPedido] = await connection.query(
            `INSERT INTO pedidos (usuario_id, total, direccion, ciudad, codigo_postal, pais) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [usuario_id, total, direccion, ciudad, codigo_postal, pais]
        );
        const pedidoId = resultPedido.insertId;

        // 2. Obtener los productos del carrito de este usuario
        // (Nota: Asegúrate de que los nombres de columnas coinciden con tu DB: id_camiseta o camiseta_id)
        const [itemsCarrito] = await connection.query(
            `SELECT c.*, 
                    cam.precio as precio_cam, 
                    caja.precio as precio_caja 
             FROM carrito c
             LEFT JOIN camisetas cam ON c.camiseta_id = cam.id
             LEFT JOIN cajas caja ON c.id_caja = caja.id
             WHERE c.usuario_id = ?`, // OJO: Si en tu DB es id_usuario, cámbialo aquí
            [usuario_id]
        );

        if (itemsCarrito.length === 0) {
            throw new Error("El carrito está vacío");
        }

        // 3. Mover cada item del carrito a 'detalles_pedido'
        for (const item of itemsCarrito) {
            const precioReal = item.camiseta_id ? item.precio_cam : item.precio_caja;
            
            await connection.query(
                `INSERT INTO detalles_pedido (pedido_id, camiseta_id, caja_id, talla, cantidad, precio_unitario)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [pedidoId, item.camiseta_id, item.id_caja, item.talla, item.cantidad || 1, precioReal]
            );
        }

        // 4. Vaciar el carrito del usuario
        await connection.query('DELETE FROM carrito WHERE usuario_id = ?', [usuario_id]);

        await connection.commit(); // Confirmar cambios
        res.json({ message: 'Pedido creado con éxito', id: pedidoId });

    } catch (error) {
        await connection.rollback(); // Deshacer cambios si hubo error
        console.error(error);
        res.status(500).json({ error: 'Error al procesar el pedido' });
    } finally {
        connection.release();
    }
});

// OBTENER PEDIDOS DE UN USUARIO (Para el historial)
router.get('/:usuario_id', async (req, res) => {
    try {
        const [pedidos] = await db.query(
            'SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY fecha DESC',
            [req.params.usuario_id]
        );

        if (pedidos.length === 0) {
            return res.json([]);
        }

        // 3. Rellenar los productos de cada pedido
        // (Hacemos un bucle asíncrono para buscar los detalles de cada pedido)
        for (let i = 0; i < pedidos.length; i++) {
            const pedido = pedidos[i];

            // Buscamos las camisetas O cajas asociadas a este pedido
            // Hacemos JOIN con 'camisetas' para sacar el nombre
            const [productos] = await db.query(
                `SELECT dp.*, c.nombre, c.imagen 
                 FROM detalles_pedido dp
                 LEFT JOIN camisetas c ON dp.camiseta_id = c.id
                 WHERE dp.pedido_id = ?`,
                [pedido.id]
            );

            // Añadimos la propiedad 'productos' al objeto pedido
            // Esto es lo que espera tu HTML: @for (item of pedido.productos)
            pedido.productos = productos;
        }

        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;