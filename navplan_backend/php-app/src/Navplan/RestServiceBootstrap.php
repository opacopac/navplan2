<?php declare(strict_types=1);

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
