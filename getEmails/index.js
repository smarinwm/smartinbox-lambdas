const pool = require('../utils/db');
const { verifyToken } = require('../utils/auth');

exports.handler = async (event) => {
  try {
    const user = verifyToken(event.headers.Authorization);
    const [rows] = await pool.query(
      'SELECT id, subject, priority, received_at FROM emails WHERE user_id = ? ORDER BY received_at DESC',
      [user.id]
    );
    return { statusCode: 200, body: JSON.stringify(rows) };
  } catch (err) {
    return { statusCode: 401, body: JSON.stringify({ error: err.message }) };
  }
};
