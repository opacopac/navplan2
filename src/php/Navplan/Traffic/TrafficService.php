<?php declare(strict_types=1);

namespace Navplan\Traffic;

require_once __DIR__ . "/../NavplanBootstrap.php";

use Navplan\NavplanBootstrap;


TrafficServiceProcessor::processRequest(
    $_GET,
    NavplanBootstrap::getAndInitDbService(),
    NavplanBootstrap::getFileService());
