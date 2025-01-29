const nodemailer = require("nodemailer");

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
    const state = formData.get("state");
    const city = formData.get("city");
    const property_type = formData.get("property_type");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Faltan campos obligatorios." }),
      };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "estateagencypport@gmail.com", 
        pass: "lgjn xrew pski zqml", 
      },
    });

    const mailOptions = {
      from: email,
      to: "juliandia666@gmail.com",
      subject: `Mensaje de: ${name} - ${subject} - ${email}`,
      text: ` ${state}, ${city}, ${property_type} \n ${message}`,
      replyTo: email,
    };

    try {
      await transporter.sendMail(mailOptions);
      return {
        statusCode: 200,
        body: "OK", 
      };
    } catch (error) {
      console.error("Error enviando correo:", error);
      return {
        statusCode: 500,
        body: "Error al enviar el correo.", 
      };
    }

  } catch (error) {
    console.error("Error procesando la solicitud:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Hubo un error al procesar la solicitud." }),
    };
  }
};
