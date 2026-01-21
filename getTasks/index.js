const pool = require('../utils/db');

exports.handler = async (event) => {
  try {
    console.log('Evento recibido:', JSON.stringify(event));

    const [rows] = await pool.query(
      `
      SELECT id, user_id, email_id, title, status, due_date
      FROM tasks
      ORDER BY id DESC
      `
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rows),
    };
  } catch (err) {
    console.error('Error al obtener tareas:', err.message, err.stack);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
