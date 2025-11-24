import express from 'express';
import cors from 'cors';
import { auth } from 'express-oauth2-jwt-bearer';

const app = express();
app.use(cors({ origin: 'http://localhost:4200' })); // permite llamadas desde Angular
app.use(express.json());

const jwtCheck = auth({
  audience: 'https://camisworld', // lo configuras en Auth0 → APIs → Identifier
  issuerBaseURL: 'https://dev-32mzzfaff4uprtnv.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// Ruta pública
app.get('/api/publico', (req, res) => {
  res.json({ message: 'Ruta pública, cualquiera puede acceder' });
});

// Ruta protegida
app.get('/api/protegido', jwtCheck, (req, res) => {
  res.json({ message: 'Ruta protegida, usuario autenticado' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
