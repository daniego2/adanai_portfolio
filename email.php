<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Cargar el autoloader de Composer

$mail = new PHPMailer(true);
try {
    // Capturar los datos del formulario de manera segura
    $inputEmail = htmlspecialchars($_POST['inputEmail']);
    $inputSubject = htmlspecialchars($_POST['inputSubject']);
    $inputMessage = htmlspecialchars($_POST['inputMessage']);
    $inputName = htmlspecialchars($_POST['inputName']);
    
    // Configuración del servidor SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'danielgonzalezsanchez282@gmail.com';
    $mail->Password   = trim(file_get_contents('appSecret')); // Cargar contraseña desde archivo
    
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Destinatarios
    $mail->setFrom($inputEmail, $inputName);
    $mail->addAddress('danielgonzalezsanchez282@gmail.com');

    // Contenido del email
    $mail->isHTML(true);
    $mail->Subject = $inputSubject;
    $mail->Body    = "Message: $inputMessage" . "<br><br>From: $inputEmail";
    $mail->AltBody = 'Alt Body';

    // Enviar email
    $mail->send();

    // Redirigir con estado 'success'
    $anchor = isset($_GET['anchor']) ? $_GET['anchor'] : '';  // Obtener el anclaje desde la URL
    header("Location: index.html?status=success" . ($anchor ? "#" . $anchor : ""));
    exit; // Detener ejecución después de redirigir
} catch (Exception $e) {
    // En caso de error, redirigir con un mensaje de error
    $anchor = isset($_GET['anchor']) ? $_GET['anchor'] : '';  // Obtener el anclaje desde la URL
    header("Location: index.html?status=error&message=" . urlencode($mail->ErrorInfo) . ($anchor ? "&anchor=" . $anchor : ""));
    exit; // Detener ejecu ción después de redirigir
}
?>