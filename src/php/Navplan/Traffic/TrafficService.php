<?php declare(strict_types=1);

namespace Navplan\Traffic;

require_once __DIR__ . "/../NavplanBootstrap.php";

use Navplan\NavplanBootstrap;


TrafficServiceProcessor::processRequest(
    $_SERVER['REQUEST_METHOD'],
    $_GET,
    json_decode(file_get_contents('php://input'), TRUE),
    NavplanBootstrap::getAndInitDbService(),
    NavplanBootstrap::getFileService());
