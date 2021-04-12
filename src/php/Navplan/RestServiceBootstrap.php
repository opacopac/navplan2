<?php declare(strict_types=1);

require_once __DIR__ . "/../Autoloader.php";
require_once __DIR__ . "/../config.php";

// show errors on web page
// error_reporting(E_ALL);
ini_set('display_errors', '1');
header("Access-Control-Allow-Origin: *"); // TODO: remove for PROD
