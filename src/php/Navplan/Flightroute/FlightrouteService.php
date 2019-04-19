<?php declare(strict_types=1);

namespace Navplan\Flightroute;

include_once __DIR__ . "/../NavplanHelper.php";

use Navplan\NavplanBootstrap;

// header("Access-Control-Allow-Origin: *"); // TODO: remove for PROD


FlightrouteServiceProcessor::processRequest(
    $_SERVER['REQUEST_METHOD'],
    $_GET,
    json_decode(file_get_contents('php://input'), TRUE),
    NavplanBootstrap::getAndInitDbService()
);
