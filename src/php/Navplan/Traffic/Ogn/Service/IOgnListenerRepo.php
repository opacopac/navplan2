<?php declare(strict_types=1);

namespace Navplan\Traffic\Ogn\Service;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Traffic\Ogn\Model\OgnTrafficFilter;
use Navplan\Traffic\Ogn\Model\OgnTrafficMessage;


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
