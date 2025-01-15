<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Reemplaza con tu dirección de correo
    $to = 'juliandia666@gmail.com';
    $subject = htmlspecialchars($_POST['subject']);
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Crea el cuerpo del mensaje
    $body = "Nombre: $name\n";
    $body .= "Correo: $email\n\n";
    $body .= "Mensaje:\n$message";

    // Cabeceras del correo
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Intenta enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "OK"; // Respuesta esperada por el .js
    } else {
        echo "Error al enviar el correo.";
    }
} else {
    http_response_code(405);
    echo "Método no permitido";
}
?>