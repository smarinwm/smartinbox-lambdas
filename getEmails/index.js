const pool = require('../utils/db');

exports.handler = async (event) => {
  try {
    // Obtener y validar el user_id desde los parámetros de consulta
    const userId = Number(event.queryStringParameters?.user_id);
    if (!userId) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Falta el parámetro user_id en la consulta' }),
      };
    }

    // Consultar todos los correos del usuario
    const [rows] = await pool.query(
      `
      SELECT e.id, e.subject, e.body, GROUP_CONCAT(l.name) AS labels
      FROM emails e
      LEFT JOIN email_labels el ON e.id = el.email_id
      LEFT JOIN labels l ON el.label_id = l.id
      WHERE e.user_id = ?
      GROUP BY e.id
      ORDER BY e.id DESC
      `,
      [userId]
    );

    const emails = rows.map((email) => ({
      ...email,
      labels: email.labels ? email.labels.split(',') : [],
    }));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emails),
    };
  } catch (err) {
    console.error('Error al obtener correos:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
