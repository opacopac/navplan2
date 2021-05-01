<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnListenerService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../ConsoleBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$sessionId = intval($argv[1]);
$maxAgeSec = intval($argv[2]);
$ognListenerService = new OgnListener(
    $diContainer->getOgnListenerRepo(),
    $diContainer->getTimeService(),
    $diContainer->getFileLogger()
);

$ognListenerService->start($sessionId, $maxAgeSec);
