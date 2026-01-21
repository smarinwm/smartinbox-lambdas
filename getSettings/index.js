const pool = require('../utils/db');

exports.handler = async (event) => {
  try {
    // Obtener user_id desde el cuerpo
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body || {};
    const userId = Number(body.user_id);

    if (!userId) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Falta el campo user_id en el cuerpo' }),
      };
    }

    // Consultar etiquetas globales
    const [labels] = await pool.query('SELECT name FROM labels');

    // Consultar reglas del usuario
    const [rules] = await pool.query(
      'SELECT keyword, label FROM user_rules WHERE user_id = ?',
      [userId]
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        labels: labels.map((l) => l.name),
        rules,
      }),
    };
  } catch (err) {
    console.error('Error al obtener configuración:', err.message, err.stack);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
