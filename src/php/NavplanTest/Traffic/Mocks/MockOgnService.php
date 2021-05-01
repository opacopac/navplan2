<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Time;
use Navplan\Traffic\DomainService\IOgnService;


class MockOgnService implements IOgnService {
    public array $setFilterArgs;
    public bool $isListenerRunningResult;
    public array $isListenerRunningArgs;
    public array $startListenerArgs;
    public array $readTrafficResult;
    public array $readTrafficArgs;


    public function __construct() {
    }


    public function setFilter(int $sessionId, Extent $extent, Time $maxAge) {
        $this->setFilterArgs = [$sessionId, $extent, $maxAge];
    }


    public function isListenerRunning(int $sessionId): bool {
        $this->isListenerRunningArgs = [$sessionId];

        return $this->isListenerRunningResult;
    }


    public function startListener(int $sessionId) {
        $this->startListenerArgs = [$sessionId];
    }


    public function readTraffic(int $sessionId): array {
        $this->readTrafficArgs = [$sessionId];

        return $this->readTrafficResult;
    }
}
