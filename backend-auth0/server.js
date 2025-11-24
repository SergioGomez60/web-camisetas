import express from "express";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";

const app = express();

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

// Middleware para validar tokens
const jwtCheck = auth({
  audience: "http://camisworld", // este valor lo pones tú desde Auth0
  issuerBaseURL: "https://dev-32mzzfaff4uprtnv.us.auth0.com/",
  tokenSigningAlg: "RS256"
});

// Ruta pública
app.get("/api/publico", (req, res) => {
  res.json({ mensaje: "Ruta pública; no requiere token" });
});

// Ruta protegida
app.get("/api/protegido", jwtCheck, (req, res) => {
  res.json({
    mensaje: "Ruta protegida OK",
    usuario: req.auth.payload
  });
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
