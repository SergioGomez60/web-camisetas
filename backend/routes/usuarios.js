import { Router } from "express";
import { promiseConexion } from "../db.js";
import bcrypt from "bcryptjs";
import { validateUser } from "../validaciones/usuarios.js";
import { validate } from "../middlewares/validate.js";


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
        const {username,email,password} = req.body

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
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        // Buscar usuario por username
        const [rows] = await promiseConexion.query(
            "SELECT * FROM users WHERE email = ? LIMIT 1",
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: "Email no encontrado" });
        }

        const user = rows[0];

        // Comparar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        res.json({
            message: "Login correcto",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("❌ Error en login:", error);
        res.status(500).json({ message: "Error interno" });
    }
});

export default router;