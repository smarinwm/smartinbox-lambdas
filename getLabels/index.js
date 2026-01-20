const pool = require('../utils/db');

exports.handler = async () => {
  const [rows] = await pool.query('SELECT id, name, color FROM labels ORDER BY name ASC');
  return { statusCode: 200, body: JSON.stringify(rows) };
};
