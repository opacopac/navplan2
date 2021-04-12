<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$config = new ProdNavplanDiContainer();
$getArgs = $_GET;

OpenAipServiceProcessor::processRequest($getArgs, $config);
