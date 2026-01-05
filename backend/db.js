import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Carga las variables del archivo .env si estamos en local
dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  // Opciones para mantener la conexión viva en la nube
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  // Aiven requiere SSL, esta opción asegura la conexión segura
  ssl: {
    rejectUnauthorized: true
  }
});