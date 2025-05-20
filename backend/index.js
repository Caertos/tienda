// index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Middleware para logging de requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Body:', req.body);
  next();
});

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

app.get('/detalleClientes/:id', async (req, res) => {
  const { id } = req.params;
  const conn = await getConnection();
  try {
    // Obtener pedidos del cliente (más antiguos primero)
    const [pedidos] = await conn.query(
      'SELECT * FROM pedido WHERE cliente_id = ? ORDER BY id ASC',
      [id]
    );
    // Obtener pagos del cliente (más antiguos primero)
    const [pagos] = await conn.query(
      'SELECT * FROM pago WHERE cliente_id = ? ORDER BY id ASC',
      [id]
    );
    res.json({ pedidos, pagos });
  } catch (err) {
    console.error('Error al obtener detalle de cliente:', err);
    res.status(500).json({ error: 'Error interno al obtener detalle de cliente' });
  } finally {
    await conn.end();
  }
});

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

// Ruta de prueba para verificar que el servidor responde
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

// Ruta para crear pedido
app.post('/pedidos', async (req, res) => {
  console.log('Recibiendo pedido:', req.body);
  const connection = await getConnection();
  try {
    const { cliente_id, productos } = req.body;
    if (!cliente_id || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    // Calcular monto total
    const monto_total = productos.reduce((sum, p) => sum + Number(p.monto), 0);

    // Iniciar transacción
    await connection.beginTransaction();

    // Crear el pedido
    const [resultPedido] = await connection.execute(
      'INSERT INTO pedido (cliente_id, monto_total) VALUES (?, ?)',
      [cliente_id, monto_total]
    );

    const pedidoId = resultPedido.insertId;

    // Insertar detalles del pedido
    for (const producto of productos) {
      await connection.execute(
        'INSERT INTO detalle_pedido (pedido_id, descripcion, monto) VALUES (?, ?, ?)',
        [pedidoId, producto.descripcion, producto.monto]
      );
    }

    // Confirmar transacción
    await connection.commit();
    res.json({ insertId: pedidoId });

  } catch (error) {
    // Si hay error, revertir cambios
    await connection.rollback();
    console.error('Error al crear pedido:', error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  } finally {
    connection.release();
  }
});

// Agregar al final para capturar rutas no encontradas
app.use((req, res) => {
  console.log('Ruta no encontrada:', req.url);
  res.status(404).json({ error: `Ruta ${req.url} no encontrada` });
});

// Manejador de errores general
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
