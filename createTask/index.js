const pool = require('../utils/db');

exports.handler = async (event) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body || {};

    const { user_id, email_id = null, title, status = 'pendiente', due_date = null } = body;

    if (!user_id || !title) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'user_id y title son obligatorios' }),
      };
    }

    const [result] = await pool.query(
      `
      INSERT INTO tasks (user_id, email_id, title, status, due_date)
      VALUES (?, ?, ?, ?, ?)
      `,
      [user_id, email_id, title, status, due_date]
    );

    const newTask = {
      id: result.insertId,
      user_id,
      email_id,
      title,
      status,
      due_date,
    };

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    };
  } catch (err) {
    console.error('Error al crear tarea:', err.message, err.stack);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
