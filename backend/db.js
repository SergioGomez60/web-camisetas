import mysql from "mysql2";
import 'dotenv/config'; // Para importar los datos del .env

const conexiondb = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export const promiseConexion = conexiondb.promise(); // exporta en forma de promesa (promiseConexion) para que luego puedas usar await en tus consultas.