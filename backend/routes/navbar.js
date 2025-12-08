// routes/navbar.js
import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// Estructura para almacenar la data de las secciones hardcodeadas
// Es mejor definir esto aquí en el backend que en el frontend
const seccionesEstaticas = [
    { nombre: 'Camisetas Retro' },
    { nombre: 'Cajas Sorpresa' }
];

// Endpoint para obtener la estructura completa del menú (Ligas y Equipos)
router.get("/secciones", async (req, res) => {
    try {
        // 1. Consulta para CLUBS (Ejemplo: LaLiga, Premier League, etc.)
        const [clubRows] = await db.query(
            `SELECT 
                l.nombre AS liga_nombre,
                e.nombre AS equipo_nombre,
                l.tipo AS liga_tipo
            FROM ligas l
            JOIN equipos e ON l.id = e.id_liga
            WHERE l.tipo = 'Club' 
            ORDER BY l.nombre, e.nombre`
        );

        // 2. Consulta para SELECCIONES (Ejemplo: España, Argentina, etc.)
         const [seleccionRows] = await db.query(
            `SELECT 
                s.nombre AS equipo_nombre
            FROM equipos s
            WHERE s.tipo = 'Seleccion' 
            ORDER BY s.nombre`
        );
        
        // --- Procesamiento de CLUBES ---
        const clubesMap = new Map();
        clubRows.forEach(row => {
            if (!clubesMap.has(row.liga_nombre)) {
                clubesMap.set(row.liga_nombre, { nombre: row.liga_nombre, equipos: [] });
            }
            clubesMap.get(row.liga_nombre).equipos.push({ nombre: row.equipo_nombre });
        });

        // --- Procesamiento de SELECCIONES ---
        const ligasSelecciones = {
            nombre: "Selecciones 25/26",
            ligas: [{
                nombre: "Selecciones", // Puedes usar un nombre genérico aquí
                equipos: seleccionRows.map(row => ({ nombre: row.equipo_nombre }))
            }]
        };

        // --- Estructura FINAL del Navbar ---
        const seccionesDinamicas = [
            {
                nombre: "Clubes 25/26",
                ligas: Array.from(clubesMap.values())
            },
            ligasSelecciones, // Las selecciones son la segunda sección
            ...seccionesEstaticas // Las secciones estáticas al final
        ];

        res.json(seccionesDinamicas);

    } catch (err) {
        console.error("Error al obtener secciones del Navbar:", err);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

export default router;