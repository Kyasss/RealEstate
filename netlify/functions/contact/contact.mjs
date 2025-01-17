const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    let data;

    // Intenta analizar el cuerpo como JSON
    if (event.headers["content-type"] === "application/json") {
      data = JSON.parse(event.body);
    } else {
      // Analiza los datos si vienen como application/x-www-form-urlencoded
      const querystring = require("querystring");
      data = querystring.parse(event.body);
    }

    const { name, email, subject, message } = data;

    // Aquí procesas los datos como desees
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Datos procesados correctamente." }),
    };
  } catch (error) {
    console.error("Error procesando la solicitud:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno del servidor." }),
    };
  }
};

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Método no permitido" }),
        };
    }

    const { name, email, subject, message } = JSON.parse(event.body);

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail", // Puedes usar otros servicios (ej. Outlook, SMTP personalizado)
        auth: {
            user: "juliandia666@gmail.com", // Tu email
            pass: "hohp gjcz mywl cusw", // Tu contraseña
        },
    });

    const mailOptions = {
        from: email,
        to: "juliandia666@gmail.com", // Correo del destinatario
        subject: `Mensaje de: ${name} - ${subject}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Correo enviado correctamente" }),
        };
    } catch (error) {
        console.error("Error enviando correo:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Hubo un error al enviar el correo" }),
        };
    }
};
