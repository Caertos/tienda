// index.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
app.use(cors());
app.use(express.json());

async function getConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

// Rutas...
app.get('/clientes', async (_, res) => {
  const conn = await getConnection();
  const [rows] = await conn.query(
    'SELECT * FROM cliente ORDER BY id DESC'
  );
  await conn.end();
  res.json(rows);
});

app.post('/clientes', async (req, res) => {
  const { nombre } = req.body;
  if (!nombre || !nombre.trim()) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  const conn = await getConnection();
  try {
    const [result] = await conn.query(
      'INSERT INTO cliente (nombre) VALUES (?)',
      [nombre.trim()]
    );

    res.status(201).json({ insertId: result.insertId });
  } catch (err) {
    console.error('Error al crear cliente:', err);
    res.status(500).json({ error: 'Error interno al crear cliente' });
  } finally {
    await conn.end();
  }
});

app.listen(process.env.PORT, () =>
  console.log(`API corriendo en http://localhost:${process.env.PORT}`)
);
