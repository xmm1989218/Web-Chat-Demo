<?php
require "redis_conf.php";
/* TODO get message */
    $from = "zhangsan";
    $to = "lisi";
    $timestamp = time();
    $content = "fuck";

    $session = $_GET["session"];
    //TODO get data from java;
    $client = new Predis\Client($single_server);
    $retval = $client->lpop($session);
    $json_retval = json_decode($retval);

    $data = array (
        $json_retval
        );

    echo json_encode($data);
?>
