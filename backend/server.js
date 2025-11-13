import express from "express";
import cors from "cors";
import { promiseConexion } from "./db.js";
import dotenv from "dotenv" // Para importar los datos del .env
import usuariosRouter from "./routes/usuarios.js"

const app = express();
app.use(cors());
app.use(express.json()); // Importante para utilizar el req.body
app.disable("x-powered-by");
dotenv.config();


app.use("/usuarios", usuariosRouter);

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server listening on port http://localhost:${PORT}`);
})