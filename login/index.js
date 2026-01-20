const jwt = require('jsonwebtoken');
const pool = require('../utils/db');

exports.handler = async (event) => {
  const { email, password } = JSON.parse(event.body);
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  const user = rows[0];

  if (!user || user.password_hash !== password) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Credenciales inválidas' }) };
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
  return { statusCode: 200, body: JSON.stringify({ token }) };
};
