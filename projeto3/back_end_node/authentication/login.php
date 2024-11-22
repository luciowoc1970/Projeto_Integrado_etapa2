<?php

require_once __DIR__ . '/../pdo.php';

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$pdo = getPDO();

$stmt = $pdo->prepare("SELECT * FROM Usuario WHERE Usuario.nomeUsuario LIKE :nomeUsuario AND Usuario.senhaHash = MD5(:senha)");
$stmt->execute([
    'nomeUsuario' => json_decode(file_get_contents('php://input'), true)['nomeUsuario'],
    'senha' => json_decode(file_get_contents('php://input'), true)['senha']
]);

$usuario = $stmt->fetch();

$_SESSION['usuario'] = $usuario;


echo json_encode([
    'token' => 'teste'
]);
