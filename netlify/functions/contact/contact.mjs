exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método no permitido' }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    const response = await fetch('https://api.followupboss.com/v1/eventos', {
      method: 'POST',
      headers: {
        'Authorization': 'fka_09UkPzwWHSOSDH94Mfaf8DJAgsO2k8spc4',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: 'Formulario de Contacto Web',
        system: 'MiSitioWeb',
        type: 'General Inquiry',  // Tipo de evento
        message: data.message,    // Mensaje del cliente
        persona: {
          name: data.name,
          email: data.email,
          phone: data.phone,
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
