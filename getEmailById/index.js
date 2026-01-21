const pool = require('../utils/db');
const { verifyToken } = require('../utils/auth');

exports.handler = async (event) => {
  try {
    // Extraer y validar el token
    const authHeader = event.headers?.Authorization || event.headers?.authorization;
    if (!authHeader) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Token no proporcionado' }),
      };
    }

    const user = verifyToken(authHeader);
    if (!user?.id) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Token inválido o usuario no identificado' }),
      };
    }

    // Validar parámetro ID
    const emailId = event.pathParameters?.id;
    if (!emailId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Falta el parámetro ID' }),
      };
    }

    // Ejecutar consulta
    const [rows] = await pool.query(
      `
      SELECT e.id, e.subject, e.body, GROUP_CONCAT(l.name) AS labels
      FROM emails e
      LEFT JOIN email_labels el ON e.id = el.email_id
      LEFT JOIN labels l ON el.label_id = l.id
      WHERE e.id = ? AND e.user_id = ?
      GROUP BY e.id
      `,
      [emailId, user.id]
    );

    // Validar resultado
    if (!rows.length) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Correo no encontrado' }),
      };
    }

    const email = rows[0];
    email.labels = email.labels ? email.labels.split(',') : [];

    return {
      statusCode: 200,
      body: JSON.stringify(email),
    };
  } catch (err) {
    console.error('Error interno:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
