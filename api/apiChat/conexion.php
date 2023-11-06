<?php
class Conexion
{
  private $host = "localhost";
  private $db = "chat";
  private $user = "root";
  private $password = "";

  public function getConexion()
  {
    try {
      $db = new PDO("mysql:host=$this->host;dbname=$this->db;", $this->user, $this->password);
      return $db;
    }
    catch(Exception $e) {
      echo "Database error: ".$e->getMessage();
    }
  }
}
