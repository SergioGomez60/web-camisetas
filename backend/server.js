import express from "express";
import cors from "cors";
import db from "./db.js";
import 'dotenv/config'; // Para importar los datos del .env

const app = express();
app.use(cors());
app.use(express.json()); // Importante para utilizar el req.body
app.disable("x-powered-by");


app.use("/camisetas",);

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server listening on port http://localhost:${PORT}`);
})