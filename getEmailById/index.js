const pool = require('../utils/db');
const { verifyToken } = require('../utils/auth');

exports.handler = async (event) => {
  try {
    const user = verifyToken(event.headers.Authorization);
    const id = event.pathParameters.id;

    const [rows] = await pool.query(
      `SELECT e.id, e.subject, e.body, GROUP_CONCAT(l.name) AS labels
       FROM emails e
       LEFT JOIN email_labels el ON e.id = el.email_id
       LEFT JOIN labels l ON el.label_id = l.id
       WHERE e.id = ? AND e.user_id = ?
       GROUP BY e.id`,
      [id, user.id]
    );

    if (!rows.length) return { statusCode: 404, body: JSON.stringify({ error: 'Correo no encontrado' }) };
    const email = rows[0];
    email.labels = email.labels ? email.labels.split(',') : [];
    return { statusCode: 200, body: JSON.stringify(email) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
