import express from 'express';
import cors from 'cors';

import equiposRoutes from './routes/equipos.js';
import camisetasRoutes from './routes/camisetas.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/equipos', equiposRoutes);
app.use('/camisetas', camisetasRoutes);

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js en http://localhost:${PORT}`);
});
