<?php declare(strict_types=1);

namespace Navplan\Notem\RestService;

require_once __DIR__ . "/../../RestServiceBootstrap.php";

use Navplan\Notam\RestService\NotamServiceProcessor;
use NavplanTest\ProdNavplanDiContainer;


$diContainer = new ProdNavplanDiContainer();
$getArgs = $_GET;

NotamServiceProcessor::processRequest($getArgs, $diContainer);
