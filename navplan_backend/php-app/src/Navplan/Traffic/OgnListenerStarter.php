<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnListenerService;

use Navplan\Traffic\Ogn\Service\OgnListener;

require_once __DIR__ . "/../ConsoleBootstrap.php";


global $diContainer;

$sessionId = intval($argv[1]);
$maxAgeSec = intval($argv[2]);
$ognListenerService = new OgnListener(
    $diContainer->getOgnListenerRepo(),
    $diContainer->getTimeService(),
    $diContainer->getLoggingService()
);

$ognListenerService->start($sessionId, $maxAgeSec);
