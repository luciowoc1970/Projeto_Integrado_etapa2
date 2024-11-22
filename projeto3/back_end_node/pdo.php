<?php

function getPDO() {
    $host = 'mysql';
    $db = 'unica_project';
    $user = 'root';
    $pass = 'root';

    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);

    return $pdo;
}