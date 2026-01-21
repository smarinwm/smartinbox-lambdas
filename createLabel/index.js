const pool = require('../utils/db');

exports.handler = async (event) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body || {};
    const { name, color } = body;

    if (!name || !color) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Faltan los campos name o color' }),
      };
    }

    const [result] = await pool.query(
      'INSERT INTO labels (name, color) VALUES (?, ?)',
      [name, color]
    );

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: result.insertId }),
    };
  } catch (err) {
    console.error('Error al crear etiqueta:', err.message, err.stack);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
