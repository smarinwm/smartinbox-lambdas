const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  console.log("Evento recibido:", JSON.stringify(event));

  const authHeader = event.headers?.Authorization || event.headers?.authorization;
  console.log("Authorization header:", authHeader);

  if (!authHeader) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "No token provided" }),
    };
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decodificado:", decoded);

    // Aquí iría la lógica para obtener los emails
    return {
      statusCode: 200,
      body: JSON.stringify([{ id: 1, subject: "Correo de prueba" }]),
    };
  } catch (err) {
    console.error("Error al verificar token:", err.message);
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }
};

