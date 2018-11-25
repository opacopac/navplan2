<?php namespace Navplan\Traffic;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbService;


$conn = DbService::openDb();

TrafficServiceProcessor::processRequest(
    $_GET,
    $conn);

$conn->close();
