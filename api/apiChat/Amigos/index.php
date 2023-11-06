<?php
require_once('../conexion.php');
require_once('../cors.php');
require_once('../api.php');
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    // code...
    break;

  case 'POST':
    $json = null;
    $data = json_decode(file_get_contents("php://input"), true);

    $email = $data['email'];
    $miEmail = $data['miEmail'];

    $api = new Api();
    $json = $api->addAmigos($email, $miEmail);
    echo $json;
    break;
  
  default:
    # code...
    break;
}