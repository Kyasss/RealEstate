exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" }),
    };
  }

  try {
    // Parsear el cuerpo de la solicitud como JSON
    let requestData;
    try {
      requestData = JSON.parse(event.body);
    } catch {
      // Si falla el JSON.parse, intentar con URLSearchParams
      const formData = new URLSearchParams(event.body);
      requestData = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message")
      };
    }

    const { name, email, phone, message } = requestData;

    // Validar campos obligatorios
    if (!name || !email || !message || !phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: "Faltan campos obligatorios.",
          fields: { name, email, message, phone } 
        }),
      };
    }

    // Formatear el número de teléfono (eliminar caracteres no numéricos)
    const formattedPhone = phone.replace(/\D/g, '');

    // Preparar los datos para el API
    const data = {
      to: formattedPhone,
      from: "2134447978", // Número desde el cual se enviará el mensaje
      message: message,
      source: "realestateagentemelync.com"
    };

    // Configuración del API de Follow Up Boss
    const apiKey = "fka_09UkPzwWHSOSDH94Mfaf8DJAgsO2k8spc4"; 
    const apiUrl = "https://api.followupboss.com/v1/textMessages";

    console.log('Enviando datos a Follow Up Boss:', JSON.stringify(data));

    // Enviar el mensaje de texto
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
      },
      body: JSON.stringify(data),
    });

    console.log('Respuesta de Follow Up Boss:', response.status);

    // Procesar la respuesta
    if (response.status === 201 || response.status === 200) {
      const responseData = await response.json();
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Permitir CORS
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: "Mensaje enviado exitosamente.",
          success: true,
          data: responseData
        }),
      };
    }

    // Si hay error
    const errorResponse = await response.text();
    console.error('Error de Follow Up Boss:', errorResponse);
    
    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*', // Permitir CORS
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: "Error al enviar el mensaje.",
        details: errorResponse,
        success: false
      }),
    };

  } catch (error) {
    console.error("Error procesando la solicitud:", error);
    return {
      statusCode: 200, // Cambiado a 200 para evitar errores en el cliente
      headers: {
        'Access-Control-Allow-Origin': '*', // Permitir CORS
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: "Error procesando la solicitud.",
        details: error.message,
        success: false
      }),
    };
  }
};