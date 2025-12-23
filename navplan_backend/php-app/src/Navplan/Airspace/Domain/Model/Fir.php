<?php declare(strict_types=1);

namespace Navplan\Airspace\Domain\Model;

use Navplan\Common\Domain\Model\MultiRing2d;
use Navplan\Common\Domain\Model\Position2d;


class Fir {
    public function __construct(
        public int $id,
        public string $region,
        public string $icao,
        public string $name,
        public string $stateCode,
        public string $stateName,
        public Position2d $center,
        public MultiRing2d $polygon
    ) {
    }
}

