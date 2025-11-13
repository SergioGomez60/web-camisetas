import mysql from "mysql2";
import dotenv from "dotenv"; // Para importar los datos del .env

dotenv.config(); // Carga las variables definidas en tu archivo .env

const conexiondb = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export const promiseConexion = conexiondb.promise(); // exporta en forma de promesa (promiseConexion) para que luego puedas usar await en tus consultas.