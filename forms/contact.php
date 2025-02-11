<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $to = 'juliandia666@gmail.com';
    $subject = htmlspecialchars($_POST['subject']);
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $body = "Nombre: $name\n";
    $body .= "Correo: $email\n\n";
    $body .= "Mensaje:\n$message";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "OK";
    } else {
        echo "Error al enviar el correo.";
    }
} else {
    http_response_code(405);
    echo "Método no permitido";
}
?>