import { Router } from "express";
import { promiseConexion } from "../db.js";
import bcrypt from "bcryptjs";
import { validateUser } from "../validaciones/usuarios.js";

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

router.post("/registro",validate(validateUser),async (req,res)=>{
    try{
        const {name,email,password} = req.body

        // Chequeo de email ya registrado
        const [existeEmail] = await promiseConexion.query("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
        if(existeEmail.length > 0) return res.status(409).json({ message: "El email ya está registrado" });

        const passwordHashed = await bcrypt.hash(password,10); // transforma la contraseña en un hash seguro. El número 10 es el salt rounds, suficiente para seguridad sin perder rendimiento.
        const [result] = await promiseConexion.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",[username, email, passwordHashed]);
        res.status(201).json({ message: "Usuario creado", id: result.insertId });
    }catch (err){
        console.error(err);
        res.status(500).json({ message: "Error interno" });
    }
})

export default router;