import express from 'express';
import cors from 'cors';
import camisetasRoutes from './routes/camisetas.js';
import carritoRoutes from './routes/carrito.js';
import cajasRoutes from './routes/cajas.js';
import pedidosRoutes from './routes/pedidos.js';
import pagosRoutes from './routes/pagos.js';

const app = express();

app.use(cors({
  origin: '*', // O pon la URL de tu frontend en Vercel: 'https://tu-web.vercel.app'
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rutas
app.use('/camisetas', camisetasRoutes);
app.use('/carrito', carritoRoutes);
app.use('/cajas', cajasRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/pagos', pagosRoutes)

// Puerto
const PORT = process.env.PORT || 3000;
// Añadimos '0.0.0.0' para que Render exponga el puerto correctamente
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
