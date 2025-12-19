import express from 'express';
import cors from 'cors';
import camisetasRoutes from './routes/camisetas.js';
import carritoRoutes from './routes/carrito.js';
import cajasRoutes from './routes/cajas.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/camisetas', camisetasRoutes);
app.use('/carrito', carritoRoutes);
app.use('/cajas', cajasRoutes);

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js en http://localhost:${PORT}`);
});
