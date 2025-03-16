<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Rest\Service;

require_once __DIR__ . "/../../../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getMeteoGramDiContainer()->getReadCloudMeteoGramController();
$controller->processRequest();
