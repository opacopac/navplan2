<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnListenerService;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Traffic\OgnListenerModel\OgnTrafficFilter;
use Navplan\Traffic\OgnListenerModel\OgnTrafficMessage;


interface IOgnListenerRepo {
    function isListenerRunning(int $sessionId): bool;

    function setListenerIsRunning(int $sessionId);

    function unsetListenerIsRunning(int $sessionId);

    function getFilter(int $sessionId): ?OgnTrafficFilter;

    function setFilter(int $sessionId, Extent2d $extent);

    function deleteFilter(int $sessionId);

    function readTraffic(int $sessionId): array;

    function writeTrafficMessage(int $sessionId, OgnTrafficMessage $trafficMessage);

    function cleanupTrafficMessages(int $maxAgeSec);
}
