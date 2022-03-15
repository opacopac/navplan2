<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnListenerService;

use Navplan\ProdNavplanDiContainerImporter;

require_once __DIR__ . "/../../ConsoleBootstrap.php";


$diContainer = new ProdNavplanDiContainerImporter();
$sessionId = intval($argv[1]);
$maxAgeSec = intval($argv[2]);
$ognListenerService = new OgnListener(
    $diContainer->getOgnListenerRepo(),
    $diContainer->getTimeService(),
    $diContainer->getFileLogger()
);

$ognListenerService->start($sessionId, $maxAgeSec);
