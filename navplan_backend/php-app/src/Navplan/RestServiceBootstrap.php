<?php declare(strict_types=1);

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../Autoloader.php";

// show errors on web page
// error_reporting(E_ALL);
ini_set('display_errors', '1');

// TODO: use environment files
if ($_SERVER['HTTP_HOST'] === 'localhost:8080') {
    header("Access-Control-Allow-Origin: http://localhost:4200");
} else {
    header("Access-Control-Allow-Origin: https://www.navplan.ch");
}
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// create DI container
$diContainer = new ProdNavplanDiContainer();
