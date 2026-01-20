const pool = require('../utils/db');
const { verifyToken } = require('../utils/auth');

exports.handler = async (event) => {
  try {
    const user = verifyToken(event.headers.Authorization);
    const [labels] = await pool.query('SELECT name FROM labels');
    const [rules] = await pool.query('SELECT keyword, label FROM user_rules WHERE user_id = ?', [user.id]);

    return { statusCode: 200, body: JSON.stringify({ labels: labels.map(l => l.name), rules }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
