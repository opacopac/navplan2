<?php namespace Navplan\Flightroute;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbService;


header("Access-Control-Allow-Origin: *"); // TODO: remove for PROD

$conn = DbService::openDb();

FlightrouteServiceProcessor::processRequest(
    $_SERVER['REQUEST_METHOD'],
    $_GET,
    json_decode(file_get_contents('php://input'), TRUE),
    $conn);

$conn->close();
