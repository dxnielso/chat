<?php
require_once('../conexion.php');
require_once('../cors.php');
require_once('../api.php');
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    if(!empty($_GET['email']) and isset($_GET['leida'])) {
      // Notificaciones leidas o no leidas
      $email = $_GET['email'];
      $leida = $_GET['leida'];
      $api = new Api();
      $obj = $api->getNotificacionesCondicion($email, $leida);
      $json = json_encode($obj);
      echo $json;
    } else if(!empty($_GET['email'])) {
      // Todas las notificaciones de un usuario
      $email = $_GET['email'];
      $api = new Api();
      $obj = $api->getNotificaciones($email);
      $json = json_encode($obj);
      echo $json;
    } 
    break;

  case 'PUT':
    $json = null;
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    if($data['leida'] == 1){
      $leida = 0;
    } else {
      $leida = 1;
    }
    $api = new Api();
    $json = $api->updateNotificacion($id, $leida);
    echo $json;
    break;
  
  default:
    # code...
    break;
}