<?php
require_once('../conexion.php');
require_once('../cors.php');
require_once('../api.php');
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    if(!empty($_GET['miEmail']) and isset($_GET['emailAmigo'])) {
      $miEmail = $_GET['miEmail'];
      $emailAmigo = $_GET['emailAmigo'];
      $api = new Api();
      $obj = $api->getMensajes($miEmail, $emailAmigo);
      $json = json_encode($obj);
      echo $json;
    }
    break;

  case 'POST':
    $json = null;
    $data = json_decode(file_get_contents("php://input"), true);

    $asunto = $data['asunto'];
    $mensaje = $data['mensaje'];
    $emailRemitente = $data['emailRemitente'];
    $emailDestinatario = $data['emailDestinatario'];

    $api = new Api();
    $json = $api->sendEmail($asunto, $mensaje, $emailRemitente, $emailDestinatario);
    echo $json;
    break;
  
  default:
    # code...
    break;
}