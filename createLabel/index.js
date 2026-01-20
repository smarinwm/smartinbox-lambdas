const pool = require('../utils/db');

exports.handler = async (event) => {
  const { name, color } = JSON.parse(event.body);
  const [result] = await pool.query('INSERT INTO labels (name, color) VALUES (?, ?)', [name, color]);
  return { statusCode: 201, body: JSON.stringify({ id: result.insertId }) };
};
