const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" }),
    };
  }

  const { name, email, subject, message } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "juliandia666@gmail.com", // Tu email
        pass: "hohp gjcz mywl cusw", // Tu contraseña
    },
  });

  const mailOptions = {
    from: email,
    to: "destinatario@gmail.com",
    subject: `Formulario de Contacto: ${subject}`,
    text: `Mensaje de ${name} (${email}):\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: "Correo enviado correctamente" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al enviar el correo" }),
    };
  }
};
