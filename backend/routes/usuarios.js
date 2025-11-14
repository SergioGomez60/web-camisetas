import { Router } from "express";
import { promiseConexion } from "../db.js";
import bcrypt from "bcryptjs";

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

router.post("/usuarios",async (req,res)=>{
    try{
        const {name,email,password} = req.body
    }catch{

    }
})

export default router;