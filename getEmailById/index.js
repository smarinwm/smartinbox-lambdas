const pool = require('../utils/db');

exports.handler = async (event) => {
  try {
    const emailId = event.pathParameters?.id;
    if (!emailId) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Falta el parámetro ID en la ruta' }),
      };
    }

    const [rows] = await pool.query(
      `
      SELECT e.id, e.subject, e.body, e.user_id, GROUP_CONCAT(l.name) AS labels
      FROM emails e
      LEFT JOIN email_labels el ON e.id = el.email_id
      LEFT JOIN labels l ON el.label_id = l.id
      WHERE e.id = ?
      GROUP BY e.id
      `,
      [emailId]
    );

    if (!rows.length) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Correo no encontrado' }),
      };
    }

    const email = rows[0];
    email.labels = email.labels ? email.labels.split(',') : [];

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(email),
    };
  } catch (err) {
    console.error('Error interno:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
