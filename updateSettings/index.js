const pool = require('../utils/db');

exports.handler = async (event) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body || {};
    const { user_id, rules } = body;

    if (!user_id || !Array.isArray(rules)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Faltan user_id o rules en el cuerpo' }),
      };
    }

    // Eliminar reglas anteriores del usuario
    await pool.query('DELETE FROM user_rules WHERE user_id = ?', [user_id]);

    // Insertar nuevas reglas
    for (const rule of rules) {
      if (rule.keyword && rule.label) {
        await pool.query(
          'INSERT INTO user_rules (user_id, keyword, label) VALUES (?, ?, ?)',
          [user_id, rule.keyword, rule.label]
        );
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Error al actualizar settings:', err.message, err.stack);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
