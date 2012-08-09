<?php
require "redis_conf.php";
/* TODO insert chat message*/
    $data = file_get_contents("php://input");
    $json_data = json_decode($data, TRUE);
    $json_data["timestamp"] = time();
    $str_json_data = json_encode($json_data);
    $session = $json_data["to"] . "_with_" . $json_data["from"];
    //TODO send message to java
    $client = new Predis\Client($single_server);
    $client->rpush($session, $str_json_data);
?>
