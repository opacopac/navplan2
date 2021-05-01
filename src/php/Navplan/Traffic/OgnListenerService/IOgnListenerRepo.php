<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnListenerService;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Traffic\OgnListenerModel\OgnTrafficFilter;
use Navplan\Traffic\OgnListenerModel\OgnTrafficMessage;


interface IOgnListenerRepo {
    function isListenerRunning(int $sessionId): bool;

    function setListenerIsRunning(int $sessionId);

    function unsetListenerIsRunning(int $sessionId);

    function getFilter(int $sessionId): ?OgnTrafficFilter;

    function setFilter(int $sessionId, Extent $extent);

    function deleteFilter(int $sessionId);

    function readTraffic(int $sessionId): array;

    function writeTrafficMessage(int $sessionId, OgnTrafficMessage $trafficMessage);

    function cleanupTrafficMessages(int $sessionId, int $maxAgeSec);
}
