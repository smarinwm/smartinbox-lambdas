const pool = require('../utils/db');
const { verifyToken } = require('../utils/auth');

exports.handler = async (event) => {
  try {
    const user = verifyToken(event.headers.Authorization);
    const { email_id, title, due_date } = JSON.parse(event.body);

    const [result] = await pool.query(
      'INSERT INTO tasks (user_id, email_id, title, due_date) VALUES (?, ?, ?, ?)',
      [user.id, email_id, title, due_date]
    );

    return { statusCode: 201, body: JSON.stringify({ id: result.insertId, status: 'pendiente' }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
