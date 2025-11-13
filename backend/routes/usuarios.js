import { Router } from "express";
import { promiseConexion } from "../db.js";

const router = Router();

// Ruta para obtener todos los usuarios
router.get("/", async (req,res) =>{
    try{
        const [rows] = await promiseConexion.query("SELECT * FROM users");
        res.json(rows);
    }catch (error){
        console.error("❌ Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
    
})

export default router;