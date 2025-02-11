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
    const property_type = formData.get("property_type");




    const response = await fetch('https://api.followupboss.com/v1/events', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic ZmthXzA5VWtQemJtdEdRbHRIYzY5WHo2NUxuVkJHTFQzMDVZazM6'
      },
      body: JSON.stringify({
        source: "realestateagentemelync.com",
        type: 'General Inquiry', 
        message: `${state} / ${city} - ${property_type} \n${message}`,
        description: subject,
        person: {
          firstName: name,
          lastName: ' ',
          emails: [{ value: email, type: 'home' }], 
          phones: [{ value: phone, type: 'mobile' }],
          source: "realestateagentemelync.com"
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const responseData = await response.json();

    return {
      statusCode: 200,
      body: "OK",
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error interno del servidor', error: error.message }),
    };
  }
};
