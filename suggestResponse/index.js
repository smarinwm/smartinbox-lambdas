const { verifyToken } = require('../utils/auth');

exports.handler = async (event) => {
  try {
    verifyToken(event.headers.Authorization);
    const { email_id } = JSON.parse(event.body);

    return {
      statusCode: 200,
      body: JSON.stringify({
        suggestion: `Gracias por su mensaje. Confirmamos la recepción del correo #${email_id}.`,
      }),
    };
  } catch (err) {
    return { statusCode: 401, body: JSON.stringify({ error: err.message }) };
  }
};
