<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Geometry\Domain\Extent;
use Navplan\Traffic\UseCase\IOgnGateway;


class MockOgnGateway implements IOgnGateway {
    /* @var $setFilterArgs array */
    public $setFilterArgs;

    /* @var $isListenerRunningResult bool */
    public $isListenerRunningResult;
    /* @var $isListenerRunningArgs array */
    public $isListenerRunningArgs;

    /* @var $startListenerArgs array */
    public $startListenerArgs;

    /* @var $readTrafficResult array */
    public $readTrafficResult;
    /* @var $readTrafficArgs array */
    public $readTrafficArgs;


    public function __construct() {
    }


    public function setFilter(int $sessionId, Extent $extent) {
        $this->setFilterArgs = [$sessionId, $extent];
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
