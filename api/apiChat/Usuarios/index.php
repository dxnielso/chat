<?php
require_once('../conexion.php');
require_once('../cors.php');
require_once('../api.php');
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    // LOGIN
    if (!empty($_GET['email']) and !empty($_GET['password'])) {
      $email = $_GET['email'];
      $password = md5($_GET['password']);
      $api = new Api();
      $obj = $api->getUsuario($email, $password);
      $json = json_encode($obj);
      echo $json;
    } else if (!empty($_GET['email']) and !empty($_GET['miEmail'])) {
      // Buscamos un usuario con el email que no sea mi email
      $email = $_GET['email'];
      $miEmail = $_GET['miEmail'];
      $api = new Api();
      $obj = $api->getUsuarioWithEmail($email, $miEmail);
      $json = json_encode($obj);
      echo $json;
    } else if (!empty($_GET['miEmail'])) {
      // Todos los amigos de un usuario
      $miEmail = $_GET['miEmail'];
      $api = new Api();
      $obj = $api->getUsuariosAmigos($miEmail);
      $json = json_encode($obj);
      echo $json;
    } else if (!empty($_GET['email'])) {
      // Buscamos mi usuario con me email
      $email = $_GET['email'];
      $api = new Api();
      $obj = $api->getMyUsuario($email);
      $json = json_encode($obj);
      echo $json;
    }

    break;

  case 'POST':
    $json = null;
    $data = json_decode(file_get_contents("php://input"), true);

    $email = $data['email'];
    $password = md5($data['password']);
    $nombre = $data['nombre'];
    $ap_paterno = $data['apPaterno'];
    $ap_materno = $data['apMaterno'];

    $api = new Api();
    $json = $api->addUsuario($email, $password, $nombre, $ap_paterno, $ap_materno);
    echo $json;
    break;

  case 'PUT':
    $json = null;
    $data = json_decode(file_get_contents("php://input"), true);

    if (!empty($data['email']) and !empty($data['url'])) {
      $email = $data['email'];
      $url = $data['url'];
      $api = new Api();
      $json = $api->updateAvatar($email, $url);
      echo $json;
    } else if(!empty($data['email']) and !empty($data['estado'])) {
      $email = $data['email'];
      $estado = $data['estado'];
      $api = new Api();
      $json = $api->updateEstado($email, $estado);
    }
    break;

  default:
    # code...
    break;
}
