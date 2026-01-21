const pool = require('../utils/db');

exports.handler = async (event) => {
  try {
    // Aceptar entrada como JSON plano (Lambda test) o como string (API Gateway)
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body || event;

    const { email, password } = body || {};
    if (!email || !password) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Email y contraseña son obligatorios' }),
      };
    }

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user || user.password_hash !== password) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Credenciales inválidas' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, email: user.email }),
    };
  } catch (err) {
    console.error('Error en login:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
