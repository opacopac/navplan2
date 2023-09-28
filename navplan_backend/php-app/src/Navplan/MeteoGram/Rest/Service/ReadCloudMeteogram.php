<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Rest\Service;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../../RestServiceBootstrap.php";

$diContainer = new ProdNavplanDiContainer();
$diContainer->getMeteoGramDiContainer()->getReadCloudMeteoGramController()->processRequest();
