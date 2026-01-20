const pool = require('../utils/db');
const { verifyToken } = require('../utils/auth');

exports.handler = async (event) => {
  try {
    const user = verifyToken(event.headers.Authorization);
    const [rows] = await pool.query(
      'SELECT id, title, status, due_date FROM tasks WHERE user_id = ? ORDER BY due_date ASC',
      [user.id]
    );
    return { statusCode: 200, body: JSON.stringify(rows) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
