const pool = require('../utils/db');

exports.handler = async () => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, color FROM labels ORDER BY name ASC'
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rows),
    };
  } catch (err) {
    console.error('Error al obtener etiquetas:', err.message, err.stack);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
