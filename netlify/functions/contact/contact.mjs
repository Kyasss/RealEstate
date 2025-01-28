const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" }),
    };
  }

  try {
    const formData = new URLSearchParams(event.body);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Validar campos obligatorios
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Faltan campos obligatorios." }),
      };
    }

    // Separar nombre y apellido si es posible
    const [firstName, ...lastNameParts] = name.split(" ");
    const lastName = lastNameParts.join(" ") || "No especificado";

    // Preparar los datos para la API con la estructura correcta
    const data = {
      firstName: firstName,
      lastName: lastName,
      emails: [
        {
          value: email,
          type: "home"
        }
      ],
      phones: [
        {
          value: subject,
          type: "mobile"
        }
      ],
      source: "realestateagentemelync.com",
      tags: ["Lead desde el formulario"],
      stage: "lead"
    };

    // Configuración del API de Follow Up Boss
    const apiKey = "fka_09UkPzwWHSOSDH94Mfaf8DJAgsO2k8spc4"; 
    const apiUrl = "https://api.followupboss.com/v1/people";

    // Crear el contacto
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
      },
      body: JSON.stringify(data),
    });

    const responseJson = await response.json();
    console.log(responseJson); // Ver el contenido de la respuesta
    return {
      statusCode: response.status,
      body: JSON.stringify({
        error: "Error al enviar los datos.",
        details: errorResponse,
      }),
    };

    return {
      statusCode: 200,
      body: 'OK',
    };

  } catch (error) {
    console.error("Error procesando la solicitud:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Hubo un error al procesar la solicitud.",
        details: error.message,
      }),
    };
  }
};