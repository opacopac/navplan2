<?php declare(strict_types=1);

namespace Navplan\Traffic\DomainService;

use Navplan\Geometry\DomainModel\Extent;


interface IOgnRepo {
    public function setFilter(int $sessionId, Extent $extent);

    public function isListenerRunning(int $sessionId): bool;

    public function startListener(int $sessionId);

    public function readTraffic(int $sessionId): array;
}
