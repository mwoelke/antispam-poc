<?php

require_once 'vendor/autoload.php';

use Firebase\JWT\JWT;

//ini_set('display_errors', 1);

function fail(int $status, string $message)
{
    http_response_code($status);
    die($message);
}

//get private key
$key = file_get_contents('test_priv_key');
if ($key === false) {
    http_response_code(500, 'Could not read private key');
    die();
}

$request = file_get_contents('php://input');
if ($request === false || empty($request)) {
    fail(400, 'Could not read request');
}
$pow = json_decode($request);
if ($pow === null || empty($pow->challenge) || empty($pow->hash) || empty($pow->website)) {
    fail(400, 'Format invalid');
}

$challengeId = hash('sha256', "{$pow->challenge}_{$pow->website}");

//check POW parameters
$difficultyString = apcu_fetch($challengeId);
if ($difficultyString === false) {
    fail(404, 'Challenge not found');
}
$difficultyStringParameters = explode('-', $difficultyString);
$hashParameters = explode('$', $pow->hash);
$hashHex = bin2hex(base64_decode($hashParameters[5]));

//check if difficulty is correct
$difficulty = $difficultyStringParameters[0];

$target = floor((2 ** 32 - 1) / $difficulty);
$hashValue = hexdec(substr($hashHex, 0, 8));

if ($hashValue > $target) {
    fail(400, 'Hash does not meet difficulty requirement: ' . $hashHex);
}

//check POW
$powSuccess = password_verify($pow->challenge, $pow->hash);
if (!$powSuccess) {
    fail(400, 'POW unsuccessful');
}

//generate jwt
$payload = [
    'iss' => $_SERVER['SERVER_NAME'], //issuer
    'aud' => $pow->website, //audience
    'iat' => time(), //issued at 
    'exp' => time() + (60 * 3), //valid for 3 minutes
    //'exp' => time() +1,
    'jti' => bin2hex(random_bytes(16)) //JWT ID (random)
    //'challenge_hash' => $challangeId)
];

$jwt = JWT::encode($payload, $key, 'EdDSA');
echo $jwt;
