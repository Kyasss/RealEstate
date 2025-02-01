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

    const state = formData.get("state");
    const city = formData.get("city");
    const property_type = formData.get("phone");

    const response = await fetch('https://api.followupboss.com/v1/events', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic ZmthXzA5VWtQemZIcktNUXdxN3dBdjdUT0R6MTVxVTM2OUNTRXo6'
      },
      body: JSON.stringify({
        person: {
          contacted: false,
          firstName: name,
          lastName: '',
          emails: [{value: email}],
          phones: [{value: phone}]
        },
        type: 'Inquiry',
        message: `${state} - ${city} - ${property_type} - ${message}`,
        description: subject
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    return {
      statusCode: 200,
      body: 'OK',
    };
  } catch (error) {
    
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error interno del servidor', error: error.message }),
    };
  }
};
