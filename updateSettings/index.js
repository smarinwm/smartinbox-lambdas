const pool = require('../utils/db');
const { verifyToken } = require('../utils/auth');

exports.handler = async (event) => {
  try {
    const user = verifyToken(event.headers.Authorization);
    const { labels, rules } = JSON.parse(event.body);

    await pool.query('DELETE FROM user_rules WHERE user_id = ?', [user.id]);
    for (const rule of rules) {
      await pool.query('INSERT INTO user_rules (user_id, keyword, label) VALUES (?, ?, ?)', [user.id, rule.keyword, rule.label]);
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
