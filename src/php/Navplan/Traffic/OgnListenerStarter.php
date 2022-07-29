<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnListenerService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../ConsoleBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$sessionId = intval($argv[1]);
$maxAgeSec = intval($argv[2]);
$ognListenerService = new OgnListener(
    $diContainer->getTrafficDiContainer()->getOgnListenerRepo(),
    $diContainer->getSystemDiContainer()->getTimeService(),
    $diContainer->getSystemDiContainer()->getFileLogger()
);

$ognListenerService->start($sessionId, $maxAgeSec);
