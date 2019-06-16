<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Traffic\UseCase\IAdsbexRepo;


class MockAdsbexRepo implements IAdsbexRepo {
    /* @var $readTrafficResult array */
    public $readTrafficResult;
    /* @var $readTrafficArgs array */
    public $readTrafficArgs;


    public function __construct() {
    }


    public function readTraffic(Position2d $position, Length $radius): array {
        $this->readTrafficArgs = [$position, $radius];

        return $this->readTrafficResult;
    }
}
