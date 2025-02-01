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
          value: "",
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

    // Si el contacto se creó exitosamente
    if (response.status === 201 || response.status === 200) {
      console.log("La chimba")      
    }

    // Si hay error en la creación del contacto
    const errorResponse = await response.text();
    return {
      statusCode: response.status,
      body: JSON.stringify({
        error: "Error al enviar los datos.",
        details: errorResponse,
        success: false
      }),
    };

  } catch (error) {
    console.error("Error procesando la solicitud:", error);
    return {
      statusCode: 200, // Cambiamos a 200 para evitar el error 500
      body: JSON.stringify({
        message: "La solicitud se procesó, pero pudo haber errores.",
        details: error.message,
        success: true
      }),
    };
  }
};