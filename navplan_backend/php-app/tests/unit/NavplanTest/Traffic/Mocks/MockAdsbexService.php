<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Traffic\Domain\Service\IAdsbexService;


class MockAdsbexService implements IAdsbexService {
    public array $readTrafficResult;
    public array $readTrafficArgs;


    public function __construct() {
    }


    public function readTraffic(Position2d $position, Length $radius): array {
        $this->readTrafficArgs = [$position, $radius];

        return $this->readTrafficResult;
    }
}
