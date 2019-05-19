<?php declare(strict_types=1);

namespace Navplan\Search;

require_once __DIR__ . "/../NavplanBootstrap.php";

use Navplan\NavplanBootstrap;


SearchServiceProcessor::processRequest(
    $_GET,
    NavplanBootstrap::getAndInitDbService(),
    NavplanBootstrap::getHttpResponseService()
);
