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
    const phone = formData.get("phone"); // Asegúrate de obtener el número de teléfono del formulario
    const messageContent = formData.get("message");

    // Validar campos obligatorios
    if (!name || !email || !messageContent || !phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Faltan campos obligatorios." }),
      };
    }

    // Preparar los datos para el API de envío de mensajes de texto
    const data = {
      message: messageContent,
      recipients: [
        {
          phone: phone // Número de teléfono del destinatario
        }
      ],
      source: "realestateagentemelync.com"
    };

    // Configuración del API de Follow Up Boss para enviar mensajes de texto
    const apiKey = "fka_09UkPzwWHSOSDH94Mfaf8DJAgsO2k8spc4"; 
    const apiUrl = "https://api.followupboss.com/v1/textMessages";

    // Enviar el mensaje de texto
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
      },
      body: JSON.stringify(data),
    });

    // Si el mensaje se envió exitosamente
    if (response.status === 201 || response.status === 200) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Mensaje enviado exitosamente.",
          success: true
        }),
      };
    }

    // Si hay error en el envío del mensaje
    const errorResponse = await response.text();
    return {
      statusCode: response.status,
      body: JSON.stringify({
        error: "Error al enviar el mensaje.",
        details: errorResponse,
        success: false
      }),
    };

  } catch (error) {
    console.error("Error procesando la solicitud:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error interno del servidor.",
        details: error.message,
        success: false
      }),
    };
  }
};
