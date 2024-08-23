<?php

function fail(int $status, string $message)
{
    http_response_code($status);
    die($message);
}

function getDifficultyFromRBLs(string $reversed_ip)
{
    $rbls = [
        'ix.dnsbl.manitu.net',
        'bl.spamcop.net',
        'bl.blocklist.de',
        'bl.mailspike.net'
    ];
    $listed = 0;

    $date = new DateTimeImmutable();

    foreach ($rbls as $rbl) {
        $lookup = "$reversed_ip.$rbl";
        $result = @dns_get_record($lookup, DNS_A);

        //for debugging
        mkdir('logs');
        $file = fopen('logs/dns_output.txt', 'a');
        fwrite($file, $date->format('Ymd-H_i_s') . ' | ' . $lookup . ' : ' . print_r($result, true));
        fclose($file);

        if ($result === false) {
            \error_log("DNS lookup failed for $lookup");
        } elseif(!empty($result)) {
            $listed++;
        }
    }
    return $listed > 0 ? ceil(INITIAL_DIFFICULTY * $listed) : INITIAL_DIFFICULTY;
}

DEFINE('ALLOWED_WEBSITES', [$_SERVER['HTTP_HOST'], 'localhost']);
DEFINE('INITIAL_DIFFICULTY', 35);

$request = file_get_contents('php://input');
$json = json_decode($request);

//die on invalid json
if ($json === null) {
    fail(400, 'Invalid JSON');
}

//check if json is valid
if (!isset($json->website) || !in_array($json->website, ALLOWED_WEBSITES)) {
    fail(403, 'Website not allowed');
}
$website = $json->website;

//get how often the user requested a challenge in the last hour
$ip = $_SERVER['REMOTE_ADDR'];
if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4) !== false) {
    $ip_reversed = implode(".", array_reverse(explode(".", $ip)));
} elseif (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6) !== false) {
    $ip_reversed = implode(".", array_reverse(explode(":", bin2hex(inet_pton($ip)))));
} else {
    fail(403, 'Could not parse IP');
}

$requestKey = 'pow_difficulty_' . hash('sha256', $ip_reversed);
//apcu_delete($requestKey);
$difficulty = apcu_fetch($requestKey);
$difficulty = ($difficulty === false) ? getDifficultyFromRBLs($ip_reversed) : $difficulty;
//increase the counter for this ip address

//uncomment for debugging
//$difficulty = INITIAL_DIFFICULTY;

//update difficulty (persist 1h)
apcu_store($requestKey, ceil($difficulty * 1.25), 3600);

//build difficulty string "difficulty-memory-time-hashLength"  
$time = 1;
$memory = 1_024 * 4;
$hashLength = 32;
$parameterString = "$difficulty-$memory-$time-32";

//create a random challenge
$challenge = bin2hex(random_bytes(32));
//persist hash(challange, website) with its parameters for 30 minutes
apcu_add(hash('sha256', "{$challenge}_{$website}"), $parameterString, 1800);

$result = [
    'challenge' => $challenge,
    'time' => $time,
    'memory' => $memory,
    'hashLength' => $hashLength,
    'difficulty' => $difficulty,
    'website' => $website
];

//return json
header('Content-Type: application/json; charset=utf-8');
echo json_encode($result);
