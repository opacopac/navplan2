<?php declare(strict_types=1);

namespace Navplan\User;

require_once __DIR__ . "/../NavplanBootstrap.php";

use Navplan\NavplanBootstrap;


UserServiceProcessor::processRequest(
    json_decode(file_get_contents('php://input'), TRUE),
    NavplanBootstrap::getMailService(),
    NavplanBootstrap::getAndInitDbService(),
    NavplanBootstrap::getHttpResponseService()
);
