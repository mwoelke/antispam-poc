<?php

require_once 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

//check honeypot
if (!empty($_POST['second-email-check'])) {
    die('Honeypot filled');
}

//get private key
$key = file_get_contents('test_pub_key');
if ($key === false) {
    http_response_code(500);
    die('Could not read public key');
}

//validate JWT
if (empty($_POST['pow'])) {
    http_response_code(400);
    die('Proof of work empty');
}
try {
    $pow = JWT::decode($_POST['pow'], new Key($key, 'EdDSA'));
} catch (Exception $e) {
    http_response_code(403);
    die($e->getMessage());
}

//check audience
if ($pow->aud !== $_SERVER['HTTP_HOST'] && $pow->aud !== 'localhost') {
    http_response_code(403);
    die('Invalid audience: ' . $pow->aud . ' ' . $_SERVER['SERVER_NAME']);
}

//check if JWT was already used
if (apcu_fetch($pow->jti) !== false) {
    http_response_code(403);
    die('JWT already used');
}
apcu_add($pow->jti, true, 60 * 3);

//write logs
if (!is_dir('logs')) {
    mkdir('logs');
}

$date = new DateTime();
$filename = 'logs/' . $date->format('Ymd') . '.txt';
$datetime = $date->format('Ymd-H_i_s');

$file = fopen("$filename", 'a+');
if ($file === false) {
    throw new RuntimeException('Could not open log');
    exit();
}

$ip = $_SERVER['REMOTE_ADDR'];
$firstName = empty($_POST['first_name']) ? '' : $_POST['first_name'];
$lastName = empty($_POST['last_name']) ? '' : $_POST['last_name'];
$address = empty($_POST['address']) ? '' : $_POST['address'];
$message = empty($_POST['message']) ? '' : $_POST['message'];

$logEntry = "$datetime | $ip | $firstName $lastName | $address | $message\n";
fwrite($file, $logEntry);
fclose($file);

?>

<h1>
    Thank you, you seem legit.
</h1>