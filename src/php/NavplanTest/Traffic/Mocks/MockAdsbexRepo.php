<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Geometry\DomainModel\Length;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Traffic\DomainService\IAdsbexRepo;


class MockAdsbexRepo implements IAdsbexRepo {
    public array $readTrafficResult;
    public array $readTrafficArgs;


    public function __construct() {
    }


    public function readTraffic(Position2d $position, Length $radius): array {
        $this->readTrafficArgs = [$position, $radius];

        return $this->readTrafficResult;
    }
}
