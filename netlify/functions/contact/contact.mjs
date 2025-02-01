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
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic ZmthXzA5VWtQemJtdEdRbHRIYzY5WHo2NUxuVkJHTFQzMDVZazM6'
      },
      body: JSON.stringify({
        source: "your_website", // Añade la fuente del lead, cambia "your_website"
        type: 'General Inquiry', // Usa un tipo de evento válido, para que las automatizaciones funcionen
        message: message,
        description: subject,
        person: {
          firstName: name,
          lastName: 'No Especificado', // Asegura que lastName no este vacio
          emails: [{ value: email, type: 'home' }], // Agrega el type de email
          phones: [{ value: phone, type: 'mobile' }], // Agrega el type de teléfono
          source: "your_website" // Añade la fuente del lead al objeto person también
        },
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
