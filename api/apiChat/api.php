<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

class Api
{
  // * * * * * * * * * * * * * * * * * * C O N S U L T A R * * * * * * * * * * * * * * *

  // Obtener usuario con email y password LOGIN
  public function getUsuario($email, $password)
  {
    $vector = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $sql = "SELECT * FROM Usuarios WHERE email = :email AND password = :password";
    $consulta = $db->prepare($sql);
    $consulta->bindParam(':email', $email);
    $consulta->bindParam(':password', $password);
    $consulta->execute();
    while ($fila = $consulta->fetch()) {
      $vector[] = array(
        "email" => $fila['email'],
        "nombre" => $fila['nombre'],
        "ap_paterno" => $fila['ap_paterno'],
        "ap_materno" => $fila['ap_materno'],
        "estado" => $fila['estado'],
        "avatar" => $fila['avatar']
      );
    }
    return $vector;
  }

  // Obtener un usuario con email que no sea mi usuario
  public function getUsuarioWithEmail($email, $miEmail)
  {
    $vector = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $sql = "SELECT * FROM Usuarios WHERE email LIKE :email";
    $consulta = $db->prepare($sql);
    $consulta->bindValue(':email', '%' . $email . '%');
    $consulta->execute();
    while ($fila = $consulta->fetch()) {
      if ($fila['email'] != $miEmail) {
        $vector[] = array(
          "email" => $fila['email'],
          "nombre" => $fila['nombre'],
          "ap_paterno" => $fila['ap_paterno'],
          "ap_materno" => $fila['ap_materno'],
          "estado" => $fila['estado'],
          "avatar" => $fila['avatar']
        );
      }
    }
    return $vector;
  }

  // Obtener mi usuario con mi email
  public function getMyUsuario($email)
  {
    $vector = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $sql = "SELECT * FROM usuarios WHERE email = :email";
    $consulta = $db->prepare($sql);
    $consulta->bindParam(':email', $email);
    $consulta->execute();

    while ($fila = $consulta->fetch()) {
      $vector[] = array(
        "email" => $fila['email'],
        "nombre" => $fila['nombre'],
        "ap_paterno" => $fila['ap_paterno'],
        "ap_materno" => $fila['ap_materno'],
        "estado" => $fila['estado'],
        "avatar" => $fila['avatar'],
      );
    }
    return $vector;
  }

  // OBTENER LAS NOTIFICACIONES DE UN USUARIO LEIDAS O NO LEIDAS
  public function getNotificacionesCondicion($email, $leida)
  {
    $vector = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $sql = "SELECT * FROM notificaciones WHERE emailUsuario = :email AND leida = :leida";
    $consulta = $db->prepare($sql);
    $consulta->bindParam(':email', $email);
    $consulta->bindParam(':leida', $leida);
    $consulta->execute();
    while ($fila = $consulta->fetch()) {
      $vector[] = array(
        "id" => $fila['id'],
        "titulo" => $fila['titulo'],
        "mensaje" => $fila['mensaje'],
        "fecha" => $fila['fecha'],
        "hora" => $fila['hora'],
      );
    }
    return $vector;
  }

  // OBTENER TODAS LAS NOTIFICACIONES DE UN USUARIO
  public function getNotificaciones($email)
  {
    $vector = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $sql = "SELECT * FROM notificaciones WHERE emailUsuario = :email ORDER BY fecha DESC, hora DESC";
    $consulta = $db->prepare($sql);
    $consulta->bindParam(':email', $email);
    $consulta->execute();
    while ($fila = $consulta->fetch()) {
      $vector[] = array(
        "id" => $fila['id'],
        "titulo" => $fila['titulo'],
        "mensaje" => $fila['mensaje'],
        "fecha" => $fila['fecha'],
        "hora" => $fila['hora'],
        "leida" => $fila['leida'],
      );
    }
    return $vector;
  }

  // Obtener los amigos de un usuario
  public function getUsuariosAmigos($miEmail)
  {
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $vector = array();

    $sql = "SELECT * FROM usuarios INNER JOIN amigos ON (usuarios.email=amigos.emailUsuario1) OR (usuarios.email=amigos.emailUsuario2) WHERE (amigos.emailUsuario1=:miEmail) OR (amigos.emailUsuario2=:miEmail)";

    $consulta = $db->prepare($sql);
    $consulta->bindParam(':miEmail', $miEmail);
    $consulta->execute();

    while ($fila = $consulta->fetch()) {
      if ($fila['email'] != $miEmail) {
        $vector[] = array(
          "email" => $fila['email'],
          "nombre" => $fila['nombre'],
          "apPaterno" => $fila['ap_paterno'],
          "apMaterno" => $fila['ap_materno'],
          "estado" => $fila['estado'],
          "avatar" => $fila['avatar']
        );
      }
    }
    return $vector;
  }

  public function getMensajes($miEmail, $emailAmigo)
  {
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $vector = array();

    $sql = "SELECT * FROM mensajes WHERE (emailRemitente = :miEmail AND emailDestinatario = :emailAmigo) OR (emailRemitente = :emailAmigo AND emailDestinatario = :miEmail) ORDER BY fecha DESC, hora DESC";

    $consulta = $db->prepare($sql);
    $consulta->bindParam(':miEmail', $miEmail);
    $consulta->bindParam(':emailAmigo', $emailAmigo);
    $consulta->execute();

    while ($fila = $consulta->fetch()) {
      $vector[] = array(
        "id" => $fila['id'],
        "asunto" => $fila['asunto'],
        "mensaje" => $fila['mensaje'],
        "emailRemitente" => $fila['emailRemitente'],
        "emailDestinatario" => $fila['emailDestinatario'],
        "fecha" => $fila['fecha'],
        "hora" => $fila['hora'],
      );
    }
    return $vector;
  }




  // * * * * * * * * * * * * * * * * * I N S E R T A R * * * * * * * * * * * * * * * *

  // LISTO
  public function addUsuario($email, $password, $nombre, $ap_paterno, $ap_materno)
  {
    $conexion = new Conexion();
    $db = $conexion->getConexion();

    $sql = "INSERT INTO usuarios (email, password, nombre, ap_paterno, ap_materno, avatar) VALUES(:email, :password, :nombre, :ap_paterno, :ap_materno, :avatar)";
    $consulta = $db->prepare($sql);

    $consulta->bindParam(':email', $email);
    $consulta->bindParam(':password', $password);
    $consulta->bindParam(':nombre', $nombre);
    $consulta->bindParam(':ap_paterno', $ap_paterno);
    $consulta->bindParam(':ap_materno', $ap_materno);
    $consulta->bindValue(':avatar', 'https://avatars.dicebear.com/api/initials/'.$nombre.'.svg');

    $res = $consulta->execute();

    if ($res) return 1;
    return 0;
  }

  public function addAmigos($email, $miEmail)
  {
    $conexion = new Conexion();
    $db = $conexion->getConexion();

    $vector = array();
    $sql = "SELECT * FROM amigos WHERE (emailUsuario1 = :email AND emailUsuario2 = :miEmail) OR (emailUsuario1 = :miEmail AND emailUsuario2 = :email)";
    $consulta = $db->prepare($sql);
    $consulta->bindParam(':email', $email);
    $consulta->bindParam(':miEmail', $miEmail);
    $consulta->execute();


    while ($fila = $consulta->fetch()) {
      $vector[] = array(
        "id" => $fila['id'],
        "emailUsuario1" => $fila['emailUsuario1'],
        "emailUsuario2" => $fila['emailUsuario2'],
      );
    }

    // En caso de que aun no son amigos se hace los siguiente:
    if (sizeof($vector) == 0) {
      $sql = "INSERT INTO amigos (emailUsuario1, emailUsuario2) VALUES(:email, :miEmail)";
      $consulta = $db->prepare($sql);
      $consulta->bindParam(':email', $email);
      $consulta->bindParam(':miEmail', $miEmail);
      $res = $consulta->execute();

      if ($res) {
        date_default_timezone_set("America/Mexico_City");
        $titulo = "Nueva amistad";
        $mensaje = "El usuario " . $miEmail . " te agrego a sus amigos.";
        $fecha = date("Y/m/d");
        $hora = date("H:i:s");
        $leida = false;

        $sql = "INSERT INTO notificaciones (titulo, mensaje, fecha, hora, leida, emailUsuario) VALUES(:titulo, :mensaje, :fecha, :hora, :leida, :email)";
        $consulta = $db->prepare($sql);
        $consulta->bindParam(':titulo', $titulo);
        $consulta->bindParam(':mensaje', $mensaje);
        $consulta->bindParam(':fecha', $fecha);
        $consulta->bindParam(':hora', $hora);
        $consulta->bindParam(':leida', $leida);
        $consulta->bindParam(':email', $email);
        $res = $consulta->execute();

        return 2;
      } else {
        return 1;
      }
    }
    // En caso de que ya son amigos se retorna un 0 interpretado como un tipo de error
    else {
      return 0;
    }
  }

  public function sendEmail($asunto, $mensaje, $emailRemitente, $emailDestinatario)
  {
    $conexion = new Conexion();
    $db = $conexion->getConexion();

    date_default_timezone_set("America/Mexico_City");
    $fecha = date("Y/m/d");
    $hora = date("H:i:s");

    $sql = "INSERT INTO mensajes (asunto, mensaje, emailRemitente, emailDestinatario, fecha, hora) VALUES(:asunto, :mensaje, :emailRemitente, :emailDestinatario, :fecha, :hora)";
    $consulta = $db->prepare($sql);

    $consulta->bindParam(':asunto', $asunto);
    $consulta->bindParam(':mensaje', $mensaje);
    $consulta->bindParam(':emailRemitente', $emailRemitente);
    $consulta->bindParam(':emailDestinatario', $emailDestinatario);
    $consulta->bindParam(':fecha', $fecha);
    $consulta->bindParam(':hora', $hora);

    $res = $consulta->execute();

    // Logica para enviar email

    if ($res) {
      $mail = new PHPMailer(true);
      try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'daniel.solis5200@gmail.com';                     //SMTP username
        $mail->Password   = 'dfkxpdenwrplpbyb';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
      
        //Recipients
        $mail->setFrom('from@example.com', $emailRemitente);
        $mail->addAddress($emailDestinatario);     //Add a recipient
      
        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = $asunto;
        $mail->Body    = $mensaje;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
      
        $mail->send();
        // echo 'Message has been sent';
        return 2;

      } catch (Exception $e) {
        // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        return 1;
      }
    } else {
      return 0;
    }
  }



  // * * * * * * * * * * * * * * * * * U P D A T E * * * * * * * * * * * * * * * *
  public function updateNotificacion($id, $leida)
  {

    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $sql = "UPDATE notificaciones SET leida=:leida WHERE id=:id";
    $consulta = $db->prepare($sql);
    $consulta->bindParam(':id', $id);
    $consulta->bindParam(':leida', $leida);
    // $consulta->execute();

    $res = $consulta->execute();

    if ($res) return 1;
    return 0;
  }

  public function updateAvatar($email, $url)
  {
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $sql = "UPDATE usuarios SET avatar=:url WHERE email=:email";
    $consulta = $db->prepare($sql);
    $consulta->bindParam(':email', $email);
    $consulta->bindParam(':url', $url);

    $res = $consulta->execute();

    if ($res) return 1;
    return 0;
  }

  public function updateEstado($email, $estado)
  {
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $sql = "UPDATE usuarios SET estado=:estado WHERE email=:email";
    $consulta = $db->prepare($sql);
    $consulta->bindParam(':email', $email);
    $consulta->bindParam(':estado', $estado);
    // $consulta->execute();

    $res = $consulta->execute();

    if ($res) return 1;
    return 0;
  }
}
