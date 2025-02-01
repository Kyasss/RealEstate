exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método no permitido' }),
    };
  }

  try {
    const formData = new URLSearchParams(event.body);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");
    const phone = formData.get("phone");


    const response = await fetch('https://api.followupboss.com/v1/events', {
      method: 'POST',
      headers: {
        'Authorization': 'fka_09UkPzwWHSOSDH94Mfaf8DJAgsO2k8spc4',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: 'Formulario de Contacto Web',
        system: 'MiSitioWeb',
        type: 'General Inquiry',  // Tipo de evento
        message: message,    // Mensaje del cliente
        persona: {
          name: name,
          email: email,
          phone: phone,
        },
        occurredAt: new Date().toISOString(),  // Fecha actual del evento
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const responseData = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Datos enviados correctamente', data: responseData }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error interno del servidor', error: error.message }),
    };
  }
};
